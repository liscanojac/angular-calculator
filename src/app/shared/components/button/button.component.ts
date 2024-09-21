import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button2 } from '../../services/models/button.model';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {

  @Input({ required: true }) button!: Button2;
  @Output() btnClickEvent = new EventEmitter<Button2>();

  btnClick(btn: Button2) {
    this.btnClickEvent.emit(btn);
  }
}
