import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Import Component for routing
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { PersonalComponent } from './components/personal/personal.component';
import { PracticeComponent } from './components/practice/practice.component';
import { BusinessComponent } from './components/business/business.component';


const appRoutes: Routes = [
    { 
        path: '', component: HomeComponent 
    },
    { 
        path: 'login', component: LoginComponent 
    },
    { 
        path: 'landing', component: LandingComponent 
    },
    { 
        path: 'personal', component: PersonalComponent 
    },
    { 
        path: 'practice', component: PracticeComponent 
    },
    { 
        path: 'business', component: BusinessComponent 
    }
];

// @NgModule({
//   imports: [RouterModule.forChild|Root(routes)],
//   exports: [RouterModule],
// })
// export class NameRoutingModule { }

export const routing: ModuleWithProviders  = RouterModule.forRoot(appRoutes);