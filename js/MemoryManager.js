export default class MemoryManager {
    constructor() {
        this.memory = {};
    }
    
    create(memoryName) { //AM
        const createdMemoryNames = Object.keys(this.memory);

        if (createdMemoryNames.includes(memoryName)) return "erro";

        if (createdMemoryNames.length < 2) {
            this.memory[memoryName] = 0;
            return `memoria criada com o nome: ${memoryName}`
        }
    }

    list() { //LM / VM
        if (Object.keys(this.memory).length === 0) return "Calculadora sem memorias.";
        return this.memory;
    }

    search(memoryName) {
        if (!this.memory.hasOwnProperty(memoryName)) return "Memoria nao existente."
        return `${memoryName}: ${this.memory[memoryName].toFixed(2)}`;
    }

    update(memoryName, lastResult) { //AVM
        if (!this.memory.hasOwnProperty(memoryName)) return "Memoria nao existente."
        this.memory[memoryName] = lastResult;
        return `${memoryName}: ${this.memory[memoryName].toFixed(2)}`;
    }
}
