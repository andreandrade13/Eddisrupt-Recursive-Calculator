//============CLASS============\\
class Sentence {
    constructor(input) {
        this.input = input;
    }
}

//============UTILS============\\
const command = (exp) => { //get command (e.g. CE)
    const commRegex = /^(\w+)/gi;
    const commArr = commRegex.exec(exp);
    return commArr != null && commArr[0].toUpperCase();
}

const operator = (arg) => { // get operator (e.g. +)
    const operatorRegex = /[*+-/]|ABS|COS|LOG|CEIL|FLOOR|SIN|ROUND|EXP/gi;
    const opArr = operatorRegex.exec(arg);
    if (opArr == null) return false;
    return opArr[0];
}

const expression = (arg) => { //get expression (e.g. + (5) (5))
    return [...arg].splice(3).join("");
}

const formatExp = (arg) => { //return an array without parentheses
    let result = arg.replace(/[()]/g, "");
    result = result.split(" "); 
    result.shift();
    result.reverse();
    result = result.map(i => {return Number(i) ? Number(i) : i});
    return result;
}

const isBalanced = (exp) => { //chek if parentheses are balanced
    const parObj = {
        '(': ')'
    };
    const closing = Object.values(parObj);
    const stack = [];
            
    for (let char of exp) {
        if (parObj[char]) {
            stack.push(char);
        } else if (closing.includes(char) && char !== parObj[stack.pop()]) {
        return false;
        }
    }
    return !stack.length;
}

const checkParOperands = (exp) => { //check if there is a sign AND a opening par at each operand
    let oper = operator(exp);
    let expr = expression(exp).split(" ");

    for (let elem = 1; elem < expr.length; elem++) {
        if (oper === expr[0] && expr[elem][0] !== '(') return false;
    }
}

//============FUNCTIONS============\\
const S = () => {
    window.alert("Aplicacao terminada. Ate a proxima.");
}

const A = () => {
    window.alert("VM - Consultar o valor da memoria\nLM - Indicar o nome das memorias\nCE - Calcular o valor duma expressao\nAVM - Atribuir ultimo valor calculado a uma memoria\nA - Ajuda\nAM - Alocar Memória\nS – Sair");
}

const CE = (exp) => {
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
}

const AM = (arg) => {
    let memory = {};
    let name = expression(arg);

    memory[name] = 0;
    memory[name] = memory[name].toFixed(2);
    console.log(memory);
    window.alert(`memoria criada com o nome: ${name}`);
    
}

//============PROGRAM============\\
const calculator = () => {

    const loopingExec = () => {
        //Capturing the input and creating the object
        const userInput = window.prompt("Digite a equacao ou 'A' para ajuda");
        const capture = new Sentence(userInput);

        //Check if parenthesis is balanced
        if (isBalanced(capture.input) === false) return [window.alert("Expressao mal definida."), loopingExec()];

        //Check if sign exists and operand begin with parenthesis
        if (checkParOperands(capture.input) === false) return [window.alert("Expressao mal definida."), loopingExec()];

        //Detect command => provide action
        const functions = (exp) => {
            switch(command(exp)) {
                case "CE":
                    return [CE(formatExp(exp)), loopingExec()];
                case "AM":
                    return [AM(exp), loopingExec()];
                case "VM":
                case "LM":
                case "AVM":
                    return [window.alert("Beleza!"), loopingExec()];
                case "A":
                    return [A(), loopingExec()];
                case "S":
                    return S();
                default:
                    return [window.alert("Opcao inexistente."), loopingExec()];
            }
        }
        functions(capture.input);
    }
    loopingExec();
}

calculator();

/* Tests from Online Tool

TEST1
        CE 0.53 -> 0.53
        CE 3.14159 -> 3.14
        CE 56723 -> 56723
        CE 56723.01 -> 56723.01
        CE 0.000001 -> 0
        CE 0.01 -> 0.01
        CE 0.555 -> 0.56
        CE a -> Expressao mal definida.
        CE (1 -> Expressao mal definida.
        S -> Aplicacao terminada. Ate a proxima.

TEST2
        CE ABS (-1) -> 1
        CE ABS (456) -> 456
        CE ABS (-562.02) -> 562.02
        CE COS (3) -> -0.99
        CE COS (0.8) -> 0.7
        CE LOG (0.8) -> -0.22
        CE LOG (101) -> 4.62
        CE CEIL (1.02) -> 2
        CE CEIL (-4.123) -> -4 
        CE FLOOR (-4.123) -> -5
        CE FLOOR (2.54) -> 2
        CE SIN (0.5) -> 0.48
        CE SIN (1) -> 0.84
        CE ROUND (4.67) -> 5 
        CE ROUND (4.5) -> 5
        CE ROUND (3.23545) -> 3
        CE EXP (3.23545) -> 25.42
        CE EXP (-1.4) -> 0.25
        CE EXP (-1.4 -> Expressao mal definida.
        CE EXP ( -> Expressao mal definida.
        CE BI (17) -> Expressao mal definida.
        S -> Aplicacao terminada. Ate a proxima.

TEST3
        CE + (4) (5) -> 9
        CE + (-1) (5) -> 4
        CE - (5) (5) -> 0
        CE / (5) (5) -> 1
        CE / (5) (3) -> 1.67
        CE * (23) (43) -> 989
        CE + (-1) (-1) -> -2
        CE ~ (-1) (-1) -> Expressao mal definida.
        CE * (-1 (-1) -> Expressao mal definida.
        CE * -1 (-1) -> Expressao mal definida.
        CE / -1456787654 -1) -> Expressao mal definida.
        CE + -1 -1 -> Expressao mal definida.
        CE * (780982) 754 -> Expressao mal definida.
        S -> Aplicacao terminada. Ate a proxima.

TEST4
        CE + (+ (-1) (5)) (5) -> 9
        CE + (+ (-1) (5)) (+ (-1) (5)) -> 8
        CE + (+ (-1) (5)) (+ (-1) (+ (-1) (5))) -> 7
        CE + (+ (1) (5)) (+ (3) (+ (2) (* (7) (5)))) -> 46
        CE / (* (* (2) (5)) (5)) (+ (3) (/ (2) (* (7) (5)))) -> 16.36
        CE / (* (* (2) (5)) (5)) (+ (3) (/ (2) (* (7) (5))) -> Expressao mal definida.
        CE / (* (* (2) (5) (5)) (+ (3) (/ (2) (* (7) (5)))) -> Expressao mal definida.
        S -> Aplicacao terminada. Ate a proxima.

TEST5

        CE + (+ (4566578) (5)) (LOG (0.8)) -> 4566582.78
        CE * (+ (4566578) (5)) (LOG (* (2) (5))) -> 10514945.94
        CE * (+ (4566578) (5)) (LOG (* (5) (COS (1)))) -> 4538322.44
        CE * (+ (4566578) (5)) (LOG (* (+ (+ (1) (5)) (+ (3) (+ (2) (* (7) (5))))) (COS (1)))) -> 14672499.34
#ERR#   CE * (+ (* (+ (4566578) (5)) (LOG (* (+ (+ (1) (5)) (+ (3) (+ (2) (* (7) (5))))) (COS (1))))) (5)) (LOG (* (+ (+ (1) (5)) (+ (3) (+ (2) (* (7) (5))))) (COS (1)))) -> 47142975.45
        CE * (+ (* (+ (4566578) (5)) (LOG (* (+ (+ (1) (5)) (+ (3) (+ (2) (* (7) (5))))) (COS (1))))) (5)) (LOG (* (+ (+ (1) (5)) (+ (3) (+ (2) (* (7) (5))))) (COS (1))) -> Expressao mal definida.
        S -> Aplicacao terminada. Ate a proxima.

TEST6
        
#ERR#   LM -> Calculadora sem memorias.
        AM memory_1 -> memoria criada com o nome: memory_1
        CE + (4) (5) -> 9
#ERR#   AVM memory_1 -> memory_1: 9.00
#ERR#   CE + (memory_1) (5) -> 14.00
#ERR#   AVM memory_2 -> Memoria nao existente.
        AM memory_2 -> memoria criada com o nome: memory_2
#ERR#   LM -> memory_1: 9.00; memory_2: 0.00
#ERR#   AVM memory_2 -> memory_2: 14.00
#ERR#   CE + (memory_1) (EXP (/ (memory_2) (memory_1))) -> 13.74
        S -> Aplicacao terminada. Ate a proxima.
*/

/* failed tests

TEST5
    #ERR#   CE * (+ (* (+ (4566578) (5)) (LOG (* (+ (+ (1) (5)) (+ (3) (+ (2) (* (7) (5))))) (COS (1))))) (5)) (LOG (* (+ (+ (1) (5)) (+ (3) (+ (2) (* (7) (5))))) (COS (1)))) -> 47142975.45

TEST6
    #ERR#   LM -> Calculadora sem memorias.
    #ERR#   AVM memory_1 -> memory_1: 9.00
    #ERR#   CE + (memory_1) (5) -> 14.00
    #ERR#   AVM memory_2 -> Memoria nao existente.
    #ERR#   LM -> memory_1: 9.00; memory_2: 0.00
    #ERR#   AVM memory_2 -> memory_2: 14.00
    #ERR#   CE + (memory_1) (EXP (/ (memory_2) (memory_1))) -> 13.74

*/