import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { PaymentDto } from 'src/app/Models/PaymentDto';
import { ReceiptDto } from 'src/app/Models/ReceiptDto';
import { SelectItemDto } from 'src/app/Models/SelectItemDto';
import { ApiProxyService } from 'src/app/api-proxy-service';
import * as converter from 'number-to-words';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateReceiptComponent } from './create-receipt/create-receipt.component';
import { LookUp } from 'src/app/Models/LookUp';
import { Router } from '@angular/router';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { AccountModel } from 'src/app/Models/account-model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserData } from '../lead-table/lead-table.component';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss'],
})
export class ReceiptComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'contactNo',
    'Address',
    'status',
    'accountNo',
    'amount',
    'remainingAmount',
  ];
  dataSource: MatTableDataSource<ReceiptDto>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

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
  faChevronDown = faChevronDown;
  dropdownStates: boolean[] = [];
  payments: PaymentDto[] = [];

  paymentForm: FormGroup;

  constructor(
    private _apiService: ApiProxyService,
    private _modalService: NgbModal,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.getAccounts();
    this.getReceipts();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paymentForm = this.formBuilder.group({
      accountId: [null, Validators.required],
      receiptId: [null, Validators.required],
      sendingAmount: [0, Validators.required],
      tenantId: [localStorage.getItem('TenantId')],
    });
  }

  toggleDropdown(index: number) {
    for (let i = 0; i < this.dropdownStates.length; i++) {
      if (i !== index) {
        this.dropdownStates[i] = false;
      }
    }

    this.dropdownStates[index] = !this.dropdownStates[index];
  }

  async getReceipts() {
    (await this._apiService.getRequest('Receipt/GetReceipts')).subscribe(
      (res) => {
        this.receipts = res;
        this.dataSource = res;
        this.dropdownStates.length = this.receipts.length;
      }
    );
  }

  protected async delete(id: number, index: number): Promise<void> {
    this.dropdownStates[index] = false;
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this user?'
    );

    if (confirmDelete) {
      (
        await this._apiService.deleteRequest('Receipt/DeleteReceipt', id)
      ).subscribe((res) => {
        this.receipts = this.receipts.filter((x) => x.id != id);
      });
    }
  }

  createReceipt() {
    this.router.navigate(['system/create-receipt']);
  }

  editReceipt(receipt: ReceiptDto) {
    this.router.navigate(['system/edit-receipt'], { state: { receipt } });
  }

  async payment(receipt: ReceiptDto, index: number) {
    this.showPayment();
    this.receipt = receipt;
    this.dropdownStates[index] = false;
    this.getPayment(receipt.id);
  }

  async getPayment(receiptId: Number) {
    (
      await this._apiService.getRequestById(
        'Payment/GetPaymentByReceiptId',
        receiptId
      )
    ).subscribe((res) => {
      this.payments = res;
      this.dropdownStates.length = this.receipts.length;
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

  async save(): Promise<void> {
    debugger;
    this.saving = true;
    this.paymentForm.patchValue({
      receiptId: this.receipt.id,
    });

    (
      await this._apiService.postRequest(
        'Payment/AddPayment',
        this.paymentForm.value
      )
    ).subscribe(
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
    (await this._apiService.getRequest('Account/GetAccounts')).subscribe(
      (result) => {
        this.accountList = result;
      }
    );
  }

  getRemainingAmount() {
    let sendingAmount = this.paymentForm.get('sendingAmount')?.value;
    if (sendingAmount > this.receipt.remainingAmount) {
      alert('Sending amount should be less or equal then remaining amount');
      this.paymentDto.sendingAmount = 0;
      return;
    }
    this.receipt.remainingAmount = this.receipt.remainingAmount - sendingAmount;
  }

  async updateReceipt() {
    this.receipt.payments = [];
    this.receipt.lookUpId =
      this.receipt.remainingAmount > 0 ? LookUp.Partial : LookUp.Completed;
    let formDate = {
      id: this.receipt.id,
      tenantId: this.receipt.tenantId,
      lookUpId:
        this.receipt.remainingAmount > 0 ? LookUp.Partial : LookUp.Completed,
      amount: this.receipt.amount,
      isActive: true,
      memberId: this.receipt.member.id,
      remainingAmount: this.receipt.remainingAmount,
    };
    (
      await this._apiService.putRequest('Receipt/UpdateReceipt', formDate)
    ).subscribe(
      (result) => {
        this.hidePayment();
      },
      (error) => {}
    );
  }
}
