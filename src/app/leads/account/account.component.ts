import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountModel } from 'src/app/Models/account-model';
import { ApiProxyService } from 'src/app/api-proxy-service';
import { CreateAccountComponent } from './create-account/create-account.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  accounts: AccountModel[] = [];
  keyword = '';
  isActive: string;
  advancedFiltersVisible = false;
  title = 'appBootstrap';

  closeResult: string;
  @Input() data: any;
  constructor(
    private _apiService: ApiProxyService,
    private router:Router
  ) {
    this.getAccounts()
  }

  async getAccounts() {
    (await this._apiService.getRequest('Account/getAccounts')).subscribe(
      (res: any) => {
        this.accounts = res;
      }
    );
  }

  async remove(id: number) {

    const confirmDelete = window.confirm('Are you sure you want to delete this user?');

    if (confirmDelete) {
      (await this._apiService.deleteRequest('Account/DeleteAccount', id)).subscribe(
        (res) => {
          this.accounts = this.accounts.filter(x=>x.id !==id);
        }
      );
    }
  }


  createAccount(): void {
    this.router.navigate(['system/create-account']);
  }

  editAccount(account: AccountModel): void {
    this.router.navigate(['system/edit-account'], { state: { account } });
  }


}


