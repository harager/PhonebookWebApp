import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formModel ={
    UserName: '',
    Password: ''
  }
  ErrorMessage: string = '';

  constructor(private data: DataService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') != null)
      this.router.navigateByUrl('/contact');
    // this.data.getUsers().subscribe(data =>{
    //   this.users = data
    //   console.log(this.users)
    // });
    // this.data.getUsers().toPromise().then(data =>{
    //   this.users = data
    //   console.log(this.users)
    // })
  }

  onSubmit(form:NgForm){
    this.data.login(form.value).subscribe(
      (res:any) => {
        localStorage.setItem('token',res.token);
        localStorage.setItem('logedUserId',res.userDetails.id);
        localStorage.setItem('logedUserName',res.userDetails.name + ' ' + res.userDetails.surname);
        this.router.navigateByUrl('/contact');
      },
      err=>{ 
        if(err.status == 401)
        {
            this.ErrorMessage = "Invalid username or password"
        }
        else{
          this.ErrorMessage = "Something went wrong! Please contact your administrator."
        }
      }
    );
  }

  firstClick(){
    this.data.getUsers();
  }

}
