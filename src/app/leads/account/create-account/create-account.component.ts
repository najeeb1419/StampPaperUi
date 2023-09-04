import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  constructor(
    public _apiService: ApiProxyService,
    public activeModal: NgbActiveModal
  ) {
  }

  ngOnInit(): void {
    this.account.isActive = true;
  }


  async save(): Promise<void> {
    this.saving = true;
    (await this._apiService.postRequest('Account/AddAccount', this.account)).subscribe(
      () => {
        this.activeModal.dismiss();
      },
      () => {
        this.saving = false;
      }
    );
  }

}
