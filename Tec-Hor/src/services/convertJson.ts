type Cuidados = {
  rega?: string;
  luz?: string;
  ventilacao?: string;
  poda?: string;
  irrigacao_do_solo?: string;
};

export function transformarEmJSON(cuidadosTexto: string): Cuidados {
  const linhas = cuidadosTexto.split('\n');
  const objeto: Cuidados = {};

  for (let i = 2; i < linhas.length; i++) {
    const linha = linhas[i].trim();
    if (linha === '') continue;

    const partes = linha.split(':');
    if (partes.length < 2) continue;

    const chaveRaw = partes[0].trim();
    const valor = partes.slice(1).join(':').trim(); // caso o valor tenha ':' internamente

    // Normaliza a chave para remover acentos e substituir espaços por underline
    const chave = chaveRaw
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ /g, '_')
      .toLowerCase();

    // Atribui ao objeto
    (objeto as any)[chave] = valor;
  }

  return objeto;
}