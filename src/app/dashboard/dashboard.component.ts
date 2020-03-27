import { Component, OnInit } from '@angular/core';
import { ReportData2D } from '../domain/report-data-2D';
import { ReportData2DLine } from '../domain/report-data-2D-line';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {MessageService} from '../services/message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  reports: ReportData2D[];
  displayedColumns: String[] = ['xCoordinate', 'yCoordinate'];
  columnHeaders: String[] = ["", ""];

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
    
   }

  ngOnInit() {

    this.getReports();
    
  }

  getReports(): void {

    console.log("Getting reports...");
    this.http.get<ReportData2D[]>(environment.apiUrl + '/execute-reports').subscribe(
      data => {
        console.log("Data from server: " + data.values.length + " report line(s).");
        this.reports = data;
    },
    error => {
      console.log("Could not get reports, check if feeder is up.");
      this.messageService.add("HTTP error while fetching reports; check if feeder is up.");
    }
   );
  }

}
