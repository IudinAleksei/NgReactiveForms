import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'NgReactiveForms';
  nameControl: FormControl;
  nameGroup: FormGroup;

  ngOnInit(): void {
    this.nameControl = new FormControl('Hello', [myValidator(4)], [myAsyncValidator]);
    // this.nameControl.valueChanges.subscribe((val) => console.log(val));
    this.nameControl.statusChanges.subscribe((val) => {
      console.log(this.nameControl.errors);
      console.log(val);
    });

    this.nameGroup = new FormGroup({
      firstName: new FormControl('John'),
      lastName: new FormControl('Jonsson')
    });

    this.nameGroup.valueChanges.subscribe((val) => console.log(val));
    // this.nameGroup.statusChanges.subscribe((val) => {
    //   console.log(this.nameControl.errors);
    //   console.log(val);
    // })
  }
}

function myValidator(num: number) {
  return function (formControl: FormControl) {
    if (formControl.value.length < num) {
      return { myValidator: { message: 'Validation error' } };
    }
    return null;
  };
}


function myAsyncValidator(formControl: FormControl): Observable<null|any> {
  if (formControl.value.length < 3) {
    //can add http.get and others
    return of({ myValidator: {message: 'Validation error'}});
  }
  return of(null);
}
