import { RouterModule , Routes } from '@angular/router';
import { StarsComponent } from './components/stars/stars.component';
import { HomeComponent } from './components/home/home.component';
import { ResultadoComponent } from './components/resultado/resultado.component';

const APP_ROUTES:Routes =[ 
    { path:'home',component: HomeComponent},
    { path:'',component: StarsComponent},
    { path:'resultado/:termino',component:ResultadoComponent},
    { path:'**',pathMatch:'full',redirectTo:'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {
    initialNavigation: 'enabled'
});