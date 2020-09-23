import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  formModel ={
    UserName: '',
    Password: '',
    Name:'',
    Surname:'',
    Email:''
  }

  ErrorMessage: string = '';

  constructor(private data: DataService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') != null)
      this.router.navigateByUrl('/contact');
  }

  onSubmit(form:NgForm){
    this.data.registration(form.value).subscribe(
      (res:any) => {
        this.router.navigateByUrl('/login');
      },
      err=>{ 
        if(err.status == 406)
            this.ErrorMessage = err.error;
        else
          this.ErrorMessage = "Something went wrong! Please contact your administrator."
      }
    );
  }

}
