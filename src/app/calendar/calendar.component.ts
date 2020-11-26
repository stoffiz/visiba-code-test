import { Component, OnInit } from '@angular/core';
import { CurrentWeekDates } from '../current-week-dates';
import * as dayjs from 'dayjs';
import * as weekday from 'dayjs/plugin/weekday';
import * as weekOfYear from 'dayjs/plugin/weekOfYear';
import * as isoWeek from 'dayjs/plugin/isoWeek';
import * as isToday from 'dayjs/plugin/isToday';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  currentYear: string;
  currentMonth: string;
  currentMonthName: string;
  currentWeek: number;
  currentDate: string;

  weekDays: Array<string>;
  currentWeekDates: Array<CurrentWeekDates>

  constructor() { 
    dayjs.extend(weekday);
    dayjs.extend(weekOfYear);
    dayjs.extend(isoWeek);
    dayjs.extend(isToday);
  }

  ngOnInit(): void {
    this.currentYear = dayjs().format("YYYY");
    this.currentMonth = dayjs().format("M");
    this.currentMonthName = dayjs().format("MMM");
    this.currentWeek = dayjs().isoWeek();
    this.currentDate = dayjs().format('YYYY-MM-DD');
    this.weekDays = ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', ' Sat', 'Sun'];

    console.log(this.currentWeekDates);
    this.currentWeekDates = this.createDaysForCurrentMonth(this.currentYear, this.currentMonth);
    console.log(this.currentWeekDates);
    this.currentWeekDates = this.filteredWeeks(this.currentWeek);
    console.log(this.currentWeekDates);
   
  }

  // Generate number of days in current month //
  getNumberOfDaysInMonth(year: string, month: string) {
    return dayjs(`${year}-${month}-01`).daysInMonth()
  }

  // Generate all dates of the current month //
  createDaysForCurrentMonth(year:string, month:string) {
    return [...Array(this.getNumberOfDaysInMonth(year, month))].map((day, index) => {
      return {
        date: dayjs(`${year}-${month}-${index + 1}`).format("YYYY-MM-DD"),
        dayOfMonth: dayjs(`${year}-${month}-${index + 1}`).format("D"),
        dayOfWeekShort: dayjs(`${year}-${month}-${index + 1}`).format("ddd"),
        isToday: dayjs(`${year}-${month}-${index + 1}`).isToday(),
      };
    });
  }

  // Filter dates for the current week //
  filteredWeeks(week) {
    return this.currentWeekDates.filter(obj => {
      return dayjs(obj.date).isoWeek() == week
    })
  }

}
