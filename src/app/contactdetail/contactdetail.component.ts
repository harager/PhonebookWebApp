import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-contactdetail',
  templateUrl: './contactdetail.component.html',
  styleUrls: ['./contactdetail.component.scss']
})
export class ContactdetailComponent implements OnInit {

  users: Object;
  items: [];
  contacts: string [];
  ErrorMessage: string = '';
  constructor(private dataSer: DataService, private router: Router) { }

  ngOnInit(): void {
    this.fetchData();  
  }
  createNewContact(){
    this.router.navigateByUrl('/contactdetail');
    
  };
  editContact(idContact){
    this.router.navigate(['contactdetail'], {queryParams: {idContact: idContact}});
  };
  deleteContact(idContact){
    var deleteUser = window.confirm('Are you sure you want to delete contact?');

    if (deleteUser) { 
        this.dataSer.deleteContact(idContact).subscribe(
          (res:any) => {
            this.fetchData();
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
      else{
        this.router.navigateByUrl('/contact');
      }    
  };

  fetchData() {
    this.dataSer.getUserContacts().subscribe(
      (res:any) => {
        this.contacts = res as string [];
        console.log(res);
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
