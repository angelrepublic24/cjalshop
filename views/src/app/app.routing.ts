// import {ModuleWithProviders, Component} from '@angular/core';
// import {Routes, RouterModule} from '@angular/router';

// import {HomeComponent} from './components/home/home.component';
// import {LoginComponent} from './components/login/login.component';
// import {RegisterComponent} from './components/register/register.component';
// import {ErrorComponent} from './components/error/error.component';

// const appRoutes: Routes = [
//     {path: '', component: HomeComponent},
//     {path: 'login', component: LoginComponent},
//     {path: 'register', component: RegisterComponent},
//     {path: '**', component: ErrorComponent}
// ]

// export const appRoutingProviders: any[] = [];
// export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
import { ModuleWithProviders, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorComponent } from './components/error/error.component';
;

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: RegisterComponent},
    {path: '**', component: ErrorComponent}

]

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes)