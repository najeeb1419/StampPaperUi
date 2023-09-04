import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountModel } from 'src/app/Models/account-model';
import { ApiProxyService } from 'src/app/api-proxy-service';
import { CreateAccountComponent } from './create-account/create-account.component';
import { EditAccountComponent } from './edit-account/edit-account.component';

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
    private modalService: NgbModal
  ) {
    this.getAll()
  }

  async getAll() {
    (await this._apiService.getRequest('Account/getAccounts')).subscribe(
      (res: any) => {
        this.accounts = res;
      }
    );
  }

  openModal() {
    const modalRef = this.modalService.open(CreateAccountComponent);
    // You can pass data to the modal using modalRef.componentInstance
    modalRef.componentInstance.data = { };
  }

  editAccount(data?:AccountModel) {
    const modalRef = this.modalService.open(EditAccountComponent);
    // You can pass data to the modal using modalRef.componentInstance
    modalRef.componentInstance.data = { data};
  }

  // protected delete(user: AccountModel): void {
  //   abp.message.confirm(
  //     this.l('UserDeleteWarningMessage', user.name),
  //     undefined,
  //     (result: boolean) => {
  //       if (result) {
  //         this._accountService.deleteSubAccount(user.id).subscribe(() => {
  //           abp.notify.success(this.l('SuccessfullyDeleted'));
  //           this.refresh();
  //         });
  //       }
  //     }
  //   );
  // }

  // createAccount(): void {
  //   this.showCreateOrEditAccountDialog();
  // }

  // editAccount(user: AccountModel): void {
  //   this.showCreateOrEditAccountDialog(user.id);
  // }

  // private showCreateOrEditAccountDialog(id?: number): void {
  //   let createOrEditUserDialog: BsModalRef;
  //   if (!id) {
  //     createOrEditUserDialog = this._modalService.show(CreateAccountComponent, {
  //       class: 'modal-lg',
  //     });
  //   } else {
  //     createOrEditUserDialog = this._modalService.show(EditAccountComponent, {
  //       class: 'modal-lg',
  //       initialState: {
  //         id: id,
  //       },
  //     });
  //   }

  //   // createOrEditUserDialog.content.onSave.subscribe(() => {
  //   //   this.refresh();
  //   // });
  // }
}
