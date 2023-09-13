import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MemberDto } from 'src/app/Models/MemberDto';
import { ApiProxyService } from 'src/app/api-proxy-service';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.scss']
})

export class EditMemberComponent  implements OnInit {

  saving = false;
  member = new MemberDto();
  @Output() onSave = new EventEmitter<any>();
  id: number;
  editMemberFrom: FormGroup;


  constructor(
    public apiService: ApiProxyService,
    private formBuilder: FormBuilder,
    private router:Router
  ) {
    this.member=history.state.user;

  }

  async ngOnInit(): Promise<void> {
    this.editMemberFrom = this.formBuilder.group({
      id:[this.member.id],
      name: [this.member.name, Validators.required],
      contactNo: [this.member.contactNo, Validators.required],
      accountNo: [this.member.accountNo, Validators.required],
      address: [this.member.address],
      cnic: [this.member.cnic],
      isActive: [this.member.isActive],
      tenantId:[this.member.tenantId]
    });
  }


  async save(): Promise<void> {
    this.saving = true;

    (await this.apiService.putRequest('Member/UpdateMember', this.editMemberFrom.value)).subscribe(
      () => {
        this.router.navigate(['leads/member']);
      },
      () => {
        this.saving = false;
      }
    );
  }

}

