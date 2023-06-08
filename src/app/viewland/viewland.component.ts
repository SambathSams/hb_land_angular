import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../services/common.service';

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
  landId: string;
  LandData: any;
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
  types = [
    { label: 'City', value: 'city' },
    { label: 'Rural', value: 'rural' },
  ];
  constructor(private builder: FormBuilder, private formBuilder: FormBuilder, private activeRoute: ActivatedRoute, private router: Router, private commonService: CommonService) {
    this.activeRoute.paramMap.subscribe(params => {
      this.landId = params.get('id');
      if (this.landId && this.router.url.includes('edit')) {
        this.edit = true;
        this.getLandandFileDetails();
      } else if (this.router.url.includes('view')) {
        this.view = true;
        this.getLandandFileDetails();
      }
    })

  }
  isLinear = true;
  files: any;
  getLandandFileDetails() {
    this.commonService.apiGetDetailsCall(this.landId, 'landdigitdata/get').subscribe(data => {
      if (data) {
        this.LandData = data;
        this.personalInfoFormGroup.patchValue(data);
        if (this.LandData.land_name) {
          this.commonService.apiGetDetailsCall(this.LandData.land_name, 'getfile').subscribe(file => {
            this.files = file;
            if (file) {
              for (const item of this.files) {
                const fileGroup = this.formBuilder.group({
                  file: null
                });
                this.filesArray.push(fileGroup);
              
                const index = this.filesArray.length - 1;
                const fileControl = fileGroup.get('file');
                fileControl.setValidators(Validators.required); // Optional: Add validators if needed
                fileControl.updateValueAndValidity();
              
                // Create a File object from the file path
                const file = new File([item.filename], item.filename);
              console.log(file)
                // Patch the file value
                fileControl.patchValue(file);
              }
            }
          })
        }
      }
    })
  }

  getFileUrl(index: number): string {
    const fileGroup = this.filesArray.at(index);
    const file = fileGroup.get('file').value;
    return file ? URL.createObjectURL(file) : '#';
  }

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
      citynrural: ['', Validators.required],
      circle: ['', Validators.required],
      division: ['', Validators.required],
      village: ['', Validators.required],
      unique_code: [''],
      land_name: ['', Validators.required],
      geo_tagging_geo_fencing: ['', Validators.required],
    });

    this.contactInfoFormGroup = this.formBuilder.group({
      files: this.formBuilder.array([])
    });
    if(!this.edit && !this.view){
      this.addNewFileGroup();
    }
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



