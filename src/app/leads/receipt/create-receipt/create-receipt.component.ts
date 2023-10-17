import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as converter from 'number-to-words';
import { LookUp } from 'src/app/Models/LookUp';
import { MemberDto } from 'src/app/Models/MemberDto';
import { ReceiptDto } from 'src/app/Models/ReceiptDto';
import { ApiProxyService } from 'src/app/api-proxy-service';

@Component({
  selector: 'app-create-receipt',
  templateUrl: './create-receipt.component.html',
  styleUrls: ['./create-receipt.component.scss'],
})
export class CreateReceiptComponent implements OnInit {
  saving = false;
  receipt = new ReceiptDto();
  members: MemberDto[] = [];
  member = new MemberDto();
  amountInWords: string = '';
  createReceiptFrom: FormGroup;
  @ViewChild('printContent') printContentElementRef!: ElementRef;

  constructor(
    public _apiService: ApiProxyService,
    private formBuilder: FormBuilder,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.receipt.isActive = true;
    this.getMemberList();
    this.createReceiptFrom = this.formBuilder.group({
      name: ['', Validators.required],
      memberId: [0, Validators.required],
      accountNo: [0, Validators.required],
      address: [''],
      cnic: [''],
      amount: [null, Validators.required],
      amountInWords: [null, Validators.required],
      isActive: [true],
      tenantId: [localStorage.getItem("TenantId")],
      lookUpId: [LookUp.Pending],
      remainingAmount:[null]
    });
  }

  async save(): Promise<void> {
    this.createReceiptFrom.patchValue({
      remainingAmount:this.createReceiptFrom.get("amount")?.value
    })

    this.saving = true;
    (
      await this._apiService.postRequest('Receipt/AddReceipt', this.createReceiptFrom.value)
    ).subscribe(
      () => {


        this.printPage()
        this.router.navigate(['system/receipt']);
      },
      () => {
        this.saving = false;
      }
    );
  }




  async getMemberList() {
    (await this._apiService.getRequest('Member/GetMembers')).subscribe(
      (res: any) => {
        this.members = res;
      }
    );
  }

  async getMember() {
    (
      await this._apiService.getRequestById(
        'Member/MemberGetById',
        this.createReceiptFrom.get('memberId')?.value
      )
    ).subscribe((res) => {
      this.member = res;
      this.createReceiptFrom.patchValue({
        name: this.member.name,
        memberId: this.member.id,
        accountNo: this.member.accountNo,
        address: this.member.address,
        cnic: this.member.cnic
      });
    });
  }

  changeAmountToWords() {
    this.createReceiptFrom.patchValue({
      amountInWords: converter.toWords(this.createReceiptFrom.get("amount")?.value)
    })
  }

  async printPage() {
    const printContent = this.printContentElementRef.nativeElement.innerHTML;

    const printWindow = window.open('', '', 'width=1000,height=1000') as Window;
    printWindow.document.open();
    printWindow?.document.write(`
      <html>
      <head>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <title>Contact:03061290890</title>
      </head>
      <body>
        ${printContent}
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
      </body>
      </html>
    `);

    printWindow.addEventListener('afterprint', () => {
      printWindow.close();
    });
}


}
