import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { PaymentDto } from 'src/app/Models/PaymentDto';
import { BankEmployeeReceiptDto } from 'src/app/Models/BankEmployeeReceiptDto';
import { SelectItemDto } from 'src/app/Models/SelectItemDto';
import { ApiProxyService } from 'src/app/api-proxy-service';
import * as converter from "number-to-words";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LookUp } from 'src/app/Models/LookUp';
import { Router } from '@angular/router';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { AccountModel } from 'src/app/Models/account-model';


@Component({
  selector: 'app-bank-employee-receipt',
  templateUrl: './bank-employee-receipt.component.html',
  styleUrls: ['./bank-employee-receipt.component.scss'],
})
export class BankEmployeeReceiptComponent  implements OnInit  {
  bankEmployeeReceipts: BankEmployeeReceiptDto[] = [];
  keyword = '';
  isActive: string;
  advancedFiltersVisible = false;
  paymentDto = new PaymentDto();
  bankEmployeeReceipt = new BankEmployeeReceiptDto();
  amountInWords: string = '';
  accountList: AccountModel[] = [];
  memberList: SelectItemDto[] = [];
  remainingAmount: number = 0;
  saving = false;
  receiptClass = 'col-md-12';
  paymentClass = 'd-none';
  paymentListClass = 'd-none';
  @Output() onSave = new EventEmitter<any>();
  isDropdownOpen = false;
  faChevronDown = faChevronDown
  dropdownStates: boolean[] = [];
  payments:PaymentDto[]=[]

  paymentForm:FormGroup

  constructor(
    private _apiService: ApiProxyService,
    private _modalService: NgbModal,
    private router:Router,
    private formBuilder:FormBuilder
  ) {
    this.getAccounts();
    this.getBankEmployeeReceipts();
  }


  ngOnInit(): void {

    this.paymentForm = this.formBuilder.group({
      accountId: [null, Validators.required],
      receiptId: [null, Validators.required],
      sendingAmount: [0, Validators.required],
      tenantId:[localStorage.getItem("TenantId")]

    });
  }

  toggleDropdown(index:number) {
    for (let i = 0; i < this.dropdownStates.length; i++) {
      if (i !== index) {
        this.dropdownStates[i] = false;
      }
    }

    this.dropdownStates[index] = !this.dropdownStates[index];

  }

  async getBankEmployeeReceipts(){
    (await this._apiService.getRequest('BankEmployeeReceipt/GetBankEmployeeReceipts')).subscribe(res=>{
      this.bankEmployeeReceipt = res;
      this.dropdownStates.length=this.bankEmployeeReceipts.length;
    })
  }


  protected async delete(id:number, index:number): Promise<void> {
    this.dropdownStates[index] = false;
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');

    if (confirmDelete) {
    (await this._apiService.deleteRequest('BankEmployeeReceipt/DeleteBankEmployeeReceipt', id)).subscribe(res => {
      this.bankEmployeeReceipts = this.bankEmployeeReceipts.filter(x=>x.id !=id);
    });
    }
  }



  createBankEmployeeReceipt() {
    this.router.navigate(['leads/create-receipt']);
  }

  editBankEmployeeReceipt(receipt:BankEmployeeReceiptDto){
    this.router.navigate(['leads/edit-receipt'], { state: { receipt } });
  }



  async payment(bankEmployeeReceipt: BankEmployeeReceiptDto , index:number) {
      this.showPayment();
      this.bankEmployeeReceipt = bankEmployeeReceipt;
      this.dropdownStates[index] = false;
      this.getPayment(bankEmployeeReceipt.id);
  }

 async getPayment(receiptId:Number){
  (await this._apiService.getRequestById('Payment/GetPaymentByBankEmployeeReceiptId',receiptId)).subscribe(res=>{
    this.payments = res;
    this.dropdownStates.length=this.bankEmployeeReceipts.length;
  })
 }

  showPayment() {
    this.receiptClass = 'col-md-8';
    this.paymentClass = 'col-md-4';
    this.paymentListClass = 'col-md-12 ';
  }

  hidePayment() {
    this.receiptClass = 'col-md-12';
    this.paymentClass = 'd-none';
    this.paymentListClass = 'd-none';
  }

  async save(): Promise<void> {
    debugger;
    this.saving = true;
    this.paymentForm.patchValue({
      receiptId:this.bankEmployeeReceipt.id
    });

    (await this._apiService.postRequest('Payment/AddPayment', this.paymentForm.value)).subscribe(
      () => {
        this.updateBankEmployeeReceipt();
        this.saving = false;
        this.paymentForm.reset();
        this.onSave.emit();
      },
      () => {
        this.saving = false;
      }
    );
  }


  async getAccounts() {
    (await this._apiService.getRequest('Account/GetAccounts')).subscribe((result) => {
      this.accountList = result;
    });
  }

  getRemainingAmount() {
    let sendingAmount= this.paymentForm.get("sendingAmount")?.value;
    if (sendingAmount > this.bankEmployeeReceipt.remainingAmount) {
      alert(
        'Sending amount should be less or equal then remaining amount'
      );
      this.paymentDto.sendingAmount = 0;
      return;
    }
    this.bankEmployeeReceipt.remainingAmount =
      this.bankEmployeeReceipt.remainingAmount - sendingAmount;
  }

  async updateBankEmployeeReceipt() {
    this.bankEmployeeReceipt.payments = [];
    this.bankEmployeeReceipt.lookUpId =
      this.bankEmployeeReceipt.remainingAmount > 0 ? LookUp.Partial : LookUp.Completed;
      let formDate ={
        id:this.bankEmployeeReceipt.id,
        tenantId:this.bankEmployeeReceipt.tenantId,
        lookUpId:this.bankEmployeeReceipt.remainingAmount > 0 ? LookUp.Partial : LookUp.Completed,
        amount:this.bankEmployeeReceipt.amount,
        isActive:true,
        bankEmployeeId:this.bankEmployeeReceipt.bankEmployee.id,
        remainingAmount:this.bankEmployeeReceipt.remainingAmount,
      };
    (await this._apiService.putRequest('BankEmployeeReceipt/UpdateBankEmployeeReceipt', formDate)).subscribe(
      (result) => {
        this.hidePayment();
      },
      (error) => {
      }
    );
  }
}
