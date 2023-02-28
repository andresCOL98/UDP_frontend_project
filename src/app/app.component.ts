import { Component } from '@angular/core';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'udp-ng';

  isLoggedUser: any;
  validation:boolean = false;

  constructor(private loginService:LoginService) {}


  ngOnInit() {
    // this.validarSesion();
    this.loginService.getIsLogged().subscribe(res => {
      this.validation = res;
      console.log(res);
    })
  }
}
