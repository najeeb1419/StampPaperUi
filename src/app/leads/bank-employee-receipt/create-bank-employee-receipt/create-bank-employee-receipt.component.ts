import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import * as converter from 'number-to-words';
import { LookUp } from 'src/app/Models/LookUp';
import { BankEmployeeDto } from 'src/app/Models/BankEmployeeDto';
import { BankEmployeeReceiptDto } from 'src/app/Models/BankEmployeeReceiptDto';
import { ApiProxyService } from 'src/app/api-proxy-service';

@Component({
  selector: 'app-create-bank-employee-bankEmployeeReceipt',
  templateUrl: './create-bank-employee-receipt.component.html',
  styleUrls: ['./create-bank-employee-receipt.component.scss'],
})
export class CreateBankEmployeeReceiptComponent implements OnInit {
  saving = false;
  bankEmployeeReceipt = new BankEmployeeReceiptDto();
  bankEmployees: BankEmployeeDto[] = [];
  bankEmployee = new BankEmployeeDto();
  amountInWords: string = '';
  createBankEmployeeReceiptFrom: FormGroup;
  @ViewChild('printContent') printContentElementRef!: ElementRef;

  constructor(
    public _apiService: ApiProxyService,
    private formBuilder: FormBuilder,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.bankEmployeeReceipt.isActive = true;
    this.getBankEmployeeList();
    this.createBankEmployeeReceiptFrom = this.formBuilder.group({
      name: ['', Validators.required],
      bankEmployeeId: [0, Validators.required],
      accountNo: [0, Validators.required],
      address: [''],
      cnic: [''],
      amount: [null, Validators.required],
      amountInWords: [null, Validators.required],
      isActive: [true],
      tenantId: [localStorage.getItem("TenantId")],
      lookUpId: [LookUp.Pending],
      remainingAmount:[null]
    });
  }

  async save(): Promise<void> {
    this.createBankEmployeeReceiptFrom.patchValue({
      remainingAmount:this.createBankEmployeeReceiptFrom.get("amount")?.value
    })

    this.saving = true;
    (
      await this._apiService.postRequest('BankEmployeeReceipt/AddBankEmployeeReceipt', this.createBankEmployeeReceiptFrom.value)
    ).subscribe(
      () => {


        this.printPage()
        this.router.navigate(['system/bank-employee-receipt']);
      },
      () => {
        this.saving = false;
      }
    );
  }




  async getBankEmployeeList() {
    (await this._apiService.getRequest('BankEmployee/GetBankEmployees')).subscribe(
      (res: any) => {
        this.bankEmployees = res;
      }
    );
  }

  async getBankEmployee() {
     let bankEmployeeId= this.createBankEmployeeReceiptFrom.get("bankEmployeeId")?.value;
      this.bankEmployee = this.bankEmployees?.find(x=>x.id==bankEmployeeId) || new BankEmployeeDto();
      this.createBankEmployeeReceiptFrom.patchValue({
        name: this.bankEmployee.name,
        bankEmployeeId: this.bankEmployee.id,
        accountNo: this.bankEmployee.accountNo,
        address: this.bankEmployee.address,
        cnic: this.bankEmployee.cnic
      });

  }

  changeAmountToWords() {
    this.createBankEmployeeReceiptFrom.patchValue({
      amountInWords: converter.toWords(this.createBankEmployeeReceiptFrom.get("amount")?.value)
    })
  }

  printPage() {
    const printContent = this.printContentElementRef.nativeElement.innerHTML;

    const printWindow = window.open('', '', 'width=1000,height=1000') as Window;
    printWindow.document.open();
    printWindow?.document.write(`
      <html>
      <head>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <title>Print Content</title>
      </head>
      <body>
        ${printContent}
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();

    // Listen for the "afterprint" event and close the window
    printWindow.addEventListener('afterprint', () => {
      printWindow.close();
    });
}

  printPage11() {
    const printContent = this.printContentElementRef.nativeElement.innerHTML;

    // Create a new window for printing
    var tab = window.open('') as Window
    const printWindow = new Window;
    printWindow.open('', '_blank');
    printWindow?.document.write(`
      <html>
      <head>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <title>Print Content</title>
      </head>
      <body>
        ${printContent}
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
      </body>
      </html>
    `);
    printWindow?.document.close();

    // Wait for the content to load in the new window
    printWindow.onload = function() {
      printWindow.print(); // Print the content
      printWindow.close(); // Close the print window after printing
    }
  }
}
