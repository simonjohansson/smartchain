const { describe, it, expect } = require('@jest/globals');
const Interpreter = require('./index');
const {
    STOP,
    ADD,
    SUB,
    MUL,
    DIV,
    PUSH,
    LT,
    GT,
    EQ,
    AND,
    OR,
    JUMP,
    JUMPI
} = Interpreter.OPCODE_MAP;

describe('Interpreter', () => {
    describe('runCode()', () => {
        describe('ADD', () => {
            it('adds two values', () => {
                expect(new Interpreter().runCode([PUSH, 600, PUSH, 66, ADD, STOP])).toEqual(666);
            })
        })

        describe('SUB', () => {
            it('subs two values', () => {
                expect(new Interpreter().runCode([PUSH, 34, PUSH, 700, SUB, STOP])).toEqual(666);
            })
        })

        describe('MUL', () => {
            it('product two values', () => {
                expect(new Interpreter().runCode([PUSH, 66.6, PUSH, 10, MUL, STOP])).toEqual(666);
            })
        })

        describe('DIV', () => {
            it('divides two values', () => {
                expect(new Interpreter().runCode([PUSH, 2, PUSH, 1332, DIV, STOP])).toEqual(666);
            })
        })

        describe('LT', () => {
            it('product two values', () => {
                expect(new Interpreter().runCode([PUSH, 2, PUSH, 3, LT, STOP])).toEqual(0);
                expect(new Interpreter().runCode([PUSH, 3, PUSH, 2, LT, STOP])).toEqual(1);
            })
        })

        describe('GT', () => {
            it('product two values', () => {
                expect(new Interpreter().runCode([PUSH, 2, PUSH, 3, GT, STOP])).toEqual(1);
                expect(new Interpreter().runCode([PUSH, 3, PUSH, 2, GT, STOP])).toEqual(0);
            })
        })

        describe('EQ', () => {
            it('product two values', () => {
                expect(new Interpreter().runCode([PUSH, 2, PUSH, 2, EQ, STOP])).toEqual(1);
                expect(new Interpreter().runCode([PUSH, 3, PUSH, 2, EQ, STOP])).toEqual(0);
            })
        })

        describe('AND', () => {
            it('ands two values', () => {
                expect(new Interpreter().runCode([PUSH, 1, PUSH, 1, AND, STOP])).toEqual(1);
                expect(new Interpreter().runCode([PUSH, 0, PUSH, 0, AND, STOP])).toEqual(0);
                expect(new Interpreter().runCode([PUSH, 0, PUSH, 1, AND, STOP])).toEqual(0);
                expect(new Interpreter().runCode([PUSH, 1, PUSH, 0, AND, STOP])).toEqual(0);

            })
        })

        describe('OR', () => {
            it('ors two values', () => {
                expect(new Interpreter().runCode([PUSH, 1, PUSH, 1, OR, STOP])).toEqual(1);
                expect(new Interpreter().runCode([PUSH, 0, PUSH, 0, OR, STOP])).toEqual(0);
                expect(new Interpreter().runCode([PUSH, 0, PUSH, 1, OR, STOP])).toEqual(1);
                expect(new Interpreter().runCode([PUSH, 1, PUSH, 0, OR, STOP])).toEqual(1);

            })
        })

        describe('JUMP', () => {
            it('jumps', () => {
                expect(new Interpreter().runCode([PUSH, 3, JUMP, PUSH, 666, STOP])).toEqual(666);
            })
        })

        describe('JUMPI', () => {
            it('jumps when it should', () => {
                expect(new Interpreter().runCode([PUSH, 5, PUSH, 1, JUMPI, PUSH, 666, STOP])).toEqual(666);
            })

            it('doesnt jumps when it should not', () => {
                expect(new Interpreter().runCode([PUSH, 8, PUSH, 0, JUMPI, PUSH, 1337, STOP, PUSH, 666, STOP])).toEqual(1337);
            })

            it('throws error when jumping to a non-existant op', () => {
                expect(() => new Interpreter().runCode([PUSH, 800, PUSH, 1, JUMPI, PUSH, 1337, STOP, PUSH, 666, STOP])).toThrow("Invalid destination: 800");
            })
        })

        describe('Infinite loop', () => {
            it('errors', () => {
                expect(() => new Interpreter().runCode([PUSH, 0, JUMP])).toThrow("Check for an infinite loop. Execution limit of 10000 exceeded");
            })
        })
    })
});

