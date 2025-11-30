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
/* ============================================================
   SCRIPT.JS — F1 MANAGER AAA
   PARTE 2 — Lobby, Finanças, Funcionários, Patrocínio, Mercado
   ============================================================ */

/* ============================================================
   INICIAR LOBBY
   ============================================================ */

function iniciarLobby() {
    mostrarTela("lobby");

    // Mostrar informações do gerente
    document.getElementById("nome-gerente").innerText = JOGO.gerente.nome;
    document.getElementById("pais-gerente").innerText = JOGO.gerente.pais.toUpperCase();

    // Mostrar equipe
    let equipe = ESCUDERIAS.find(e => e.key === JOGO.equipeSelecionada);

    document.getElementById("nome-equipe").innerText = equipe.nome;
    document.getElementById("motor-equipe").innerText = "Motor: " + equipe.motor;

    // Dinheiro
    atualizarDinheiro(JOGO.dinheiro);

    // Avatar do gerente
    document.getElementById("avatar-gerente").innerHTML = `
        <div class="card" style="width:90px;height:90px;background:#333;border:1px solid #555;"></div>
        <p style="font-size:12px;opacity:.6;">${JOGO.gerente.avatar}</p>
    `;
}

/* ============================================================
   ATUALIZAR DINHEIRO
   ============================================================ */

function atualizarDinheiro(valor) {
    JOGO.dinheiro = valor;
    document.getElementById("dinheiro-atual").innerText =
        "R$ " + valor.toLocaleString("pt-BR");
}

/* ============================================================
   PATRROCÍNIO
   ============================================================ */

function abrirPatrocinio() {
    mostrarTela("patrocinadores");
    carregarPatrocinios();
}

function carregarPatrocinios() {
    let div = document.getElementById("lista-patrocinios");
    div.innerHTML = "";

    PATROCINADORES.forEach(p => {
        let card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3>${p.nome}</h3>
            <p>Pagamento Mensal: R$ ${p.valor.toLocaleString("pt-BR")}</p>
        `;

        card.onclick = () => selecionarPatrocinador(p);

        div.appendChild(card);
    });
}

function selecionarPatrocinador(p) {
    JOGO.patrocinador = p;
    alert("Patrocinador selecionado: " + p.nome);
    voltarLobby();
}

/* ============================================================
   FUNCIONÁRIOS
   ============================================================ */

function abrirFuncionarios() {
    mostrarTela("funcionarios");
    carregarFuncionarios();
}

function carregarFuncionarios() {
    let div = document.getElementById("lista-funcionarios");
    div.innerHTML = "";

    FUNCIONARIOS.forEach(f => {
        let card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3>${f.nome}</h3>
            <p>Tipo: ${f.tipo}</p>
            <p>Bônus: +${f.bonus}</p>
            <p>Preço: R$ ${f.preco.toLocaleString("pt-BR")}</p>
        `;

        card.onclick = () => contratarFuncionario(f);

        div.appendChild(card);
    });
}

function contratarFuncionario(f) {
    if (JOGO.dinheiro < f.preco) {
        alert("Dinheiro insuficiente!");
        return;
    }

    JOGO.dinheiro -= f.preco;
    JOGO.funcionarios.push(f);

    atualizarDinheiro(JOGO.dinheiro);

    alert("Funcionário contratado: " + f.nome);

    voltarLobby();
}

/* ============================================================
   MERCADO DE PILOTOS
   ============================================================ */

function abrirMercadoPilotos() {
    mostrarTela("mercado-pilotos");
    carregarMercadoPilotos();
}

function carregarMercadoPilotos() {
    let div = document.getElementById("lista-pilotos-mercado");
    div.innerHTML = "";

    PILOTOS.forEach(p => {
        let card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3>${p.nome}</h3>
            <p>Equipe atual: ${p.equipe}</p>
            <p>Rating: ${p.rating}</p>
            <p>Agressividade: ${p.agressividade}</p>
            <p>Chuva: ${p.chuva}</p>
            <button onclick="contratarPiloto('${p.nome}')">Contratar</button>
        `;

        div.appendChild(card);
    });
}

function contratarPiloto(nome) {
    let piloto = PILOTOS.find(p => p.nome === nome);

    if (!piloto) {
        alert("Erro ao contratar piloto.");
        return;
    }

    if (JOGO.pilotosEquipe.length >= 2) {
        alert("Sua equipe já tem 2 pilotos. Você deve demitir alguém antes.");
        return;
    }

    // custo simbólico
    let custo = piloto.rating * 30000;

    if (JOGO.dinheiro < custo) {
        alert("Dinheiro insuficiente! Preço: R$ " + custo.toLocaleString("pt-BR"));
        return;
    }

    JOGO.dinheiro -= custo;
    atualizarDinheiro(JOGO.dinheiro);

    piloto.equipe = JOGO.equipeSelecionada;

    JOGO.pilotosEquipe.push(piloto);

    alert("Piloto contratado: " + piloto.nome);
    voltarLobby();
}

/* ============================================================
   PRÓXIMA CORRIDA
   ============================================================ */

function abrirProximaCorrida() {
    let etapa = CALENDARIO[JOGO.etapaAtual - 1];

    if (!etapa) {
        alert("Temporada finalizada!");
        return;
    }

    mostrarTela("tela-gp");

    document.getElementById("gp-nome").innerText = etapa.nome;
    document.getElementById("gp-circuito").innerText = etapa.circuito;
    document.getElementById("gp-voltas").innerText = etapa.voltas + " voltas";
}
