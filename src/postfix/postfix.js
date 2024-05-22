const Stack = require("../lib/stack");

const postfix = (expression) => {
  let stack = new Stack();
  let result = [];

  for (let i = 0; i < expression.length; i++) {
    let char = expression[i];

    if (char === " ") {
      continue;
    }

    if (char === "(") {
      stack.push(char);
    } else if (char === ")") {
      while (stack.top && stack.top.value !== "(") {
        result.push(stack.pop());
      }
      stack.pop(); // pop the '('
    } else if (isOperator(char)) {
      while (stack.top && precedence(stack.top.value) >= precedence(char)) {
        result.push(stack.pop());
      }
      stack.push(char);
    } else {
      result.push(char);
    }
  }

  while (stack.top) {
    result.push(stack.pop());
  }

  return result.join(" ");
};

const isOperator = (char) => ["+", "-", "*", "/"].includes(char);

const precedence = (operator) => {
  switch (operator) {
    case "+":
    case "-":
      return 1;
    case "*":
    case "/":
      return 2;
    default:
      return 0;
  }
};

module.exports = postfix;
