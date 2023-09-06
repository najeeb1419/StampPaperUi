import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  memberList: SelectItemDto[] = [];
  member = new MemberDto();
  amountInWords: string = ''
  @Output() onSave = new EventEmitter<any>();

  constructor(
    public _apiService: ApiProxyService,
    public activeModal: NgbActiveModal,
  ) {
  }

  ngOnInit(): void {
    this.receipt.isActive = true;
    this.getMemberList()
  }


  async save(): Promise<void> {
    this.saving = true;
    this.receipt.lookUpId=LookUp.Pending;
    (await this._apiService.putRequest('', this.receipt)).subscribe(
      () => {
        this.activeModal.dismiss();
        this.onSave.emit();
      },
      () => {
        this.saving = false;
      }
    );
  }


  async getMemberList() {
    (await this._apiService.getRequest('')).subscribe((res:any) => {
      this.memberList = res;
    })
  }

  async getMember(value: any) {
    (await this._apiService.getRequestById('', value)).subscribe(res => {
      this.member = res;
    })
  }


  changeAmountToWords(){
    this.amountInWords= converter.toWords(this.receipt.amount)
  }

}
