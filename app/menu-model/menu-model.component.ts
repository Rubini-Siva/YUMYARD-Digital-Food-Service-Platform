import { Component, Output, EventEmitter,Input } from '@angular/core';

@Component({
  selector: 'app-menu-model',
  templateUrl: './menu-model.component.html',
  styleUrl: './menu-model.component.css'
})
export class MenuModelComponent {

  @Output() closeModalEvent = new EventEmitter<void>();

  closeModal(): void {
    this.closeModalEvent.emit();
  }

  @Input() selectedRestaurant: any;
  @Input() menuItems!: any[]; // Use non-null assertion operator


}
