/*
  After the successfull authentication call comes back to this page
*/
import {Component, OnInit, Inject} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {GitService} from '../git-service';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import {timer} from 'rxjs';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.less'],
})
export class CallbackComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private gitService: GitService, private router: Router, @Inject(LOCAL_STORAGE) private storage: WebStorageService) {
    this.activatedRoute.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        this.storage.set('GitToken', token);
        this.sleep(800).then(res => {
          this.router.navigate(['/status']);
        });
      }
    });
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  ngOnInit() {}
}
