import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BankEmployeeDto } from 'src/app/Models/BankEmployeeDto';
import { ApiProxyService } from 'src/app/api-proxy-service';

@Component({
  selector: 'app-edit-bank-employee',
  templateUrl: './edit-bank-employee.component.html',
  styleUrls: ['./edit-bank-employee.component.scss']
})
export class EditBankEmployeeComponent implements OnInit {

  saving = false;
  bankEmployee = new BankEmployeeDto();
  @Output() onSave = new EventEmitter<any>();
  id: number;
  editBankEmployeeFrom: FormGroup;


  constructor(
    public apiService: ApiProxyService,
    private formBuilder: FormBuilder,
    private router:Router
  ) {
    this.bankEmployee=history.state.user;

  }

  async ngOnInit(): Promise<void> {
    this.editBankEmployeeFrom = this.formBuilder.group({
      id:[this.bankEmployee.id],
      name: [this.bankEmployee.name, Validators.required],
      contactNo: [this.bankEmployee.contactNo, Validators.required],
      accountNo: [this.bankEmployee.accountNo, Validators.required],
      address: [this.bankEmployee.address],
      cnic: [this.bankEmployee.cnic],
      isActive: [this.bankEmployee.isActive],
      tenantId:[this.bankEmployee.tenantId]
    });
  }


  async save(): Promise<void> {
    this.saving = true;

    (await this.apiService.putRequest('BankEmployee/UpdateBankEmployee', this.editBankEmployeeFrom.value)).subscribe(
      () => {
        this.router.navigate(['leads/bank-employee']);
      },
      () => {
        this.saving = false;
      }
    );
  }

}

