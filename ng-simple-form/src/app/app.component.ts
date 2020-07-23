import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'simple-form';

  UPLOAD_URL = "https://dummy.restapiexample.com/api/v1/create";
  PROXY_URL = "https://cors-anywhere.herokuapp.com/";

  labels = {
    header: "User Form",
    name: "Name",
    salary: "Salary",
    age: "DOB",
    submit: "Submit",
    reset: "Reset Form",
    loading: "Loading..."
  };
  
  name: string = null;
  salary: number = null;
  age: Date = null;

  cantSubmit = false;

  constructor(private http: HttpClient) {
    this.otherElemsValid();
  }
  ngOnDestroy() {
    //unsubscribe any observables
  }
  private mockdata() {
    return {
        name: "Bhuman",
        salary: 12345,
        age: new Date()
    };
  }
  private otherElemsValid() {
    if(this.name === null || this.name.length === 0){
      this.cantSubmit = true;
      return;
    }
    if(this.salary === null || this.salary === 0){
      this.cantSubmit = true;
      return;
    }
    if(this.age === null || this.age === undefined){
      this.cantSubmit = true;
      return;
    }
    this.cantSubmit = false;
  }
  onChange(value:any) {
    this.otherElemsValid();
  }
  private postUserData(data: any) {
    if(data == null) {
      data = this.mockdata();
    }
    //let userObs = this.http.post(this.SERVER_URL, data);
    let userObs = this.http.post(this.PROXY_URL + this.UPLOAD_URL, data);
    //let userObs = this.http.post("http://localhost:3000/create", data);
    userObs.subscribe(resp => { // chances of memory errors here - we should unsubscribe at ngOnDestroy
      //a typescript thing, we need to cast it to any before we try to access it
      let respAny: any = resp; 
      let message = `${this.name} your user id is ${respAny.data.id}`;
      alert(message);
      this.resetFromUI();
    });
  }
  resetFromUI() {
    this.salary = null;
    this.age = null;
    this.name = null;
  }
  submitForm() {
    let details = {
      name: this.name,
      age: this.age,
      salary: this.salary
    };
    this.postUserData(details);
  }
}
