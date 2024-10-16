import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from '../../interfaces/button';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {

  @Input({ required: true }) button!: Button;
  @Output() btnClickEvent = new EventEmitter<Button>();

  btnClick(btn: Button) {
    this.btnClickEvent.emit(btn);
  }
}
