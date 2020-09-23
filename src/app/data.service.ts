import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { LoginComponent } from './login/login.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get('https://localhost:44336/user');
  }

  

  getUserList(){
    var tokenHeader = new HttpHeaders({'Authorization':'Bearer '+ localStorage.getItem('token')});
    return this.http.get('https://localhost:44336/user',{headers: tokenHeader});

    
}

getUserContacts(){
  var tokenHeader = new HttpHeaders({'Authorization':'Bearer '+ localStorage.getItem('token')});
  return this.http.get('https://localhost:44336/Contact/GetUserContacts/'+localStorage.getItem('logedUserId'),{headers: tokenHeader});
}

  login(formData){
    return this.http.post('https://localhost:44336/Login',formData);
  }

  registration(formData){
    return this.http.post('https://localhost:44336/user',formData);
  }

  createContact(formData){
    var tokenHeader = new HttpHeaders({'Authorization':'Bearer '+ localStorage.getItem('token')});
    return this.http.post('https://localhost:44336/Contact',formData,{headers: tokenHeader});
  }

  updateContact(idContact, formData){
    var tokenHeader = new HttpHeaders({'Authorization':'Bearer '+ localStorage.getItem('token')});
    return this.http.put('https://localhost:44336/Contact/'+idContact,formData,{headers: tokenHeader});
  }

  getContact(idContact){
    var tokenHeader = new HttpHeaders({'Authorization':'Bearer '+ localStorage.getItem('token')});
    return this.http.get('https://localhost:44336/Contact/GetContact/'+idContact,{headers: tokenHeader});
  }

  deleteContact(idContact){
    var tokenHeader = new HttpHeaders({'Authorization':'Bearer '+ localStorage.getItem('token')});
    return this.http.delete('https://localhost:44336/Contact/'+idContact,{headers: tokenHeader});
  }

// getUserList(){
//   var reqHeader = new HttpHeaders({ 
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer ' + JSON.parse('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkYW5pamVsMjMiLCJmdWxsTmFtZSI6IlBldGFyIiwicm9sZSI6IkFkbWluIiwianRpIjoiYzVmZDNhNWEtMGM5My00NDBjLWEzYTktNTY3Y2RlZjQ2YjUzIiwiZXhwIjoxNjAwNTUzNzg1LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo0NDMzNi8iLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo0NDMzNi8ifQ.DN-b_UhFdDp3lSL8yPQ6yu2kgRHIGwFKe-ihF97MqoI')
//    });
//   return this.http.get('https://localhost:44336/user', { headers: reqHeader });
// }

}
