/* ============================================================
   SCRIPT.JS — F1 MANAGER AAA
   PARTE 1 — Sistema de Telas e Estado Global
   ============================================================ */

/* ============================
   ESTADO GLOBAL DO JOGO
   ============================ */

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
    save: {}
};


/* ============================
   FUNÇÃO: mostrar tela
   ============================ */
function mostrarTela(id) {
    document.querySelectorAll(".tela").forEach(t => t.classList.remove("visible"));
    document.getElementById(id).classList.add("visible");
}


/* ============================
   Abertura inicial
   ============================ */
function abrirMenuPrincipal() {
    mostrarTela("menu-principal");
}

function voltarParaCapa() {
    mostrarTela("tela-capa");
}

function voltarMenuPrincipal() {
    mostrarTela("menu-principal");
}

function voltarLobby() {
    mostrarTela("lobby");
}


/* ============================================================
   PARTE — CRIAR GERENTE
   ============================================================ */

function abrirCriarGerente() {
    mostrarTela("criar-gerente");
    carregarAvataresGerente();
    carregarBandeiras();
}

/* CARREGA AVATARES NA TELA */

function carregarAvataresGerente() {
    let div = document.getElementById("lista-avatares");
    div.innerHTML = "";

    AVATARES_GERENTE.forEach(a => {
        let card = document.createElement("div");
        card.classList.add("avatar-card");
        card.dataset.avatar = a.arquivo;

        card.onclick = () => {
            document.querySelectorAll(".avatar-card").forEach(c => c.classList.remove("selecionado"));
            card.classList.add("selecionado");
            JOGO.gerente = JOGO.gerente || {};
            JOGO.gerente.avatar = a.arquivo;
        };

        div.appendChild(card);
    });
}

/* CARREGA BANDEIRAS NA TELA */

function carregarBandeiras() {
    let div = document.getElementById("lista-bandeiras");
    div.innerHTML = "";

    BANDEIRAS.forEach(b => {
        let card = document.createElement("div");
        card.classList.add("bandeira-card");
        card.dataset.pais = b.codigo;

        card.onclick = () => {
            document.querySelectorAll(".bandeira-card").forEach(c => c.classList.remove("selecionado"));
            card.classList.add("selecionado");
            JOGO.gerente = JOGO.gerente || {};
            JOGO.gerente.pais = b.codigo;
        };

        div.appendChild(card);
    });
}


/* CONFIRMA GERENTE CRIADO */

function confirmarGerenteCriado() {
    let nome = document.getElementById("input-nome-gerente").value;

    if (!nome || !JOGO.gerente?.avatar || !JOGO.gerente?.pais) {
        alert("Preencha nome, avatar e bandeira!");
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
    carregarGerentesReais();
}

function carregarGerentesReais() {
    let div = document.getElementById("lista-gerentes-reais");
    div.innerHTML = "";

    GERENTES_REAIS.forEach(g => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <h3>${g.nome}</h3>
            <p>Equipe: ${g.equipe}</p>
            <p>País: ${g.pais.toUpperCase()}</p>
        `;

        card.onclick = () => {
            JOGO.gerente = {
                nome: g.nome,
                avatar: g.avatar,
                pais: g.pais
            };
            abrirEscolhaEquipe();
        };

        div.appendChild(card);
    });
}


/* ============================================================
   ESCOLHER EQUIPE
   ============================================================ */

function abrirEscolhaEquipe() {
    mostrarTela("escolher-escuderia");
    carregarEscuderias();
}

function carregarEscuderias() {
    let div = document.getElementById("lista-escuderias");
    div.innerHTML = "";

    ESCUDERIAS.forEach(e => {
        let card = document.createElement("div");
        card.classList.add("escuderia-card");

        card.innerHTML = `
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

    iniciarLobby();
}
