import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MemberDto } from 'src/app/Models/MemberDto';
import { ApiProxyService } from 'src/app/api-proxy-service';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.css']
})

export class EditMemberComponent  implements OnInit {

  saving = false;
  member = new MemberDto();
  @Output() onSave = new EventEmitter<any>();
  id: number;

  constructor(
    injector: Injector,
    public apiService: ApiProxyService,
    public activeModal: NgbActiveModal
  ) {
  }

  async ngOnInit(): Promise<void> {
    (await this.apiService.getRequestById('', this.id)).subscribe((result:any) => {
      this.member = result;
    });
  }


  async save(): Promise<void> {
    this.saving = true;

    (await this.apiService.putRequest('', this.member)).subscribe(
      () => {
        this.onSave.emit();
      },
      () => {
        this.saving = false;
      }
    );
  }

}

