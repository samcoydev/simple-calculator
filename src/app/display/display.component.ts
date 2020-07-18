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

  // Create a function to determine if currentOp is being used or not.
  // Then we can make a function that switches which number variable you're using
  // by stopping the number when an operation is selected.

  // Called anytime a number button is pressed.
  public getNumber(v: string){
    console.log(v);

    if(this.waitForSecondNumber)
    {
      this.currentNumber = v;
      this.waitForSecondNumber = false;
      this.secondNum = String(v);
    }else{
      this.currentNumber === '0'? this.currentNumber = v: this.currentNumber += v;
      this.firstNum = this.currentNumber;
    }

    this.updateEquation();
  }

  // Called anytime a = - * % button is pressed.
  public getOperation(op: string){
    if (op != '=') {
      this.currentOp = op;
      this.updateEquation();
    }

    if(this.firstOperand === null){
      this.firstOperand = Number(this.currentNumber);

    }else if(this.operator){
      const result = this.doCalculation(this.operator , Number(this.currentNumber))
      this.currentNumber = String(result);
      this.firstOperand = result;
      this.firstNum = result;
      this.secondNum = ' ';
      this.currentEquation = result;
    }
    this.operator = op;
    this.waitForSecondNumber = true;
  } 
  
  public updateEquation() {
    if (this.firstNum == null) {
      this.currentEquation = '0';
    } else {
      this.currentEquation = this.firstNum + this.currentOp + this.secondNum;
    }

    console.log('CURRENT NUMBER', this.currentNumber);
    console.log('CURRENT EQUATION', this.currentEquation);
  }

  getDecimal(){
    if(!this.currentNumber.includes('.')){
        this.currentNumber += '.'; 
    }
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
    this.currentNumber = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondNumber = false;
  }

  constructor() { }

  ngOnInit() {
    this.currentEquation = this.firstNum + this.currentOp + this.secondNum;
  }

}
