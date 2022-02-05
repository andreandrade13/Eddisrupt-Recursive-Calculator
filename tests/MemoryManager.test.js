import { expect } from "@jest/globals";
import MemoryManager from "../js/MemoryManager.js";

describe("Memory Manager", () => {
    it("has no memories when it's created", () => {
        //arrange
        const mm = new MemoryManager();
        //act

        //assert
        expect(mm.list()).toEqual("Calculadora sem memorias."); //LM
        // expect(mm.read("primeira")).toEqual("Memoria nao existente."); //VM
    })
    it("can creates a memory with a variable name", () => {
        const mm = new MemoryManager();
        mm.create("primeira"); //AM command

        expect(mm.memory.hasOwnProperty("primeira")).toBe(true);
    })
    it("cannot create more than two memories", () => {
        const mm = new MemoryManager();
        mm.create("primeira");
        mm.create("segunda");
        mm.create("terceira");

        //TODO
        //return error

        expect(mm.memory.hasOwnProperty("primeira")).toBe(true);
        expect(mm.memory.hasOwnProperty("segunda")).toBe(true);
        expect(mm.memory.hasOwnProperty("terceira")).toBe(false);
    })
    it("cannot assign a repeated memory name and returns warning", () => {
        const mm = new MemoryManager();
        const first = mm.create("primeira"); // 1
        const second = mm.create("primeira"); // 1
        
        //TODO
        //e se tiver valor na primeira?
        //manter o valor

        expect(mm.memory.hasOwnProperty("primeira")).toBe(true);
        expect(first).not.toEqual("erro");
        expect(Object.keys(mm.memory).length).toEqual(1);
        expect(second).toEqual("erro");
    })
    it("assigns the last calculated number to an existent memory", () => {
        const mm = new MemoryManager();
        mm.create("primeira");
        mm.create("terceira");
        mm.create("quarta");

        expect(mm.update("primeira", 5)).toEqual("primeira: 5.00");
        expect(mm.update("segunda", 10)).toEqual("Memoria nao existente.");
        expect(mm.update("terceira", 55555)).toEqual("terceira: 55555.00");
        expect(mm.update("quarta", -5)).toEqual("Memoria nao existente.");
    })

    it("search for a specified named memory", () => {
        const mm = new MemoryManager();
        mm.create("primeira");

        expect(mm.search("primeira")).toEqual("primeira: 0.00")
        expect(mm.search("segunda")).toEqual("Memoria nao existente.")
    })

    it("testing platform 6", () => {
        const mm = new MemoryManager();
        expect(mm.list()).toEqual("Calculadora sem memorias.");
        expect(mm.create("memory_1")).toEqual("memoria criada com o nome: memory_1");
        // CE + (4) (5) -> 9
        expect(mm.update("memory_1", 9)).toEqual("memory_1: 9.00");
        // CE + (memory_1) (5) -> 14
        expect(mm.update("memory_2", 14)).toEqual("Memoria nao existente.")
        expect(mm.create("memory_2")).toEqual("memoria criada com o nome: memory_2");
        expect(mm.list()).toEqual({"memory_1": 9, "memory_2": 0});
        expect(mm.update("memory_2", 14)).toEqual("memory_2: 14.00")
        // CE + (memory_1) (EXP (/ (memory_2) (memory_1))) -> 13.74
        // S
    })
})
