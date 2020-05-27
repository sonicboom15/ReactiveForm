import { Component } from '@angular/core';
import { Validators,FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reactiveForm';
  countryList = [];
  stateList = [];
  cityList = [];
  profileForm: FormGroup;
  constructor() {
    this.profileForm = new FormGroup({
      food: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z]{4,}'),]),
      color: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z]{4,}'),]),
      name: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z]{4,}'),]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required,Validators.pattern('[0-9+-]{10}'),]),
      pass: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmpass: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
    });
    this.profileForm.get('country').valueChanges.subscribe((val) => {
      this.updateStateList(val);
      this.cityList = [];
    });
    this.profileForm.get('state').valueChanges.subscribe((val) => {
      this.updateCityList(val);
    });
    this.countryList = this.data;
  }

  updatePatt() {
    this.profileForm
      .get('confirmpass')
      .setValidators([
        Validators.required,
        Validators.pattern(this.profileForm.get('pass').value),
      ]);
    this.profileForm
      .get('confirmpass')
      .updateValueAndValidity({ onlySelf: true, emitEvent: true });
  }
  consoleDetails() {
    console.log(this.profileForm.value);
  }

  updateStateList(countryCode) {
    this.countryList.forEach((country) => {
      if (country.code == countryCode) {
        this.stateList = country.states;
      }
    });
    this.profileForm.get('state').setValue('');
  }

  updateCityList(stateCode) {
    this.stateList.forEach((state) => {
      if (state.code == stateCode) {
        this.cityList = state.cities;
      }
    });
    this.profileForm.get('city').setValue('');
  }

  data = [
    {
      name: 'India',
      code: 'IND',
      states: [
        {
          name: 'TamilNadu',
          code: 'TN',
          cities: [
            { name: 'Chennai', code: 'CHN' },
            { name: 'Madurai', code: 'MAD' },
          ],
        },
        {
          name: 'Karnataka',
          code: 'KA',
          cities: [
            { name: 'Mysore', code: 'MY' },
            { name: 'Bangalore', code: 'BA' },
          ],
        },
      ],
    },
    {
      name: 'United States of America',
      code: 'USA',
      states: [
        {
          name: 'New York State',
          code: 'NY',
          cities: [
            { name: 'New York city', code: 'NYC' },
            { name: 'Buffalo', code: 'BU' },
          ],
        },
        {
          name: 'Los Santos',
          code: 'LS',
          cities: [
            { name: '‎Mount Chillad', code: 'MC' },
            { name: 'Blaine County', code: 'BC' },
          ],
        },
      ],
    },
  ];
}
