import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanddataService } from '../landdata.service';

export interface FinalSaveLand {
  firstTabEntity: FirstTabEntity
  secondTabEntity: SecondTabEntity[]
  thirdTabEntity: ThirdTabEntity[]
  fourthTabEntity: FourthTabEntity[]
  fifthTabEntity: FifthTabEntity[]
  sixthTabEntity: SixthTabEntity[]
  seventhTabEntity: SeventhTabEntity[]
}

export interface FirstTabEntity {
  village: string
  circle: string
  citynrural: string
  division: string
  geoTaggingGeoFencing: string
  landName: string
  uniqueCode: string
}

export interface SecondTabEntity {
  extent: string
  filename: string
  filePath: string
  refNo: string
  surveyNo: string
  landname: string
  dynamicValues: DynamicValue[]
}

export interface DynamicValue {
  fileId: number
  value: string
  columnName: string
}

export interface ThirdTabEntity {
  extent: string
  filename: string
  filePath: string
  refNo: string
  surveyNo: string
  landname: string
  dynamicValues: any[]
}

export interface FourthTabEntity {
  extent: string
  filename: string
  filePath: string
  refNo: string
  surveyNo: string
  landname: string
  dynamicValues: any[]
}

export interface FifthTabEntity {
  extent: string
  filename: string
  filePath: string
  refNo: string
  surveyNo: string
  landname: string
  dynamicValues: any[]
}

export interface SixthTabEntity {
  landName: string
  fileName: string
  left_4one_6d_extent: string
  left_4one_6d_survey_nos: string
  left_6d_award_extent: string
  left_6d_award_extent_survey_nos: string
  left_lps_4one_extent: string
  left_lps_4one_survey_nos: string
}

export interface SeventhTabEntity {
  extent: string
  fileName: string
  filePath: string
  refNo: string
  surveyerNo: string
  landName: string
  dynamicValues: DynamicValue2[]
  awardOtherDetailsEntity: AwardOtherDetailsEntity[]
  awardDetailsList: AwardDetailsList[]
}

export interface DynamicValue2 {
  fileId: number
  value: string
  columnName: string
}

export interface AwardOtherDetailsEntity {
  fileName: string
  filePath: string
  name: string
  status: string
  landName: string
}

export interface AwardDetailsList {
  award_details_award_amount: string
  award_details_date: string
  award_details_disbursement_civil_court_deposit: string
  award_details_disbursement_direct_payment: any
  award_details_disbursement_revenue_deposit: string
  award_details_extent: string
  award_details_no: string
  award_details_notified_person: string
  award_details_survey_nos: any
  pho_extavailable_extent: string
  pho_extavailable_survey_nos: string
  pho_extcannot_court_case: string
  pho_extcannot_encroachment: string
  pho_extcannot_extent: any
  pho_extcannot_noc_issued: string
  pho_extcannot_quashed: string
  pho_extcannot_reconveyed: string
  pho_extcannot_scattered: string
  pho_extcannot_survey_nos: any
  pho_extcannot_wantofapproach: string
  pho_extent: string
  pho_schimpl_extent: string
  pho_schimpl_survey_nos: string
  pnho_court_case: string
  pnho_encroachment: any
  pnho_extent: string
  pnho_quashed: string
  pnho_survey_nos: string
  pnho_without_encumbrance: string
  filename: string
  landname: string
}

@Component({
  selector: 'app-editland',
  templateUrl: './editland.component.html',
  styleUrls: ['./editland.component.css']
})
export class EditlandComponent implements OnInit {

  message = "";
  filepathLayoutFlat = "";
  filepathLayoutPlot = "";
  filepathLayoutHouse = "";
  // filepathLayoutEmpty = "";
  filepathApprovalFlat = "";
  filepathApprovalPlot = "";
  filepathApprovalHouse = "";
  // filepathApprovalEmpty = "";
  filepathCourt = "";

  updateStatusLayoutFlat: string | null = null;
  updateErrorLayoutFlat: string | null = null;
  fileTooLargeLayoutFlat: boolean | null = null;
  fileInvalidTypeLayoutFlat: boolean | null = null;
  fileToUpdateLayoutFlat!: File  ;

  updateStatusLayoutPlot: string | null = null;
  updateErrorLayoutPlot: string | null = null;
  fileTooLargeLayoutPlot: boolean | null = null;
  fileInvalidTypeLayoutPlot: boolean | null = null;
  fileToUpdateLayoutPlot!: File  ;

  updateStatusLayoutHouse: string | null = null;
  updateErrorLayoutHouse: string | null = null;
  fileTooLargeLayoutHouse: boolean | null = null;
  fileInvalidTypeLayoutHouse: boolean | null = null;
  fileToUpdateLayoutHouse!: File  ;

  // updateStatusLayoutEmpty: string | null = null;
  // updateErrorLayoutEmpty: string | null = null;
  // fileTooLargeLayoutEmpty: boolean | null = null;
  // fileInvalidTypeLayoutEmpty: boolean | null = null;
  // fileToUpdateLayoutEmpty!: File  ;


  updateStatusApprovalFlat: string | null = null;
  updateErrorApprovalFlat: string | null = null;
  fileTooLargeApprovalFlat: boolean | null = null;
  fileInvalidTypeApprovalFlat: boolean | null = null;
  fileToUpdateApprovalFlat!: File  ;

  updateStatusApprovalPlot: string | null = null;
  updateErrorApprovalPlot: string | null = null;
  fileTooLargeApprovalPlot: boolean | null = null;
  fileInvalidTypeApprovalPlot: boolean | null = null;
  fileToUpdateApprovalPlot!: File  ;

  updateStatusApprovalHouse: string | null = null;
  updateErrorApprovalHouse: string | null = null;
  fileTooLargeApprovalHouse: boolean | null = null;
  fileInvalidTypeApprovalHouse: boolean | null = null;
  fileToUpdateApprovalHouse!: File  ;

  // updateStatusApprovalEmpty: string | null = null;
  // updateErrorApprovalEmpty: string | null = null;
  // fileTooLargeApprovalEmpty: boolean | null = null;
  // fileInvalidTypeApprovalEmpty: boolean | null = null;
  // fileToUpdateApprovalEmpty!: File  ;

  updateStatusCourt: string | null = null;
  updateErrorCourt: string | null = null;
  fileTooLargeCourt: boolean | null = null;
  fileInvalidTypeCourt: boolean | null = null;
  fileToUpdateCourt!: File  ;

  onFileSelectedLayoutFlat(event: Event) {
    const input = (event.target as HTMLInputElement);

    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file) {

      if (file.size > 10000000) { // 10MB in bytes
        this.fileTooLargeLayoutFlat = true;
        this.updateStatusLayoutFlat = null;
        this.updateErrorLayoutFlat = null;
        this.fileInvalidTypeLayoutFlat = null;
        return;
      }

      if (file.type !== 'application/pdf') {
        this.fileInvalidTypeLayoutFlat = true;
        this.updateStatusLayoutFlat = null;
        this.updateErrorLayoutFlat = null;
        return;
      }

      this.fileToUpdateLayoutFlat = file;
      this.fileTooLargeLayoutFlat = false;
      this.fileInvalidTypeLayoutFlat = false;
    }
  }
  }
  onFileSelectedLayoutPlot(event: Event) {
    const input = (event.target as HTMLInputElement);

    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file) {

      if (file.size > 10000000) { // 10MB in bytes
        this.fileTooLargeLayoutPlot = true;
        this.updateStatusLayoutPlot = null;
        this.updateErrorLayoutPlot = null;
        this.fileInvalidTypeLayoutPlot = null;
        return;
      }

      if (file.type !== 'application/pdf') {
        this.fileInvalidTypeLayoutPlot = true;
        this.updateStatusLayoutPlot = null;
        this.updateErrorLayoutPlot = null;
        return;
      }

      this.fileToUpdateLayoutPlot = file;
      this.fileTooLargeLayoutPlot = false;
      this.fileInvalidTypeLayoutPlot = false;
    }
  }
  }
  onFileSelectedLayoutHouse(event: Event) {
    const input = (event.target as HTMLInputElement);

    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file) {

      if (file.size > 10000000) { // 10MB in bytes
        this.fileTooLargeLayoutHouse = true;
        this.updateStatusLayoutHouse = null;
        this.updateErrorLayoutHouse = null;
        this.fileInvalidTypeLayoutHouse = null;
        return;
      }

      if (file.type !== 'application/pdf') {
        this.fileInvalidTypeLayoutHouse = true;
        this.updateStatusLayoutHouse = null;
        this.updateErrorLayoutHouse = null;
        return;
      }

      this.fileToUpdateLayoutHouse = file;
      this.fileTooLargeLayoutHouse = false;
      this.fileInvalidTypeLayoutHouse = false;
    }
  }
  }
  // onFileSelectedLayoutEmpty(event: Event) {
  //   const input = (event.target as HTMLInputElement);

  //   if (input && input.files && input.files.length > 0) {
  //     const file = input.files[0];
  //     if (file) {

  //     if (file.size > 10000000) { // 10MB in bytes
  //       this.fileTooLargeLayoutEmpty = true;
  //       this.updateStatusLayoutEmpty = null;
  //       this.updateErrorLayoutEmpty = null;
  //       this.fileInvalidTypeLayoutEmpty = null;
  //       return;
  //     }

  //     if (file.type !== 'application/pdf') {
  //       this.fileInvalidTypeLayoutEmpty = true;
  //       this.updateStatusLayoutEmpty = null;
  //       this.updateErrorLayoutEmpty = null;
  //       return;
  //     }

  //     this.fileToUpdateLayoutEmpty = file;
  //     this.fileTooLargeLayoutEmpty = false;
  //     this.fileInvalidTypeLayoutEmpty = false;
  //   }
  // }
  // }

  onFileSelectedApprovalFlat(event: Event) {
    const input = (event.target as HTMLInputElement);

    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file) {

      if (file.size > 10000000) { // 10MB in bytes
        this.fileTooLargeApprovalFlat = true;
        this.updateStatusApprovalFlat = null;
        this.updateErrorApprovalFlat = null;
        this.fileInvalidTypeApprovalFlat = null;
        return;
      }

      if (file.type !== 'application/pdf') {
        this.fileInvalidTypeApprovalFlat = true;
        this.updateStatusApprovalFlat = null;
        this.updateErrorApprovalFlat = null;

         return;
      }

      this.fileToUpdateApprovalFlat = file;
      this.fileTooLargeApprovalFlat = false;
      this.fileInvalidTypeApprovalFlat = false;
    }
  }
  }
  onFileSelectedApprovalPlot(event: Event) {
    const input = (event.target as HTMLInputElement);

    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file) {

      if (file.size > 10000000) { // 10MB in bytes
        this.fileTooLargeApprovalPlot = true;
        this.updateStatusApprovalPlot = null;
        this.updateErrorApprovalPlot = null;
        this.fileInvalidTypeApprovalPlot = null;
        return;
      }

      if (file.type !== 'application/pdf') {
        this.fileInvalidTypeApprovalPlot = true;
        this.updateStatusApprovalPlot = null;
        this.updateErrorApprovalPlot = null;

         return;
      }

      this.fileToUpdateApprovalPlot = file;
      this.fileTooLargeApprovalPlot = false;
      this.fileInvalidTypeApprovalPlot = false;
    }
  }
  }
  onFileSelectedApprovalHouse(event: Event) {
    const input = (event.target as HTMLInputElement);

    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file) {

      if (file.size > 10000000) { // 10MB in bytes
        this.fileTooLargeApprovalHouse = true;
        this.updateStatusApprovalHouse = null;
        this.updateErrorApprovalHouse = null;
        this.fileInvalidTypeApprovalHouse = null;
        return;
      }

      if (file.type !== 'application/pdf') {
        this.fileInvalidTypeApprovalHouse = true;
        this.updateStatusApprovalHouse = null;
        this.updateErrorApprovalHouse = null;

         return;
      }

      this.fileToUpdateApprovalHouse = file;
      this.fileTooLargeApprovalHouse = false;
      this.fileInvalidTypeApprovalHouse = false;
    }
  }
  }
  // onFileSelectedApprovalEmpty(event: Event) {
  //   const input = (event.target as HTMLInputElement);

  //   if (input && input.files && input.files.length > 0) {
  //     const file = input.files[0];
  //     if (file) {

  //     if (file.size > 10000000) { // 10MB in bytes
  //       this.fileTooLargeApproval = true;
  //       this.updateStatusApproval = null;
  //       this.updateErrorApproval = null;
  //       this.fileInvalidTypeApproval = null;
  //       return;
  //     }

  //     if (file.type !== 'application/pdf') {
  //       this.fileInvalidTypeApproval = true;
  //       this.updateStatusApproval = null;
  //       this.updateErrorApproval = null;

  //        return;
  //     }

  //     this.fileToUpdateApproval = file;
  //     this.fileTooLargeApproval = false;
  //     this.fileInvalidTypeApproval = false;
  //   }
  // }
  // }

  onFileSelectedCourt(event: Event) {
    const input = (event.target as HTMLInputElement);

    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file) {

      if (file.size > 10000000) { // 10MB in bytes
        this.fileTooLargeCourt = true;
        this.updateStatusCourt = null;
        this.updateErrorCourt = null;
        this.fileInvalidTypeCourt = null;
        return;
      }

      if (file.type !== 'application/pdf') {
        this.fileInvalidTypeCourt = true;
        this.updateStatusCourt = null;
        this.updateErrorCourt = null;

         return;
      }

      this.fileToUpdateCourt = file;
      this.fileTooLargeCourt = false;
      this.fileInvalidTypeCourt = false;
    }
  }
  }


  datasingle !: {

    id : '';

    division: '';

     circle : ' ' ;

     citynrural : '';

     land_name: ' ' ;

     unique_code: ' ' ;

     acquired_by : ' ' ;

     possession_status : ' ' ;

     exclusion_reconveyance_noc : '';

     extent_utilized_flat: ' ' ;

     extent_utilized_plot: ' ' ;

     extent_utilized_house: ' ' ;

     total_extent_land_acquired: ' ' ;

     extent: ' ' ;

     extent_covered_by_court_case: ' ' ;

     extent_lying_vacant: ' ' ;

     extent_covered_by_encroachment: ' ' ;

     extent_covered_under_scattered: ' ' ;

     extent_covered_lapsed_quashed: ' ' ;

     land_available_for_scheme_implementation: ' ' ;

     geo_tagging_geo_fencing: ' ' ;

     status : '' ;

     not_handed_over_extent: ' ' ;

     not_handed_over_extent_covered_by_court_case: ' ' ;

     not_handed_over_extent_covered_under_encroachment: ' ' ;

     not_handed_over_extent_covered_quashed: ' ' ;

     legalproceedings : ' ' ;

     extent_utilized_for_Scheme: ' ' ;

     extent_not_utilized: ' ' ;
  }



  constructor(private landdataService: LanddataService,private route: ActivatedRoute,private http: HttpClient) { }

  ngOnInit(): void {
    this.viewdata(this.route.snapshot.paramMap.get('id')!);
  }

  viewdata(id: string): void {
    this.landdataService.getdatabyid(id).subscribe(data =>
      {
        this.datasingle = data;

        this.landdataService.getfilebyname(this.datasingle.land_name + '_layoutfileFlat').subscribe(data =>
          {
            this.filepathLayoutFlat = data.filepath
            },
            error => {
              console.log(error.message);
            });

            this.landdataService.getfilebyname(this.datasingle.land_name + '_layoutfilePlot').subscribe(data =>
              {
                this.filepathLayoutPlot = data.filepath
                },
                error => {
                  console.log(error.message);
                });

                this.landdataService.getfilebyname(this.datasingle.land_name + '_layoutfileHouse').subscribe(data =>
                  {
                    this.filepathLayoutHouse = data.filepath
                    },
                    error => {
                      console.log(error.message);
                    });
        this.landdataService.getfilebyname(this.datasingle.land_name + '_approvalfileFlat').subscribe(data =>
            {
              this.filepathApprovalFlat = data.filepath
            },
            error => {
              console.log(error.message);
            });
            this.landdataService.getfilebyname(this.datasingle.land_name + '_approvalfilePlot').subscribe(data =>
              {
                this.filepathApprovalPlot = data.filepath
              },
              error => {
                console.log(error.message);
              });
              this.landdataService.getfilebyname(this.datasingle.land_name + '_approvalfileHouse').subscribe(data =>
                {
                  this.filepathApprovalHouse = data.filepath
                },
                error => {
                  console.log(error.message);
                });
        this.landdataService.getfilebyname(this.datasingle.land_name + '_courtfile').subscribe(data =>
              {
                this.filepathCourt = data.filepath
              },
              error => {
                console.log(error.message);
              });
        },
        error => {
          console.log(error);
        });
  }

  UpdateLayoutFlat(){
    this.landdataService.updatefilebyname(this.datasingle.land_name + '_layoutfileFlat',this.fileToUpdateLayoutFlat).subscribe((response: HttpResponse<any>)=>
      {
      this.updateStatusLayoutFlat = 'File uploaded successfully';
      this.updateErrorLayoutFlat = null;
      this.fileTooLargeLayoutFlat = null;
      this.fileInvalidTypeLayoutFlat = null;
      window.location.reload();
        },
        error => {
          console.log(error.message);
        });
      }

  UpdateLayoutPlot(){
      this.landdataService.updatefilebyname(this.datasingle.land_name + '_layoutfilePlot',this.fileToUpdateLayoutPlot).subscribe((response: HttpResponse<any>)=>
          {
          this.updateStatusLayoutPlot = 'File uploaded successfully';
          this.updateErrorLayoutPlot = null;
          this.fileTooLargeLayoutPlot = null;
          this.fileInvalidTypeLayoutPlot = null;
          window.location.reload();
            },
            error => {
              console.log(error.message);
            });
          }
    UpdateLayoutHouse(){
         this.landdataService.updatefilebyname(this.datasingle.land_name + '_layoutfileHouse',this.fileToUpdateLayoutHouse).subscribe((response: HttpResponse<any>)=>
              {
              this.updateStatusLayoutHouse = 'File uploaded successfully';
              this.updateErrorLayoutHouse = null;
              this.fileTooLargeLayoutHouse = null;
              this.fileInvalidTypeLayoutHouse = null;
              window.location.reload();
                },
                error => {
                  console.log(error.message);
                });
              }
    // UpdateLayoutEmpty(){
    //       this.landdataService.updatefilebyname(this.datasingle.land_name + '_layoutfile',this.fileToUpdateLayout).subscribe((response: HttpResponse<any>)=>
    //               {
    //               this.updateStatusLayout = 'File uploaded successfully';
    //               this.updateErrorLayout = null;
    //               this.fileTooLargeLayout = null;
    //               this.fileInvalidTypeLayout = null;
    //               window.location.reload();
    //                 },
    //                 error => {
    //                   console.log(error.message);
    //                 });
    //               }

  UpdateApprovalFlat(){

    this.landdataService.updatefilebyname(this.datasingle.land_name + '_approvalfileFlat',this.fileToUpdateApprovalFlat).subscribe((response: HttpResponse<any>)=> {

      this.updateStatusApprovalFlat = 'File uploaded successfully';
      this.updateErrorApprovalFlat = null;
      this.fileTooLargeApprovalFlat = null;
      this.fileInvalidTypeApprovalFlat = null;
      window.location.reload();

    },
    (error) => {
      console.log(error.message);
    }
  );
  }

  UpdateApprovalPlot(){

    this.landdataService.updatefilebyname(this.datasingle.land_name + '_approvalfilePlot',this.fileToUpdateApprovalPlot).subscribe((response: HttpResponse<any>)=> {

      this.updateStatusApprovalPlot = 'File uploaded successfully';
      this.updateErrorApprovalPlot = null;
      this.fileTooLargeApprovalPlot = null;
      this.fileInvalidTypeApprovalPlot = null;
      window.location.reload();

    },
    (error) => {
      console.log(error.message);
    }
  );
  }
  UpdateApprovalHouse(){

    this.landdataService.updatefilebyname(this.datasingle.land_name + '_approvalfileHouse',this.fileToUpdateApprovalHouse).subscribe((response: HttpResponse<any>)=> {

      this.updateStatusApprovalHouse = 'File uploaded successfully';
      this.updateErrorApprovalHouse = null;
      this.fileTooLargeApprovalHouse = null;
      this.fileInvalidTypeApprovalHouse = null;
      window.location.reload();

    },
    (error) => {
      console.log(error.message);
    }
  );
  }
  // UpdateApprovalEmpty(){

  //   this.landdataService.updatefilebyname(this.datasingle.land_name + '_approvalfile',this.fileToUpdateApproval).subscribe((response: HttpResponse<any>)=> {

  //     this.updateStatusApproval = 'File uploaded successfully';
  //     this.updateErrorApproval = null;
  //     this.fileTooLargeApproval = null;
  //     this.fileInvalidTypeApproval = null;
  //     window.location.reload();

  //   },
  //   (error) => {
  //     console.log(error.message);
  //   }
  // );
  // }
  UpdateCourt(){

    this.landdataService.mergefilebyname(this.datasingle.land_name + '_courtfile',this.fileToUpdateCourt).subscribe((response: HttpResponse<any>)=> {

      this.updateStatusCourt = 'File uploaded successfully';
      this.updateErrorCourt = null;
      this.fileTooLargeCourt = null;
      this.fileInvalidTypeCourt = null;
      window.location.reload();

    },
    (error) => {
      console.log(error.message);
    }
  );
  }

  updateData(): void {
    this.message = '';

    this.landdataService.updatebyid(this.datasingle.id, this.datasingle)
      .subscribe(
        () => {
          alert('This data was updated successfully!');
          window.location.reload()
        },
        error => {
          console.log(error);
        });
  }

}
