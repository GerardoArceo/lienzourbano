import { Component, OnInit } from '@angular/core';
import { FunctionsService } from 'src/app/services/functions.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  session = false;

  constructor(public functions: FunctionsService,
              public api: ApiService) {
    this.subscribeSession();
    this.functions.activeSessionEmitter();
  }

  ngOnInit() {}

  subscribeSession() {
    this.functions.getSessionEmitter().subscribe((s: any) => {
      if (s) {
        this.session = true;
      } else {
        this.session = false;
      }
    });
    this.functions.activeSessionEmitter();
  }

}
