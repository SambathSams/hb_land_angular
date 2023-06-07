import { Component, OnInit } from '@angular/core';
import { LanddataService } from '../services/landdata.service';
import * as _ from 'lodash';
import { filter, reduce } from 'lodash';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  alldata : any[] = [];
  countdata : any[] = [];
  totalcountsingle! : number;
  message = '';
  filteredData: any[] = [];
  excelData: any[] = [];
  searchText: string = '';
  legalProceedingsFilter: string = '';
  statusFilter: string = '';
  currentPage = 1; // current page number
  itemsPerPage = 10; // number of items to be displayed per page
  totalItems = this.alldata.length; // total number of items
  totalPages = Math.ceil(this.totalItems / this.itemsPerPage); // total number of pages
  transform(items: any[], options: any): any[] {
    const { itemsPerPage, currentPage } = options;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  }

  constructor(private landdataService: LanddataService) { }

  ngOnInit(): void {


    this.landdataService.getDataforDivcircity().subscribe(data => {
      this.alldata = [...data];
      this.alldata.sort((a, b) => a.unique_code - b.unique_code);
    });
    this.landdataService.getCountDataforDivcircity().subscribe(data => {
      this.countdata = data;
      this.totalcountsingle = reduce(this.countdata, (sum, obj) => sum + parseInt(obj.totalcount, 10), 0);

    });



  }




  searchfilterData() {
    const searchText = this.searchText?.toLowerCase();
    console.log(this.searchText)
    this.filteredData = this.alldata.filter((data: any) => {
      return (
        (data.unique_code && data.unique_code.toLowerCase().includes(searchText)) ||
        (data.land_name && data.land_name.toLowerCase().includes(searchText)) ||
        (data.citynrural && data.citynrural.toLowerCase().includes(searchText)) ||
        (data.division && data.division.toLowerCase().includes(searchText)) ||
        (data.total_extent_land_acquired && data.total_extent_land_acquired.toLowerCase().includes(searchText)) ||
        (data.extent && data.extent.toLowerCase().includes(searchText)) ||
        (data.not_handed_over_extent && data.not_handed_over_extent.toLowerCase().includes(searchText)) ||
        (data.legalproceedings && data.legalproceedings.toLowerCase().includes(searchText))

      );
    });
  }




 get filterData() {
    if (this.legalProceedingsFilter || this.statusFilter) {
      return this.alldata.filter(data => {
        if (this.legalProceedingsFilter && data.legalproceedings !== this.legalProceedingsFilter) {
          return false;
        }
        if (this.statusFilter && data.status !== this.statusFilter) {
          return false;
        }
        return true;
      });
    } else {
      return this.alldata;
    }
  }

  Delete(id: number): void {

    if (window.confirm('Are you sure  to delete this data ?')) {
      this.landdataService.deletebyid(id)
        .subscribe(
          () => {
            alert('This data was deleted successfully!');
            window.location.reload()
          },

          error => {
            console.log(error);
          });
    }
}

exportExcel() {

  this.excelData = this.alldata.map(item => ({


    unique_code : item.unique_code,
    land_name : item.land_name,
    citynrural : item.citynrural,
    division : item.division,
    total_extent_land_acquired : item.total_extent_land_acquired,
    extent : item.extent,
    not_handed_over_extent : item.not_handed_over_extent,
    legalproceedings : item.legalproceedings


  }));

  const worksheet = XLSX.utils.json_to_sheet(this.excelData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  FileSaver.saveAs(data, 'TableData.xlsx');
}




}
