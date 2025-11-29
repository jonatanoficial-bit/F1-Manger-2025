// Lógica principal do jogo F1 Manager 2025 (simplificado, mas expansível)

const SCREENS = [
  "screen-main-menu",
  "screen-manager-existing",
  "screen-manager-create",
  "screen-team-select",
  "screen-weekend-hub",
  "screen-race-result",
  "screen-standings"
];

const gameState = {
  manager: null,           // { name, type: 'real' | 'custom', teamKey?, countryCode, avatarFile }
  teamKey: null,
  seasonYear: 2025,
  currentRoundIndex: 0,    // índice em CALENDAR
  standingsDrivers: {},    // { driverKey: pontos }
  standingsConstructors: {}, // { teamKey: pontos }
  lastQualifyingOrder: null, // array de driverKeys
  lastRaceResult: null       // array de objetos de resultado
};

function $(id) {
  return document.getElementById(id);
}

function showScreen(id) {
  SCREENS.forEach(sid => {
    const el = $(sid);
    if (!el) return;
    el.classList.toggle("active", sid === id);
  });
}

// Inicialização de UI
function initUI() {
  $("btn-existing-manager").addEventListener("click", () => {
    buildManagerList();
    showScreen("screen-manager-existing");
  });

  $("btn-new-manager").addEventListener("click", () => {
    showScreen("screen-manager-create");
  });

  // Botões de voltar simples
  document.querySelectorAll("button[data-back]").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-back");
      showScreen(target);
    });
  });

  $("btn-create-manager-confirm").addEventListener("click", () => {
    const name = $("input-manager-name").value.trim() || "Gerente Custom";
    const flag = $("input-manager-flag").value.trim().toLowerCase() || "br";
    const avatar = $("input-manager-avatar").value.trim() || "manager_custom_01.png";
    gameState.manager = {
      name,
      type: "custom",
      countryCode: flag,
      avatarFile: avatar,
      teamKey: null
    };
    showTeamSelect();
  });

  $("btn-simulate-practice").addEventListener("click", () => {
    appendLog("Simulando treinos livres...");
    const summary = simulateSession("practice");
    appendLog(summary);
  });

  $("btn-simulate-qualifying").addEventListener("click", () => {
    appendLog("Simulando classificação...");
    const summary = simulateSession("qualifying");
    appendLog(summary);
  });

  $("btn-simulate-race").addEventListener("click", () => {
    if (!gameState.lastQualifyingOrder) {
      appendLog("⚠️ Primeiro simule a classificação para definir o grid.");
      return;
    }
    appendLog("Simulando corrida completa...");
    const result = simulateRace();
    showRaceResult(result);
    updateStandingsTables();
    showScreen("screen-race-result");
  });

  $("btn-show-standings").addEventListener("click", () => {
    updateStandingsTables();
    showScreen("screen-standings");
  });

  $("btn-next-round").addEventListener("click", () => {
    gameState.currentRoundIndex++;
    if (gameState.currentRoundIndex >= CALENDAR.length) {
      gameState.currentRoundIndex = CALENDAR.length - 1;
      alert("Temporada concluída! Você pode continuar consultando os resultados.");
      return;
    }
    gameState.lastQualifyingOrder = null;
    gameState.lastRaceResult = null;
    showWeekendHub();
    showScreen("screen-weekend-hub");
  });

  $("btn-race-back-weekend").addEventListener("click", () => {
    showScreen("screen-weekend-hub");
  });

  // Inicializa standings zeradas
  DRIVERS.forEach(d => {
    gameState.standingsDrivers[d.key] = 0;
  });
  TEAMS.forEach(t => {
    gameState.standingsConstructors[t.key] = 0;
  });
}

// Monta a lista de chefes de equipe reais
function buildManagerList() {
  const container = $("manager-list");
  container.innerHTML = "";
  TEAM_PRINCIPALS.forEach(tp => {
    const team = getTeamByKey(tp.teamKey);
    const item = document.createElement("div");
    item.className = "list-item";
    const main = document.createElement("div");
    main.className = "list-item-main";

    const title = document.createElement("div");
    title.className = "list-item-title";
    title.textContent = tp.name;

    const sub = document.createElement("div");
    sub.className = "list-item-sub";
    sub.textContent = team ? `${team.name} • ${tp.teamKey.toUpperCase()}` : tp.teamKey;

    main.appendChild(title);
    main.appendChild(sub);

    const right = document.createElement("div");
    right.innerHTML = `<span class="badge"><span class="badge-dot"></span>Real 2025</span>`;

    item.appendChild(main);
    item.appendChild(right);

    item.addEventListener("click", () => {
      gameState.manager = {
        name: tp.name,
        type: "real",
        teamKey: tp.teamKey,
        countryCode: tp.countryCode,
        avatarFile: `manager_${tp.key}.png`
      };
      showTeamSelect(tp.teamKey);
    });

    container.appendChild(item);
  });
}

// Tela de seleção de equipe
function showTeamSelect(preselectedTeamKey) {
  const container = $("team-list");
  container.innerHTML = "";
  TEAMS.forEach(team => {
    const item = document.createElement("div");
    item.className = "list-item";

    const main = document.createElement("div");
    main.className = "list-item-main";

    const title = document.createElement("div");
    title.className = "list-item-title";
    title.textContent = team.name;

    const sub = document.createElement("div");
    sub.className = "list-item-sub";
    sub.textContent = `${team.country} • Motor: ${team.engine}`;

    main.appendChild(title);
    main.appendChild(sub);

    const right = document.createElement("div");
    const button = document.createElement("button");
    button.textContent = "Escolher";
    if (preselectedTeamKey && preselectedTeamKey === team.key) {
      button.textContent = "Escolher (recomendado)";
    }
    button.addEventListener("click", () => {
      gameState.teamKey = team.key;
      showWeekendHub();
      showScreen("screen-weekend-hub");
    });
    right.appendChild(button);

    item.appendChild(main);
    item.appendChild(right);

    container.appendChild(item);
  });

  showScreen("screen-team-select");
}

// Atualiza hub do fim de semana
function showWeekendHub() {
  const round = CALENDAR[gameState.currentRoundIndex];
  const info = $("weekend-info");
  const team = getTeamByKey(gameState.teamKey);
  const drivers = getDriversByTeam(gameState.teamKey);
  const mgrName = gameState.manager ? gameState.manager.name : "Gerente";

  info.innerHTML = `
    <p><strong>Etapa ${round.round} de ${CALENDAR.length}</strong> • ${round.name} (${round.country})</p>
    <p>Circuito: ${round.circuit} • Voltas: ${round.laps}</p>
    <p>Sua equipe: <strong>${team.name}</strong> • Motor: ${team.engine}</p>
    <p>Pilotos: ${drivers.map(d => d.name).join(" & ")} </p>
    <p>Gerente: ${mgrName}</p>
  `;

  $("weekend-log").textContent = "";
}

// Log
function appendLog(text) {
  const log = $("weekend-log");
  log.textContent += (log.textContent ? "\n" : "") + text;
  log.scrollTop = log.scrollHeight;
}

// Simulação genérica de sessão (treino / quali)
function simulateSession(type) {
  const round = CALENDAR[gameState.currentRoundIndex];
  const results = [];

  DRIVERS.forEach(driver => {
    const team = getTeamByKey(driver.teamKey);
    const carStats = team.baseStats;
    const base = 100 - driver.rating;
    const aeroFactor = (carStats.aero - 80) * 0.15;
    const engineFactor = (carStats.engine - 80) * 0.12;
    const driverSkill = (driver.rating - 80) * 0.2;
    const randomness = (Math.random() - 0.5) * 3.0;

    let time = round.baseLapTime + base - aeroFactor - engineFactor - driverSkill + randomness;

    if (type === "practice") {
      time *= 1.015;
    }

    results.push({ driverKey: driver.key, lapTime: time });
  });

  // Ordena por melhor tempo (menor)
  results.sort((a, b) => a.lapTime - b.lapTime);

  if (type === "qualifying") {
    gameState.lastQualifyingOrder = results.map(r => r.driverKey);
  }

  const top = results.slice(0, 5).map((r, idx) => {
    const d = DRIVERS.find(drv => drv.key === r.driverKey);
    return `${idx + 1}. ${d.name} (${d.teamKey.toUpperCase()}) - ${r.lapTime.toFixed(3)}s`;
  }).join("\n");

  return `${type === "practice" ? "Treinos livres concluídos." : "Classificação concluída."}\nTop 5:\n${top}`;
}

// Recupera configs de setup escolhidas pelo jogador
function getPlayerSetup() {
  return {
    frontWing: Number($("setup-front-wing").value),
    rearWing: Number($("setup-rear-wing").value),
    engineMode: $("setup-engine-mode").value,
    pitStopsPlanned: Number($("setup-pit-stops").value),
    startTyre: $("setup-tyre-start").value,
    rainRisk: $("setup-rain-risk").value
  };
}

// Simulação da corrida (modelo simplificado porém com vários fatores)
function simulateRace() {
  const round = CALENDAR[gameState.currentRoundIndex];
  const setup = getPlayerSetup();

  // Determina se a corrida terá chuva significativa
  const rainRoll = Math.random();
  const isWetRace = rainRoll < round.rainChance;
  const hasSafetyCar = Math.random() < 0.35; // chance simples de SC

  const results = [];

  DRIVERS.forEach(driver => {
    const team = getTeamByKey(driver.teamKey);
    const carStats = team.baseStats;

    // Base de performance
    let perf = driver.rating;
    perf += (carStats.aero + carStats.engine + carStats.chassis) / 3 * 0.4;
    perf += carStats.reliability * 0.1;

    // Ajustes de clima
    if (isWetRace) {
      perf += (driver.wetSkill - 85) * 0.7;
    } else {
      perf += (driver.tyreManagement - 85) * 0.4;
    }

    // Estratégia: se é piloto da equipe do jogador, usa setup; senão cria uma IA simples
    let pitStops;
    let tyreStart;
    let engineMode;
    let wingBalance;

    if (driver.teamKey === gameState.teamKey) {
      pitStops = setup.pitStopsPlanned;
      tyreStart = setup.startTyre;
      engineMode = setup.engineMode;
      wingBalance = (setup.frontWing + setup.rearWing) / 2;
    } else {
      // IA: define com base em desgaste de pneus da pista
      if (round.tyreWear > 0.75) pitStops = 2 + (Math.random() < 0.4 ? 1 : 0);
      else if (round.tyreWear > 0.55) pitStops = 2;
      else pitStops = 1 + (Math.random() < 0.3 ? 1 : 0);

      const compounds = ["soft", "medium", "hard"];
      tyreStart = compounds[Math.floor(Math.random() * compounds.length)];
      const modes = ["conservador", "normal", "agressivo"];
      engineMode = modes[Math.floor(Math.random() * modes.length)];
      wingBalance = 40 + Math.random() * 40;
    }

    // Efeito de downforce vs demanda da pista
    const idealWing = round.downforceDemand * 100;
    const wingDeviation = Math.abs(wingBalance - idealWing);
    perf -= wingDeviation * 0.2; // castigo se acerto estiver longe

    // Efeito do número de paradas
    const idealStops = round.tyreWear > 0.75 ? 2.5 : (round.tyreWear > 0.6 ? 2 : 1.5);
    const stopDelta = pitStops - idealStops;
    perf -= Math.abs(stopDelta) * 3; // penaliza distorções grandes

    // Tipo de pneu de largada
    if (!isWetRace) {
      if (tyreStart === "soft") perf += 2;
      if (tyreStart === "hard") perf -= 2;
    }

    // Modo de motor
    if (engineMode === "agressivo") {
      perf += 3;
      // risco de quebra maior
      if (Math.random() < 0.05 + (1 - carStats.reliability / 100) * 0.1) {
        // abandono
        results.push({
          driverKey: driver.key,
          teamKey: driver.teamKey,
          status: "DNF (falha mecânica)",
          positionScore: -9999,
          points: 0
        });
        return;
      }
    } else if (engineMode === "conservador") {
      perf -= 2;
    }

    // Segurança em bandeira amarela / SC
    if (hasSafetyCar) {
      // pilotos agressivos podem ganhar ou perder bastante
      const scEffect = (driver.aggression - 85) * (Math.random() - 0.5);
      perf += scEffect * 0.3;
    }

    // Sorte / erros do piloto
    const randomness = (Math.random() - 0.5) * 12;
    perf += randomness;

    // Converte performance em "tempo de corrida": maior perf = menor tempo
    const baseRaceTime = round.laps * round.baseLapTime;
    const perfClamped = Math.max(50, Math.min(120, perf));
    const timeMultiplier = 1.0 + (100 - perfClamped) / 600; // variações pequenas
    const totalRaceTime = baseRaceTime * timeMultiplier;

    results.push({
      driverKey: driver.key,
      teamKey: driver.teamKey,
      status: "Terminado",
      positionScore: totalRaceTime, // menor é melhor
      points: 0
    });
  });

  // Ordena por tempo (ou DNF no fundo)
  results.sort((a, b) => a.positionScore - b.positionScore);

  // Aplica pontos
  results.forEach((r, idx) => {
    let pts = 0;
    if (r.status === "Terminado" && idx < POINTS_TABLE.length) {
      pts = POINTS_TABLE[idx];
    }
    r.points = pts;

    const d = DRIVERS.find(dr => dr.key === r.driverKey);
    gameState.standingsDrivers[d.key] += pts;
    gameState.standingsConstructors[d.teamKey] += pts;
  });

  // Guarda último resultado
  gameState.lastRaceResult = {
    round: round,
    isWetRace,
    hasSafetyCar,
    results
  };

  return gameState.lastRaceResult;
}

function showRaceResult(raceData) {
  const round = raceData.round;
  const summary = $("race-result-summary");
  summary.innerHTML = `
    <p><strong>${round.name}</strong> • ${round.country}</p>
    <p>Clima: ${raceData.isWetRace ? "Chuva / pista molhada" : "Seco"} • Safety Car: ${raceData.hasSafetyCar ? "Sim" : "Não"}</p>
  `;

  const podiumList = $("podium-list");
  podiumList.innerHTML = "";
  raceData.results.slice(0, 3).forEach((r, idx) => {
    const d = DRIVERS.find(dr => dr.key === r.driverKey);
    const team = getTeamByKey(r.teamKey);
    const li = document.createElement("li");
    li.textContent = `${idx + 1}º - ${d.name} (${team.name}) • ${r.points} pts`;
    podiumList.appendChild(li);
  });

  const tbody = $("race-result-table").querySelector("tbody");
  tbody.innerHTML = "";
  raceData.results.forEach((r, idx) => {
    const d = DRIVERS.find(dr => dr.key === r.driverKey);
    const team = getTeamByKey(r.teamKey);
    const tr = document.createElement("tr");
    const pos = idx + 1;
    tr.innerHTML = `
      <td>${pos}</td>
      <td>${d.name}</td>
      <td>${team.name}</td>
      <td>${d.countryCode.toUpperCase()}</td>
      <td>${r.points}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Atualiza tabelas de campeonato
function updateStandingsTables() {
  // Drivers
  const driversWithPoints = DRIVERS.map(d => ({
    driver: d,
    points: gameState.standingsDrivers[d.key] || 0
  })).sort((a, b) => b.points - a.points);

  const tbodyDrivers = $("driver-standings-table").querySelector("tbody");
  tbodyDrivers.innerHTML = "";
  driversWithPoints.forEach((item, idx) => {
    const team = getTeamByKey(item.driver.teamKey);
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td>${item.driver.name}</td>
      <td>${team.name}</td>
      <td>${item.driver.countryCode.toUpperCase()}</td>
      <td>${item.points}</td>
    `;
    tbodyDrivers.appendChild(tr);
  });

  // Constructors
  const constructorsWithPoints = TEAMS.map(t => ({
    team: t,
    points: gameState.standingsConstructors[t.key] || 0
  })).sort((a, b) => b.points - a.points);

  const tbodyTeams = $("constructor-standings-table").querySelector("tbody");
  tbodyTeams.innerHTML = "";
  constructorsWithPoints.forEach((item, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td>${item.team.name}</td>
      <td>${item.team.country}</td>
      <td>${item.points}</td>
    `;
    tbodyTeams.appendChild(tr);
  });
}

// Inicializa tudo quando a página carrega
document.addEventListener("DOMContentLoaded", () => {
  initUI();
});
