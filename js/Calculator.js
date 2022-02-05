export default class Sentence {
    constructor(input) {
        this.input = input;
    }
    parseCommand() {
        const commRegex = /^(\w+)/gi;
        const commArr = commRegex.exec(this.input);
        return commArr != null && commArr[0].toUpperCase();
    }
    parseOperator() {
        const operatorRegex = /[*+-/]|ABS|COS|LOG|CEIL|FLOOR|SIN|ROUND|EXP/gi;
        const opArr = operatorRegex.exec(this.input);
        if (opArr == null) return false;
        return opArr[0];
    }
    parseExpression() {
        return [...this.input].splice(3).join("");
    }
    formatExp() {
        let result = this.input.replace(/[()]/g, "");
        result = result.split(" "); 
        result.shift();
        result.reverse();
        result = result.map(i => {return Number(i) ? Number(i) : i});
        return result;
    }
    isBalanced() {
        const parObj = {
            '(': ')'
        };
        const closing = Object.values(parObj);
        const stack = [];     
        for (let char of this.input) {
            if (parObj[char]) {
                stack.push(char);
            } else if (closing.includes(char) && char !== parObj[stack.pop()]) {
            return false;
            }
        }
        return !stack.length;
    }
    checkParOperands() {
        let oper = this.parseOperator(this.input);
        let expr = this.parseExpression(this.input).split(" ");

        for (let elem = 1; elem < expr.length; elem++) {
            if (oper === expr[0] && expr[elem][0] !== '(') return false;
        }
        return true;
    }

    //Commands
    functions() {
        let command = this.parseCommand(this.input);

        switch(command) {
            case "CE":
                let exp = this.formatExp(this.input);
                let calc = {
                    "+" : (a, b) => a + b,
                    "-" : (a, b) => a - b,
                    "*" : (a, b) => a * b,
                    "/" : (a, b) => b / a,
                    "ABS": a => Math.abs(a),
                    "SIN": a => Math.sin(a),
                    "COS": a => Math.cos(a),
                    "LOG": a => Math.log(a),
                    "CEIL": a => Math.ceil(a),
                    "FLOOR": a => Math.floor(a),
                    "ROUND": a => Math.round(a),
                    "EXP": a => Math.exp(a),
                }
                let stack = [];
                
                exp.forEach(op => {
                    stack.push (
                        calc[op]
                        ? calc[op](...stack.splice(-2)) // 5 5 +
                        : op
                    )
                });
                if (isNaN(stack)) return window.alert("Expressao mal definida.");
                window.alert(Math.round(stack * 100) / 100);
            case "S":
                return window.alert("Aplicacao terminada. Ate a proxima.");
            case "A":
                return window.alert("VM - Consultar o valor da memoria\nLM - Indicar o nome das memorias\nCE - Calcular o valor duma expressao\nAVM - Atribuir ultimo valor calculado a uma memoria\nA - Ajuda\nAM - Alocar Memória\nS – Sair");
            default:
                return window.alert("Opcao inexistente.");
        }
    }
}