import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as converter from "number-to-words";
import { MemberDto } from 'src/app/Models/MemberDto';
import { ReceiptDto } from 'src/app/Models/ReceiptDto';
import { SelectItemDto } from 'src/app/Models/SelectItemDto';
import { ApiProxyService } from 'src/app/api-proxy-service';

@Component({
  selector: 'app-edit-receipt',
  templateUrl: './edit-receipt.component.html',
  styleUrls: ['./edit-receipt.component.scss']
})
export class EditReceiptComponent  implements OnInit {

  saving = false;
  receipt = new ReceiptDto();
  member = new MemberDto();
  @Output() onSave = new EventEmitter<any>();
  id: number;
  amountInWords: string = ''

  memberList: SelectItemDto[] = [];

  constructor(
    public _apiService: ApiProxyService,
    public activeModal: NgbActiveModal,
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.getMemberList()
    ;(await this._apiService.getRequestById('', this.id)).subscribe((result) => {
      this.receipt = result;
      this.changeAmountToWords();
      this.getMember(this.receipt.memberId)
    });
  }


  async getMemberList() {
    (await this._apiService.getRequest('')).subscribe((res) => {
      this.memberList = res;
    })
  }

  async save(): Promise<void> {
    debugger;
    this.saving = true;
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

  changeAmountToWords() {
    this.amountInWords = converter.toWords(this.receipt.amount)
  }

  async getMember(value: any) {
    (await this._apiService.getRequestById('', value)).subscribe(res => {
      this.member = res;
    })
  }

}


