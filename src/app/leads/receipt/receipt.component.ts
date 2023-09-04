import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaymentDto } from 'src/app/Models/PaymentDto';
import { ReceiptDto } from 'src/app/Models/ReceiptDto';
import { SelectItemDto } from 'src/app/Models/SelectItemDto';
import { ApiProxyService } from 'src/app/api-proxy-service';
import * as converter from "number-to-words";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateReceiptComponent } from './create-receipt/create-receipt.component';
import { LookUp } from 'src/app/Models/LookUp';
@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss'],
})
export class ReceiptComponent  {
  receipts: ReceiptDto[] = [];
  keyword = '';
  isActive: string;
  advancedFiltersVisible = false;
  paymentDto = new PaymentDto();
  receipt = new ReceiptDto();
  amountInWords: string = '';
  accountList: SelectItemDto[] = [];
  memberList: SelectItemDto[] = [];
  remainingAmount: number = 0;
  saving = false;
  receiptClass = 'col-md-12';
  paymentClass = 'd-none';
  paymentListClass = 'd-none';
  @Output() onSave = new EventEmitter<any>();

  constructor(
    private _apiService: ApiProxyService,
    private _modalService: NgbModal,
  ) {
    this.getAccounts();
    this.getReceipts();
  }



  async getReceipts(){
    (await this._apiService.getRequest('Receipt/GetReceipts')).subscribe(res=>{
      this.receipts = res;
    })
  }


  protected async delete(user: ReceiptDto): Promise<void> {
    (await this._apiService.deleteRequest('', user.id)).subscribe(() => {});
  }



  createReceipt() {
    const modalRef = this._modalService.open(CreateReceiptComponent);
    // You can pass data to the modal using modalRef.componentInstance
    modalRef.componentInstance.data = { };
  }

  editReceipt(id:number){
    const modalRef = this._modalService.open(CreateReceiptComponent);
    // You can pass data to the modal using modalRef.componentInstance
    modalRef.componentInstance.data = {id };
  }

  // payment(receipt:ReceiptDto){
  //   if(receipt.id>0){
  //     let createOrEditPaymentDialog: BsModalRef;
  //     createOrEditPaymentDialog = this._modalService.show(
  //       CreatePaymentComponent,
  //       {
  //         class: 'modal-xl',
  //         initialState: {
  //           id: receipt.id,
  //         },
  //       }
  //     );
  //   }
  // }

  // payment

  async payment(receipt: ReceiptDto) {
    (await this._apiService.getRequestById('', receipt.id)).subscribe((result) => {
      this.showPayment();
      this.receipt = result;
      this.changeAmountToWords();
      // this.getMember(this.id);
    });
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

  async save(paymentFrom: NgForm): Promise<void> {
    debugger;
    this.saving = true;
    this.paymentDto.receiptId = this.receipt.id;
    this.paymentDto.accountId = this.paymentDto.accountId;
    (await this._apiService.putRequest('', this.paymentDto)).subscribe(
      () => {
        this.updateReceipt();
        this.saving = false;
        paymentFrom.reset();
        this.onSave.emit();
      },
      () => {
        this.saving = false;
      }
    );
  }

  changeAmountToWords() {
    this.amountInWords = converter.toWords(this.receipt.amount);
  }

  async getAccounts() {
    (await this._apiService.getRequest('')).subscribe((result) => {
      this.accountList = result;
    });
  }

  getRemainingAmount() {
    if (this.paymentDto.sendingAmount > this.receipt.remainingAmount) {
      // this.notify.error(
      //   'Sending amount should be less or equal then remaining amount'
      // );
      this.paymentDto.sendingAmount = 0;
      return;
    }
    this.receipt.remainingAmount =
      this.receipt.remainingAmount - this.paymentDto.sendingAmount;
  }

  async updateReceipt() {
    this.receipt.payments = [];
    this.receipt.lookUpId =
      this.receipt.remainingAmount > 0 ? LookUp.Partial : LookUp.Completed;
    (await this._apiService.putRequest('', this.receipt)).subscribe(
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
