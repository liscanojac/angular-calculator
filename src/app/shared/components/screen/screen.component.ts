import { Component, Input } from '@angular/core';
import { CalculatorScreen } from '../../services/models/screen.model';

@Component({
  selector: 'app-screen',
  standalone: true,
  imports: [],
  templateUrl: './screen.component.html',
  styleUrl: './screen.component.css'
})
export class ScreenComponent {

  // @Input() calculatorInput: string = '';
  // @Input() result: string = '';
  @Input({ required: true }) calculatorScreen: CalculatorScreen = {
    input: '',
    result: ''
  }
}
