import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { UserComponent } from './components/dashboard/user/user.component';
import { AddUserComponent } from './components/dashboard/user/add-user/add-user.component';
import { ManageUserComponent } from './components/dashboard/user/manage-user/manage-user.component';
import { ProfilesComponent } from './components/dashboard/profiles/profiles.component';
import { CreateProfileComponent } from './components/dashboard/profiles/create-profile/create-profile.component';
import { ManageProfileComponent } from './components/dashboard/profiles/manage-profile/manage-profile.component';

@NgModule({
  declarations: [AppComponent, DashboardComponent, LoginComponent, UserComponent, AddUserComponent, ManageUserComponent, ProfilesComponent, CreateProfileComponent, ManageProfileComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
