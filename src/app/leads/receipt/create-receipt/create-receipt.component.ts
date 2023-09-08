import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as converter from "number-to-words";
import { LookUp } from 'src/app/Models/LookUp';
import { MemberDto } from 'src/app/Models/MemberDto';
import { ReceiptDto } from 'src/app/Models/ReceiptDto';
import { SelectItemDto } from 'src/app/Models/SelectItemDto';
import { ApiProxyService } from 'src/app/api-proxy-service';

@Component({
  selector: 'app-create-receipt',
  templateUrl: './create-receipt.component.html',
  styleUrls: ['./create-receipt.component.scss']
})
export class CreateReceiptComponent implements OnInit {

  saving = false;
  receipt = new ReceiptDto();
  members: MemberDto[] = [];
  member = new MemberDto();
  amountInWords: string = ''
  createReceiptFrom:FormGroup

  constructor(
    public _apiService: ApiProxyService,
    private formBuilder: FormBuilder,

  ) {
  }

  ngOnInit(): void {
    this.receipt.isActive = true;
    this.getMemberList();
    this.createReceiptFrom = this.formBuilder.group({
      name: ['', Validators.required],
      memberId: [0, Validators.required],
      accountNo: [0, Validators.required],
      address: [''],
      cnic: [''],
      amount:[null, Validators.required],
      amountInWords:[null,Validators.required],
      isActive: [true],
      tenantId:[0]
    });
  }


  async save(): Promise<void> {
    this.saving = true;
    this.receipt.lookUpId=LookUp.Pending;
    (await this._apiService.postRequest('Receipt/AddReceipt', this.receipt)).subscribe(
      () => {

      },
      () => {
        this.saving = false;
      }
    );
  }


  async getMemberList() {
    (await this._apiService.getRequest('Member/GetMembers')).subscribe((res:any) => {
      this.members = res;
    })
  }

  async getMember() {
    (await this._apiService.getRequestById('Member/MemberGetById', this.createReceiptFrom.get("memberId")?.value)).subscribe(res => {
      this.member = res;
    })
  }


  changeAmountToWords(){
    this.amountInWords= converter.toWords(this.receipt.amount)
  }

}
