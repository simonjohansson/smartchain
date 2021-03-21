const STOP = 'STOP';
const ADD = 'ADD';
const SUB = 'SUB';
const MUL = 'MUL';
const DIV = 'DIV';
const PUSH = 'PUSH';

class Interpreter {
  constructor() {
    this.state = {
      programCounter: 0,
      stack: [],
      code: []
    };
  }

  #add(a, b) {
    return a+b;
  }

  #sub(a,b) {
    return a-b;
  }

  #mul(a,b) {
    return a*b;
  }

  #div (a,b) {
    return a/b;
  }

  #doMathOp(op) {
    const a = this.state.stack.pop();
    const b = this.state.stack.pop();
    this.state.stack.push(op(a,b));
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
            this.doMathOp(this.add);
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