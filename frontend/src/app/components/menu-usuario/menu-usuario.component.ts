 import { Component } from '@angular/core';
import { IonicModule, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-menu-usuario',
  template: `
    <ion-content>
      <ion-list>
        <ion-item button (click)="cerrarSesion()">
          <ion-icon name="log-out" slot="start" color="danger"></ion-icon>
          <ion-label color="danger">Cerrar Sesión</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  `,
  standalone: true,
  imports: [IonicModule]
})
export class MenuUsuarioComponent {
  constructor(private popoverController: PopoverController) {}

  async cerrarSesion() {
    await this.popoverController.dismiss({ action: 'logout' });
  }
}
