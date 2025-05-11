import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  year = new Date().getFullYear();
  month = new Date().getMonth() + 1;

  onMonthChange(e: { year: number; month: number }) {
    this.year = e.year;
    this.month = e.month;
  }
}
