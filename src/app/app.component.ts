import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Button } from './shared/interfaces/button';
import { ButtonComponent } from './shared/components/button/button.component';
import { ScreenComponent } from './shared/components/screen/screen.component';
import { CalculatorScreen } from './shared/interfaces/screen';
import { CalculatorService } from './shared/services/calculator/calculator.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonComponent, ScreenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-midudev-app';
  buttons: Array<Button> = [];
  calculatorScreen: CalculatorScreen = {
    input: '',
    result: ''
  };

  resultValue = 0;

  constructor(private calculatorService: CalculatorService) {
    this.buttons = this.calculatorService.getButtons();
    this.calculatorScreen = this.calculatorService.getCalculatorScreen();
  };

  btnClicked(btn: Button) {
    this.calculatorScreen = this.calculatorService.updateScreen(btn);
    this.resultValue = this.calculatorService.getResult().value;
  }
}
