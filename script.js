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
/* ============================================================
   SCRIPT.JS — F1 MANAGER AAA
   PARTE 3 — Fluxo de GP (Treino — Quali — Pré-corrida)
   ============================================================ */

/* ============================================================
   TREINO LIVRE
   ============================================================ */

function abrirTreinoLivre() {
    mostrarTela("treino-livre");
    iniciarTextoTreino();
}

function iniciarTextoTreino() {
    let texto = 
`Iniciando sessão de Treino Livre...

Os pilotos estão entrando na pista.
A equipe coleta dados de acerto, desgaste de pneus e consumo de combustível.
O tráfego é leve, e os ajustes aerodinâmicos começam a ser avaliados.

A equipe técnica analisa telemetria ao vivo.
Prepare-se para a Classificação.
`;

    efeitoMaquina("texto-treino", texto, 15);
}

function finalizarTreino() {
    mostrarTela("classificacao");
    gerarClassificacao();
}

/* ============================================================
   EFEITO MÁQUINA DE ESCREVER
   ============================================================ */

function efeitoMaquina(id, texto, velocidade = 20) {
    let div = document.getElementById(id);
    div.innerHTML = "";
    let i = 0;

    function escrever() {
        if (i < texto.length) {
            div.innerHTML += texto.charAt(i);
            i++;
            setTimeout(escrever, velocidade);
        }
    }

    escrever();
}

/* ============================================================
   CLASSIFICAÇÃO
   ============================================================ */

function gerarClassificacao() {
    let pilotos = [...PILOTOS]; // copia

    // A classificação considera: rating + agressividade + fator aleatório
    pilotos.forEach(p => {
        p.tempoClassificacao = 
            (200 - p.rating) + 
            (20 - p.agressividade / 5) + 
            (Math.random() * 10); 
    });

    pilotos.sort((a, b) => a.tempoClassificacao - b.tempoClassificacao);
    JOGO.classificacao = pilotos;

    mostrarClassificacao();
}

function mostrarClassificacao() {
    let div = document.getElementById("resultado-classificacao");
    div.innerHTML = "";

    JOGO.classificacao.forEach((p, index) => {
        let linha = document.createElement("p");
        linha.innerText = `${index + 1}º - ${p.nome} (${p.equipe})`;
        div.appendChild(linha);
    });
}

function finalizarClassificacao() {
    mostrarTela("corrida");
    prepararCorrida();
}

/* ============================================================
   PRÉ-CORRIDA
   ============================================================ */

function prepararCorrida() {
    let div = document.getElementById("resultado-corrida");
    div.innerHTML = `
        <p>Corrida prestes a começar...</p>
        <p>Grid definido com base na classificação.</p>
        <p>Clique em "Iniciar Corrida" para simular.</p>
    `;
}
/* ============================================================
   SCRIPT.JS — F1 MANAGER AAA
   PARTE 4 — IA da Corrida Completa
   ============================================================ */

/* ============================================================
   INICIAR CORRIDA
   ============================================================ */

function abrirCorrida() {
    mostrarTela("corrida");
    simularCorrida();
}

/* ============================================================
   SIMULAÇÃO DE CORRIDA — IA COMPLETA
   ============================================================ */

function simularCorrida() {
    let pilotos = [...JOGO.classificacao]; // Grid da Classificação
    let etapa = CALENDARIO[JOGO.etapaAtual - 1];

    let resultado = [];

    // Chance de chuva baseada no circuito (simples)
    let chuva = Math.random() < 0.25; // 25%
    let safetyCar = Math.random() < 0.15; // 15%

    // Influência dos funcionários
    let bonusEquipe = calcularBonusFuncionarios();

    pilotos.forEach((p, index) => {
        let base = p.rating * 1.2;

        // Agressividade aumenta chance de ultrapassar
        let agressividade = p.agressividade * (Math.random() * 0.4 + 0.8);

        // Chuva favorece pilotos bons em molhado
        let chuvaBonus = chuva ? p.chuva * 1.3 : p.chuva * 0.6;

        // Equipe
        let equipeRating = ESCUDERIAS.find(e => e.key === p.equipe)?.rating || 70;

        // Sorte (pequeno fator randômico)
        let sorte = Math.random() * 15;

        // Safety car embaralha levemente os tempos
        let safety = safetyCar ? (Math.random() * 8 - 4) : 0;

        // Funcionários melhoram o resultado apenas para sua equipe
        let bonusTeam = (p.equipe === JOGO.equipeSelecionada) ? bonusEquipe : 0;

        // Cálculo da pontuação final de performance
        let performanceFinal =
            base +
            agressividade +
            chuvaBonus +
            equipeRating +
            sorte +
            safety +
            bonusTeam;

        resultado.push({
            piloto: p,
            performance: performanceFinal
        });
    });

    // Ordenar por performance (maior = melhor)
    resultado.sort((a, b) => b.performance - a.performance);

    // Salvar
    JOGO.resultadoCorrida = resultado;

    // Mostrar tabela
    mostrarResultadoCorrida(resultado);

    // Aplicar pontos do campeonato
    aplicarPontuacao(resultado);

    // Avança etapa
    JOGO.etapaAtual++;
}

/* ============================================================
   BONUS DOS FUNCIONÁRIOS
   ============================================================ */

function calcularBonusFuncionarios() {
    let bonus = 0;

    JOGO.funcionarios.forEach(f => {
        bonus += f.bonus;
    });

    return bonus * 2; // multiplicador para deixar relevante
}

/* ============================================================
   MOSTRAR RESULTADO DA CORRIDA
   ============================================================ */

function mostrarResultadoCorrida(resultado) {
    let div = document.getElementById("resultado-corrida");
    div.innerHTML = "<h3>Resultado Oficial</h3>";

    resultado.forEach((r, index) => {
        let p = document.createElement("p");
        p.innerText = `${index + 1}º - ${r.piloto.nome} (${r.piloto.equipe})`;
        div.appendChild(p);
    });
}

/* ============================================================
   PONTUAÇÃO OFICIAL DA F1
   ============================================================ */

const PONTOS = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];

let TABELA_PILOTOS = {};
let TABELA_CONSTRUTORES = {};

// Inicializar tabelas
PILOTOS.forEach(p => { TABELA_PILOTOS[p.nome] = 0; });
ESCUDERIAS.forEach(e => { TABELA_CONSTRUTORES[e.key] = 0; });

/* ============================================================
   APLICAR PONTOS APÓS A CORRIDA
   ============================================================ */

function aplicarPontuacao(resultado) {
    resultado.forEach((r, index) => {
        let piloto = r.piloto;
        let equipe = piloto.equipe;

        let pontos = PONTOS[index] || 0;

        TABELA_PILOTOS[piloto.nome] += pontos;
        TABELA_CONSTRUTORES[equipe] += pontos;
    });
}

/* ============================================================
   FINALIZAR CORRIDA
   ============================================================ */

function finalizarCorrida() {

    alert("Corrida finalizada! Pontuação atualizada.");

    if (JOGO.etapaAtual > CALENDARIO.length) {
        alert("Temporada concluída!");
        mostrarTela("lobby");
        return;
    }

    voltarLobby();
}
/* ============================================================
   SCRIPT.JS — F1 MANAGER AAA
   PARTE 5 — Salvamento, Carregamento, Reset e Utilidades
   ============================================================ */

/* ============================================================
   SALVAMENTO AUTOMÁTICO
   ============================================================ */

function salvarJogo() {
    let save = {
        gerente: JOGO.gerente,
        equipeSelecionada: JOGO.equipeSelecionada,
        dinheiro: JOGO.dinheiro,
        funcionarios: JOGO.funcionarios,
        patrocinador: JOGO.patrocinador,
        pilotosEquipe: JOGO.pilotosEquipe.map(p => p.nome),
        etapaAtual: JOGO.etapaAtual,
        tabelaPilotos: TABELA_PILOTOS,
        tabelaConstrutores: TABELA_CONSTRUTORES
    };

    localStorage.setItem("F1_MANAGER_SALVO", JSON.stringify(save));
}

/* ============================================================
   CARREGA JOGO SALVO
   ============================================================ */

function carregarJogo() {
    let data = localStorage.getItem("F1_MANAGER_SALVO");

    if (!data) {
        alert("Nenhum jogo salvo encontrado!");
        return;
    }

    let save = JSON.parse(data);

    // Restaurar dados do jogo
    JOGO.gerente = save.gerente;
    JOGO.equipeSelecionada = save.equipeSelecionada;
    JOGO.dinheiro = save.dinheiro;
    JOGO.funcionarios = save.funcionarios;
    JOGO.patrocinador = save.patrocinador;
    JOGO.etapaAtual = save.etapaAtual;

    // Restaurar pilotos da equipe
    JOGO.pilotosEquipe = PILOTOS.filter(p =>
        save.pilotosEquipe.includes(p.nome)
    );

    // Restaurar tabelas
    Object.keys(save.tabelaPilotos).forEach(k => {
        TABELA_PILOTOS[k] = save.tabelaPilotos[k];
    });

    Object.keys(save.tabelaConstrutores).forEach(k => {
        TABELA_CONSTRUTORES[k] = save.tabelaConstrutores[k];
    });

    alert("Carreira carregada com sucesso!");

    iniciarLobby();
}

/* ============================================================
   RESETAR PARTIDA
   ============================================================ */

function resetarCarreira() {
    if (!confirm("Tem certeza que deseja apagar TUDO e começar do zero?")) return;

    localStorage.removeItem("F1_MANAGER_SALVO");

    JOGO = {
        gerente: null,
        equipeSelecionada: null,
        dinheiro: 5000000,
        funcionarios: [],
        patrocinador: null,
        pilotosEquipe: [],
        etapaAtual: 1,
        classificacao: [],
        resultadoCorrida: []
    };

    // Reiniciar tabelas
    Object.keys(TABELA_PILOTOS).forEach(k => TABELA_PILOTOS[k] = 0);
    Object.keys(TABELA_CONSTRUTORES).forEach(k => TABELA_CONSTRUTORES[k] = 0);

    alert("Carreira reiniciada.");

    mostrarTela("tela-capa");
}

/* ============================================================
   AUTO-SAVE APÓS AÇÕES IMPORTANTES
   ============================================================ */

// Salva ao contratar funcionário
function contratarFuncionario(f) {
    if (JOGO.dinheiro < f.preco) {
        alert("Dinheiro insuficiente!");
        return;
    }

    JOGO.dinheiro -= f.preco;
    JOGO.funcionarios.push(f);

    atualizarDinheiro(JOGO.dinheiro);

    salvarJogo(); // 🔥 auto-save

    alert("Funcionário contratado: " + f.nome);

    voltarLobby();
}

// Salva ao contratar piloto
function contratarPiloto(nome) {
    let piloto = PILOTOS.find(p => p.nome === nome);

    if (!piloto) {
        alert("Erro ao contratar piloto.");
        return;
    }

    if (JOGO.pilotosEquipe.length >= 2) {
        alert("Sua equipe já tem 2 pilotos. Demita antes.");
        return;
    }

    let custo = piloto.rating * 30000;

    if (JOGO.dinheiro < custo) {
        alert("Dinheiro insuficiente! Preço: R$ " + custo.toLocaleString("pt-BR"));
        return;
    }

    JOGO.dinheiro -= custo;
    atualizarDinheiro(JOGO.dinheiro);

    piloto.equipe = JOGO.equipeSelecionada;
    JOGO.pilotosEquipe.push(piloto);

    salvarJogo(); // 🔥 auto-save

    alert("Piloto contratado: " + piloto.nome);
    voltarLobby();
}

// Salva ao terminar corrida
function finalizarCorrida() {

    salvarJogo(); // 🔥 auto-save

    alert("Corrida finalizada! Pontuação atualizada.");

    if (JOGO.etapaAtual > CALENDARIO.length) {
        alert("Temporada concluída!");
        mostrarTela("lobby");
        return;
    }

    voltarLobby();
}

/* ============================================================
   FORMATADORES / UTILIDADES
   ============================================================ */

function formatarNumero(valor) {
    return valor.toLocaleString("pt-BR");
}

function nomeEquipe(code) {
    return ESCUDERIAS.find(e => e.key === code)?.nome || "Equipe";
}

function nomePais(code) {
    return code.toUpperCase();
}

function voltarLobby() {
    mostrarTela("lobby");
    iniciarLobby();
}

/* ============================================================
   FIM DO SCRIPT
   ============================================================ */

console.log("F1 Manager AAA — Script carregado com sucesso.");
