import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  currentNumber = '0';
  currentEquation;

  firstNum = '0';
  secondNum = '';
  currentOp = '';

  firstOperand = null;
  operator = null;
  waitForSecondNumber = false;

  firstNumberSelected = true;

  // Create a function to determine if currentOp is being used or not.
  // Then we can make a function that switches which number variable you're using
  // by stopping the number when an operation is selected.

  // When operator is selected switch numbers.
  // Make equal a different type than operator.

  // Called anytime a number button is pressed.
  public getNumber(value: string){
    //console.log("GETNUMBER FUNCTION - ", value);
    if(this.waitForSecondNumber)
    {
      this.currentNumber = value;
      this.waitForSecondNumber = false;
    } else {
      // This line adds the values together in a string. So instead of 5+5 it becomes 55.
      this.currentNumber === '0'? this.currentNumber = value: this.currentNumber += value;
    }
    this.setNumber();
    this.updateEquation();
  }

  // Called anytime a = - * % button is pressed.
  public getOperation(op: string){
    if (op != '=') {
      this.firstNumberSelected = false;
      this.currentOp = op;
      this.waitForSecondNumber = true;
      this.updateEquation();
    } else {
        this.currentOp = '';
    }
    
    this.operator = op;
  } 

  public setNumber() {
    if (this.firstNumberSelected) {
      this.firstNum = this.currentNumber;
      this.firstOperand = Number(this.currentNumber);
    } else {
      this.secondNum = this.currentNumber;
    } 
  }

  
  public updateEquation() {
    if (this.firstNum == null) {
      this.currentEquation = '0';
    } else {
      this.currentEquation = this.firstNum + this.currentOp + this.secondNum;
    }
    console.log('CURRENT EQUATION', this.currentEquation);
    console.log('CURRENT EQUATION - Current number is: ', this.currentNumber);
    console.log('CURRENT EQUATION - Current first number is:', this.firstNum);
    console.log('CURRENT EQUATION - Current second number is:', this.secondNum);
  }

  getDecimal(){
    if(!this.currentNumber.includes('.')){
        this.currentNumber += '.'; 
    }
  }

  public solveEquation() {
    console.log('= pressed');
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
    console.log('on docalculation ', this.firstOperand);
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
    this.currentNumber = '0';
    this.firstNum = '0';
    this.secondNum = '';
    this.currentOp = '';
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondNumber = false;
    this.firstNumberSelected = true;
  }

  constructor() { }

  ngOnInit() {
    this.currentEquation = this.firstNum + this.currentOp + this.secondNum;
  }

}
