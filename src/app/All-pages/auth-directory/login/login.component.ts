import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login-model';
import { ApiProxyService } from 'src/app/api-proxy-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  Password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  hide = true;
  message = '';
  constructor(private _apiProxyService: ApiProxyService, private route: Router) { }


  ngOnInit(): void {
  }

  async loginUser() {
    debugger
    let user= new Login()
    user.email=this.email.value?.toString();
    user.password=this.Password.value?.toString();
    (await this._apiProxyService.postRequest('User/Authenticate', user)).subscribe(result => {
      console.log(result);
      debugger
      localStorage.setItem('userId', result.user.id);
      localStorage.setItem('TenantId', result.user.tenantId);
      localStorage.setItem('userToken',result.token)
      this.route.navigate(['/leads']);
    }, () => {
      this.message = "User name or password incorrect."
    })
  }
}
