import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-viewland',
  templateUrl: './viewland.component.html',
  styleUrls: ['./viewland.component.css']
})
export class ViewlandComponent implements OnInit {


  isPanel1Expanded = false;
  isPanel2Expanded = false;
  isPanel3Expanded = false;
  isPanel4Expanded = false;

  togglePanel1() {
    this.isPanel1Expanded = !this.isPanel1Expanded;
  }

  togglePanel2() {
    this.isPanel2Expanded = !this.isPanel2Expanded;
  }
  togglePanel3() {
    this.isPanel2Expanded = !this.isPanel2Expanded;
  }togglePanel4() {
    this.isPanel2Expanded = !this.isPanel2Expanded;
  }

  personalInfoFormGroup!: FormGroup;
  contactInfoFormGroup!: FormGroup;

  awardInfoFormGroup!: FormGroup;



  constructor(private builder: FormBuilder,private formBuilder: FormBuilder) { }
  isLinear=true;

  ngOnInit(): void {

    this.awardInfoFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });

    this.personalInfoFormGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });

    this.contactInfoFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }


  submitForm() {
    // Implement your form submission logic here
    console.log('Form submitted!');
  }




}



