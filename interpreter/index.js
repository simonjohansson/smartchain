const STOP = 'STOP';
const ADD = 'ADD';
const SUB = 'SUB';
const MUL = 'MUL';
const DIV = 'DIV';
const PUSH = 'PUSH';

const LT = 'LT';
const GT = 'GT';
const EQ = 'EQ';
const AND = 'AND';
const OR = 'OR';

class Interpreter {
  constructor() {
    this.state = {
      programCounter: 0,
      stack: [],
      code: []
    };
  }

  runCode(code) {
    this.state.code = code;
    while (this.state.programCounter < this.state.code.length) {
      const opCode = this.state.code[this.state.programCounter];

      try {
        switch(opCode) {
          case STOP:
            throw new Error('Execution is complete')
          case PUSH:
            this.state.programCounter++;
            const value = this.state.code[this.state.programCounter];
            this.state.stack.push(value);
            break;
          case ADD:
          case SUB:
          case MUL:
          case DIV:
          case LT:
          case GT:
          case EQ:
          case AND:
          case OR:
            const a = this.state.stack.pop();
            const b = this.state.stack.pop();

            let result;

            if (opCode === ADD) result = a + b;
            if (opCode === SUB) result = a - b;
            if (opCode === MUL) result = a * b;
            if (opCode === DIV) result = a / b;
            if (opCode == LT) result = a < b ? 1 : 0;
            if (opCode == GT) result = a > b ? 1 : 0;
            if (opCode == EQ) result = a === b ? 1 : 0;
            if (opCode == AND) result = a && b;
            if (opCode == OR) result = a || b;

            this.state.stack.push(result);
            break;
          case SUB:
            this.doMathOp(this.sub);
            break;
          case MUL:
            this.doMathOp(this.mul);
            break;
          case DIV:
            this.doMathOp(this.div);
            break;
          default:
            break;
        }
      } catch (error) {
        return this.state.stack[this.state.stack.length-1];
      }
      this.state.programCounter++;
    }
  }
}

console.log("3 < 2", new Interpreter().runCode([PUSH, 2, PUSH, 3, LT, STOP]));
console.log("3 > 2", new Interpreter().runCode([PUSH, 2, PUSH, 3, GT, STOP]));
console.log("2 == 2", new Interpreter().runCode([PUSH, 2, PUSH, 2, EQ, STOP]));
console.log("3 == 2", new Interpreter().runCode([PUSH, 2, PUSH, 3, EQ, STOP]));
console.log("0 && 1", new Interpreter().runCode([PUSH, 0, PUSH, 1, AND, STOP]));
console.log("0 || 1", new Interpreter().runCode([PUSH, 0, PUSH, 1, OR, STOP]));
