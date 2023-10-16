import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private router:Router
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
    this.createMemberFrom.patchValue({
      tenantId: Number(tenantId),
   });

    (await this._apiService.postRequest('Member/AddMember', this.createMemberFrom.value)).toPromise().then(
      () => {
        this.router.navigate(['system/member']);
      },
      () => {
        this.saving = false;
      }
    );
  }

}
