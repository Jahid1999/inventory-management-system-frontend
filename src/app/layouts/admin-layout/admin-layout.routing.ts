import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from 'app/product-list/product-list.component';
import { ProductProfileComponent } from 'app/product-profile/product-profile.component';
import { TypographyComponent } from '../../typography/typography.component';
import { YourGuardGuard } from '../../your-guard.guard';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'profile', component: UserProfileComponent, },
    { path: 'products', component: TableListComponent },
    { path: 'product/:id', component: ProductProfileComponent },
    { path: 'reports', component: TypographyComponent },
];
