import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountModel } from 'src/app/Models/account-model';
import { ApiProxyService } from 'src/app/api-proxy-service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent {
  account:AccountModel= new AccountModel();
  saving = false;
  editAccountFrom: FormGroup;

  constructor(
    public _apiService: ApiProxyService,
    private formBuilder: FormBuilder,
    private router:Router,
  ) {
    this.account=history.state.account;
  }

  ngOnInit(): void {
    this.account.isActive = true;
    this.editAccountFrom = this.formBuilder.group({
      id:[this.account.id],
      name:[this.account.name],
      accountNo: [this.account.accountNo],
      isActive: [this.account.isActive],
      tenantId:[this.account.tenantId]
    });;
  }


  async save(): Promise<void> {
    this.saving = true;
    (await this._apiService.putRequest('Account/UpdateAccount', this.editAccountFrom.value)).subscribe(
      () => {
        this.router.navigate(['leads/account']);
      },
      () => {
        this.saving = false;
      }
    );
  }
}
