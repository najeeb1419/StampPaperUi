import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BankEmployeeDto } from 'src/app/Models/BankEmployeeDto';
import { ApiProxyService } from 'src/app/api-proxy-service';

@Component({
  selector: 'app-bank-employee',
  templateUrl: './bank-employee.component.html',
  styleUrls: ['./bank-employee.component.scss']
})
export class BankEmployeeComponent {


  bankEmployees: BankEmployeeDto[] = [];
  keyword = '';
  isActive: string;
  advancedFiltersVisible = false;

  constructor(
    private _apiService: ApiProxyService,
    private router:Router
  ) {
    this.getBankEmployees();
  }



  async getBankEmployees(){
   let response =await  (await this._apiService.getRequest('BankEmployee/GetBankEmployees')).toPromise();
      this.bankEmployees = response as any[];
  }


  async remove(id: number) {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');

    if (confirmDelete) {
      (await this._apiService.deleteRequest('BankEmployee/DeleteBankEmployee', id)).subscribe(
        (res) => {
          this.bankEmployees = this.bankEmployees.filter(x=>x.id !=id);
        }
      );
    }
  }


  createBankEmployee(): void {
    this.router.navigate(['system/create-bank-employee']);
  }

  editBankEmployee(user: BankEmployeeDto): void {
    this.router.navigate(['system/edit-bank-employee'], { state: { user } });
  }

}

