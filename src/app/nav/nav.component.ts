import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  checkUser: boolean=false;
  appTitle: string='PhoneBook'
  logedUserName: string=localStorage.getItem("logedUserName")

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  onLogout(){
    localStorage.removeItem('token');
    localStorage.removeItem('logedUserId');
    localStorage.removeItem('logedUserName');
    this.router.navigate(['/login']);
  }
  checkIfUserLogedIn(){
    if(localStorage.getItem("token") != null)
      return  false; 
    return true;
  }
}
