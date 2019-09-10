import { Component, OnInit } from '@angular/core';
import { Report } from '../domain/report';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../services/message.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FormControl } from '@angular/forms';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent implements OnInit {

  report: Report;
  operation: String;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) { }


  ngOnInit(): void {

    const id = +this.route.snapshot.paramMap.get('id');
    if (id == -1) {
      this.operation = "New Report » ";
      this.report = new Report();
      this.report.id = null;
      this.report.name = "";
      this.report.description = "";

    } else {
      this.operation = "Edit Report » ";
      this.getReport();
    }
  }

  getReport(): void {

    const id = +this.route.snapshot.paramMap.get('id');
    console.log("Getting report with id: " + id);

    this.http.get<Report>(environment.apiUrl + '/get-report?id=' + id).subscribe(
      data => {

        console.log("Data from the server: " + data.name + " | " + data.description);
        this.report = data;
      },
      error => {
        console.log("Could not get report, check if feeder is up.");
        this.messageService.add(`ReportService: HTTP error while fetching report; check if feeder is up.`);
      }
    );
  }

  saveReport(): void {

    this.http.post<Report>(environment.apiUrl + '/edit-report', this.report, httpOptions).subscribe(
      data => {
        console.log("Data from serve: " + data.name);
        this.report = data;
        console.log("Posted report with id: " + this.report.id);
        this.router.navigateByUrl("/analyze");
      },
      error => {
        console.log("Could not post report, check if feeder is up.");
        this.messageService.add(`ReportService: HTTP error while fetching report; check if feeder is up.`);
      }
    );
  }

  goHome(): void {

    this.router.navigateByUrl("/dashboard");
  }

  goBack(): void {

    this.router.navigateByUrl("/analyze");
  }
}
