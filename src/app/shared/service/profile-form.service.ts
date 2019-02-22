import { Injectable } from '@angular/core';

@Injectable()
export class ProfileFormService {
  public formType: 'Register' | 'Profile' | 'Edit' | 'RegisterAdmin' | 'EditAdmin';
  constructor() { }


  /**
   * @param formType 
   * 'Profile', 'Register', 'Edit'
   */
  setFormType(formType) {
    this.formType = formType;
  }
  getFormType() {
    this.formType;
  }

  getSettingButton() {
    if (this.formType == 'Profile') {
      return false;
    }
    return true;
  }

  getSettingRegisterForm() {
    if (this.formType == 'Register' || this.formType == 'RegisterAdmin')  {
      return true;
    }
    return false;
  }

  getSettingDisabled() {
    if (this.formType == 'Profile') {
      return true;
    }
    return false;
  }

  getSettingReadOnly() {
    if (this.formType == 'Profile') {
      return true;
    }
    return false;
  }



}
