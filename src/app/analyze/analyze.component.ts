import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MessageService} from '../services/message.service';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Report } from '../domain/report';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.css']
})
export class AnalyzeComponent implements OnInit {

  reports: Report[];  

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private location: Location,
    private router: Router,
    private toastr: ToastrService

  ) { }

  ngOnInit() {
    this.getReports();
  }

  goHome(): void {

    this.router.navigateByUrl("/dashboard");
  }

  createReport(): void {
    this.router.navigateByUrl("/edit-report/17");
  }

  editReport(): void {
    this.router.navigateByUrl("/edit-report/17");
  }

  getReports(): void {
    console.log("Getting reports from " + environment.apiUrl + '/get-all-reports');
    this.http.get<Report[]>(environment.apiUrl + '/get-all-reports').subscribe(
      data => {
        console.log("Data from server: " + data.length + " report(s).");
        this.reports = data;
    },
    error => {
      console.log("Could not get reports, check if feeder is up.");
      this.messageService.add("ReportComponent: HTTP error while fetching reports; check if feeder is up.");
    }
   );
  }  
}
