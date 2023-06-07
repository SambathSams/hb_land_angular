import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-viewland',
  templateUrl: './viewland.component.html',
  styleUrls: ['./viewland.component.css']
})
export class ViewlandComponent implements OnInit {

  edit = false;
  view = false;
  isPanel1Expanded = false;
  isPanel2Expanded = false;
  isPanel3Expanded = false;
  isPanel4Expanded = false;
  @ViewChild('stepper') stepper: MatStepper;

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
  submitted = false;
  awardInfoFormGroup!: FormGroup;
  index = 0;

  constructor(private builder: FormBuilder, private formBuilder: FormBuilder) { }
  isLinear = true;

  getformone(data: MatStepper, d: number) {
    this.submitted = true;
    if (this.personalInfoFormGroup.invalid) {
    } else {
      this.submitted = false;
      setTimeout(() => {
        data.selectedIndex = this.index + d;
      }, 200)
    }
  }
  ngOnInit(): void {

    this.awardInfoFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });

    this.personalInfoFormGroup = this.formBuilder.group({
      uniqueId: [],
      city: ['City'],
      circle: ['', Validators.required],
      division: ['', Validators.required],
      village: ['', Validators.required],
      land: ['', Validators.required],
      geoTagging: ['', Validators.required],
    });

    this.contactInfoFormGroup = this.formBuilder.group({
      files: this.formBuilder.array([])
    });
    this.addNewFileGroup();
  }

  get filesArray() {
    return this.contactInfoFormGroup.get('files') as FormArray;
  }

  addNewFileGroup() {
    const fileGroup = this.formBuilder.group({
      file: null
    });
    this.filesArray.push(fileGroup);
  }

  deleteFileGroup(index: number) {
    this.filesArray.removeAt(index);
  }
    triggerUpload(index: number) {
      const fileInput = document.getElementsByClassName('file-input')[index] as HTMLInputElement;
      fileInput.click();
    }  

  onFileChange(event: any, index: number) {
    const fileGroup = this.filesArray.at(index);
    const file = event.target.files[0];
    fileGroup.patchValue({ file: file });
  }

  getFileName(index: number): string {
    const fileGroup = this.filesArray.at(index);
    const file = fileGroup.get('file').value;
    return file ? file.name : 'No file selected';
  }

  submitForm() {
    // Implement your form submission logic here
    console.log('Form submitted!');
  }




}



