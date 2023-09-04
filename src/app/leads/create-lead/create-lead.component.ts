import { HttpErrorResponse } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, Renderer2, ViewChild, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { addCityDropDownModel, addDropDownModel } from 'src/app/models/add-DropDown-Model';
import { SelectItemModel } from 'src/app/models/select-item-model';
import { ApiProxyService } from 'src/app/api-proxy-service';

@Component({
  selector: 'app-create-lead',
  templateUrl: './create-lead.component.html',
  styleUrls: ['./create-lead.component.scss'],
})
export class CreateLeadComponent implements OnInit {
  @ViewChild('createLeadFrom') createLead: ElementRef;
  leadStatus: SelectItemModel[] = [];
  sources: SelectItemModel[] = [];
  Languages: SelectItemModel[] = [];
  BusinessTypeList: SelectItemModel[] = [];
  PreferredTimeCallBackList: SelectItemModel[] = [];
  checkboxLabels: SelectItemModel[] = [];
  Countries: any[] = [];
  CitiesList: any[] = [];
  createLeadFrom: FormGroup;
  newStatusForm: FormGroup;
  newSourceForm: FormGroup;
  newCityForm: FormGroup;
  BusinessTypeForm: FormGroup;
  NewLanguageForm: FormGroup;
  PreferredTimeCallBackForm: FormGroup;
  isCountrySelected: boolean = false;
  CompanyUserList: any;
  servicesList: any[] = [];

  constructor(
    private apiService: ApiProxyService,
    private formBuilder: FormBuilder,
    private router: Router,
    private renderer: Renderer2
  ) { }



  ngOnInit(): void {
    this.getServices();
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


    this.getLeadStatus();
    this.newLeadstatus();
    this.getSource();
    this.newLeadSource();
    this.getCountries();
    this.GetBusinessType()
    this.newBusinessType();
    this.GetGetPreferredTimeCallBack()
    this.NewPreferredTimeCallBack();
    this.getAssigned();
    this.getLanguage();
    this.newLanguage();


  }

  async onSubmit() {

    if (this.createLeadFrom.valid) {
      let tenantId = localStorage.getItem("TenantId");
      let values = this.createLeadFrom.value
      const leadProfileServicesArray = this.servicesList;
      console.log(this.createLeadFrom.value);
      const formData = {
        tenantId: Number(tenantId),
        leadStatusId: Number(this.createLeadFrom.value.leadStatusId),
        leadSourceId: Number(this.createLeadFrom.value.leadSourceId),
        assignedId: Number(this.createLeadFrom.value.assignedId),
        name: this.createLeadFrom.value.name,
        position: this.createLeadFrom.value.position,
        address: this.createLeadFrom.value.address,
        cityId: Number(this.createLeadFrom.value.cityId),
        emailAddress: this.createLeadFrom.value.emailAddress,
        state: this.createLeadFrom.value.state,
        website: this.createLeadFrom.value.website,
        countryId: Number(this.createLeadFrom.value.countryId),
        phoneNo: this.createLeadFrom.value.phoneNo,
        zipCode: this.createLeadFrom.value.zipCode,
        company: this.createLeadFrom.value.company,
        description: this.createLeadFrom.value.description,
        publicLead: this.createLeadFrom.value.publicLead,
        contactedToday: this.createLeadFrom.value.contactedToday,
        iBOBussinessType: this.createLeadFrom.value.iBOBussinessType,
        businessTypeId: Number(this.createLeadFrom.value.businessTypeId),
        businessNo: this.createLeadFrom.value.businessNo,

        languageId: this.createLeadFrom.value.languageId,
        iBOEmailAddress: this.createLeadFrom.value.iBOEmailAddress,
        secondayPhoneNo: this.createLeadFrom.value.secondayPhoneNo,
        referredBy: this.createLeadFrom.value.referredBy,

        PreferTimeToCallId: Number(this.createLeadFrom.value.preferredTimeForCallBackId),
        leadProfileServices: leadProfileServicesArray,
        confirmRequestAuthorization: this.createLeadFrom.value.confirmRequestAuthorization,
        creatorUserId: Number(localStorage.getItem("userId"))
      };

      (await this.apiService.postRequest('Lead/AddLeadProfile', formData)).subscribe((res:any) => {

        this.router.navigate(['/leads']);
      });

    }
    else {
      this.markFormGroupAsTouched(this.createLeadFrom);

      const firstInvalidControl = this.getFirstInvalidControl(this.createLeadFrom);
      if (firstInvalidControl) {
        firstInvalidControl.focus();
        // Optionally, you can also scroll to the invalid control's position here
      }
    }
  }

  private getFirstInvalidControl(formGroup: FormGroup): HTMLElement | null {
    const controls = formGroup.controls;
    for (const controlName in controls) {
      if (controls.hasOwnProperty(controlName) && controls[controlName].invalid) {
        const invalidControl = document.querySelector(`[formControlName=${controlName}]`);
        return invalidControl as HTMLElement;
      }
    }
    return null;
  }

  private markFormGroupAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupAsTouched(control);
      }
    });
  }

  updateName(event: any, id: number) {
    debugger
    const isChecked = event.target.checked;
    const checkboxValue = id // assuming you want to get the formControlName attribute
    if (isChecked) {
      let tenantId = localStorage.getItem("TenantId");
      var Service: any = {};
      Service.tenantId = Number(tenantId);
      Service.serviceId = checkboxValue
      Service.profileId = 0;
      this.servicesList.push(Service);
      console.log(this.servicesList)
    }
    else {
      let findServiceIndex = this.servicesList.findIndex(p => p.serviceId === id);

      if (findServiceIndex !== -1) {
        this.servicesList.splice(findServiceIndex, 1);
        // Alternatively, you can use pop to remove the last element
        // this.servicesList.pop();
      }

    }
  }


  private addCheckboxesToForm() {

    this.checkboxLabels.forEach((value) => {

      // Determine whether this checkbox should be initially selected based on apiCheckboxValues

      const isSelected = this.servicesList.includes(value.value);
      this.LeadServices.push(new FormControl(isSelected));
    });
  }
  get LeadServices() {
    return this.createLeadFrom.get('leadProfileServices') as FormArray;
  }
  getCheckboxValues() {
    const checkboxValues = this.LeadServices.controls.map(control => control.value);
    // console.log('Checkbox Values:', checkboxValues);
    return JSON.stringify(checkboxValues);
  }
  async getServices() {
    (await this.apiService.getRequest('Setup/GetService')).subscribe((result:any) => {

      this.checkboxLabels = result;


      this.addCheckboxesToForm()

    });
  }

  newLeadstatus() {
    this.newStatusForm = this.formBuilder.group({
      name: ['', Validators.required],
      // Other form controls...
    });
  }


  async getLeadStatus() {
    (await this.apiService.getRequest('Setup/GetLeadStatusList')).subscribe((result:any) => {
      this.leadStatus = result;

    });
  }

  async getAssigned() {
    (await this.apiService.getRequestById('User/UserGetByTenant?TenantId=', 2)).subscribe((result:any) => {
      this.CompanyUserList = result;
    });
  }
  async LeadStatusSubmit() {
    if (this.newStatusForm.valid) {
      let dropDown = new addDropDownModel()
      let tenantId = localStorage.getItem("TenantId");
      let userId = localStorage.getItem("userId");
      dropDown.creatorUserId = Number(userId);
      dropDown.tenantId = Number(tenantId);
      dropDown.name = this.newStatusForm.value.name;

      (await this.apiService.postRequest('Setup/AddLeadStatus', dropDown)).subscribe((result:any) => {
        this.getLeadStatus();
        this.createLeadFrom.get('leadStatusId')?.setValue(result);
      }
      );


    }

  }

  newLeadSource() {
    this.newSourceForm = this.formBuilder.group({
      name: ['', Validators.required],
      // Other form controls...
    });
  }
  async getSource() {
    (await this.apiService.getRequest('Setup/GetLeadSourceList')).subscribe((result:any) => {
      this.sources = result;
    });
  }
  async LeadSourceSubmit() {
    debugger
    if (this.newSourceForm.valid) {
      let dropDown = new addDropDownModel()
      let tenantId = localStorage.getItem("TenantId");
      let userId = localStorage.getItem("userId");
      dropDown.creatorUserId = Number(userId);
      dropDown.tenantId = Number(tenantId);
      dropDown.name = this.newSourceForm.value.name;

      (await this.apiService.postRequest('Setup/AddLeadSource', dropDown)).subscribe((res:any) => {

        this.getSource();
        this.createLeadFrom.get('leadSourceId')?.setValue(res);
      });
    }
  }

  async getCountries() {
    (await this.apiService.getRequest('Setup/GetCountries')).subscribe((result:any) => {
      this.Countries = result;
    });
  }
  onCountryChange(): void {
    const countryId = this.createLeadFrom.get('countryId')?.value;
    const selectedCountry = this.Countries.find(country => country.id == countryId);
    this.getCities(countryId)
    debugger
    if (selectedCountry) {
      this.createLeadFrom.get('cityId')?.enable();
      this.isCountrySelected = true;
    } else {
      this.createLeadFrom.get('cityId')?.disable();
      this.isCountrySelected = false;
    }
    this.newCity()
  }
  newCity() {
    this.newCityForm = this.formBuilder.group({
      name: ['', Validators.required]
      // Other form controls...
    });
  }
  async getCities(countryId: number) {
    (await this.apiService.getRequestById('Setup/GetCitiesList?CountryId=', countryId)).subscribe((result:any) => {
      this.CitiesList = result;

    });
  }

  async SubmitCity() {
    debugger
    if (this.newCityForm.valid) {
      const countryId = this.createLeadFrom.get('countryId')?.value;
      let dropDown = new addCityDropDownModel()
      let tenantId = localStorage.getItem("TenantId");
      let userId = localStorage.getItem("userId");
      dropDown.creatorUserId = Number(userId);
      dropDown.tenantId = Number(tenantId);
      dropDown.countryId = countryId;
      dropDown.name = this.newCityForm.value.name;

      await (await this.apiService.postRequest('Setup/AddCity', dropDown)).subscribe(res => {
        let Countryid = this.createLeadFrom.get('countryId');
        let countryNumber = Number(countryId)
        this.getCities(countryNumber);
        this.createLeadFrom.get('cityId')?.setValue(res);
      },
        (error) => {
          console.error('API Error:', error);
          // Handle the error as needed.
        });
    }
  }

  async GetBusinessType() {
    (await this.apiService.getRequest('Setup/GetBusinessType')).subscribe((result:any) => {
      this.BusinessTypeList = result;

    });
  }
  newBusinessType() {
    this.BusinessTypeForm = this.formBuilder.group({
      name: ['', Validators.required],
      // Other form controls...
    });
  }
  async BusinessTypeSubmit() {
    if (this.BusinessTypeForm.valid) {
      let dropDown = new addDropDownModel()
      let tenantId = localStorage.getItem("TenantId");
      let userId = localStorage.getItem("userId");
      dropDown.creatorUserId = Number(userId);
      dropDown.tenantId = Number(tenantId);
      dropDown.name = this.BusinessTypeForm.value.name;
      (await this.apiService.postRequest('Setup/AddBusinessType', dropDown)).subscribe((result:any) => {
        this.createLeadFrom.get('businessTypeId')?.setValue(result);
        this.GetBusinessType();
      });

    }
  }
  async getLanguage() {
    (await this.apiService.getRequest('Setup/GetLanguage')).subscribe((result:any) => {
      this.Languages = result;

    });
  }
  async AddLanguageSubmit() {
    debugger
    if (this.NewLanguageForm.valid) {
      let dropDown = new addDropDownModel()
      let tenantId = localStorage.getItem("TenantId");
      let userId = localStorage.getItem("userId");
      dropDown.creatorUserId = Number(userId);
      dropDown.tenantId = Number(tenantId);
      dropDown.name = this.NewLanguageForm.value.name;

      (await this.apiService.postRequest('Setup/AddLanguage', dropDown)).subscribe((res:any) => {

        this.getLanguage();
        this.createLeadFrom.get('languageId')?.setValue(res);
      });
    }
  }
  newLanguage() {
    this.NewLanguageForm = this.formBuilder.group({
      name: ['', Validators.required],
      // Other form controls...
    });
  }


  async GetGetPreferredTimeCallBack() {
    (await this.apiService.getRequest('Setup/GetPreferredTimeCallBack')).subscribe((result:any) => {
      this.PreferredTimeCallBackList = result;
    });
  }
  NewPreferredTimeCallBack() {
    this.PreferredTimeCallBackForm = this.formBuilder.group({
      name: ['', Validators.required],
      // Other form controls...
    });
  }
  async PreferredTimeCallBackSubmit() {
    debugger
    if (this.PreferredTimeCallBackForm.valid) {
      let dropDown = new addDropDownModel()
      let tenantId = localStorage.getItem("TenantId");
      let userId = localStorage.getItem("userId");
      dropDown.creatorUserId = Number(userId);
      dropDown.tenantId = Number(tenantId);
      dropDown.name = this.PreferredTimeCallBackForm.value.name;
      (await this.apiService.postRequest('Setup/AddPreferredTimeCallBack', dropDown)).subscribe((result:any) => {
        this.createLeadFrom.get('preferredTimeForCallBackId')?.setValue(result);
        this.GetGetPreferredTimeCallBack();
      });
    }
  }


}
