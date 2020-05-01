import {Component, OnInit, Inject} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {GitService, DevDetails} from '../git-service';
import {LOCAL_STORAGE, WebStorageService, SESSION_STORAGE} from 'ngx-webstorage-service';
import {timer} from 'rxjs';

@Component({
  selector: 'app-lsauth-callback',
  templateUrl: './lsauth-callback.component.html',
  styleUrls: ['./lsauth-callback.component.less'],
})
export class LsauthCallbackComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private gitService: GitService,
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    @Inject(SESSION_STORAGE) private sessionStorage: WebStorageService,
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      const OrgToken = params['OrgToken'];
      if (OrgToken) {
        this.storage.set('OrgToken', OrgToken);
        //this.router.navigate(['/lsAuthStatus']);
        this.go();
        this.router.navigate(['/dashboard']);
      }
    });
  }

  ngOnInit(): void {}

  go() {
    this.gitService.getLoggedInUSerDetails(false).subscribe(r2 => {
      let dd = new DevDetails();
      dd.name = r2.UserDisplayName;
      dd.UserName = r2.UserName;
      dd.DisplayName = r2.UserDisplayName ;
      dd.OrgDisplayName = r2.OrgDisplayName;
      dd.GitLogin = r2.UserName;
      dd.image = r2.Photo;
      dd.id = r2.Id;
      dd.profileUrl = r2.profileUrl;
      dd.Login = r2.GitUserName;
      dd.JiraUserName = r2.JiraUserName;
      dd.TfsUserName = r2.TfsUserName;
      this.gitService.setLoggedInGitDev(dd);
      this.gitService.getOrgList().subscribe(result => {
        this.sessionStorage.set('ORG-LIST', result);
        result.forEach(r => {
          if (r.OrgType === 'git') {
            this.gitService.setCurrentGitOrg(r.Org);
          }
          if (r.OrgType === 'org') {
            this.gitService.setCurrentOrg(r.Org);
          }
        });
        this.gitService.broadcastGlobalComponentMessage('RE-FILL');
        return true;
      });
    });
  }


}