import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isLogged: Observable<any>;
  
  constructor(private loginService:LoginService) {
    this.isLogged = this.loginService.isLogged();
    this.isLogged.subscribe(res => this.isLogged = res);
  }

  ngOnInit() {

  }
}
