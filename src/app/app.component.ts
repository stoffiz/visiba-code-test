import { Component } from '@angular/core';
import { CalendarComponent } from './calendar/calendar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ CalendarComponent ]
})
export class AppComponent {
  title = 'calendar-app';
}
