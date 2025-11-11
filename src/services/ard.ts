import horarios from "./horarios";

export default async function arduino(json:string) {
const obj = JSON.parse(json);
let prog = ""

console.log(obj.agua);  // 

switch(obj.agua) {
    case 'alta':
        prog += '1';
        break;
    case 'media':
        prog += '2';
        break;
    case 'baixa':
        prog += '3';
        break;
}
switch(obj.sol) {
    case 'alta':
        prog += '1';
        break;
    case 'media':
        prog += '2';
        break;
    case 'baixa':
        prog += '3';
        break;
}
switch(obj.ventilacao) {
    case 'alta':
        prog += '1';
        break;
    case 'media':
        prog += '2';
        break;
    case 'baixa':
        prog += '3';
        break;
}
switch(obj.irrigacao_solo) {
    case 'alta':
        prog += '1';
        break;
    case 'media':
        prog += '2';
        break;
    case 'baixa':
        prog += '3';
        break;
}


console.log(prog)


}