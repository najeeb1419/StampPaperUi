import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { PaymentDto } from 'src/app/Models/PaymentDto';
import { ReceiptDto } from 'src/app/Models/ReceiptDto';
import { SelectItemDto } from 'src/app/Models/SelectItemDto';
import { ApiProxyService } from 'src/app/api-proxy-service';
import * as converter from "number-to-words";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateReceiptComponent } from './create-receipt/create-receipt.component';
import { LookUp } from 'src/app/Models/LookUp';
import { Router } from '@angular/router';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { AccountModel } from 'src/app/Models/account-model';


@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss'],
})
export class ReceiptComponent  implements OnInit  {
  receipts: ReceiptDto[] = [];
  keyword = '';
  isActive: string;
  advancedFiltersVisible = false;
  paymentDto = new PaymentDto();
  receipt = new ReceiptDto();
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

  paymentForm:FormGroup

  constructor(
    private _apiService: ApiProxyService,
    private _modalService: NgbModal,
    private router:Router,
    private formBuilder:FormBuilder
  ) {
    this.getAccounts();
    this.getReceipts();
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

  async getReceipts(){
    (await this._apiService.getRequest('Receipt/GetReceipts')).subscribe(res=>{
      this.receipts = res;
      this.dropdownStates.length=this.receipts.length;
    })
  }


  protected async delete(user: ReceiptDto): Promise<void> {
    (await this._apiService.deleteRequest('', user.id)).subscribe(() => {});
  }



  createReceipt() {
    this.router.navigate(['leads/create-receipt']);
  }

  editReceipt(receipt:ReceiptDto){
    this.router.navigate(['leads/edit-receipt'], { state: { receipt } });
  }



  async payment(receipt: ReceiptDto) {
      this.showPayment();
      this.receipt = receipt;
      // this.changeAmountToWords();
      // this.getMember(this.id);
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
      receiptId:this.receipt.id
    });

    (await this._apiService.putRequest('Payment/UpdatePayment', this.paymentForm.value)).subscribe(
      () => {
        this.updateReceipt();
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
    if (sendingAmount > this.receipt.remainingAmount) {
      alert(
        'Sending amount should be less or equal then remaining amount'
      );
      this.paymentDto.sendingAmount = 0;
      return;
    }
    this.receipt.remainingAmount =
      this.receipt.remainingAmount - sendingAmount;
  }

  async updateReceipt() {
    this.receipt.payments = [];
    this.receipt.lookUpId =
      this.receipt.remainingAmount > 0 ? LookUp.Partial : LookUp.Completed;
      let formDate ={
        id:this.receipt.id,
        tenantId:this.receipt.tenantId,
        lookUpId:this.receipt.remainingAmount > 0 ? LookUp.Partial : LookUp.Completed,
        amount:this.receipt.amount,
        isActive:true,
        memberId:this.receipt.member.id
      };
    (await this._apiService.putRequest('Receipt/UpdateReceipt', formDate)).subscribe(
      (result) => {
        this.hidePayment();
        // this.refresh();
      },
      (error) => {
        // this.notify.error(error);
      }
    );
  }
}
