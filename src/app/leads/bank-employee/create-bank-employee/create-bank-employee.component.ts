import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BankEmployeeDto } from 'src/app/Models/BankEmployeeDto';
import { ApiProxyService } from 'src/app/api-proxy-service';

@Component({
  selector: 'app-create-bank-employee',
  templateUrl: './create-bank-employee.component.html',
  styleUrls: ['./create-bank-employee.component.scss']
})
export class CreateBankEmployeeComponent implements OnInit {

  saving = false;
  bankEmployee = new BankEmployeeDto();
  // @Output() onSave = new EventEmitter<any>();
  createBankEmployeeFrom: FormGroup;

  constructor(
    public _apiService: ApiProxyService,
    // public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private router:Router
  ) {
  }

  ngOnInit() {
    this.bankEmployee.isActive = true;
    this.createBankEmployeeFrom = this.formBuilder.group({
      name: ['', Validators.required],
      contactNo: ['', Validators.required],
      accountNo: ['', Validators.required],
      address: [''],
      cnic: [''],
      isActive: [true],
      tenantId:[0]
    });
  }


  async save() {
    this.saving = true;
    let tenantId = localStorage.getItem("TenantId");
    this.createBankEmployeeFrom.patchValue({
      tenantId: Number(tenantId),
   });

    (await this._apiService.postRequest('BankEmployee/AddBankEmployee', this.createBankEmployeeFrom.value)).toPromise().then(
      () => {
        this.router.navigate(['system/bank-employee']);
      },
      () => {
        this.saving = false;
      }
    );
  }

}
