import { Component } from '@angular/core';
import { ApiProxyService } from 'src/app/api-proxy-service';

@Component({
  selector: 'app-all-lead',
  templateUrl: './all-lead.component.html',
  styleUrls: ['./all-lead.component.scss']
})
export class AllLeadComponent {
  LeadsCount: any[] = []
  constructor(private apiService: ApiProxyService) {

  }
  async ngOnInit() {
    // let tenantId = Number(localStorage.getItem("TenantId"));
    // (await this.apiService.getRequestById('Lead/LeadDashboard?TenantId=', tenantId)).subscribe((result) => {
    //   this.LeadsCount = result;
    // });


  }
}
