import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BearerService } from '@core/services/bearer.service';
import { CoreModule } from '@core/core.module';

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';


@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		HttpClientModule,
		CoreModule
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: BearerService, multi: true }
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
