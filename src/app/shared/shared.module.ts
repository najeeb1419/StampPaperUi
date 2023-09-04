import { NgModule } from '@angular/core';
import { SharedRoutingModule } from './shared-routing.module';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MaterialModule } from 'src/material.module';
import { LayoutComponent } from './layout/layout.component';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import {MatTabsModule} from '@angular/material/tabs';
import { DialogModule } from '@angular/cdk/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    LayoutComponent,

    // Other declarations...
  ],
  imports: [
    SharedRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    DialogModule,
    MatExpansionModule,
    MatMenuModule,
    MatProgressBarModule,
    EditorModule,
    NgbModule

    // NgIf and NgFor should NOT be imported here.
  ],
  exports: [
    FontAwesomeModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MaterialModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    DialogModule,
    MatExpansionModule,
    MatMenuModule,
    MatProgressBarModule,
    // NgIf and NgFor should NOT be exported here.

    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    EditorModule,
    NgbModule,

  ],
})
export class SharedModule { }
