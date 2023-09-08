import { Component } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { CreateMemberComponent } from './create-member/create-member.component';
import { EditMemberComponent } from './edit-member/edit-member.component';
import { ApiProxyService } from 'src/app/api-proxy-service';
import { MemberDto } from 'src/app/Models/MemberDto';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';



@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
})
export class MemberComponent  {

  members: MemberDto[] = [];
  keyword = '';
  isActive: string;
  advancedFiltersVisible = false;

  constructor(
    private _apiService: ApiProxyService,
    private router:Router
  ) {
    this.getMembers();
  }



  async getMembers(){
   let response =await  (await this._apiService.getRequest('Member/GetMembers')).toPromise();
      this.members = response as any[];
  }


  async remove(id: number) {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');

    if (confirmDelete) {
      (await this._apiService.deleteRequest('Member/DeleteMember', id)).subscribe(
        (res) => {
          this.getMembers();
        }
      );
    }
  }


  createMember(): void {
    this.router.navigate(['leads/create-member']);
  }

  editMember(user: MemberDto): void {
    this.router.navigate(['leads/edit-member'], { state: { user } });
  }

}

