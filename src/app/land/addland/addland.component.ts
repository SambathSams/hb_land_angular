import { HttpClient, HttpResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LanddataService } from '../landdata.service';

import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FinalSaveLand } from '../editland/editland.component';
import { CommonService } from 'src/app/services/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';




@Component({
  selector: 'app-addland',
  templateUrl: './addland.component.html',
  styleUrls: ['./addland.component.css'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class AddlandComponent implements OnInit {


  isPanel1Expanded = false;
  isPanel2Expanded = false;
  isPanel3Expanded = false;
  isPanel4Expanded = false;
  LPSFormGroup: FormGroup;
  expansionPanelsArray: FormArray;

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

  // Award Details Form 7th Tab 
  awardInfoFormGroup!: FormGroup;
  awardDetailsArray: FormArray;
  awardLists: any[]=[];



  FMBFormGroup: FormGroup;
  expansionPanelsArrayFMB: FormArray;
  fourOneFormGroup: FormGroup;
  expansionPanelsArray4: FormArray;
  sixDDFormGroup:FormGroup;
  expansionPanelsSixDD:FormArray;
  constructor(private builder: FormBuilder, private formBuilder: FormBuilder , private commonService : CommonService,private _snackBar: MatSnackBar, private router: Router,) { }
  isLinear = true;

  ngOnInit(): void {

   

    this.personalInfoFormGroup = this.formBuilder.group({
      citynrural: ['', Validators.required],
      circle: ['', Validators.required],
      division: ['', Validators.required],
      village: ['', Validators.required],
      land_name: ['', Validators.required],
      geo_tagging_geo_fencing: ['', Validators.required],
    });

    this.contactInfoFormGroup = this.formBuilder.group({
      // email: ['', [Validators.required, Validators.email]],
      // phone: ['', Validators.required]
    });

  // LPS FORM
    this.LPSFormGroup = this.formBuilder.group({
      expansionPanels: this.formBuilder.array([])
    });

    this.expansionPanelsArray = this.LPSFormGroup.get('expansionPanels') as FormArray;
    this.addExpansionPanel();
// FMB
    this.FMBFormGroup = this.formBuilder.group({
      expansionPanelsFMB: this.formBuilder.array([])
    });

    this.expansionPanelsArrayFMB = this.FMBFormGroup.get('expansionPanelsFMB') as FormArray;
    this.addExpansionPanelFMB();
// 4one
    this.fourOneFormGroup = this.formBuilder.group({
      expansionPanels4: this.formBuilder.array([])
    });

    this.expansionPanelsArray4 = this.fourOneFormGroup.get('expansionPanels4') as FormArray;
    this.addExpansionPanel4One();

    // 6DD
    this.sixDDFormGroup = this.formBuilder.group({
      expansionPanelsSix: this.formBuilder.array([])
    });

    this.expansionPanelsSixDD = this.sixDDFormGroup.get('expansionPanelsSix') as FormArray;
    this.addExpansionPanelSixDD();


    // Award Details formgroup 7th tab
    this.awardInfoFormGroup = this.formBuilder.group({
      awardsDet: this.formBuilder.array([]),
    });

    // Initialize form array controls for each expansion panel
    this.awardLists.forEach(() => {
      this.addAwardDetails();
    }); 
  }

  addExpansionPanel4One() {
    const expansionPanel4One = this.formBuilder.group({
      file: null,
      refNo: [''],
      extent: [''],
      surveyNo: [''],
      repeatedFields: this.formBuilder.array([])
    });

    this.expansionPanelsArray4.push(expansionPanel4One);
  }
  addExpansionPanelSixDD(){
    const expansionPanelSix = this.formBuilder.group({
      file: null,
      refNo: [''],
      extent: [''],
      surveyNo: [''],
      repeatedFields: this.formBuilder.array([])
    });
    this.expansionPanelsSixDD.push(expansionPanelSix);
  }

  addExpansionPanelFMB() {
    const expansionPanelFMB = this.formBuilder.group({
      file: null,
      refNo: [''],
      extent: [''],
      surveyNo: [''],
      repeatedFields: this.formBuilder.array([])
    });

    this.expansionPanelsArrayFMB.push(expansionPanelFMB);
  }

  removeLastRepeatedField(type) {
    if (this.expansionPanelsArray.length > 0 && type === 'lps') {
      this.expansionPanelsArray.removeAt(this.expansionPanelsArray.length - 1);
    } else if (this.expansionPanelsArrayFMB.length > 0 && type === 'fmb') {
      this.expansionPanelsArrayFMB.removeAt(this.expansionPanelsArrayFMB.length - 1);
    } else if (this.expansionPanelsArray4.length > 0 && type === '4(1)') {
      this.expansionPanelsArray4.removeAt(this.expansionPanelsArray4.length - 1);
    }else if(this.expansionPanelsSixDD.length > 0 && type ==='6DD'){
      this.expansionPanelsSixDD.removeAt(this.expansionPanelsSixDD.length - 1);
    }
  }

  addExpansionPanel() {
    const expansionPanel = this.formBuilder.group({
      file: null,
      refNo: [''],
      extent: [''],
      surveyNo: [''],
      repeatedFields: this.formBuilder.array([])
    });
    this.expansionPanelsArray.push(expansionPanel);
  }

  onFileChange(event: any, panelIndex: number, type) {
    const file = event.target.files && event.target.files.length > 0 ? event.target.files[0] : null;
    if (type === 'lps') {
      const panelFormGroup = this.expansionPanelsArray.at(panelIndex) as FormGroup;
      if (file) {
        const prefix = type; // Specify your desired prefix here
        const suffix = panelIndex
        const fileNameWithPrefix = prefix + '_' + file.name + '_' + suffix;
        const prefixedFile = new File([file], fileNameWithPrefix, { type: file.type });
        panelFormGroup.get('file').setValue(prefixedFile);
      } else {
        panelFormGroup.get('file').setValue(null);
      }
    } else if (type === 'fmb') {
      const panelFormGroup = this.expansionPanelsArrayFMB.at(panelIndex) as FormGroup;
      if (file) {
        const prefix = type; // Specify your desired prefix here
        const suffix = panelIndex
        const fileNameWithPrefix = prefix + '_' + file.name + '_' + suffix;
        const prefixedFile = new File([file], fileNameWithPrefix, { type: file.type });
        panelFormGroup.get('file').setValue(prefixedFile);
      } else {
        panelFormGroup.get('file').setValue(null);
      }
    }else if(type=== '4(1)'){
      const panelFormGroup = this.expansionPanelsArray4.at(panelIndex) as FormGroup;
      if (file) {
        const prefix = type; // Specify your desired prefix here
        const suffix = panelIndex
        const fileNameWithPrefix = prefix + '_' + file.name + '_' + suffix;
        const prefixedFile = new File([file], fileNameWithPrefix, { type: file.type });
        panelFormGroup.get('file').setValue(prefixedFile);
      } else {
        panelFormGroup.get('file').setValue(null);
      }
    }else if(type ==='6DD'){
      const panelFormGroup = this.expansionPanelsSixDD.at(panelIndex) as FormGroup;
      if (file) {
        const prefix = type; // Specify your desired prefix here
        const suffix = panelIndex
        const fileNameWithPrefix = prefix + '_' + file.name + '_' + suffix;
        const prefixedFile = new File([file], fileNameWithPrefix, { type: file.type });
        panelFormGroup.get('file').setValue(prefixedFile);
    }else {
      panelFormGroup.get('file').setValue(null);
    }
  }

  }

  // Generate Unique id
 generateString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result.toUpperCase();
  }

  // After Create Move to View 
  back(){
    this.router.navigate(['/land/home']);
  }

  // Seventh Tab Details

  addAwardDetails() {
    const awardDetailsGroup = this.formBuilder.group({
      award_details_award_amount: [' '],
      award_details_date: [' '],
      award_details_disbursement_civil_court_deposit: [' '],
      award_details_disbursement_direct_payment: [' '],
      award_details_disbursement_revenue_deposit: [' '],
      award_details_extent: [' '],
      award_details_no: [' '],
      award_details_notified_person: [' '],
      award_details_survey_nos: [' '],
      filename: [' '],
      landname: [' '],
      pho_extavailable_extent: [' '],
      pho_extavailable_survey_nos: [' '],
      pho_extcannot_court_case: [' '],
      pho_extcannot_encroachment: [' '],
      pho_extcannot_extent: [' '],
      pho_extcannot_noc_issued: [' '],
      pho_extcannot_quashed: [' '],
      pho_extcannot_reconveyed: [' '],
      pho_extcannot_scattered: [' '],
      pho_extcannot_survey_nos: [' '],
      pho_extcannot_wantofapproach: [' '],
      pho_extent: [' '],
      pho_schimpl_extent: [' '],
      pho_schimpl_survey_nos: [' '],
      pnho_court_case: [' '],
      pnho_encroachment: [' '],
      pnho_extent: [' '],
      pnho_quashed: [' '],
      pnho_survey_nos: [' '],
      pnho_without_encumbrance: [' '],  
      });

    (this.awardInfoFormGroup.get('awardsDet') as FormArray).push(awardDetailsGroup);
  } 
  

  getAwardDetailsArrayControls(index: number): FormArray {
    return (this.awardInfoFormGroup.get('awardsDet') as FormArray).at(index) as FormArray;
  }

  getAwardDetailsValues(){
    const firstAwardFormArrayValue = this.awardInfoFormGroup.get('awardsDet') as FormArray;
    console.warn("FormArray Create", firstAwardFormArrayValue);
    return
    // this.awardLists = this.LandData.seventhTabList; Check karthick 
        this.awardDetailsArray = this.awardInfoFormGroup.get('awardsDet') as FormArray;
        this.awardLists.forEach((item) => {
          const awardDetailsGroup = this.formBuilder.group({
            award_details_award_amount: [item.award_details_award_amount],
            award_details_date: [item.award_details_date],
            award_details_disbursement_civil_court_deposit: [item.award_details_disbursement_civil_court_deposit],
            award_details_disbursement_direct_payment: [item.award_details_disbursement_direct_payment],
            award_details_disbursement_revenue_deposit: [item.award_details_disbursement_revenue_deposit],
            award_details_extent: [item.award_details_extent],
            award_details_no: [item.award_details_no],
            award_details_notified_person: [item.award_details_notified_person],
            award_details_survey_nos: [item.award_details_survey_nos],
            filename: [item.filename],
            id: [item.id],
            landname: [item.landname],
            pho_extavailable_extent: [item.pho_extavailable_extent],
            pho_extavailable_survey_nos: [item.pho_extavailable_survey_nos],
            pho_extcannot_court_case: [item.pho_extcannot_court_case],
            pho_extcannot_encroachment: [item.pho_extcannot_encroachment],
            pho_extcannot_extent: [item.pho_extcannot_extent],
            pho_extcannot_noc_issued: [item.pho_extcannot_noc_issued],
            pho_extcannot_quashed: [item.pho_extcannot_quashed],
            pho_extcannot_reconveyed: [item.pho_extcannot_reconveyed],
            pho_extcannot_scattered: [item.pho_extcannot_scattered],
            pho_extcannot_survey_nos: [item.pho_extcannot_survey_nos],
            pho_extcannot_wantofapproach: [item.pho_extcannot_wantofapproach],
            pho_extent: [item.pho_extent],
            pho_schimpl_extent: [item.pho_schimpl_extent],
            pho_schimpl_survey_nos: [item.pho_schimpl_survey_nos],
            pnho_court_case: [item.pnho_court_case],
            pnho_encroachment: [item.pnho_encroachment],
            pnho_extent: [item.pnho_extent],
            pnho_quashed: [item.pnho_quashed],
            pnho_survey_nos: [item.pnho_survey_nos],
            pnho_without_encumbrance: [item.pnho_without_encumbrance],


          });
          this.awardDetailsArray.push(awardDetailsGroup);
        });
      
        this.awardLists.forEach((award, index) => {
         
          const awardGroup = this.awardDetailsArray.at(index) as FormGroup;
          console.log('7th Tab',awardGroup); 
          console.log("awardDetailsList[0]",award.awardDetailsList[0]);

          if (award.awardDetailsList[0]) {
            awardGroup.patchValue({
              award_details_award_amount: award.awardDetailsList[0].award_details_award_amount,
              award_details_date: award.awardDetailsList[0].award_details_date,
              award_details_disbursement_civil_court_deposit: award.awardDetailsList[0].award_details_disbursement_civil_court_deposit,
              award_details_disbursement_direct_payment:  award.awardDetailsList[0].award_details_disbursement_direct_payment,
              award_details_disbursement_revenue_deposit:  award.awardDetailsList[0].award_details_disbursement_revenue_deposit,
              award_details_extent:   award.awardDetailsList[0].award_details_extent,
              award_details_no:  award.awardDetailsList[0].award_details_no,
              award_details_notified_person:   award.awardDetailsList[0].award_details_notified_person,
              award_details_survey_nos:   award.awardDetailsList[0].award_details_survey_nos,
              filename:   award.awardDetailsList[0].filename,
              id:   award.awardDetailsList[0].id,
              landname:   award.awardDetailsList[0].landname,
              pho_extavailable_extent:   award.awardDetailsList[0].pho_extavailable_extent,
              pho_extavailable_survey_nos: award.awardDetailsList[0].pho_extavailable_survey_nos,
              pho_extcannot_court_case: award.awardDetailsList[0].pho_extcannot_court_case,
              pho_extcannot_encroachment: award.awardDetailsList[0].pho_extcannot_encroachment,
              pho_extcannot_extent: award.awardDetailsList[0].pho_extcannot_extent,
              pho_extcannot_noc_issued: award.awardDetailsList[0].pho_extcannot_noc_issued,
              pho_extcannot_quashed: award.awardDetailsList[0].pho_extcannot_quashed,
              pho_extcannot_reconveyed:award.awardDetailsList[0].pho_extcannot_reconveyed,
              pho_extcannot_scattered: award.awardDetailsList[0].pho_extcannot_scattered,
              pho_extcannot_survey_nos: award.awardDetailsList[0].pho_extcannot_survey_nos,
              pho_extcannot_wantofapproach: award.awardDetailsList[0].pho_extcannot_wantofapproach,
              pho_extent: award.awardDetailsList[0].pho_extent,
              pho_schimpl_extent:award.awardDetailsList[0].pho_schimpl_extent,
              pho_schimpl_survey_nos: award.awardDetailsList[0].pho_schimpl_survey_nos,
              pnho_court_case:award.awardDetailsList[0].pnho_court_case,
              pnho_encroachment: award.awardDetailsList[0].pnho_encroachment,
              pnho_extent: award.awardDetailsList[0].pnho_extent,
              pnho_quashed: award.awardDetailsList[0].pnho_quashed,
              pnho_survey_nos: award.awardDetailsList[0].pnho_survey_nos,
              pnho_without_encumbrance:award.awardDetailsList[0].pnho_without_encumbrance,
            });
          }
          else{
            console.warn("Award Details List Empty");
          }
         
        });
        this.awardDetailsArray.controls.forEach((control) => {
          control.disable();
        });
  }
  submit() {
    // Final Save
    console.log(this.personalInfoFormGroup.value);
    console.log(this.LPSFormGroup.value)
    console.log(this.FMBFormGroup.value)
    console.log(this.fourOneFormGroup.value)
    console.log(this.sixDDFormGroup.value);
    console.log("seventhTab Values",this.awardInfoFormGroup.value)

    const first = this.personalInfoFormGroup.value;

    console.log("first", first)
    const randomString = this.generateString(5);

    first.uniqueCode = randomString;
    const second = this.LPSFormGroup.value;

    const secArr = second?.expansionPanels;
    console.log("second", secArr);

    const third = this.FMBFormGroup.value;
    const thirdArr = third?.expansionPanelsFMB;
    console.log("thirdArr", thirdArr);

    const four = this.fourOneFormGroup.value;
    const fourthArr = four?.expansionPanels4;
    console.log("thirdArr", fourthArr);


    const five = this.sixDDFormGroup.value;
    const fifththArr = five?.expansionPanelsSix;
    console.log("fifththArr", fifththArr);

    const sixth = [
      {
        "landName": "forth",
        "fileName": "award_1_file",
        "left_4one_6d_extent": "Api Test new Extent",
        "left_4one_6d_survey_nos": "Dummy 4one 6d Survey Nos",
        "left_6d_award_extent": "Dummy 6d Award Extent",
        "left_6d_award_extent_survey_nos": "Dummy 6d Award Extent Survey Nos",
        "left_lps_4one_extent": "Dummy LPS 4one Extent",
        "left_lps_4one_survey_nos": "Dummy LPS Karthiy Nos"
      },
      {
        "landName": "forth",
        "fileName": "award_2_file",
        "left_4one_6d_extent": "Dummy 4one 6d Extent",
        "left_4one_6d_survey_nos": "Dummy 4one 6d Survey Nos",
        "left_6d_award_extent": "Dummy 6d Award Extent",
        "left_6d_award_extent_survey_nos": "Dummy 6d Award Extent Survey Nos",
        "left_lps_4one_extent": "Dummy LPS 4one Extent",
        "left_lps_4one_survey_nos": "Dummy LPS 4one Survey Nos"
      }
    ]

    const seventh = [
      {
        "extent": "extent",
        "fileName": "award_1_file",
        "filePath": "C:\\Users\\Admin\\Desktop\\TNHB\\7523b9f2-810b-42bf-882e-6532f383bb77.pdf",
        "refNo": "",
        "surveyerNo": "",
        "landName": "forth",
        "dynamicValues": [
          {
            "fileId": 1,
            "value": "VALUE 1",
            "columnName": "FIRST COLUMN"
          },
          {
            "fileId": 1,
            "value": "VALUE 2",
            "columnName": "SECOND COLUMN"
          }
        ],
        "awardOtherDetailsEntity": [
          {
            "fileName": "pho_court_file",
            "filePath": "C:\\Users\\Admin\\Desktop\\TNHB\\95b5b886-a9ae-4b9c-b952-dd98b38bdd31.pdf",
            "name": "award_1_file",
            "status": "O.S",
            "landName": "forth"
          }
        ],
        "awardDetailsList": [
          {
            "award_details_award_amount": "100",
            "award_details_date": "10/06/1999",
            "award_details_disbursement_civil_court_deposit": "100000",
            "award_details_disbursement_direct_payment": null,
            "award_details_disbursement_revenue_deposit": "50000",
            "award_details_extent": "19887",
            "award_details_no": "100005",
            "award_details_notified_person": "yazhini",
            "award_details_survey_nos": null,
            "pho_extavailable_extent": "10009993",
            "pho_extavailable_survey_nos": "1989",
            "pho_extcannot_court_case": "100988",
            "pho_extcannot_encroachment": "100000",
            "pho_extcannot_extent": null,
            "pho_extcannot_noc_issued": "100000",
            "pho_extcannot_quashed": "789",
            "pho_extcannot_reconveyed": "6778",
            "pho_extcannot_scattered": "09877",
            "pho_extcannot_survey_nos": null,
            "pho_extcannot_wantofapproach": "214666",
            "pho_extent": "64773",
            "pho_schimpl_extent": "78876",
            "pho_schimpl_survey_nos": "66677",
            "pnho_court_case": "3456",
            "pnho_encroachment": null,
            "pnho_extent": "15637",
            "pnho_quashed": "67y",
            "pnho_survey_nos": "45366",
            "pnho_without_encumbrance": "2556",
            "filename": "award_1_file",
            "landname": "forth"
          }
        ]
      },
      {
        "extent": "",
        "fileName": "award_2_file",
        "filePath": "C:\\Users\\Admin\\Desktop\\TNHB\\7523b9f2-810b-42bf-882e-6532f383bb77.pdf",
        "refNo": "",
        "surveyerNo": "",
        "landName": "forth",
        "dynamicValues": [
          {
            "fileId": 1,
            "value": "VALUE 1",
            "columnName": "FIRST COLUMN"
          },
          {
            "fileId": 1,
            "value": "VALUE 2",
            "columnName": "SECOND COLUMN"
          }
        ],
        "awardOtherDetailsEntity": [
          {
            "fileName": "pho_court_file",
            "filePath": "C:\\Users\\Admin\\Desktop\\TNHB\\95b5b886-a9ae-4b9c-b952-dd98b38bdd31.pdf",
            "name": "award_2_file",
            "status": "O.S",
            "landName": "forth"
          }
        ],
        "awardDetailsList": [
          {
            "award_details_award_amount": "100",
            "award_details_date": "10/06/1999",
            "award_details_disbursement_civil_court_deposit": "100000",
            "award_details_disbursement_direct_payment": null,
            "award_details_disbursement_revenue_deposit": "50000",
            "award_details_extent": "19887",
            "award_details_no": "100005",
            "award_details_notified_person": "yazhini",
            "award_details_survey_nos": null,
            "pho_extavailable_extent": "10009993",
            "pho_extavailable_survey_nos": "1989",
            "pho_extcannot_court_case": "100988",
            "pho_extcannot_encroachment": "100000",
            "pho_extcannot_extent": null,
            "pho_extcannot_noc_issued": "100000",
            "pho_extcannot_quashed": "789",
            "pho_extcannot_reconveyed": "6778",
            "pho_extcannot_scattered": "09877",
            "pho_extcannot_survey_nos": null,
            "pho_extcannot_wantofapproach": "214666",
            "pho_extent": "64773",
            "pho_schimpl_extent": "78876",
            "pho_schimpl_survey_nos": "66677",
            "pnho_court_case": "3456",
            "pnho_encroachment": null,
            "pnho_extent": "15637",
            "pnho_quashed": "67y",
            "pnho_survey_nos": "45366",
            "pnho_without_encumbrance": "2556",
            "filename": "award_2_file",
            "landname": "forth"
          }
        ]
      }
    ]

    const saveBody : FinalSaveLand= {
      firstTabEntity: first,
      secondTabEntity: secArr,
      thirdTabEntity: thirdArr,
      fourthTabEntity: fourthArr,
      fifthTabEntity: fifththArr,
      sixthTabEntity: sixth,
      seventhTabEntity: seventh
    }

    console.warn("Final Save Body",saveBody);
    return;
    this.commonService.apiPostCall(saveBody,'saveLandDetails').subscribe((response=>{
     console.log("response save", response);
    }))
    
   //  this.snackBar.dismiss();
   this.openSnackBar("Saved Succesfully", "Done");

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{duration : 3000});
  };
  
  removeExpansionPanel(index: number, type) {
    if (type === 'lps') {
      this.expansionPanelsArray.removeAt(index);
    } else if (type === 'fmb') {
      this.expansionPanelsArrayFMB.removeAt(index)
    }else if(type === '4(1)'){
      this.expansionPanelsArray4.removeAt(index)
    }else if(type === '6DD'){
      this.expansionPanelsSixDD.removeAt(index) 
    }
  }

  addRepeatedField(expansionPanelIndex: number, type) {
    let expansionPanel;
    let repeatedFieldsArray;
    if (type === 'lps') {
      expansionPanel = this.expansionPanelsArray.at(expansionPanelIndex) as FormGroup;
      repeatedFieldsArray = expansionPanel.get('repeatedFields') as FormArray;
    } else if (type === 'fmb') {
      expansionPanel = this.expansionPanelsArrayFMB.at(expansionPanelIndex) as FormGroup;
      repeatedFieldsArray = expansionPanel.get('repeatedFields') as FormArray;
    }else if(type === '4(1)'){
      expansionPanel = this.expansionPanelsArray4.at(expansionPanelIndex) as FormGroup;
      repeatedFieldsArray = expansionPanel.get('repeatedFields') as FormArray;
    }else if(type === '6DD'){
      expansionPanel = this.expansionPanelsSixDD.at(expansionPanelIndex) as FormGroup;
      repeatedFieldsArray = expansionPanel.get('repeatedFields') as FormArray;
    }
    const repeatedField = this.formBuilder.group({
      field1: [''],
      field2: ['']
    });

    repeatedFieldsArray.push(repeatedField);
  }

  removeRepeatedField(expansionPanelIndex: number, repeatedFieldIndex: number, type) {
    let expansionPanel;
    let repeatedFieldsArray;
    if (type === 'lps') {
      expansionPanel = this.expansionPanelsArray.at(expansionPanelIndex) as FormGroup;
      repeatedFieldsArray = expansionPanel.get('repeatedFields') as FormArray;
    } else if (type === 'fmb') {
      expansionPanel = this.expansionPanelsArrayFMB.at(expansionPanelIndex) as FormGroup;
      repeatedFieldsArray = expansionPanel.get('repeatedFields') as FormArray;
    }else if (type === '4(1)') {
      expansionPanel = this.expansionPanelsArray4.at(expansionPanelIndex) as FormGroup;
      repeatedFieldsArray = expansionPanel.get('repeatedFields') as FormArray;
    }else if (type === '6DD') {
      expansionPanel = this.expansionPanelsSixDD.at(expansionPanelIndex) as FormGroup;
      repeatedFieldsArray = expansionPanel.get('repeatedFields') as FormArray;
    }

    repeatedFieldsArray.removeAt(repeatedFieldIndex);
  }
  panelOpenState = false;   // mat expansion panel in Lps

  // Lps input field - start
  lpsFields: any[] = [];

  addLpsField() {
    const newLpsField = 'New Lps Field';
    this.lpsFields.push(newLpsField);
  }

  removeLpsField(index: number) {
    this.lpsFields.splice(index, 1);
  }
  // Lps input field - end

  // Lps form addition - start
  lpsForms: any[] = [];

  addLpsForm() {
    const newLpsIndex = this.lpsForms.length + 2;
    const newLpsForm = { index: newLpsIndex, value: '' };
    this.lpsForms.push(newLpsForm);
  }

  lpsFields2: any[] = [];

  addLpsField2() {
    const newLpsField2 = 'New Lps Field2';
    this.lpsFields2.push(newLpsField2);
  }

  removeLpsField2(index: number) {
    this.lpsFields2.splice(index, 1);
  }
  // Lps form addition - end


  // Fmb input field - start
  fmbFields: any[] = [];

  addFmbField() {
    const newFmbField = 'New Fmb Field';
    this.fmbFields.push(newFmbField);
  }

  removeFmbField(index: number) {
    this.fmbFields.splice(index, 1);
  }
  // Fmb input field - end

  // Fmb form addition - start
  fmbForms: any[] = [];

  addFmbForm() {
    const newFmbIndex = this.fmbForms.length + 2;
    const newFmbForm = { index: newFmbIndex, value: '' };
    this.fmbForms.push(newFmbForm);
  }

  fmbFields2: any[] = [];

  addFmbField2() {
    const newFmbField2 = 'New Fmb Field2';
    this.fmbFields2.push(newFmbField2);
  }

  removeFmbField2(index: number) {
    this.fmbFields2.splice(index, 1);
  }
  // Fmb form addition - end

  // Four input field - start
  fourFields: any[] = [];

  addFourField() {
    const newFourField = 'New Four Field';
    this.fourFields.push(newFourField);
  }

  removeFourField(index: number) {
    this.fourFields.splice(index, 1);
  }
  // Four input field - end

  // Four form addition - start
  fourForms: any[] = [];

  addFourForm() {
    const newFourIndex = this.fourForms.length + 2;
    const newFourForm = { index: newFourIndex, value: '' };
    this.fourForms.push(newFourForm);
  }

  fourFields2: any[] = [];

  addFourField2() {
    const newFourField2 = 'New Four Field2';
    this.fourFields2.push(newFourField2);
  }

  removeFourField2(index: number) {
    this.fourFields2.splice(index, 1);
  }
  // Four form addition - end


  // Dd input field - start
  ddFields: any[] = [];

  addDdField() {
    const newDdField = 'New Dd Field';
    this.ddFields.push(newDdField);
  }

  removeDdField(index: number) {
    this.ddFields.splice(index, 1);
  }
  // Dd input field - end

  // Dd form addition - start
  ddForms: any[] = [];

  addDdForm() {
    const newDdIndex = this.ddForms.length + 2;
    const newDdForm = { index: newDdIndex, value: '' };
    this.ddForms.push(newDdForm);
  }

  ddFields2: any[] = [];

  addDdField2() {
    const newDdField2 = 'New Dd Field2';
    this.ddFields2.push(newDdField2);
  }

  removeDdField2(index: number) {
    this.ddFields2.splice(index, 1);
  }
  // Dd form addition - end


  //left over add-start
  leftForms1: string[] = [];
  leftForms2: string[] = [];
  leftForms3: string[] = [];

  addLeftForm1() {
    const newLeftForm1 = 'New Left Form1';
    this.leftForms1.push(newLeftForm1);
  }

  addLeftForm2() {
    const newLeftForm2 = 'New Left Form2';
    this.leftForms2.push(newLeftForm2);
  }

  addLeftForm3() {
    const newLeftForm3 = 'New Left Form3';
    this.leftForms3.push(newLeftForm3);
  }
  //left over add-end

  //left over remove-start
  removeLeftForm1(index: number) {
    this.leftForms1.splice(index, 1);
  }

  removeLeftForm2(index: number) {
    this.leftForms2.splice(index, 1);
  }

  removeLeftForm3(index: number) {
    this.leftForms3.splice(index, 1);
  }
  //left over remove-end

}
