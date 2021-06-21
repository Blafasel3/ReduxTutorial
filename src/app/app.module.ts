import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { counterReducer } from './counter/counter.reducer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter.component';
import { CustomSelectComponent } from './custom-select/custom-select.component';
import { MapValuesToStringPipe } from './custom-select/map-values-to-string.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    CustomSelectComponent,
    MapValuesToStringPipe
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({
      count: counterReducer
    }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
