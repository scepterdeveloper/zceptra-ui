import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MessageService} from '../services/message.service';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ReportData2D } from '../domain/report-data-2D';
import { ReportData2DLine } from '../domain/report-data-2D-line';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.css']
})
export class ReportViewComponent implements OnInit {

  reportData: ReportData2D;
  dataSource: ReportData2DLine[];
  displayedColumns: String[] = ['xCoordinate', 'yCoordinate'];
  columnHeaders: String[] = ["", ""];

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService    
  ) { }

  ngOnInit() {

    this.getReportData();
    
  }

  goBack(): void {
    this.location.back();
  }

  goHome(): void {
    this.router.navigateByUrl("/dashboard");
  }

  exportPDF(): void {
    console.log("PDF Export - Not Implemented");
  }  

  getReportData(): void {

    const id = +this.route.snapshot.paramMap.get('id');
    console.log("Getting reports from " + environment.apiUrl + '/execute-report?reportId=' + id);
    this.http.get<ReportData2D>(environment.apiUrl + '/execute-report?reportId=' + id).subscribe(
      data => {
        console.log("Data from server: " + data.values.length + " report line(s).");
        this.reportData = data;
        this.columnHeaders = [data.xCoordinateLabel, data.yCoordinateLabel];
        this.dataSource = data.values;
        console.log(JSON.stringify(this.dataSource));
    },
    error => {
      console.log("Could not get report data, check if feeder is up.");
      this.messageService.add("ReportViewComponent: HTTP error while fetching report data; check if feeder is up.");
    }
   );
  }    
}
