import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { PersonalComponent } from './components/personal/personal.component';
import { PracticeComponent } from './components/practice/practice.component';
import { BusinessComponent } from './components/business/business.component';


//Import Routes for navigation
import { routing } from './app.routing';


@NgModule({
	declarations: [ AppComponent , LoginComponent, HomeComponent, LandingComponent,
					PersonalComponent, PracticeComponent, BusinessComponent	
				],
	imports: [ routing, BrowserModule, HttpModule ],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
