import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-notificacion-dialogo',
  templateUrl: './notificacion-dialogo.component.html',
  styleUrls: ['./notificacion-dialogo.component.scss']
})
export class NotificacionDialogoComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<NotificacionDialogoComponent>,
    private loginService:LoginService
  ) { }
}
