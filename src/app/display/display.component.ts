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

  public getNumber(v: string){
    //v is value
    console.log(v);

    if(this.waitForSecondNumber)
    {
      this.currentNumber = v;
      this.waitForSecondNumber = false;
      this.secondNum = String(v);
    }else{
      this.currentNumber === '0'? this.currentNumber = v: this.currentNumber += v;
      this.firstNum = v;
    }

    this.updateEquation();
  }

  getDecimal(){
    if(!this.currentNumber.includes('.')){
        this.currentNumber += '.'; 
    }
  }

  public updateEquation() {
    console.log('update called');
    if (this.firstNum == null) {
      this.currentEquation = '0';
    } else {
      this.currentEquation = this.firstNum + this.currentOp + this.secondNum;
    }

    console.log('CURRENT EQUATION', this.currentEquation);
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

  public getOperation(op: string){
    console.log(op);

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
      this.currentEquation = result;
    }
    this.operator = op;
    this.waitForSecondNumber = true;
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
