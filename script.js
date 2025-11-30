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
