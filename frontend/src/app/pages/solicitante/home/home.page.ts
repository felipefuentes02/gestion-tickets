import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { addIcons } from 'ionicons';
import { 
  add, 
  list, 
  mail, 
  personCircle, 
  chevronDown,
  addCircleOutline,
  listOutline,
  mailOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule],
})
export class HomePage {
  
  public userService = inject(UserService);

  constructor() {
    // Registrar TODOS los iconos que usas
    addIcons({ 
      add, 
      list, 
      mail, 
      'person-circle': personCircle,
      'chevron-down': chevronDown,
      'add-circle-outline': addCircleOutline,
      'list-outline': listOutline,
      'mail-outline': mailOutline
    });
  }

  mostrarMenuUsuario(event: any) {
    this.userService.mostrarMenuUsuario(event);
  }
}