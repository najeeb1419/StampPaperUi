import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountModel } from 'src/app/Models/account-model';
import { ApiProxyService } from 'src/app/api-proxy-service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent {
  @Input() data: AccountModel;
  saving = false;

  account = new AccountModel();
  constructor(
    public _apiService: ApiProxyService,
    public activeModal: NgbActiveModal
  ) {

  }

  ngOnInit(): void {
    this.account.isActive = true;
    console.log("account data ", this.data); // Add this line to check the value of data
    this.account=this.data;
    console.log("form account data ", this.data);
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
