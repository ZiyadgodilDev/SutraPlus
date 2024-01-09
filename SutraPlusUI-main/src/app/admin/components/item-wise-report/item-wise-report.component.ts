import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DxReportViewerComponent } from 'devexpress-reporting-angular';
import { ActionId } from 'devexpress-reporting/dx-webdocumentviewer';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-item-wise-report',
  templateUrl: './item-wise-report.component.html',
  styleUrls: ['./item-wise-report.component.scss']
})
export class ItemWiseReportComponent {
  title = 'DXReportDesignerSample';
  // If you use the ASP.NET Core backend:
  getDesignerModelAction = "/DXXRD/GetDesignerModel";
  // The report name.
  reportName = "ItemWise";
  // The backend application URL.
  host = environment.Reportingapi;
  yearSelection!: FormGroup
  currentYear!: number

  @ViewChild(DxReportViewerComponent, { static: false }) viewer: DxReportViewerComponent;
  reportUrl: string = "ItemWise";
  // The built-in controller in the back-end ASP.NET Core Reporting application.
  invokeAction: string = '/DXXRDV';



  print() {
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
}