import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  createLeadFrom: FormGroup;

  constructor(
    public _apiService: ApiProxyService,
    public activeModal: NgbActiveModal
  ) {
  }

  ngOnInit() {
    this.member.isActive = true;
    this.createLeadFrom = this.formBuilder.group({
      leadStatusId: [null, Validators.required],
      leadSourceId: [null, Validators.required],
      assignedId: [null, Validators.required],
      name: ['', Validators.required],
      position: [''],
      address: [''],
      cityId: [null, Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      state: [''],
      website: [''],
      countryId: [null, Validators.required],
      phoneNo: ['', Validators.required],
      zipCode: [''],
      company: [''],
      description: [''],
      publicLead: [false],
      contactedToday: [false],
      iBOBussinessType: [''],
      businessTypeId: [null, Validators.required],
      businessNo: [''],
      referredBy: [''],
      secondayPhoneNo: [''],
      iBOEmailAddress: ['', [Validators.required, Validators.email]],
      preferredTimeForCallBackId: [null, Validators.required],
      languageId: [null, Validators.required],
      leadProfileServices: new FormArray([]),

      confirmRequestAuthorization: [false, Validators.requiredTrue],


    });
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
