import { Component } from '@angular/core';
import { SesionServiceService } from './service/sesion-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'udp-ng';

  isLoggedUser: any;
  validation:boolean=false;


  ngOnInit() {
    this.validarSesion();
    
  }

  validarSesion(){
    this.isLoggedUser = sessionStorage.getItem('currentUser');

    if (sessionStorage.getItem('currentUser')) {
      this.validation = true;
    } else {
      sessionStorage.removeItem('currentUser');
      localStorage.removeItem('currentUser');
      this.validation = false;
    }
    console.log(this.validation);
  }
}
