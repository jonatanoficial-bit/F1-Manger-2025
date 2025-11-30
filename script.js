/* ============================================================
   SCRIPT PRINCIPAL — F1 MANAGER AAA
   ============================================================ */

/* ESTADO GLOBAL */
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

/* TABELAS DE CAMPEONATO */
let TABELA_PILOTOS = {};
let TABELA_CONSTRUTORES = {};

PILOTOS.forEach(p => TABELA_PILOTOS[p.nome] = 0);
ESCUDERIAS.forEach(e => TABELA_CONSTRUTORES[e.key] = 0);

/* ESTADO DA CORRIDA (usado na Parte 2) */
let ESTADO_CORRIDA = null;

/* UPGRADES DA OFICINA */
const UPGRADES = [
  { tipo: "aero",   nome: "Aero / Downforce",      custo: 400000, bonus: 1 },
  { tipo: "motor",  nome: "Motor / Potência",      custo: 500000, bonus: 1 },
  { tipo: "chassis",nome: "Chassis / Equilíbrio",  custo: 350000, bonus: 1 },
  { tipo: "pit",    nome: "Box / Pit Stop",        custo: 300000, bonus: 1 }
];

/* ============================================================
   FUNÇÕES AUXILIARES
   ============================================================ */

function mostrarTela(id) {
  document.querySelectorAll(".tela").forEach(t => t.classList.remove("visible"));
  document.getElementById(id).classList.add("visible");
}

function nomeEquipe(code) {
  const e = ESCUDERIAS.find(x => x.key === code);
  return e ? e.nome : "Equipe";
}

/* NAVEGAÇÃO BÁSICA */

function abrirMenuPrincipal() { mostrarTela("menu-principal"); }
function voltarParaCapa()     { mostrarTela("tela-capa"); }
function voltarMenuPrincipal(){ mostrarTela("menu-principal"); }

function voltarLobby() {
  mostrarTela("lobby");
  iniciarLobby();
}

function abrirCreditos() {
  mostrarTela("creditos");
}

/* ============================================================
   CRIAÇÃO DO GERENTE
   ============================================================ */

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
    card.title = a.nome;

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
    card.title = b.codigo.toUpperCase();

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

/* ============================================================
   GERENTES REAIS
   ============================================================ */

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

/* ============================================================
   ESCOLHA DE ESCUDERIA
   ============================================================ */

function abrirEscolhaEquipe() {
  mostrarTela("escolher-escuderia");
  const div = document.getElementById("lista-escuderias");
  div.innerHTML = "";

  ESCUDERIAS.forEach(e => {
    const card = document.createElement("div");
    card.classList.add("escuderia-card");
    card.innerHTML = `
      <p><span class="mini-logo"><span>${e.logo}</span></span></p>
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

/* ============================================================
   LOBBY
   ============================================================ */

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
    <div class="card" style="width:70px;height:70px;"></div>
    <p style="font-size:10px;opacity:.6;">${JOGO.gerente.avatar || ""}</p>
  `;
}

/* ============================================================
   CALENDÁRIO
   ============================================================ */

function abrirCalendario() {
  mostrarTela("calendario");
  const div = document.getElementById("lista-corridas");
  div.innerHTML = "";

  CALENDARIO.forEach(c => {
    const card = document.createElement("div");
    card.classList.add("card");
    const atual = (c.etapa === JOGO.etapaAtual);
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

/* ============================================================
   PATROCÍNIO
   ============================================================ */

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

/* ============================================================
   FUNCIONÁRIOS
   ============================================================ */

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

/* ============================================================
   MERCADO DE PILOTOS
   ============================================================ */

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

/* ============================================================
   OFICINA / MELHORIAS DO CARRO
   ============================================================ */

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
  UPGRADES.forEach(u => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h3>${u.nome}</h3>
      <p>Melhora +${u.bonus}</p>
      <p>Custo: R$ ${u.custo.toLocaleString("pt-BR")}</p>
      <button onclick="aplicarUpgrade('${u.tipo}')">Aplicar</button>
    `;
    upgrades.appendChild(card);
  });
}

function aplicarUpgrade(tipo) {
  const up = UPGRADES.find(u => u.tipo === tipo);
  if (!up) return;

  if (JOGO.dinheiro < up.custo) {
    alert("Dinheiro insuficiente.");
    return;
  }

  JOGO.dinheiro -= up.custo;
  JOGO.carro[tipo] = (JOGO.carro[tipo] || 0) + up.bonus;

  alert("Upgrade aplicado em: " + up.nome);
  renderOficina();
}

/* ============================================================
   PRÓXIMA CORRIDA
   ============================================================ */

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
• Aerodinâmica
• Combustível
• Níveis de potência

Sua equipe coleta dados para melhorar o carro.

Prepare-se: a Classificação começa em breve...`;

  efeitoMaquina("texto-treino", texto, 18);
}

/* Efeito de máquina de escrever */
function efeitoMaquina(id, texto, velocidade) {
  const div = document.getElementById(id);
  div.innerHTML = "";
  let i = 0;

  (function escrever(){
    if (i < texto.length) {
      div.innerHTML += texto.charAt(i);
      i++;
      setTimeout(escrever, velocidade);
    }
  })();
}

function finalizarTreino() {
  mostrarTela("classificacao");
  gerarClassificacao();
}

/* ============================================================
   CLASSIFICAÇÃO
   ============================================================ */

function abrirQualificacao() {
  mostrarTela("classificacao");
  gerarClassificacao();
}

function gerarClassificacao() {
  const pilotos = [...PILOTOS];

  pilotos.forEach(p => {
    /* Tempo base reduzido pelo rating */
    let base = 200 - p.rating;

    /* Força da equipe */
    let equipe = ESCUDERIAS.find(e => e.key === p.equipe);
    let equipeBonus = equipe ? (100 - equipe.rating) / 8 : 0;

    /* Bônus do carro melhorado */
    let carroBonus = 0;
    if (p.equipe === JOGO.equipeSelecionada) {
      carroBonus =
        (JOGO.carro.aero + JOGO.carro.motor + JOGO.carro.chassis + JOGO.carro.pit) * -0.8;
    }

    /* Aleatoriedade */
    let aleatorio = Math.random() * 8;

    p.tempoClassificacao = base + equipeBonus + aleatorio + carroBonus;
  });

  pilotos.sort((a, b) => a.tempoClassificacao - b.tempoClassificacao);
  JOGO.classificacao = pilotos;

  const div = document.getElementById("resultado-classificacao");
  div.innerHTML = "";

  pilotos.forEach((p, i) => {
    const linha = document.createElement("p");
    linha.innerText = `${i+1}º - ${p.nome} (${nomeEquipe(p.equipe)})`;
    div.appendChild(linha);
  });
}

function finalizarClassificacao() {
  mostrarTela("corrida");
  prepararCorrida();
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
  iniciarSimulacaoPorVoltas();
}

function iniciarSimulacaoPorVoltas() {
  const grid = [...JOGO.classificacao];
  const etapa = CALENDARIO[JOGO.etapaAtual - 1];

  ESTADO_CORRIDA = {
    pilotos: grid.map((p, idx) => ({ ...p, score: 0, posicao: idx+1 })),
    voltaAtual: 0,
    voltasTotais: Math.min(etapa.voltas, 18), // 18 voltas simuladas
    chuva: Math.random() < 0.25,
    bonusEquipe: calcularBonusFuncionarios(),
    timer: null
  };

  ESTADO_CORRIDA.timer = setInterval(tickVolta, 350);
}

/* Bônus total dos funcionários + upgrades */
function calcularBonusFuncionarios() {
  let total = 0;

  JOGO.funcionarios.forEach(f => {
    if (f.tipo === "engenheiro" || f.tipo === "tecnico") {
      total += f.bonus;
    }
  });

  /* Bônus do carro */
  total += JOGO.carro.aero + JOGO.carro.motor + JOGO.carro.chassis + JOGO.carro.pit;

  return total;
}

function tickVolta() {
  if (!ESTADO_CORRIDA) return;

  ESTADO_CORRIDA.voltaAtual++;
  const e = ESTADO_CORRIDA;

  let mensagens = [];

  /* Cálculo por piloto a cada volta */
  e.pilotos.forEach(p => {
    const base = p.rating * 1.1;
    const agress = p.agressividade * (Math.random() * 0.5 + 0.7);

    /* Chuva */
    const bonusChuva = e.chuva
      ? p.chuva * 1.1
      : p.chuva * 0.5;

    /* Força da equipe */
    const equipeRating = ESCUDERIAS.find(x => x.key === p.equipe)?.rating || 75;

    const rand = Math.random() * 10;

    /* Bônus do jogador */
    let bonusTeam = 0;
    if (p.equipe === JOGO.equipeSelecionada) {
      bonusTeam = e.bonusEquipe * 1.25;
    }

    /* SCORE DA VOLTA */
    p.score += base + agress + bonusChuva + equipeRating + rand + bonusTeam;
  });

  /* Ordena a cada volta */
  e.pilotos.sort((a,b) => b.score - a.score);

  /* Narração */
  const lider = e.pilotos[0];
  mensagens.push(`Volta ${e.voltaAtual}: ${lider.nome} lidera com ${nomeEquipe(lider.equipe)}.`);

  /* Destaque dos pilotos do jogador */
  e.pilotos.forEach((p, idx) => {
    if (p.equipe === JOGO.equipeSelecionada && idx < 6) {
      mensagens.push(`• ${p.nome} está em ${idx+1}º lugar!`);
    }
  });

  /* Atualiza painel */
  atualizarPainelCorrida(mensagens);

  /* ENCERRA */
  if (e.voltaAtual >= e.voltasTotais) {
    encerrarSimulacaoCorrida();
  }
}

function atualizarPainelCorrida(mensagens) {
  document.getElementById("corrida-voltas").innerText =
    `Volta ${ESTADO_CORRIDA.voltaAtual} / ${ESTADO_CORRIDA.voltasTotais}`;

  const div = document.getElementById("resultado-corrida");

  mensagens.forEach(txt => {
    const p = document.createElement("p");
    p.innerText = txt;
    div.appendChild(p);
  });

  /* Mantém só os últimos 20 eventos para não travar */
  while (div.childNodes.length > 20) {
    div.removeChild(div.firstChild);
  }
}

function encerrarSimulacaoCorrida() {
  clearInterval(ESTADO_CORRIDA.timer);

  ESTADO_CORRIDA.pilotos.sort((a,b) => b.score - a.score);

  JOGO.resultadoCorrida = ESTADO_CORRIDA.pilotos.map(p => ({
    piloto: p,
    performance: p.score
  }));

  aplicarPontuacao(JOGO.resultadoCorrida);

  /* Habilita botão para ir ao pódio */
  document.getElementById("btn-corrida-continuar").disabled = false;
}
/* ============================================================
   PONTUAÇÃO E CAMPEONATO
   ============================================================ */

function aplicarPontuacao(resultado) {
  resultado.forEach((r, idx) => {
    const piloto = r.piloto;
    const equipe = piloto.equipe;
    const pontos = PONTOS[idx] || 0;

    if (!TABELA_PILOTOS[piloto.nome]) TABELA_PILOTOS[piloto.nome] = 0;
    if (!TABELA_CONSTRUTORES[equipe]) TABELA_CONSTRUTORES[equipe] = 0;

    TABELA_PILOTOS[piloto.nome] += pontos;
    TABELA_CONSTRUTORES[equipe] += pontos;
  });
}

/* ============================================================
   PÓDIO
   ============================================================ */

function irParaPodio() {
  mostrarTela("podio");
  renderPodio();
}

function renderPodio() {
  const div = document.getElementById("podio-top3");
  div.innerHTML = "";

  if (!JOGO.resultadoCorrida || JOGO.resultadoCorrida.length === 0) return;

  const top3 = JOGO.resultadoCorrida.slice(0, 3);

  top3.forEach((r, idx) => {
    const p = r.piloto;
    const equipe = ESCUDERIAS.find(e => e.key === p.equipe);

    const card = document.createElement("div");
    card.classList.add("podio-card");
    card.innerHTML = `
      <h3>${idx + 1}º lugar</h3>
      <div class="mini-avatar"><span>${p.avatar}</span></div>
      <p>${p.nome}</p>
      <p>${nomeEquipe(p.equipe)}</p>
      <div class="mini-logo"><span>${equipe ? equipe.logo : ""}</span></div>
    `;

    div.appendChild(card);
  });

  /* Avança etapa */
  JOGO.etapaAtual++;
}

/* ============================================================
   CLASSIFICAÇÃO DE PILOTOS
   ============================================================ */

function abrirTabelaPilotos() {
  mostrarTela("tabela-pilotos");

  const div = document.getElementById("tabela-pilotos-conteudo");
  div.innerHTML = "";

  const lista = Object.keys(TABELA_PILOTOS).map(nome => ({
    nome,
    pontos: TABELA_PILOTOS[nome],
    dados: PILOTOS.find(p => p.nome === nome)
  })).sort((a, b) => b.pontos - a.pontos);

  lista.forEach((item, idx) => {
    if (!item.dados) return;

    const p = item.dados;

    const linha = document.createElement("div");
    linha.classList.add("card");
    linha.innerHTML = `
      <p>
        ${idx + 1}º
        <span class="mini-avatar"><span>${p.avatar}</span></span>
        ${item.nome} (${nomeEquipe(p.equipe)}) — ${item.pontos} pts
      </p>
    `;

    div.appendChild(linha);
  });
}

/* ============================================================
   CLASSIFICAÇÃO DE EQUIPES
   ============================================================ */

function abrirTabelaEquipes() {
  mostrarTela("tabela-equipes");

  const div = document.getElementById("tabela-equipes-conteudo");
  div.innerHTML = "";

  const lista = ESCUDERIAS.map(e => ({
    equipe: e,
    pontos: TABELA_CONSTRUTORES[e.key] || 0
  })).sort((a, b) => b.pontos - a.pontos);

  lista.forEach((item, idx) => {
    const e = item.equipe;

    const linha = document.createElement("div");
    linha.classList.add("card");
    linha.innerHTML = `
      <p>
        ${idx + 1}º
        <span class="mini-logo"><span>${e.logo}</span></span>
        ${e.nome} — ${item.pontos} pts
      </p>
    `;

    div.appendChild(linha);
  });
}

/* ============================================================
   SALVAR / CARREGAR / RESETAR CARREIRA
   ============================================================ */

function salvarJogo() {
  const save = {
    JOGO,
    TABELA_PILOTOS,
    TABELA_CONSTRUTORES
  };

  try {
    localStorage.setItem("F1_MANAGER_SALVO", JSON.stringify(save));
  } catch (e) {
    console.error("Erro ao salvar jogo:", e);
  }
}

function carregarJogo() {
  let data = null;
  try {
    data = localStorage.getItem("F1_MANAGER_SALVO");
  } catch (e) {
    console.error("Erro ao carregar save:", e);
  }

  if (!data) {
    alert("Nenhuma carreira salva encontrada.");
    return;
  }

  try {
    const save = JSON.parse(data);
    JOGO = save.JOGO;
    TABELA_PILOTOS = save.TABELA_PILOTOS;
    TABELA_CONSTRUTORES = save.TABELA_CONSTRUTORES;
  } catch (e) {
    console.error("Erro ao interpretar save:", e);
    alert("Save corrompido.");
    return;
  }

  iniciarLobby();
}

function resetarCarreira() {
  if (!confirm("Deseja apagar tudo e recomeçar a carreira?")) return;

  try {
    localStorage.removeItem("F1_MANAGER_SALVO");
  } catch (e) {
    console.error("Erro ao limpar save:", e);
  }

  /* Estado inicial */
  JOGO = {
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

  TABELA_PILOTOS = {};
  TABELA_CONSTRUTORES = {};

  PILOTOS.forEach(p => TABELA_PILOTOS[p.nome] = 0);
  ESCUDERIAS.forEach(e => TABELA_CONSTRUTORES[e.key] = 0);

  mostrarTela("tela-capa");
}

/* ============================================================
   FINAL
   ============================================================ */

console.log("F1 Manager AAA — script carregado com sucesso.");
