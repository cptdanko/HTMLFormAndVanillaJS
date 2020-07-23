import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, HttpClientModule, FormsModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'simple-form'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    
    expect(app.title).toEqual('simple-form');
  });
  it("Should have the UI labels correctly defined", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.labels.header).toEqual("User Form");
    expect(app.labels.name).toEqual("Name");
    expect(app.labels.salary).toEqual("Salary");
    expect(app.labels.age).toEqual("DOB");
    expect(app.labels.submit).toEqual("Submit");
    expect(app.labels.reset).toEqual("Reset Form");
  });
  it('should have initial form values as null', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    //app.resetFromUI();
    expect(app.name).toBeNull();
    expect(app.salary).toBeNull();
    expect(app.age).toBeNull();
  });
  /*
  const compiled = fixture.nativeElement;
  let fields = compiled.querySelectorAll(".form-field");
    fields.forEach(e => {
      if(e.type === Number) {
        e.value = 1212;
        console.log("Set number to val")
      } else if(e.type === "text") {
        e.value = "abc";
        console.log("Set name to val")
      } else {
        e.value = new Date();
      }
    });*/
});
