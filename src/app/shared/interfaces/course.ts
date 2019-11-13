export interface Course {
  id?: number;
  name?: string;
  stDate?: Date;
  endDate?: Date;
  createDate?: Date;
  lastUpdate?: Date;
  detail?: string;
  conditionMin?: Number;
  memberId?: string;
  memberFname?: string;
  memberLname?: string;
  locationId?: number;
  locationName?: string;
  status?: string;
  saStatus?: string;
  mhcStatus?: string;
  canRegister?: number;
}
