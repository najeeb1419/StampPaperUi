import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MemberDto } from 'src/app/Models/MemberDto';
import { ApiProxyService } from 'src/app/api-proxy-service';

@Component({
  selector: 'app-create-member',
  templateUrl: './create-member.component.html',
  styleUrls: ['./create-member.component.scss']
})
export class CreateMemberComponent  implements OnInit {

  saving = false;
  member = new MemberDto();
  @Output() onSave = new EventEmitter<any>();
  createMemberFrom: FormGroup;

  constructor(
    public _apiService: ApiProxyService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.member.isActive = true;
    this.createMemberFrom = this.formBuilder.group({
      name: ['', Validators.required],
      contactNo: ['', Validators.required],
      accountNo: ['', Validators.required],
      address: [''],
      cnic: [''],
      isActive: [true],
      tenantId:[null]
    });
  }


  async save() {
    this.saving = true;
    let tenantId = localStorage.getItem("TenantId");

    this.createMemberFrom.patchValue({
      tenantId: Number(tenantId),
      name: Number(this.createMemberFrom.value.name),
      contactNo: Number(this.createMemberFrom.value.contactNo),
      accountNo: Number(this.createMemberFrom.value.accountNo),
      address: this.createMemberFrom.value.address,
      cnic: this.createMemberFrom.value.cnic,
      isActive: this.createMemberFrom.value.isActive,
   });

    (await this._apiService.putRequest('Member/AddMember', this.createMemberFrom)).subscribe(
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
