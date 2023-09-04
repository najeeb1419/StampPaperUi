
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { ApiProxyService } from 'src/app/api-proxy-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lead-table',
  templateUrl: './lead-table.component.html',
  styleUrls: ['./lead-table.component.scss']
})
export class LeadsTableComponent {
  displayedColumns: string[] = ['select','id', 'name', 'company', 'email', 'phone', 'tags'];
  dataSource1 = new MatTableDataSource();
  selection = new SelectionModel<any>(true, []);
  AllLeads :any[]=[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort
constructor(private apiService :ApiProxyService ,private route:Router){

}
 ngOnInit() {




}
  ngAfterViewInit() {
   debugger
   let tenantId = Number(localStorage.getItem("TenantId"));
   this.GetAllLeads(tenantId)
    this.dataSource1 = new MatTableDataSource(this.AllLeads);
    this.dataSource1.paginator = this.paginator;

 
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
  }
   /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource1.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource1.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  async GetAllLeads(TenantId:number) {
    (await this.apiService.getRequestById('Lead/GetLeadProfile?TenantId=', 2)).subscribe((result:any) => {
      this.AllLeads = result;
      this.dataSource1 = new MatTableDataSource(this.AllLeads);
      this.dataSource1.paginator = this.paginator;
    });
}
getRecord(id :number){

  this.route.navigate(['leads/profile'], { state: { id } });
}
}


