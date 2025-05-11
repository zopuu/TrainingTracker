import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule, DateAdapter } from 'angular-calendar';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TrainingFormComponent } from './components/training-form/training-form.component';
import { LoginComponent } from './components/auth/login/login.component';
import { MainComponent } from './components/main/main.component';
import { RegistrationComponent } from './components/auth/registration/registration.component';
import { TrainingDetailsDialogComponent } from './components/training-details-dialog/training-details-dialog.component';

import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { StatisticsComponent } from './components/statistics/statistics/statistics.component';
import { MonthSummaryCardsComponent } from './components/statistics/month-summary-cards/month-summary-cards.component';
import { WeeklyChartComponent } from './components/statistics/weekly-chart/weekly-chart.component';
import { WeekSummaryCardsComponent } from './components/statistics/week-summary-cards/week-summary-cards.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CalendarComponent,
    TrainingFormComponent,
    LoginComponent,
    MainComponent,
    RegistrationComponent,
    CalendarComponent,
    TrainingDetailsDialogComponent,
    StatisticsComponent,
    MonthSummaryCardsComponent,
    WeeklyChartComponent,
    WeekSummaryCardsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    HttpClientModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
