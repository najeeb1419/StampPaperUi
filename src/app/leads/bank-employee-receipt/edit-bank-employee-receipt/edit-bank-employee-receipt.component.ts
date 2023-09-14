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
import { BankEmployeeReceiptDto } from 'src/app/Models/BankEmployeeReceiptDto';
import { SelectItemDto } from 'src/app/Models/SelectItemDto';
import { ApiProxyService } from 'src/app/api-proxy-service';

@Component({
  selector: 'app-edit-bank-employee-bankEmployeeReceipt',
  templateUrl: './edit-bank-employee-receipt.component.html',
  styleUrls: ['./edit-bank-employee-receipt.component.scss'],
})
export class EditBankEmployeeReceiptComponent implements OnInit {
  saving = false;
  bankEmployeeReceipt = new BankEmployeeReceiptDto();
  member: MemberDto = new MemberDto();
  @Output() onSave = new EventEmitter<any>();
  id: number;
  amountInWords: string = '';

  members: MemberDto[] = [];
  editBankEmployeeReceiptFrom: FormGroup;
  constructor(
    public _apiService: ApiProxyService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.bankEmployeeReceipt = history.state.bankEmployeeReceipt;
    this.editBankEmployeeReceiptFrom = this.formBuilder.group({
      id:[this.bankEmployeeReceipt.id],
      name: [this.bankEmployeeReceipt.bankEmployee.name, Validators.required],
      memberId: [this.bankEmployeeReceipt.bankEmployee.id, Validators.required],
      accountNo: [this.bankEmployeeReceipt.bankEmployee.accountNo, Validators.required],
      address: [this.bankEmployeeReceipt.bankEmployee.address],
      cnic: [this.bankEmployeeReceipt.bankEmployee.cnic],
      amount: [this.bankEmployeeReceipt.amount, Validators.required],
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
    this.editBankEmployeeReceiptFrom.patchValue({
      remainingAmount: this.editBankEmployeeReceiptFrom.get('amount')?.value,
    });
    this.saving = true;
    (
      await this._apiService.putRequest(
        'BankEmployeeReceipt/UpdateBankEmployeeReceipt',
        this.editBankEmployeeReceiptFrom.value
      )
    ).subscribe(
      () => {
        this.router.navigate(['leads/bankEmployeeReceipt']);
      },
      () => {
        this.saving = false;
      }
    );
  }

  changeAmountToWords() {
    this.editBankEmployeeReceiptFrom.patchValue({
      amountInWords: converter.toWords(
        this.editBankEmployeeReceiptFrom.get('amount')?.value
      ),
    });
  }

  async getMember() {
    let memberId = this.editBankEmployeeReceiptFrom.get('memberId')?.value;
    let member = this.members.find((x) => x.id == memberId);
    this.member = member || new MemberDto();
  }
}
