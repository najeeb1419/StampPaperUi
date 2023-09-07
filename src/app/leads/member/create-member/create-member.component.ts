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
  // @Output() onSave = new EventEmitter<any>();
  createMemberFrom: FormGroup;

  constructor(
    public _apiService: ApiProxyService,
    // public activeModal: NgbActiveModal,
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
      tenantId:[0]
    });
  }


  async save() {
    this.saving = true;
    let tenantId = localStorage.getItem("TenantId");
 console.log( this.createMemberFrom.value);
    this.createMemberFrom.patchValue({
      tenantId: Number(tenantId),
   });

    (await this._apiService.postRequest('Member/AddMember', this.createMemberFrom.value)).toPromise().then(
      () => {
        // this.notify.info(this.l('SavedSuccessfully'));
        // this.bsModalRef.hide();
        // this.onSave.emit();
      },
      () => {
        this.saving = false;
      }
    );
  }

}
