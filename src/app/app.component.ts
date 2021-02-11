import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
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
  userListGroup: FormGroup;

  ngOnInit(): void {
    this.nameControl = new FormControl('John', [myValidator(4)], [myAsyncValidator]);
    // this.nameControl.valueChanges.subscribe((val) => console.log(val));
    // this.nameControl.statusChanges.subscribe((val) => {
    //   console.log(this.nameControl.errors);
    //   console.log(val);
    // });

    this.nameGroup = new FormGroup({
      firstName: new FormControl('Sam'),
      lastName: new FormControl('Jonsson')
    });

    this.nameGroup.valueChanges.subscribe((val) => console.log(val));
    // this.nameGroup.statusChanges.subscribe((val) => {
    //   console.log(this.nameControl.errors);
    //   console.log(val);
    // })

    this.userListGroup = new FormGroup({
      users: new FormArray([
        new FormControl('Alice'),
        new FormControl('Tom'),
        new FormControl('Bob')
      ])
    });
    //
    // console.log(this.userListGroup.controls.users);
  }

  removeUser(index: number) {
    (this.userListGroup.controls['users'] as FormArray).removeAt(index);
  }

  addUser() {
    (this.userListGroup.controls['users'] as FormArray).push(new FormControl(''));
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
