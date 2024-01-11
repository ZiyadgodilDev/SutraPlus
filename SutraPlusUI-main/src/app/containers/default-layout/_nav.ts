import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
  },
  {
    name: 'Masters',
    title: true,
  },
  
  {
    name: 'Masters',
    url: '/base',
    iconComponent: { name: 'cil-notes' },
    children: [
      {
        name: 'Create Item/Service',
        url: '/admin/product-master',
      },
      {
        name: 'Create Party',
        url: '/admin/party-details',
      },
      {
        name: 'Create Other Account',
        url: '/admin/other-account',
      },
      {
        name: 'Create User',
        url: '/admin/create-user',
      }
    ]
  },
  {
    name: 'Purchase',
    url: '/base',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Akada Entry',
        url: '/admin/akada-entry',
      },
      {
        name: 'Builty Purchase',
        url: '/admin/InvoiceList',
        linkProps: { queryParams: { InvoiceName: 'BuiltyPurchase' } },
      },
      {
        name: 'Other GST Bills',
        url: '/admin/InvoiceList',
        linkProps: { queryParams: { InvoiceName: 'OtherGSTBills' } },
      },
      {
        name: 'Verify Bills',
        url: '/admin/InvoiceList',
        linkProps: { queryParams: { InvoiceName: 'VerifyBills' } },
      },
      {
        name: 'Sales Return',
        url: '/admin/InvoiceList',
        linkProps: { queryParams: { InvoiceName: 'SalesReturn' } },
      },

      {
        name: 'Deemed Purchase',
        url: '/admin/InvoiceList',
        linkProps: { queryParams: { InvoiceName: 'DeemedPurchase' } },
      },
      {
        name: 'Credit Note',
        url: '/admin/InvoiceList',
        linkProps: { queryParams: { InvoiceName: 'CreditNote' } },
      },
      {
        name: 'Purchase Prints',
        // url: ''
      },
      {
        name: 'Change Akada Date',
        // url: ''
      },
      {
        name: 'Padtal',
        // url: ''
      },
    ],
  },
  {
    name: 'Sales',
    url: '/base',
    iconComponent: { name: 'cil-calculator' },
    children: [
      {
        name: 'Goods Invoice',
        url: '/admin/InvoiceList',
        linkProps: { queryParams: { InvoiceName: 'GoodsInvoice' } },
      },
      {
        name: 'Ginning Invoice',
        url: 'admin/InvoiceList',
        linkProps: { queryParams: { InvoiceName: 'GinningInvoice' } },
      },
      {
        name: 'Export Invoice',
        url: 'admin/InvoiceList',
        linkProps: { queryParams: { InvoiceName: 'ExportInvoice' } },
      },
      {
        name: 'Purchase Return',
        url: 'admin/InvoiceList',
        linkProps: { queryParams: { InvoiceName: 'PurchaseReturn' } },
      },
      {
        name: 'Debit Note',
        url: 'admin/InvoiceList',
        linkProps: { queryParams: { InvoiceName: 'DebitNote' } },
      },

      {
        name: 'Profarma Invoice',
        url: 'admin/InvoiceList',
        linkProps: { queryParams: { InvoiceName: 'ProfarmaInvoice' } },
      },
      {
        name: 'Production Entry',
        url: 'admin/Production-Entry',
      },
      {
        name: 'Deemed Export',
        url: 'admin/InvoiceList',
        linkProps: { queryParams: { InvoiceName: 'DeemedExport' } },
      },
      {
        name: 'Job Work Invoice',
        // url: ''
      },
      {
        name: 'Create DC',
        url: 'admin/create-dc',
      },
      {
        name: 'Import Excel Invoices',
        url: 'admin/import-e-invoice',
      },
      {
        name: 'Rent Invoice',
        // url: ''
      },
    ],
  },
  {
    name: 'Voucher Entries',
    url: '/base',
    iconComponent: { name: 'cil-calculator' },
    children: [
      {
        name: 'Bank/Journal Entries',
        url: '/admin/BankJournal',
      },
      {
        name: 'Cash Entry',
        url: '/admin/CashEntry',
      },
    ],
  },
  {
    name: 'Reports',
    title: true,
  },
  {
    name: 'Reports',
    url: '/base',
    iconComponent: { name: 'cil-spreadsheet' },
    children: [
      {
        name: 'Account Statement',
        url: 'admin/reports',
        linkProps: { queryParams: { ReportName: 'AccountStatement' } },
      },
      {
        name: 'Day Book',
        url: 'admin/reports',
        linkProps: { queryParams: { ReportName: 'DayBook' } },
      },
      {
        name: 'Monthwise Purchase',
        url: 'admin/reports',
        linkProps: { queryParams: { ReportName: 'MonthwisePurchase' } },
      },
      {
        name: 'Party List',
        url: 'admin/reports',
        linkProps: { queryParams: { ReportName: 'PartyList' } },
      },
      {
        name: 'Partywise Cess',
        url: 'admin/reports',
        linkProps: { queryParams: { ReportName: 'PartywiseCess' } },
      },
      {
        name: 'Partywise Purchase',
        url: 'admin/reports',
        linkProps: { queryParams: { ReportName: 'PartywisePurchase' } },
      },
      {
        name: 'Partywise TDS',
        url: 'admin/reports',
        linkProps: { queryParams: { ReportName: 'PartywiseTDS' } },
      },
      {
        name: 'Item Wise',
        url: 'admin/ItemWise',
        linkProps: { queryParams: { ReportName: 'Item Wise' } },
      },

      {
        name: 'Payment List',
        url: 'admin/reports',
        linkProps: { queryParams: { ReportName: 'PaymentList' } },
      },
      {
        name: 'Purchase Register',
        url: 'admin/reports',
        linkProps: { queryParams: { ReportName: 'PurchaseRegister' } },
      },
      {
        name: 'Stock Ledger',
        url: 'admin/reports',
        linkProps: { queryParams: { ReportName: 'StockLedger' } },
      },
      {
        name: 'Transaction Summary',
        url: 'admin/reports',
        linkProps: { queryParams: { ReportName: 'TransactionSummary' } },
      },
      {
        name: 'Trial Balance',
        url: 'admin/reports',
        linkProps: { queryParams: { ReportName: 'TrialBalance' } },
      },
    ],
  },
];
