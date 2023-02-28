import { Component } from '@angular/core';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'udp-ng';

  validation:boolean = false;

  constructor(private loginService:LoginService) {}


  ngOnInit() {
    this.loginService.getIsLogged().subscribe(res => {
      this.validation = res;
    });

    if(!this.validation) {
      let user = this.loginService.getUserLoggedIn();
      if(user) this.loginService.logged.next(true);
    }
  }
}
