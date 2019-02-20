import { Injectable } from '@angular/core';
import { Course } from './course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor() { }
  getCourse(): Course[] {
    let course = [
      { id: "1", date: "17/2/2019", name: "คอร์สธรรม 1 ", annotation: "  -", location: "วัด" },
      { id: "2", date: "12/2/2019", name: "คอร์สธรรม 2 ", annotation: "ต้องผ่านอย่างน้อย 1 คอร์ส", location: "วัด" },
      { id: "3", date: "10/2/2019", name: "คอร์สธรรม 3 ", annotation: "  -", location: "วัด" }
    ]
    return course;
  }
}
