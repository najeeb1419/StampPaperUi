import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadsRoutingModule } from './lead-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LeadsTableComponent } from './lead-table/lead-table.component';
import { AllLeadComponent } from './lead-dashboard/all-lead.component';
import { LeadsComponent } from './lead.component';
import { ProfileComponent } from './profile/profile.component';
import { LeadInformationComponent } from './lead-information/lead-information.component';
import { AddNewTaskComponent } from './add-new-task/add-new-task.component';
import { CreateLeadComponent } from './create-lead/create-lead.component';
import { NotesComponent } from './notes/notes.component';
import { ProposalComponent } from './proposal/proposal.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { AccountComponent } from './account/account.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { EditAccountComponent } from './account/edit-account/edit-account.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AllLeadComponent,
    LeadsTableComponent,
    LeadsComponent,
    ProfileComponent,
    LeadInformationComponent,
    AddNewTaskComponent,
    CreateLeadComponent,
    NotesComponent,
    ProposalComponent,
    UploadFileComponent,
    AccountComponent,
    CreateAccountComponent,
    EditAccountComponent


  ],
  imports: [
    CommonModule,
    LeadsRoutingModule,
    SharedModule,

    // Only import modules specific to LeadsModule, not CommonModule or BrowserModule.
  ],
})
export class LeadsModule { }
