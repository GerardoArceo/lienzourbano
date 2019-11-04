import { Component, OnInit } from '@angular/core';
import { FunctionsService } from 'src/app/services/functions.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  categories = [1,2,3,4,5,6,7,8,9,10,11,12];
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
      console.log(this.session);
    });
    this.functions.activeSessionEmitter();
  }

}
