import { Component } from '@angular/core';
import { LoadingService } from './service/loading.service';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'udp-ng';

  validation:boolean = false;
  iconoCargando:boolean = false;

  constructor(private loginService:LoginService, private loadingService:LoadingService) {}


  ngOnInit() {
    this.loadingService.getCargando().subscribe(res => {
      this.iconoCargando = res;
    });

    this.loginService.getIsLogged().subscribe(res => {
      this.validation = res;
    });

    if(!this.validation) {
      let user = this.loginService.getUserLoggedIn();
      if(user) this.loginService.logged.next(true);
    }
  }
}
