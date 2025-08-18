export default async function horarios(json: string) {
  const obj = JSON.parse(json);

  let hor: any = {
    agua: 0,
    sol: 0,
    ventilacao: 0,
    irrigacao_solo: 0,
    podacao: 0
  };

  // Água
  switch (obj.agua) {
    case 'muito alta': hor.agua = 12; break;
    case 'alta': hor.agua = 24; break;
    case 'media': hor.agua = 60; break;
    case 'baixa': hor.agua = 168; break;
    case 'muito baixa': hor.agua = 336; break;
    case 'nula': hor.agua = 0; break;
  }

  // Sol
  switch (obj.sol) {
    case 'muito alta': hor.sol = 12; break;
    case 'alta': hor.sol = 9; break;
    case 'media': hor.sol = 6; break;
    case 'baixa': hor.sol = 3; break;
    case 'muito baixa': hor.sol = 2; break;
    case 'nula': hor.sol = 0; break;
  }

  // Ventilação
  switch (obj.ventilacao) {
    case 'muito alta': hor.ventilacao = 14; break;
    case 'alta': hor.ventilacao = 10; break;
    case 'media': hor.ventilacao = 6; break;
    case 'baixa': hor.ventilacao = 3; break;
    case 'muito baixa': hor.ventilacao = 1; break;
    case 'nula': hor.ventilacao = 0; break;
  }

  // Irrigação do solo
  switch (obj.irrigacao_solo) {
    case 'muito alta': hor.irrigacao_solo = 24; break;
    case 'alta': hor.irrigacao_solo = 18; break;
    case 'media': hor.irrigacao_solo = 12; break;
    case 'baixa': hor.irrigacao_solo = 6; break;
    case 'muito baixa': hor.irrigacao_solo = 2; break;
    case 'nula': hor.irrigacao_solo = 0; break;
  }

 

  console.log(hor);
  return hor;
}
