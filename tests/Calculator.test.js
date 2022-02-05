import { expect, it } from "@jest/globals";
import exp from "constants";
import Sentence from "../js/Calculator.js";

describe("Sentence", () => {
    Object.defineProperty(global, "window", {
        value: {
            alert: jest.fn()
        }
    });
    it("return empty object when initialized without input", () => {
        const input1 = new Sentence();
        expect(input1).toEqual({"input": undefined});
    })
    it("return created object when input is not empty", () => {
        // const input2 = new Sentence("CE 0.53");
        // expect(input2).toEqual({"input": "CE 0.53"});

        const inputCases = [{in: "CE 0.53", out: {"input": "CE 0.53"}},
                            {in: "CE ABS (456)", out: {"input": "CE ABS (456)"}}];
        for (const inputCase of inputCases) {
            expect(new Sentence(inputCase.in)).toEqual(inputCase.out);
        }
    })
    it("return command", () => {
        const input3 = new Sentence("CE 0.53");
        expect(input3.parseCommand()).toEqual("CE");
    })
    it("return operator", () => {
        const input4 = new Sentence("CE + (5) (5)");
        expect(input4.parseOperator()).toEqual("+");
    })
    it("return expression", () => {
        const input5 = new Sentence("CE + (5) (5)");
        expect(input5.parseExpression()).toEqual("+ (5) (5)");
    })
    it("format expression", () => {
        const input6 = new Sentence("CE + (5) (5)");
        expect(input6.formatExp()).toEqual([5, 5, '+']);
    })
    it("check balanced parentheses", () => {
        const input7 = new Sentence("CE + (5) (5)");
        expect(input7.isBalanced()).toEqual(true);
    })
    it("has a sign AND an opening parenthesis", () => {
        const input8 = new Sentence("CE + (5) (5)");
        const input9 = new Sentence("CE + 5) (5)");
        expect(input8.checkParOperands()).toEqual(true);
        expect(input9.checkParOperands()).toEqual(false);
    })
    it("ends application with `S` command", () => {
        const input10 = new Sentence("S");
        expect(input10.functions()).toEqual(undefined)
    })
    it("show application menu with `A` command", () => {
        const input10 = new Sentence("A");
        expect(input10.functions()).toEqual(undefined)
    })

    xit("PLATFORM - TESTE 1", () => {
        const test1 = new Sentence("CE 0.53");
        expect(test1)
    })
})