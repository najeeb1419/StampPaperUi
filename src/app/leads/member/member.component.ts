import { Component } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { CreateMemberComponent } from './create-member/create-member.component';
import { EditMemberComponent } from './edit-member/edit-member.component';
import { ApiProxyService } from 'src/app/api-proxy-service';
import { MemberDto } from 'src/app/Models/MemberDto';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css'],
  animations: [appModuleAnimation()]
})
export class MemberComponent  {

  members: MemberDto[] = [];
  keyword = '';
  isActive: string;
  advancedFiltersVisible = false;

  constructor(
    private _apiService: ApiProxyService,
    private modalService: NgbModal
  ) {
    this.getMembers();
  }



  async getMembers(){
    (await this._apiService.getRequest('Member/GetMembers')).subscribe(res=>{
      this.members = res;
    })
  }


  protected async delete(user: MemberDto): Promise<void> {

          (await this._apiService.deleteRequest('', user.id)).subscribe(() => {

          });

  }


  createMember(): void {
    const modalRef = this.modalService.open(CreateMemberComponent);
    // You can pass data to the modal using modalRef.componentInstance
    modalRef.componentInstance.data = { };
  }

  editMember(user: MemberDto): void {
    const modalRef = this.modalService.open(EditMemberComponent);
    // You can pass data to the modal using modalRef.componentInstance
    modalRef.componentInstance.data = { user};
  }

}
function appModuleAnimation(): any {
  throw new Error('Function not implemented.');
}

