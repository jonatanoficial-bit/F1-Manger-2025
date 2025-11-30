/* ============================================================
   SCRIPT PRINCIPAL — F1 MANAGER 2025 AAA
   PARTE 1 — ESTADO GLOBAL, NAVEGAÇÃO, GERENTE, EQUIPES, LOBBY
   ============================================================ */

/* ===============================
   ESTADO GLOBAL DO JOGO
   =============================== */
let JOGO = {
  gerente: null,
  equipeSelecionada: null,
  dinheiro: 5000000,
  funcionarios: [],
  patrocinador: null,
  pilotosEquipe: [],
  etapaAtual: 1,
  classificacao: [],
  resultadoCorrida: [],
  carro: { aero: 0, motor: 0, chassis: 0, pit: 0 }
};

/* tabelas de pontuação */
let TABELA_PILOTOS = {};
let TABELA_CONSTRUTORES = {};

PILOTOS.forEach(p => TABELA_PILOTOS[p.nome] = 0);
ESCUDERIAS.forEach(e => TABELA_CONSTRUTORES[e.key] = 0);

/* estado da corrida */
let ESTADO_CORRIDA = null;

/* ===============================
   FUNÇÕES ÚTEIS
   =============================== */
function mostrarTela(id) {
  document.querySelectorAll(".tela").forEach(t => t.classList.remove("visible"));
  document.getElementById(id).classList.add("visible");
}

function nomeEquipe(code) {
  const e = ESCUDERIAS.find(x => x.key === code);
  return e ? e.nome : "Equipe";
}

/* ===============================
   NAVEGAÇÃO PRINCIPAL
   =============================== */

function abrirMenuPrincipal() { mostrarTela("menu-principal"); }
function voltarParaCapa() { mostrarTela("tela-capa"); }
function voltarMenuPrincipal() { mostrarTela("menu-principal"); }

function voltarLobby() {
  mostrarTela("lobby");
  iniciarLobby();
}

function voltarTelaGP() {
  mostrarTela("tela-gp");
}

function cancelarCorridaEVolarGP() {
  if (ESTADO_CORRIDA && ESTADO_CORRIDA.timer) {
    clearInterval(ESTADO_CORRIDA.timer);
  }
  mostrarTela("tela-gp");
}

/* ===============================
   CRIAÇÃO DO GERENTE
   =============================== */

function abrirCriarGerente() {
  mostrarTela("criar-gerente");
  carregarAvataresGerente();
  carregarBandeiras();
}

function carregarAvataresGerente() {
  const div = document.getElementById("lista-avatares");
  div.innerHTML = "";

  AVATARES_GERENTE.forEach(a => {
    const card = document.createElement("div");
    card.classList.add("avatar-card");

    card.onclick = () => {
      document.querySelectorAll(".avatar-card").forEach(c => c.classList.remove("selecionado"));
      card.classList.add("selecionado");
      JOGO.gerente = JOGO.gerente || {};
      JOGO.gerente.avatar = a.arquivo;
    };

    div.appendChild(card);
  });
}

function carregarBandeiras() {
  const div = document.getElementById("lista-bandeiras");
  div.innerHTML = "";

  BANDEIRAS.forEach(b => {
    const card = document.createElement("div");
    card.classList.add("bandeira-card");

    card.onclick = () => {
      document.querySelectorAll(".bandeira-card").forEach(c => c.classList.remove("selecionado"));
      card.classList.add("selecionado");
      JOGO.gerente = JOGO.gerente || {};
      JOGO.gerente.pais = b.codigo;
    };

    div.appendChild(card);
  });
}

function confirmarGerenteCriado() {
  const nome = document.getElementById("input-nome-gerente").value;
  if (!nome || !JOGO.gerente?.avatar || !JOGO.gerente?.pais) {
    alert("Preencha nome, avatar e bandeira.");
    return;
  }
  JOGO.gerente.nome = nome;
  abrirEscolhaEquipe();
}

/* ===============================
   GERENTES REAIS
   =============================== */

function abrirGerentesReais() {
  mostrarTela("gerentes-reais");
  const div = document.getElementById("lista-gerentes-reais");
  div.innerHTML = "";

  GERENTES_REAIS.forEach(g => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h3>${g.nome}</h3>
      <p>Equipe: ${nomeEquipe(g.equipe)}</p>
      <p>País: ${g.pais.toUpperCase()}</p>
    `;

    card.onclick = () => {
      JOGO.gerente = { nome: g.nome, avatar: g.avatar, pais: g.pais };
      abrirEscolhaEquipe();
    };

    div.appendChild(card);
  });
}

/* ===============================
   ESCOLHA DE ESCUDERIA
   =============================== */

function abrirEscolhaEquipe() {
  mostrarTela("escolher-escuderia");
  const div = document.getElementById("lista-escuderias");
  div.innerHTML = "";

  ESCUDERIAS.forEach(e => {
    const card = document.createElement("div");
    card.classList.add("escuderia-card");
    card.innerHTML = `
      <p><span class="mini-logo">${e.logo}</span></p>
      <h3>${e.nome}</h3>
      <p>Motor: ${e.motor}</p>
    `;
    card.onclick = () => selecionarEquipe(e.key);
    div.appendChild(card);
  });
}

function selecionarEquipe(key) {
  JOGO.equipeSelecionada = key;
  JOGO.pilotosEquipe = PILOTOS.filter(p => p.equipe === key);

  const equipe = ESCUDERIAS.find(e => e.key === key);
  if (equipe) {
    JOGO.carro = { ...equipe.carroBase };
  }

  iniciarLobby();
}

/* ===============================
   LOBBY
   =============================== */

function iniciarLobby() {
  mostrarTela("lobby");
  if (!JOGO.gerente || !JOGO.equipeSelecionada) return;

  document.getElementById("nome-gerente").innerText = JOGO.gerente.nome;
  document.getElementById("pais-gerente").innerText = (JOGO.gerente.pais || "").toUpperCase();

  const equipe = ESCUDERIAS.find(e => e.key === JOGO.equipeSelecionada);
  if (equipe) {
    document.getElementById("nome-equipe").innerText = equipe.nome;
    document.getElementById("motor-equipe").innerText = "Motor: " + equipe.motor;
  }

  document.getElementById("dinheiro-atual").innerText =
    "R$ " + JOGO.dinheiro.toLocaleString("pt-BR");

  document.getElementById("avatar-gerente").innerHTML = `
    <div class="card" style="width:70px;height:70px"></div>
    <p style="font-size:10px;opacity:.7;">${JOGO.gerente.avatar || ""}</p>
  `;
}

/* ===============================
   CALENDÁRIO
   =============================== */

function abrirCalendario() {
  mostrarTela("calendario");

  const div = document.getElementById("lista-corridas");
  div.innerHTML = "";

  CALENDARIO.forEach(c => {
    const card = document.createElement("div");
    card.classList.add("card");

    const atual = c.etapa === JOGO.etapaAtual;

    card.innerHTML = `
      <h3>${c.nome}</h3>
      <p>${c.circuito}</p>
      <p>${c.voltas} voltas</p>
      <p>Etapa ${c.etapa} ${atual ? "(Próxima)" : ""}</p>
    `;

    card.onclick = () => {
      JOGO.etapaAtual = c.etapa;
      abrirProximaCorrida();
    };

    div.appendChild(card);
  });
}

/* ===============================
   PATROCÍNIO
   =============================== */

function abrirPatrocinio() {
  mostrarTela("patrocinadores");

  const div = document.getElementById("lista-patrocinios");
  div.innerHTML = "";

  PATROCINADORES.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h3>${p.nome}</h3>
      <p>Pagamento por etapa: R$ ${p.valor.toLocaleString("pt-BR")}</p>
    `;

    card.onclick = () => {
      JOGO.patrocinador = p;
      JOGO.dinheiro += p.valor;
      alert("Patrocinador contratado: " + p.nome);
      iniciarLobby();
    };

    div.appendChild(card);
  });
}

/* ===============================
   FUNCIONÁRIOS
   =============================== */

function abrirFuncionarios() {
  mostrarTela("funcionarios");

  const div = document.getElementById("lista-funcionarios");
  div.innerHTML = "";

  FUNCIONARIOS.forEach(f => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h3>${f.nome}</h3>
      <p>Área: ${f.tipo}</p>
      <p>Bônus: +${f.bonus}</p>
      <p>Preço: R$ ${f.preco.toLocaleString("pt-BR")}</p>
      <button onclick="contratarFuncionario('${f.nome}')">Contratar</button>
    `;

    div.appendChild(card);
  });
}

function contratarFuncionario(nome) {
  const f = FUNCIONARIOS.find(x => x.nome === nome);
  if (!f) return;

  if (JOGO.dinheiro < f.preco) {
    alert("Dinheiro insuficiente.");
    return;
  }

  JOGO.dinheiro -= f.preco;
  JOGO.funcionarios.push(f);

  alert("Funcionário contratado: " + f.nome);
  iniciarLobby();
}

/* ===============================
   MERCADO DE PILOTOS
   =============================== */

function abrirMercadoPilotos() {
  mostrarTela("mercado-pilotos");

  const div = document.getElementById("lista-pilotos-mercado");
  div.innerHTML = "";

  PILOTOS.forEach(p => {
    const custo = p.rating * 30000;

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h3>${p.nome}</h3>
      <p>Equipe atual: ${nomeEquipe(p.equipe)}</p>
      <p>Rating: ${p.rating}</p>
      <p>Valor de contrato: R$ ${custo.toLocaleString("pt-BR")}</p>
      <button onclick="contratarPiloto('${p.nome}')">Contratar</button>
    `;

    div.appendChild(card);
  });
}

function contratarPiloto(nome) {
  const piloto = PILOTOS.find(p => p.nome === nome);
  if (!piloto) return;

  if (JOGO.pilotosEquipe.length >= 2) {
    alert("Sua equipe já tem 2 pilotos. Remova alguém antes de contratar outro.");
    return;
  }

  const custo = piloto.rating * 30000;

  if (JOGO.dinheiro < custo) {
    alert("Dinheiro insuficiente.");
    return;
  }

  JOGO.dinheiro -= custo;
  piloto.equipe = JOGO.equipeSelecionada;
  JOGO.pilotosEquipe.push(piloto);

  alert("Piloto contratado: " + piloto.nome);
  iniciarLobby();
}

/* ===============================
   OFICINA / MELHORIAS DO CARRO
   =============================== */

function abrirOficina() {
  mostrarTela("oficina");
  renderOficina();
}

function renderOficina() {
  const status = document.getElementById("oficina-status");
  const upgrades = document.getElementById("oficina-upgrades");

  status.innerHTML = `
    <p>Aero: ${JOGO.carro.aero}</p>
    <p>Motor: ${JOGO.carro.motor}</p>
    <p>Chassis: ${JOGO.carro.chassis}</p>
    <p>Pit Stop: ${JOGO.carro.pit}</p>
  `;

  upgrades.innerHTML = "";

  [{tipo:"aero",nome:"Aerodinâmica",custo:400000,bonus:1},
   {tipo:"motor",nome:"Motor",custo:500000,bonus:1},
   {tipo:"chassis",nome:"Chassis",custo:350000,bonus:1},
   {tipo:"pit",nome:"Pit Stop",custo:300000,bonus:1}
  ].forEach(u => {

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h3>${u.nome}</h3>
      <p>Melhora +${u.bonus}</p>
      <p>Custo: R$ ${u.custo.toLocaleString("pt-BR")}</p>
      <button onclick="aplicarUpgrade('${u.tipo}', ${u.custo}, ${u.bonus})">Aplicar</button>
    `;

    upgrades.appendChild(card);
  });
}

function aplicarUpgrade(tipo, custo, bonus) {
  if (JOGO.dinheiro < custo) {
    alert("Dinheiro insuficiente.");
    return;
  }

  JOGO.dinheiro -= custo;
  JOGO.carro[tipo] += bonus;

  alert("Upgrade aplicado!");
  renderOficina();
}

/* ===============================
   PRÓXIMO GP
   =============================== */

function abrirProximaCorrida() {
  const etapa = CALENDARIO[JOGO.etapaAtual - 1];
  if (!etapa) {
    alert("Temporada encerrada!");
    return;
  }

  mostrarTela("tela-gp");

  document.getElementById("gp-nome").innerText = etapa.nome;
  document.getElementById("gp-circuito").innerText = etapa.circuito;
  document.getElementById("gp-voltas").innerText = etapa.voltas + " voltas";
}
/* ============================================================
   TREINO LIVRE
   ============================================================ */

function abrirTreinoLivre() {
  mostrarTela("treino-livre");

  const texto =
`Iniciando sessão de Treino Livre...

Os carros entram na pista para ajustar:
• Pressão dos pneus
• Aerodinâmica e acerto de asas
• Consumo de combustível
• Modos de potência e recuperação de bateria

Sua equipe coleta dados de telemetria para melhorar o carro.

Quando terminar, avance para a Classificação.`;

  efeitoMaquina("texto-treino", texto, 18);
}

/* efeito de máquina de escrever */
function efeitoMaquina(id, texto, velocidade) {
  const div = document.getElementById(id);
  div.innerHTML = "";
  let i = 0;

  (function escrever() {
    if (i < texto.length) {
      div.innerHTML += texto.charAt(i);
      i++;
      setTimeout(escrever, velocidade);
    }
  })();
}

function finalizarTreino() {
  abrirQualificacao();
}

/* ============================================================
   CLASSIFICAÇÃO (SEM PÓDIO, APENAS GRID)
   ============================================================ */

function abrirQualificacao() {
  mostrarTela("classificacao");
  gerarClassificacao();
}

function gerarClassificacao() {
  const pilotos = [...PILOTOS];

  pilotos.forEach(p => {
    // tempo base (quanto melhor o rating, menor o tempo)
    let base = 200 - p.rating;

    // penalidade ou bônus leve pelo carro da equipe
    const equipe = ESCUDERIAS.find(e => e.key === p.equipe);
    const carroEquipe = equipe ? equipe.carroBase : { aero: 7, motor: 7, chassis: 7, pit: 7 };
    let equipeBonus = (10 - (carroEquipe.aero + carroEquipe.motor + carroEquipe.chassis) / 3);

    // bônus do carro customizado do jogador (somente para a equipe do jogador)
    let carroBonus = 0;
    if (p.equipe === JOGO.equipeSelecionada) {
      carroBonus =
        (JOGO.carro.aero + JOGO.carro.motor + JOGO.carro.chassis + JOGO.carro.pit) * -0.7;
    }

    // aleatoriedade e "nervosismo"
    const aleatorio = Math.random() * 8;

    p.tempoClassificacao = base + equipeBonus + aleatorio + carroBonus;
  });

  pilotos.sort((a, b) => a.tempoClassificacao - b.tempoClassificacao);
  JOGO.classificacao = pilotos;

  const div = document.getElementById("resultado-classificacao");
  div.innerHTML = "";

  pilotos.forEach((p, i) => {
    const linha = document.createElement("p");
    linha.innerText = `${i + 1}º - ${p.nome} (${nomeEquipe(p.equipe)})`;
    div.appendChild(linha);
  });
}

function finalizarClassificacao() {
  abrirCorrida();
}

/* ============================================================
   PREPARAR CORRIDA
   ============================================================ */

function prepararCorrida() {
  document.getElementById("corrida-voltas").innerText = "";
  document.getElementById("resultado-corrida").innerHTML = "";
  document.getElementById("btn-corrida-continuar").disabled = true;
}

/* ============================================================
   CORRIDA — SIMULAÇÃO POR VOLTAS + NARRAÇÃO
   ============================================================ */

function abrirCorrida() {
  mostrarTela("corrida");
  prepararCorrida();
  iniciarSimulacaoPorVoltas();
}

function iniciarSimulacaoPorVoltas() {
  const grid = [...JOGO.classificacao];
  if (!grid || grid.length === 0) {
    // se por algum motivo a classificação não existir, gera de novo
    gerarClassificacao();
  }

  const etapa = CALENDARIO[JOGO.etapaAtual - 1] || { voltas: 50, nome: "GP" };

  ESTADO_CORRIDA = {
    pilotos: (grid.length ? grid : [...PILOTOS]).map((p, idx) => ({
      ...p,
      score: 0,
      posicao: idx + 1
    })),
    voltaAtual: 0,
    voltasTotais: Math.min(etapa.voltas, 20), // simula no máximo 20 voltas para ficar dinâmico
    chuva: Math.random() < 0.25,
    bonusEquipe: calcularBonusFuncionariosECarro(),
    timer: null
  };

  ESTADO_CORRIDA.timer = setInterval(tickVolta, 350);
}

/* bônus total do carro + funcionários para equipe do jogador */
function calcularBonusFuncionariosECarro() {
  let total = 0;

  JOGO.funcionarios.forEach(f => {
    if (f.tipo === "engenheiro" || f.tipo === "tecnico" || f.tipo === "pit") {
      total += f.bonus;
    }
  });

  total += (JOGO.carro.aero + JOGO.carro.motor + JOGO.carro.chassis + JOGO.carro.pit);
  return total;
}

/* chamado a cada "volta" */
function tickVolta() {
  if (!ESTADO_CORRIDA) return;

  const e = ESTADO_CORRIDA;
  e.voltaAtual++;

  const mensagens = [];

  e.pilotos.forEach(p => {
    const base = p.rating * 1.1;
    const agress = p.agressividade * (0.7 + Math.random() * 0.5);

    // chuva influencia pilotagem
    const bonusChuva = e.chuva
      ? p.chuva * 1.15
      : p.chuva * 0.5;

    const equipeRating = ESCUDERIAS.find(x => x.key === p.equipe)?.rating || 75;

    const rand = Math.random() * 10;

    let bonusTeam = 0;
    if (p.equipe === JOGO.equipeSelecionada) {
      bonusTeam = e.bonusEquipe * 1.25;
    }

    p.score += base + agress + bonusChuva + equipeRating + rand + bonusTeam;
  });

  // ordena pela performance acumulada
  e.pilotos.sort((a, b) => b.score - a.score);

  const lider = e.pilotos[0];
  mensagens.push(`Volta ${e.voltaAtual}: ${lider.nome} lidera com ${nomeEquipe(lider.equipe)}.`);

  // destaque dos pilotos da sua equipe
  e.pilotos.forEach((p, idx) => {
    if (p.equipe === JOGO.equipeSelecionada && idx < 10) {
      mensagens.push(`• ${p.nome} está em ${idx + 1}º lugar.`);
    }
  });

  atualizarPainelCorrida(mensagens);

  if (e.voltaAtual >= e.voltasTotais) {
    encerrarSimulacaoCorrida();
  }
}

function atualizarPainelCorrida(mensagens) {
  const e = ESTADO_CORRIDA;
  if (!e) return;

  document.getElementById("corrida-voltas").innerText =
    `Volta ${e.voltaAtual} / ${e.voltasTotais}`;

  const div = document.getElementById("resultado-corrida");

  mensagens.forEach(txt => {
    const p = document.createElement("p");
    p.innerText = txt;
    div.appendChild(p);
  });

  // limita para não ficar gigantesco
  while (div.childNodes.length > 30) {
    div.removeChild(div.firstChild);
  }
}

function encerrarSimulacaoCorrida() {
  if (!ESTADO_CORRIDA) return;

  clearInterval(ESTADO_CORRIDA.timer);

  ESTADO_CORRIDA.pilotos.sort((a, b) => b.score - a.score);

  JOGO.resultadoCorrida = ESTADO_CORRIDA.pilotos.map(p => ({
    piloto: p,
    performance: p.score
  }));

  // a função aplicarPontuacao será definida na PARTE 3
  aplicarPontuacao(JOGO.resultadoCorrida);

  // habilita botão "Ver Pódio"
  document.getElementById("btn-corrida-continuar").disabled = false;
}
