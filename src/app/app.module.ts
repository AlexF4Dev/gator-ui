import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {PullRequestCountComponent} from './pull-request-count/pull-request-count.component';
import {HttpClientModule} from '@angular/common/http';
import {TopRepositoryComponent} from './top-repository/top-repository.component';
import {TopDevelopersComponent} from './top-developers/top-developers.component';
import {DevPullDetailsComponent} from './dev-pull-details/dev-pull-details.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CallbackComponent} from './callback/callback.component';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {Routes, RouterModule} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../environments/environment';
import {GitService} from './git-service';
import {LOCAL_STORAGE, StorageServiceModule} from 'angular-webstorage-service';
import {StatusComponent} from './status/status.component';
import {OrgListComponent} from './org-list/org-list.component';
import { AuthService,AuthWebService, AuthInterceptor, OidcNavigationService, NgxCoreServicesModule, Config ,ConfigService,SessionStorageService} from '@labshare/ngx-core-services';
import {LeftNavModule, FitWindowModule, TopNavModule} from '@labshare/stateful-components';
import { HookErrorComponent } from './hook-error/hook-error.component';
import { PrchartComponent } from './prchart/prchart.component';
import { AngularDraggableModule } from 'angular2-draggable';
import { TweetsComponent } from './tweets/tweets.component';
import { BreakingnewsComponent } from './breakingnews/breakingnews.component';
import { DevJiraDetailsComponent } from './dev-jira-details/dev-jira-details.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'callback', component: CallbackComponent},
  {path: 'status', component: StatusComponent},
  {path: 'orglist', component: OrgListComponent},
  {path: 'hook-error', component: HookErrorComponent},
  {path: 'prchart', component: PrchartComponent},
  {path: 'dashboard', component: DashboardComponent, runGuardsAndResolvers: 'paramsOrQueryParamsChange'},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    PullRequestCountComponent,
    TopRepositoryComponent,
    TopDevelopersComponent,
    DevPullDetailsComponent,
    LoginComponent,
    DashboardComponent,
    CallbackComponent,
    StatusComponent,
    OrgListComponent,
    HookErrorComponent,
    PrchartComponent,
    TweetsComponent,
    BreakingnewsComponent,
    DevJiraDetailsComponent
  
    ],
  imports: [
    BrowserModule,
    NgxCoreServicesModule.forRoot(environment as Config),
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}),
    StorageServiceModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularDraggableModule,
    /* TODO: Use micromodules */
    /* LeftNav from stateful-components */
    LeftNavModule,
    FitWindowModule,
    TopNavModule
  ],
  providers: [GitService, CookieService],
  exports: [RouterModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
