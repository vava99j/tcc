export default async function horarios(json: string, nome: string) {
  const obj = JSON.parse(json);

  let horarios: any = {
    agua: 0,
    sol: 0,
    ventilacao: 0,
    irrigacao_solo: 0,
    podacao: 0
  };

  // Água
  switch (obj.agua) {
    case 'muito alta': horarios.agua = 12; break;
    case 'alta': horarios.agua = 24; break;
    case 'media': horarios.agua = 60; break;
    case 'baixa': horarios.agua = 168; break;
    case 'muito baixa': horarios.agua = 336; break;
    case 'nula': horarios.agua = 0; break;
  }

  // Sol
  switch (obj.sol) {
    case 'muito alta': horarios.sol = 12; break;
    case 'alta': horarios.sol = 9; break;
    case 'media': horarios.sol = 6; break;
    case 'baixa': horarios.sol = 3; break;
    case 'muito baixa': horarios.sol = 2; break;
    case 'nula': horarios.sol = 0; break;
  }

  // Ventilação
  switch (obj.ventilacao) {
    case 'muito alta': horarios.ventilacao = 14; break;
    case 'alta': horarios.ventilacao = 10; break;
    case 'media': horarios.ventilacao = 6; break;
    case 'baixa': horarios.ventilacao = 3; break;
    case 'muito baixa': horarios.ventilacao = 1; break;
    case 'nula': horarios.ventilacao = 0; break;
  }

  // Irrigação do solo
  switch (obj.irrigacao_solo) {
    case 'muito alta': horarios.irrigacao_solo = 24; break;
    case 'alta': horarios.irrigacao_solo = 18; break;
    case 'media': horarios.irrigacao_solo = 12; break;
    case 'baixa': horarios.irrigacao_solo = 6; break;
    case 'muito baixa': horarios.irrigacao_solo = 2; break;
    case 'nula': horarios.irrigacao_solo = 0; break;
  }

 
  console.log(horarios);
  let hor = 
   "Horarios da planta: "+ nome+ "\n"+
    "água: " + horarios.agua + "h,\n" +
    "sol: " + horarios.sol + "h,\n" +
    "ventilação: " + horarios.ventilacao + "h,\n" +
    "irrigação do solo: " + horarios.irrigacao_solo + "h.\n" 
  return hor;
}
