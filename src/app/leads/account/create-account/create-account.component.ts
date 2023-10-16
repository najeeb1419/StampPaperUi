import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountModel } from 'src/app/Models/account-model';
import { ApiProxyService } from 'src/app/api-proxy-service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent  {
  saving = false;
  account = new AccountModel();
  createAccountFrom: FormGroup;
  constructor(
    private _apiService: ApiProxyService,
    private router:Router,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.account.isActive = true;
    this.createAccountFrom = this.formBuilder.group({
      name: ['', Validators.required],
      accountNo: ['', Validators.required],
      isActive: [true, Validators.required],
      tenantId:[0, Validators.required]
    });;
  }


  async save(): Promise<void> {
    this.saving = true;
    let tenantId = localStorage.getItem("TenantId");
    this.createAccountFrom.patchValue({
      tenantId: Number(tenantId),
   });
    (await this._apiService.postRequest('Account/AddAccount', this.createAccountFrom.value)).subscribe(
      () => {
        this.router.navigate(['system/account']);
      () => {
        this.saving = false;
      }
  });
  }

}
