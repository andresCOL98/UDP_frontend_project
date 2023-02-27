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


  ngOnInit() {
    this.isLoggedUser = sessionStorage.getItem('currentUser');
    if (sessionStorage.getItem('currentUser') === 'true') {
      this.isLoggedUser = 'true';
    } else {
      this.isLoggedUser = 'false';
    }
  }
}
