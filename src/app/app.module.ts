import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventManagementComponent } from './event-management/event-management.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    EventListComponent,
    EventDetailComponent,
    EventManagementComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: EventListComponent },
      { path: 'detail', component: EventDetailComponent },
      { path: 'event-detail/:eventId', component: EventDetailComponent },
      { path: 'create', component: EventManagementComponent  },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
