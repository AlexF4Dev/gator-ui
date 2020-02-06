import {Component, OnInit, EventEmitter, Output, Inject} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {GitService} from '../git-service';
import {Route} from '@angular/compiler/src/core';
import {LOCAL_STORAGE, SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Component({
  selector: 'app-org-list',
  templateUrl: './org-list.component.html',
  styleUrls: ['./org-list.component.less'],
})
export class OrgListComponent implements OnInit {
  orgList: any[];
  back_colors: string[];
  colors: string[];
  loggedIn: boolean;
  currentOrg: string;

  constructor(
    private gitService: GitService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    @Inject(SESSION_STORAGE) private sessionStorage: WebStorageService,
  ) {
    this.back_colors = [];
    this.back_colors.push('rgb(45, 49, 51)'); //#01A9DB
    this.back_colors.push('rgb(45, 49, 51)');
    this.back_colors.push('rgb(45, 49, 51)');
    this.back_colors.push('rgb(45, 49, 51)');
    this.back_colors.push('rgb(45, 49, 51)');
    this.back_colors.push('rgb(45, 49, 51)');
    this.back_colors.push('rgb(45, 49, 51)');
    this.back_colors.push('rgb(45, 49, 51)');
    this.back_colors.push('rgb(45, 49, 51)');
    this.back_colors.push('rgb(45, 49, 51)');
    this.back_colors.push('rgb(45, 49, 51)');
    // this.back_colors.push('#74DF00');
    // this.back_colors.push('#DBA901');
    // this.back_colors.push('#FF4000');
    // this.back_colors.push('#0404B4');
    // this.back_colors.push('#01A9DB');
    // this.back_colors.push('#74DF00');
    // this.back_colors.push('#DBA901');
    // this.back_colors.push('#FF4000');
    // this.back_colors.push('#0404B4');
    this.colors = [];
    this.colors.push('white');
    this.colors.push('white');
    this.colors.push('white');
    this.colors.push('white');
    this.colors.push('white');
    this.colors.push('white');
    this.colors.push('white');
    this.colors.push('white');
    this.colors.push('white');
    this.colors.push('white');
  }

  logout() {
    this.storage.remove('token');
    this.storage.remove('JiraToken');
    location.reload();
  }

  gotoStatusReports() {
    this.gitService.setCurrentContext('GIT');
    this.router.navigate(['/StatusReport']);
  }

  data(org: any) {
    //Keep the current Org in session, angular apps with refresh browser will reload the gitservice and application will forget everything
    if (org) {
      this.gitService.setCurrentOrg(org.Org);
    }
    this.router.onSameUrlNavigation = 'reload';
    this.router.initialNavigation();
    this.router.navigate(['/dashboard'], {
      queryParams: {Org: org.Org, refresh: new Date().getTime()},
    });
  }

  settings(){
    this.router.navigate(['/settings']);
  }


  ngOnInit() {
    this.orgList = [];
    this.gitService.setCurrentOrg(this.route.snapshot.queryParamMap.get('Org'));
    this.gitService.getOrgList().subscribe(result => {
      this.orgList = result;
    });
  }
}
