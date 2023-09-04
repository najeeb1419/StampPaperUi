import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MemberDto } from 'src/app/Models/MemberDto';
import { ApiProxyService } from 'src/app/api-proxy-service';

@Component({
  selector: 'app-create-member',
  templateUrl: './create-member.component.html',
  styleUrls: ['./create-member.component.css']
})
export class CreateMemberComponent  implements OnInit {

  saving = false;
  member = new MemberDto();
  @Output() onSave = new EventEmitter<any>();

  constructor(
    public _apiService: ApiProxyService,
    public activeModal: NgbActiveModal
  ) {
  }

  ngOnInit() {
    this.member.isActive = true;
  }


  async save() {
    this.saving = true;

    (await this._apiService.putRequest('Member/AddMember', this.member)).subscribe(
      () => {
        // this.notify.info(this.l('SavedSuccessfully'));
        // this.bsModalRef.hide();
        this.onSave.emit();
      },
      () => {
        this.saving = false;
      }
    );
  }

}
