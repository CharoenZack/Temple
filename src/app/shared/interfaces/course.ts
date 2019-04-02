export interface Course {
  id?: number;
  name?: string;
  stDate?: Date;
  endDate?: Date;
  detail?: string;
  conditionMin?: Number;
  memberId?: string;
  memberFname?: string;
  memberLname?: string;
  locationId?: number;
  locationName?: string;
  status?: number;
  canRegister?: number;
}
