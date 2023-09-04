import { Component } from '@angular/core';
import { Dialog, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { ApiProxyService } from 'src/app/api-proxy-service';
@Component({
  selector: 'app-lead-information',
  templateUrl: './lead-information.component.html',
  styleUrls: ['./lead-information.component.scss']
})
export class LeadInformationComponent {
  leadProfileDetail: any
  LeadProfileId: number
  constructor(public dialog: Dialog, private apiService: ApiProxyService) {
    this.LeadProfileId = history.state.id;
  }
  ngOnInit() {

    this.GetLeadProfileDetail(this.LeadProfileId);



  }
  openDialog(): void {
    this.dialog.open<string>(customerConvertedPopup);
  }
  panelOpenState = true;


  async GetLeadProfileDetail(ProfileId: number) {
    (await this.apiService.getRequestById('Lead/LeadProfileDetail', ProfileId)).subscribe((result:any) => {
      this.leadProfileDetail = result;
      console.log(this.leadProfileDetail)
    });
  }
}


@Component({
  selector: 'customer-converted-popup',
  templateUrl: './customer-converted-popup.html',
  styleUrls: ['./customer-converted-popup.scss']
})

export class customerConvertedPopup {
  constructor(public dialogRef: DialogRef) { }
}
