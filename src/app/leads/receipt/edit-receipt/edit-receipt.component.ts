import {
  Component,
  EventEmitter,
  Injector,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as converter from 'number-to-words';
import { LookUp } from 'src/app/Models/LookUp';
import { MemberDto } from 'src/app/Models/MemberDto';
import { ReceiptDto } from 'src/app/Models/ReceiptDto';
import { SelectItemDto } from 'src/app/Models/SelectItemDto';
import { ApiProxyService } from 'src/app/api-proxy-service';

@Component({
  selector: 'app-edit-receipt',
  templateUrl: './edit-receipt.component.html',
  styleUrls: ['./edit-receipt.component.scss'],
})
export class EditReceiptComponent implements OnInit {
  saving = false;
  receipt = new ReceiptDto();
  member: MemberDto = new MemberDto();
  @Output() onSave = new EventEmitter<any>();
  id: number;
  amountInWords: string = '';

  members: MemberDto[] = [];
  editReceiptFrom: FormGroup;
  constructor(
    public _apiService: ApiProxyService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.receipt = history.state.receipt;
    this.editReceiptFrom = this.formBuilder.group({
      id:[this.receipt.id],
      name: [this.receipt.member.name, Validators.required],
      memberId: [this.receipt.member.id, Validators.required],
      accountNo: [this.receipt.member.accountNo, Validators.required],
      address: [this.receipt.member.address],
      cnic: [this.receipt.member.cnic],
      amount: [this.receipt.amount, Validators.required],
      amountInWords: [null, Validators.required],
      isActive: [true],
      tenantId: [localStorage.getItem('TenantId')],
      lookUpId: [LookUp.Pending],
      remainingAmount: [null],
    });

    this.getMemberList();
    this.changeAmountToWords();
  }

  async getMemberList() {
    (await this._apiService.getRequest('Member/GetMembers')).subscribe(
      (res) => {
        this.members = res;
        this.getMember();
      }
    );
  }

  async save(): Promise<void> {
    this.editReceiptFrom.patchValue({
      remainingAmount: this.editReceiptFrom.get('amount')?.value,
    });
    this.saving = true;
    (
      await this._apiService.putRequest(
        'Receipt/UpdateReceipt',
        this.editReceiptFrom.value
      )
    ).subscribe(
      () => {
        this.router.navigate(['system/receipt']);
      },
      () => {
        this.saving = false;
      }
    );
  }

  changeAmountToWords() {
    this.editReceiptFrom.patchValue({
      amountInWords: converter.toWords(
        this.editReceiptFrom.get('amount')?.value
      ),
    });
  }

  async getMember() {
    let memberId = this.editReceiptFrom.get('memberId')?.value;
    let member = this.members.find((x) => x.id == memberId);
    this.member = member || new MemberDto();
  }
}
