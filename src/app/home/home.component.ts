import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isPersonnelMenuVisible: boolean = false; 
  isRHMenuVisible: boolean = false; 
  togglePersonnelMenu() {
    this.isPersonnelMenuVisible = !this.isPersonnelMenuVisible; 
    
    this.isRHMenuVisible = false;
  }

  toggleRHMenu() {
    this.isRHMenuVisible = !this.isRHMenuVisible; 
    this.isPersonnelMenuVisible = false;
  }
}
