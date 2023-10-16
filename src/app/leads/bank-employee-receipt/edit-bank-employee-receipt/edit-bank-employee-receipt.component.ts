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
import { BankEmployeeDto } from 'src/app/Models/BankEmployeeDto';
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
  bankEmployee: BankEmployeeDto = new BankEmployeeDto();
  @Output() onSave = new EventEmitter<any>();
  id: number;
  amountInWords: string = '';

  bankEmployees: BankEmployeeDto[] = [];
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
      bankEmployeeId: [this.bankEmployeeReceipt.bankEmployee.id, Validators.required],
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

    this.getBankEmployeeList();
    this.changeAmountToWords();
  }

  async getBankEmployeeList() {
    (await this._apiService.getRequest('BankEmployeeReceipt/GetBankEmployees')).subscribe(
      (res) => {
        this.bankEmployees = res;
        this.getBankEmployee();
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
        this.router.navigate(['system/bankEmployeeReceipt']);
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

  async getBankEmployee() {
    let bankEmployeeId = this.editBankEmployeeReceiptFrom.get('bankEmployeeId')?.value;
    let bankEmployee = this.bankEmployees.find((x) => x.id == bankEmployeeId);
    this.bankEmployee = bankEmployee || new BankEmployeeDto();
    this.editBankEmployeeReceiptFrom.patchValue({
      name: this.bankEmployee.name,
      bankEmployeeId: this.bankEmployee.id,
      accountNo: this.bankEmployee.accountNo,
      address: this.bankEmployee.address,
      cnic: this.bankEmployee.cnic
    });
  }
}
