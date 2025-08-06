
  export async function buscarCuidadosGemini(nomeCientifico: string) {
    const apiKey = 'AIzaSyBS5Sldn2k_hOvcI2lvw7p-qC1LJoZW3iwz'; // Troque pela sua API KEY real e guarde em local seguro

    const prompt = `
    Me dê os cuidados da planta '${nomeCientifico}' com os seguintes campos:
    rega (nenhuma | baixa | média | alta | muito alta)
    sol (sombra | meia sombra | sol pleno)
    ventilação (ruim | média | boa)
    solo (arenoso | argiloso | fértil | drenado)
    poda (nenhuma | ocasional | anual | frequente)

    Responda apenas como JSON com os campos e valores.
    `;

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + apiKey, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();
    const texto = data.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log('Resposta:', texto);

    try {
      const json = JSON.parse(texto);
      return json;
    } catch (err) {
      console.log('Erro ao converter resposta:', texto);
      return ;
    }
  }