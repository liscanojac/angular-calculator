import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Button2 } from './shared/services/models/button.model';
import { CalculatorService } from './shared/services/calculator.service';

import { ButtonComponent } from './shared/components/button/button.component';
import { ScreenComponent } from './shared/components/screen/screen.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonComponent, ScreenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'angular-midudev-app';
  buttons: Array<Button2> = [];
  screenInput = '';
  resultInput = '';
  calculatorScreen = {};

  constructor(private calculatorService: CalculatorService) {};

  ngOnInit(): void {
    this.buttons = this.calculatorService.getButtons();
    this.calculatorScreen = this.calculatorService.getCalculatorScreen();
  }

  btnClicked(btn: Button2) {
    this.calculatorService.calculate(btn);
    this.screenInput = btn.label
  }
}
