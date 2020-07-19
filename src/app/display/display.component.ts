import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  currentNumber = '0';
  firstNum = '0';
  secondNum = '';
  currentOp = '';
  currentEquation;

  firstOperand = null;
  operator = null;
  waitForSecondNumber = false;
  firstNumberSelected = true;

  constructor() { }

  ngOnInit() {
    this.currentEquation = this.firstNum + this.currentOp + this.secondNum;
  }

  // Called anytime a number button is pressed.
  public getNumber(value: string){
    if(this.waitForSecondNumber) {
      this.currentNumber = value;
      this.waitForSecondNumber = false;
    } else {
      this.currentNumber === '0'? this.currentNumber = value: this.currentNumber += value;
    }

    this.setNumber();
    this.updateEquation();
  }

  // Called anytime a = - * % button is pressed.
  public getOperation(op: string){
    this.currentOp = op;
    this.operator = op;
    this.firstNumberSelected = false;
    this.waitForSecondNumber = true;
    this.updateEquation();
  } 

  // Seperates the first and second number
  public setNumber() {
    if (this.firstNumberSelected) {
      this.firstNum = this.currentNumber;
      this.firstOperand = Number(this.currentNumber);
    } else {
      this.secondNum = this.currentNumber;
    } 
  }

  // Updates the equation for the display
  public updateEquation() {
    if (this.firstNum == null) {
      this.currentEquation = '0';
    } else {
      this.currentEquation = this.firstNum + this.currentOp + this.secondNum;
    }
    console.log(this.currentEquation);
  }

  getDecimal(){
    if(!this.currentNumber.includes('.')){
        this.currentNumber += '.';
        this.updateEquation(); 
    }
  }

  public solveEquation() {
    console.log('Solving equation..');
    const result = this.doCalculation(this.operator , Number(this.currentNumber))
    this.currentNumber = result;
    this.firstNum = result;
    this.secondNum = '';
    this.operator = '';
    this.currentOp = '';
    this.waitForSecondNumber = false;
    this.firstNumberSelected = true;
    this.updateEquation();
  }

  private doCalculation(op , secondOp){
    switch (op){
      case '+':
      return this.firstOperand += secondOp; 
      case '-': 
      return this.firstOperand -= secondOp; 
      case '*': 
      return this.firstOperand *= secondOp; 
      case '/': 
      return this.firstOperand /= secondOp; 
      case '=':
      return secondOp;
    }
  }

  public clear(){
    console.log("Calculator cleared!");
    this.currentNumber = '0';
    this.firstNum = '0';
    this.secondNum = '';
    this.currentOp = '';
    this.firstOperand = null;
    this.operator = null;
    this.currentEquation = '0';
    this.waitForSecondNumber = false;
    this.firstNumberSelected = true;
  }

}
