import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { fetchSetup } from '@devexpress/analytics-core/analytics-utils';
import { DxReportViewerComponent } from 'devexpress-reporting-angular';
import { ActionId } from 'devexpress-reporting/dx-webdocumentviewer';
import { environment } from 'src/environments/environment';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-party-wise-comm-hamali',
  templateUrl: './party-wise-comm-hamali.component.html',
  styleUrls: ['./party-wise-comm-hamali.component.scss']
})
export class PartyWiseCommHamaliComponent {
  constructor(private http: HttpClient) {}
  startDate: any;
  endDate: any;
  onchangeValue: string = "All";
  ngOnInit(): void {
    const currentDate = new Date();
    this.startDate = this.formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1));
    this.endDate = this.formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0));
    $("#startDate").val(this.startDate);
    $("#endDate").val(this.endDate);
    // Additional initialization logic can be added here
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
    // return `2022-04-01`;
  }

  title = 'DXReportDesignerSample';
  // If you use the ASP.NET Core backend:
  getDesignerModelAction = "/DXXRD/GetDesignerModel";
  // The report name.
  reportName = "PartyWiseCommHamali" + "&StartDate=" + this.formatDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1)) + "&EndDate=" + this.formatDate(new Date(new Date().getFullYear(), new Date().getMonth()+ 1, 0)) + "&companyidrecord=" + sessionStorage.getItem('companyID') + "&vochtype1=0&vochtype1=99";
  // The backend application URL.
  host = environment.Reportingapi;
  yearSelection!: FormGroup
  currentYear!: number

  @ViewChild(DxReportViewerComponent, { static: false }) viewer: DxReportViewerComponent;
  reportUrl: string = "PartyWiseCommHamali";
  // The built-in controller in the back-end ASP.NET Core Reporting application.
  invokeAction: string = '/DXXRDV';



  print() {
    fetchSetup.fetchSettings = {
      headers: { 'BeforeRender': 'BeforeRender' },
      beforeSend: (requestParameters) => {
          requestParameters.credentials = 'include';
      }
  };


    // this.viewer.bindingSender.Print();
  }

  CustomizeMenuActions(event: any) {

    // Hide the "Print" and "PrintPage" actions.
    var printAction = event.args.GetById(ActionId.Print);
    if (printAction)
      printAction.visible = false;
    var printPageAction = event.args.GetById(ActionId.PrintPage);
    if (printPageAction)
      printPageAction.visible = false;
  }


  ParametersSubmitted(event: any) {
    event.args.Parameters.filter(function (p: any) { return p.Key == "StartDate"; })[0].Value = new Date();
    event.args.Parameters.filter(function (p: any) { return p.Key == "EndDate"; })[0].Value = new Date();
}

setParameterALL() {
  let globalCompanyId = sessionStorage.getItem('companyID');
  this.viewer.bindingSender.OpenReport("PartyWiseCommHamali" + "&StartDate=" + $("#startDate").val() + "&EndDate=" + $("#endDate").val() + "&companyidrecord=" + globalCompanyId + "&vochtype1=0&vochtype1=99");
}

setParameterVP() {
  let globalCompanyId = sessionStorage.getItem('companyID');
  this.viewer.bindingSender.OpenReport(this.reportUrl + "&StartDate=" + $("#startDate").val() + "&EndDate=" + $("#endDate").val() + "&companyidrecord=" + globalCompanyId + "&vochtype1=2&vochtype1=4");
}
setParameterVS() {
  let globalCompanyId = sessionStorage.getItem('companyID');
  this.viewer.bindingSender.OpenReport(this.reportUrl + "&StartDate=" + $("#startDate").val() + "&EndDate=" + $("#endDate").val() + "&companyidrecord=" + globalCompanyId + "&vochtype1=9&vochtype1=13");
}
setParameterVPR() {
  let globalCompanyId = sessionStorage.getItem('companyID');
  this.viewer.bindingSender.OpenReport(this.reportUrl + "&StartDate=" + $("#startDate").val() + "&EndDate=" + $("#endDate").val() + "&companyidrecord=" + globalCompanyId + "&vochtype1=14");
}
setParameterVSR() {
  let globalCompanyId = sessionStorage.getItem('companyID');
  this.viewer.bindingSender.OpenReport(this.reportUrl + "&StartDate=" + $("#startDate").val() + "&EndDate=" + $("#endDate").val() + "&companyidrecord=" + globalCompanyId + "&vochtype1=6");
}
setParameterVCN() {
  let globalCompanyId = sessionStorage.getItem('companyID');
  this.viewer.bindingSender.OpenReport(this.reportUrl + "&StartDate=" + $("#startDate").val() + "&EndDate=" + $("#endDate").val() + "&companyidrecord=" + globalCompanyId + "&vochtype1=9");
}
setParameterVDN() {
  let globalCompanyId = sessionStorage.getItem('companyID');
  this.viewer.bindingSender.OpenReport(this.reportUrl + "&StartDate=" + $("#startDate").val() + "&EndDate=" + $("#endDate").val() + "&companyidrecord=" + globalCompanyId + "&vochtype1=15");
}

export(format : string) {

  fetch("https://localhost:54688/DXXRD/Export?format=" + format)
  .then(response => response.blob())
  .then(data => {
      console.log(data);
      saveAs(data, 'PartyWiseCommissionHamaliReport.' + format);

  });

}

onChange(event: any){
  this.onchangeValue = event.target.value;
}

generateRepo() {
  switch (this.onchangeValue)
  {
      case "All":
        this.setParameterALL();
          break;
      case "Purchase":
          this.setParameterVP();
          break;
      case "Sales":
          this.setParameterVS();
          break;
      case "PurchaseReturn":
          this.setParameterVPR();
          break;
      case "SalesReturn":
          this.setParameterVSR();
          break;
      case "CreditNote":
          this.setParameterVCN();
          break;
      case "DebitNote":
          this.setParameterVDN();
          break;
  }
}

}
