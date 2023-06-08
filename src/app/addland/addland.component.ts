import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LanddataService } from '../services/landdata.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-addland',
  templateUrl: './addland.component.html',
  styleUrls: ['./addland.component.css']
})
export class AddlandComponent implements OnInit {


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
  } togglePanel4() {
    this.isPanel2Expanded = !this.isPanel2Expanded;
  }

  personalInfoFormGroup!: FormGroup;
  contactInfoFormGroup!: FormGroup;

  awardInfoFormGroup!: FormGroup;



  constructor(private builder: FormBuilder, private formBuilder: FormBuilder) { }
  isLinear = true;

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


  panelOpenState = false;   // mat expansion panel

  fields: any[] = [];

  addInputField() {
    const newIndex = this.fields.length + 1;
    const newField = { index: newIndex, value: '' };
    this.fields.push(newField);
  }

  removeInputField(field: any) {
    const index = this.fields.indexOf(field);
    if (index !== -1) {
      this.fields.splice(index, 1);
    }
  }

  fields2: any[] = [];

  addInputField2() {
    const newIndex2 = this.fields2.length + 1;
    const newField2 = { index2: newIndex2, value: '' };
    this.fields2.push(newField2);
  }

  removeInputField2(field2: any) {
    const index2 = this.fields2.indexOf(field2);
    if (index2 !== -1) {
      this.fields2.splice(index2, 1);
    }
  }



  fieldsFmb: any[] = [];

  addInputFieldFmb() {
    const newIndexFmb = this.fieldsFmb.length + 1;
    const newFieldFmb = { index: newIndexFmb, value: '' };
    this.fieldsFmb.push(newFieldFmb);
  }

  removeInputFieldFmb(fieldFmb: any) {
    const indexFmb = this.fieldsFmb.indexOf(fieldFmb);
    if (indexFmb !== -1) {
      this.fieldsFmb.splice(indexFmb, 1);
    }
  }

  fieldsFour: any[] = [];

  addInputFieldFour() {
    const newIndexFour = this.fieldsFour.length + 1;
    const newFieldFour = { index: newIndexFour, value: '' };
    this.fieldsFour.push(newFieldFour);
  }

  removeInputFieldFour(fieldFour: any) {
    const indexFour = this.fieldsFour.indexOf(fieldFour);
    if (indexFour !== -1) {
      this.fieldsFour.splice(indexFour, 1);
    }
  }

  fieldsDD: any[] = [];

  addInputFieldDD() {
    const newIndexDD = this.fieldsDD.length + 1;
    const newFieldDD = { index: newIndexDD, value: '' };
    this.fieldsDD.push(newFieldDD);
  }

  removeInputFieldDD(fieldDD: any) {
    const indexDD = this.fieldsDD.indexOf(fieldDD);
    if (indexDD !== -1) {
      this.fieldsDD.splice(indexDD, 1);
    }
  }

  forms: any[] = [];

  addForm() {
    const newIndex2 = this.forms.length + 2;
    const newForm = { index: newIndex2, value: '' };
    this.forms.push(newForm);
  }

  formsFmb: any[] = [];

  addFormFmb() {
    const newIndex2Fmb = this.formsFmb.length + 2;
    const newFormFmb = { index: newIndex2Fmb, value: '' };
    this.forms.push(newFormFmb);
  }

  formsFour: any[] = [];

  addFormFour() {
    const newIndex2Four = this.formsFour.length + 2;
    const newFormFour = { index: newIndex2Four, value: '' };
    this.formsFour.push(newFormFour);
  }

  formsDD: any[] = [];

  addFormDD() {
    const newIndex2DD = this.formsDD.length + 2;
    const newFormDD = { index: newIndex2DD, value: '' };
    this.formsDD.push(newFormDD);
  }


}
