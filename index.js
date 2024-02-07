class InfixToPostfix {
    constructor(expression) {
      this.expression = expressionSplitter(expression);
      this.validOperators = "+-/*^";
      this.oprstack = [];
      this.postfix = [];
    }
  
    toPostfix() {
      for (let elem of this.expression) {
        if (isOperator(elem)) {
          this.handleOperators(elem);
        } else if (isBracket(elem)) {
          this.handleParentheses(elem);
        } else {
          this.postfix.push(elem);
        }
      }
      while (this.oprstack.length > 0) {
        this.postfix.push(this.oprstack.pop());
      }
    }
  
    hasHigherPrecedence(currOpr, cmpOpr) {
      const precedence = {
        "^": 3,
        "*": 2,
        "/": 2,
        "+": 1,
        "-": 1
      };
  
      return precedence[currOpr] > precedence[cmpOpr];
    }
  
    handleOperators(currOpr) {
      if (this.oprstack.length === 0) {
        this.oprstack.push(currOpr);
        return;
      }
  
      for (let i = this.oprstack.length-1; i >= 0; i--) {
        const cmpOpr = this.oprstack[i];
        if (this.hasHigherPrecedence(currOpr, cmpOpr)) {
          this.oprstack.push(currOpr);
          return;
        } else if (cmpOpr !== "("){
          this.postfix.push(
            this.oprstack.pop()
          );
        }
      }
      this.oprstack.push(currOpr);
    }
  
    handleParentheses(elem) {
      if (elem === "(") {
        this.oprstack.push(elem);
      } else {
        let poppedValue;
        while (this.oprstack.length > 0 && (poppedValue = this.oprstack.pop()) != "(" ) {
          this.postfix.push(poppedValue);
        }
      }
    }
  }
  
  function isOperator(str) {
    return "+-/*^".includes(str);
  }
  
  function isBracket(str) {
    return str === "(" || str === ")";
  }
  
  function isDigit(char) {
    const ord = char.charCodeAt(0);
    return ord >= 48 && ord <= 57;
  }
  
  function expressionSplitter(expression) {
    let result = [];
    let number = '';
    
    for (let i = 0; i < expression.length; i++) {
      let char = expression[i];
  
      if (char === ' ')
        continue;
      
      if (isDigit(char)) {
        number += char;
      } else {
        if (number !== '') {
          result.push(number);
          number = '';
        }
        result.push(char);
      }
    }
    
    if (number !== '') {
      result.push(number);
    }
    
    return result;
  }
  
  
  
  const conversion = new InfixToPostfix("11 + 2  * 3 - 8");
  conversion.toPostfix()
  console.log(conversion.postfix.join(" "));
  
  