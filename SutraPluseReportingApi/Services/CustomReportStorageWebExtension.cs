using DevExpress.Data.Filtering;
using DevExpress.DataAccess.EntityFramework;
using DevExpress.Utils.CommonDialogs.Internal;
using DevExpress.Xpo;
using DevExpress.XtraCharts;
using DevExpress.XtraPrinting;
using DevExpress.XtraReports.Expressions;
using DevExpress.XtraReports.Parameters;
using DevExpress.XtraReports.UI;
using DevExpress.XtraReports.Web.Extensions;
using DevExpress.XtraRichEdit.Import.Doc;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.SqlServer.Server;
using SutraPlusReportApi;
using SutraPlusReportApi.PredefinedReports;
using System;
using System.Collections.Generic;
using System.Diagnostics.Tracing;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Security.AccessControl;
using System.Web;

namespace PassParameterExample.Services
{
    public class CustomReportStorageWebExtension : ReportStorageWebExtension
    {
        readonly string ReportDirectory;
        const string FileExtension = ".resx";
        public static XtraReport report = new XtraReport();
        public static bool doWeHaveLedgerId = false;
        public static string databaseName = "";
        public static string DataSource = "";
        public static string UserID = "";
        public static string Password = "";

        public CustomReportStorageWebExtension(IWebHostEnvironment env)
        {
            ReportDirectory = Path.Combine(env.ContentRootPath, "Reports");
            if (!Directory.Exists(ReportDirectory))
            {
                Directory.CreateDirectory(ReportDirectory);
            }
        }
        private bool IsWithinReportsFolder(string url, string folder)
        {
            var rootDirectory = new DirectoryInfo(folder);
            var fileInfo = new FileInfo(Path.Combine(folder, url));
            return fileInfo.Directory.FullName.ToLower().StartsWith(rootDirectory.FullName.ToLower());
        }
        public override bool CanSetData(string url) { return true; }
        public override bool IsValidUrl(string url) { return Path.GetFileName(url) == url; }

        public override byte[] GetData(string url)
        {
            CustomReportStorageWebExtension.doWeHaveLedgerId = false;

            var v = CustomReportStorageWebExtension.databaseName;


            try
            {

                string[] reportNameParts = url.Split('|');
                string oldData = reportNameParts[0];

                string[] parts = oldData.Split("&");
                string reportName = parts[0];
                DateTime StartDate = new DateTime();
                if (parts.Length > 1)
                    if (parts[1].Split("=")[1] != "")
                        StartDate = parts.Length > 1 ? Convert.ToDateTime(parts[1].Split("=")[1]) : DateTime.UtcNow;
                DateTime EndDate = new DateTime();
                if (parts.Length > 2)
                    if (parts[2].Split("=")[1] != "")
                        EndDate = parts.Length > 2 ? Convert.ToDateTime(parts[2].Split("=")[1]) : DateTime.UtcNow;

                int companyid = 0;
                if (parts.Length > 3)
                    if (parts[3].Split("=")[1] != "")
                        companyid = parts.Length > 3 ? Convert.ToInt32(parts[3].Split("=")[1]) : 0;

                int vochtype1 = 0;
                if (parts.Length > 4)
                    if (parts[4].Split("=")[1] != "")
                        vochtype1 = parts.Length > 4 ? Convert.ToInt32(parts[4].Split("=")[1]) : 0;

                int vochtype2 = 0;
                if (parts.Length > 5)
                    if (parts[5].Split("=")[1] != "")
                        vochtype2 = parts.Length > 5 ? Convert.ToInt32(parts[5].Split("=")[1]) : 0;

                int ledgerId= 0;
                if (parts.Length > 6)
                {
                    CustomReportStorageWebExtension.doWeHaveLedgerId = true;
                    if (parts[6].Split("=")[1] != "")
                        ledgerId = parts.Length > 6 ? Convert.ToInt32(parts[6].Split("=")[1]) : 0;
                }



                string newData = reportNameParts[1];
                string[] newDataParts = newData.Split('&');
                if (newDataParts.Length >= 4)
                {
                    CustomReportStorageWebExtension.databaseName= newDataParts[0].Split("=")[1];
                    CustomReportStorageWebExtension.DataSource= newDataParts[1].Split("=")[1];
                    CustomReportStorageWebExtension.UserID = newDataParts[2].Split("=")[1];
                    CustomReportStorageWebExtension.Password = newDataParts[3].Split("=")[1];
                }


                using var ms = new MemoryStream();
                XtraReport report = new XtraReport();
                if (parts[0] == "ItemWise")
                    report = ReportsFactory.Reports["ItemWise"]();
                else if (parts[0] == "MonthView")
                    report = ReportsFactory.Reports1["MonthView"]();
                else if (parts[0] == "PartyCaseWise")
                    report = ReportsFactory.Reports2["PartyCaseWise"]();
                else if (parts[0] == "PartyWiseCommHamali")
                    report = ReportsFactory.Reports3["PartyWiseCommHamali"]();
                else if (parts[0] == "ListAndRegisters")
                    report = ReportsFactory.Reports4["ListAndRegisters"]();
                else if (parts[0] == "PrintPartyReport")
                    report = ReportsFactory.Reports5["PrintPartyReport"]();


                if (parts[0] == "PrintPartyReport")
                {
                    if (report.Parameters["companyidrecord"] == null)
                    {
                        var dateParameter = new Parameter()
                        {
                            Name = "companyidrecord",
                            Description = "CompanyId",
                            Value = companyid,
                        };
                        report.Parameters.Add(dateParameter);
                    }
                    else
                    {
                        report.Parameters["companyidrecord"].Value = companyid;
                    }
                    
                    if (report.Parameters["accountinggroupId"] == null)
                    {
                        var dateParameter = new Parameter()
                        {
                            Name = "accountinggroupId",
                            Description = "accountinggroupId",
                            Value = ledgerId,
                        };
                        report.Parameters.Add(dateParameter);
                    }
                    else
                    {
                        report.Parameters["accountinggroupId"].Value = ledgerId;
                    }
                     

                }
                else
                {
                    if (report.Parameters["StartDate"] == null)
                    {
                        var dateParameter = new Parameter()
                        {
                            Name = "StartDate",
                            Description = "From Date",
                            Value = StartDate,
                        };
                        report.Parameters.Add(dateParameter);
                    }
                    else
                    {
                        report.Parameters["StartDate"].Value = StartDate;
                    }

                    if (report.Parameters["EndDate"] == null)
                    {
                        var dateParameter = new Parameter()
                        {
                            Name = "EndDate",
                            Description = "To Date",
                            Value = EndDate,
                        };
                        report.Parameters.Add(dateParameter);
                    }
                    else
                    {
                        report.Parameters["EndDate"].Value = EndDate;
                    }

                    if (report.Parameters["companyidrecord"] == null)
                    {
                        var dateParameter = new Parameter()
                        {
                            Name = "companyidrecord",
                            Description = "CompanyId",
                            Value = companyid,
                        };
                        report.Parameters.Add(dateParameter);
                    }
                    else
                    {
                        report.Parameters["companyidrecord"].Value = companyid;
                    }

                    if (report.Parameters["vochtype1"] == null)
                    {
                        var dateParameter = new Parameter()
                        {
                            Name = "vochtype1",
                            Description = "VochType1",
                            Value = vochtype1,
                        };
                        report.Parameters.Add(dateParameter);
                    }
                    else
                    {
                        report.Parameters["vochtype1"].Value = vochtype1;
                    }

                    if (report.Parameters["vochtype2"] == null)
                    {
                        var dateParameter = new Parameter()
                        {
                            Name = "vochtype2",
                            Description = "VochType1",
                            Value = vochtype2,
                        };
                        report.Parameters.Add(dateParameter);
                    }
                    else
                    {
                        report.Parameters["vochtype2"].Value = vochtype2;
                    }

                   
                    if (parts.Length > 6)
                    {
                
                        if (report.Parameters["ledgerId"] == null)
                        {
                            var dateParameter = new Parameter()
                            {
                                Name = "ledgerId",
                                Description = "ledgerId",
                                Value = ledgerId,
                            };
                            report.Parameters.Add(dateParameter);
                        }
                        else
                        {
                            report.Parameters["ledgerId"].Value = ledgerId;
                        }
                    }

                }
                //string Querystring = "";
                //if (StartDate != new DateTime() && EndDate != new DateTime())
                //{
                //    Querystring += "GetDate([TranctDate]) Between(" + StartDate + "," + EndDate + ")";
                //}

                //if (vochtype1 != 0 && vochtype2 != 0)
                //{
                //    Querystring += "and VochType Between(" + vochtype1 + "," + vochtype2 + ")";
                //}
                //else if (vochtype1 != 0)
                //{
                //    Querystring = "and VochType = " + vochtype1;
                //}
                //if (companyid != 0)
                //{
                //    Querystring += "and CompanyId=" + companyid;
                //}


                //if (report.Parameters["Query"] == null)
                //{
                //    var dateParameter = new Parameter()
                //    {
                //        Name = "Query",
                //        Description = "Query",
                //        Value = Querystring,
                //    };
                //    report.Parameters.Add(dateParameter);
                //}
                //else
                //{
                //    report.Parameters["Query"].Value = Querystring;
                //}

                report.RequestParameters = false;
                report.CreateDocument();
                  
                report.SaveLayoutToXml(ms);
                CustomReportStorageWebExtension.report = report;

                CustomReportStorageWebExtension.doWeHaveLedgerId = false;

                return ms.ToArray();


            }
            catch (Exception ex)
            {
                throw new DevExpress.XtraReports.Web.ClientControls.FaultException(
                    "Could not get report data.", ex);
            }
            throw new DevExpress.XtraReports.Web.ClientControls.FaultException(
                string.Format("Could not find report '{0}'.", url));
        }

        public override Dictionary<string, string> GetUrls()
        {
            return Directory.GetFiles(ReportDirectory, "*" + FileExtension)
                                     .Select(Path.GetFileNameWithoutExtension)
                                     .Union(ReportsFactory.Reports.Select(x => x.Key))
                                     .ToDictionary<string, string>(x => x);
        }
        public override void SetData(XtraReport report, string url)
        {
            if (!IsWithinReportsFolder(url, ReportDirectory))
                throw new DevExpress.XtraReports.Web.ClientControls.FaultException("Invalid report name.");
            report.SaveLayoutToXml(Path.Combine(ReportDirectory, url + FileExtension));
        }
        public override string SetNewData(XtraReport report, string defaultUrl)
        {
            SetData(report, defaultUrl);
            return defaultUrl;
        }
    }
}
