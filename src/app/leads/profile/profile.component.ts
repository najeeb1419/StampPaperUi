import { Component } from '@angular/core';
import { ApiProxyService } from 'src/app/api-proxy-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  generalInfo = false;
  customFields = false;
  attachments = false;
  leadProfileDetail: any;
  LeadProfileId: number;
  constructor(private apiService: ApiProxyService) {
    this.LeadProfileId = history.state.id;
  }
  ngOnInit() {
    this.GetLeadProfileDetail(this.LeadProfileId);
  }

  async GetLeadProfileDetail(ProfileId: number) {
    (await this.apiService
      .getRequestById('Lead/LeadProfileDetail?LeadProfileId=', ProfileId))
      .subscribe((result:any) => {
        this.leadProfileDetail = result;
        console.log(this.leadProfileDetail);
      });
  }
}
