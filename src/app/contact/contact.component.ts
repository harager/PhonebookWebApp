import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
// import * as Rx from "rxjs/Rx";
// import { from, Observable, throwError } from 'rxjs';
// import { map, catchError } from 'rxjs/operators';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  formModel ={
    Id:0,
    FirstName: '',
    LastName: '',
    Email:'',
    Address:'',
    PhoneNumber1: "",
    PhoneNumber1Id: 0,
    PhoneNumber2: "",
    PhoneNumber2Id: 0,
    UserId:localStorage.getItem("logedUserId")
  }
  
  btnName: string="Create Contact"
  ErrorMessage: string = '';

  constructor(private dataSer: DataService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    
    if(localStorage.getItem('token') == null)
      this.router.navigateByUrl('/login');

    this.activatedRoute.queryParams.subscribe((params) => {
      if(params['idContact'] != null)
      {
        this.dataSer.getContact(params['idContact']).subscribe(
          (data:any) => {
            let obj:Contact = <Contact>data;
            this.formModel.Id = obj.id;
            this.btnName = "Update Contact";
            this.formModel.FirstName = obj.firstName;
            this.formModel.LastName = obj.lastName;
            this.formModel.Email = obj.email;
            this.formModel.Address = obj.address;
            if(obj.phones != undefined && obj.phones[0] != undefined)
            {
              this.formModel.PhoneNumber1 = obj.phones[0].phoneNumber;
              this.formModel.PhoneNumber1Id = obj.phones[0].id;
            }

            if(obj.phones != undefined && obj.phones[1] != undefined)
            {
              this.formModel.PhoneNumber2 = obj.phones[1].phoneNumber;
              this.formModel.PhoneNumber2Id = obj.phones[1].id;
            }

            console.log(data);
          },
          err=>{ 
            if(err.status == 403 || err.status == 404)
            {
              this.router.navigateByUrl('/unauthorized');
            }
            else{
              this.ErrorMessage = "Something went wrong! Please contact your administrator."
            }
          }
          
          
        //   data =>{
          
        //   let obj:Contact = <Contact>data;
        //   this.formModel.Id = obj.id;
        //   this.btnName = "Update Contact";
        //   this.formModel.FirstName = obj.firstName;
        //   this.formModel.LastName = obj.lastName;
        //   this.formModel.Email = obj.email;
        //   this.formModel.Address = obj.address;
        //   if(obj.phones != undefined && obj.phones[0] != undefined)
        //   {
        //     this.formModel.PhoneNumber1 = obj.phones[0].phoneNumber;
        //     this.formModel.PhoneNumber1Id = obj.phones[0].id;
        //   }

        //   if(obj.phones != undefined && obj.phones[1] != undefined)
        //   {
        //     this.formModel.PhoneNumber2 = obj.phones[1].phoneNumber;
        //     this.formModel.PhoneNumber2Id = obj.phones[1].id;
        //   }

        //   console.log(data);
          
        // }
        
        
        )
        console.log(params['idContact']);
      }
        
    });
  }

  onSubmit(form:NgForm){
    console.log("createContact");
    form.value.Phones = [];
    if(form.value.PhoneNumber1 != "")
    {
      form.value.Phones.push({ PhoneNumber:form.value.PhoneNumber1, Id:form.value.PhoneNumber1Id, ContactId:form.value.Id });
    }
    if(form.value.PhoneNumber2 != "")
    {
      form.value.Phones.push({ PhoneNumber:form.value.PhoneNumber2, Id:form.value.PhoneNumber2Id, ContactId:form.value.Id });
    }
    // form.value.Phones = [{ PhoneNumber:form.value.PhoneNumber1, Id:form.value.PhoneNumber1Id, ContactId:form.value.Id },
    // { PhoneNumber:form.value.PhoneNumber2, Id:form.value.PhoneNumber2Id, ContactId:form.value.Id }]
    if(form.value.Id != null && form.value.Id > 0)
    {
      this.dataSer.updateContact(form.value.Id,form.value).subscribe(
        (res:any) => {
          this.router.navigateByUrl('/contact');
        },
        err=>{ 
          if(err.status == 401)
          {
            localStorage.removeItem('token');
            localStorage.removeItem('logedUserId');
            this.router.navigateByUrl('/login');
          }
          else
          {
            this.ErrorMessage = "Something went wrong! Please contact your administrator."            
          }
        }
      );      
    }
    else
    {
      this.dataSer.createContact(form.value).subscribe(
        (res:any) => {
          this.router.navigateByUrl('/contact');
        },
        err=>{ 
          if(err.status == 401)
          {
            localStorage.removeItem('token');
            localStorage.removeItem('logedUserId');
            this.router.navigateByUrl('/login');
          }
          else{
            this.ErrorMessage = "Something went wrong! Please contact your administrator."
          }
        }
      );
    }
  }

  back(){
    this.router.navigateByUrl('/contact');
  }

}
