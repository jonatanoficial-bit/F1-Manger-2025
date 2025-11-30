/* ============================================================
   DATA DO JOGO — F1 MANAGER AAA
   ============================================================ */

/* AVATARES GENÉRICOS DO GERENTE (placeholders)
   Depois você gera as imagens e coloca em assets/managers/ */
const AVATARES_GERENTE = [
  { id: 1, arquivo: "manager_ethnic_01.png", nome: "Avatar Europeu" },
  { id: 2, arquivo: "manager_ethnic_02.png", nome: "Avatar Afrodescendente" },
  { id: 3, arquivo: "manager_ethnic_03.png", nome: "Avatar Asiático" },
  { id: 4, arquivo: "manager_ethnic_04.png", nome: "Avatar Latino" },
  { id: 5, arquivo: "manager_ethnic_05.png", nome: "Avatar Árabe" },
  { id: 6, arquivo: "manager_ethnic_06.png", nome: "Avatar Indiano" }
];

/* BANDEIRAS
   Depois você coloca os arquivos em assets/flags/XX.png */
const BANDEIRAS = [
  "br","us","gb","fr","de","it","es","pt","nl","be",
  "au","ca","mx","jp","cn","sa","bh","mc"
].map(c => ({ codigo: c, arquivo: `${c}.png` }));

/* GERENTES REAIS (simplificado 2025)
   Avatares em assets/managers/ */
const GERENTES_REAIS = [
  { nome: "Christian Horner", equipe: "red_bull",   pais: "gb", avatar: "horner.png" },
  { nome: "Fred Vasseur",     equipe: "ferrari",    pais: "fr", avatar: "vasseur.png" },
  { nome: "Toto Wolff",       equipe: "mercedes",   pais: "at", avatar: "wolff.png" },
  { nome: "Andrea Stella",    equipe: "mclaren",    pais: "it", avatar: "stella.png" },
  { nome: "Mike Krack",       equipe: "aston_martin", pais: "lu", avatar: "krack.png" },
  { nome: "Bruno Famin",      equipe: "alpine",     pais: "fr", avatar: "famin.png" }
];

/* ESCUDERIAS — com base do carro (carroBase)
   Logos em assets/logos/ */
const ESCUDERIAS = [
  {
    key: "red_bull",
    nome: "Red Bull Racing",
    pais: "at",
    motor: "Honda RBPT",
    logo: "red_bull.png",
    rating: 96,
    carroBase: { aero: 9, motor: 9, chassis: 8, pit: 8 }
  },
  {
    key: "ferrari",
    nome: "Ferrari",
    pais: "it",
    motor: "Ferrari",
    logo: "ferrari.png",
    rating: 92,
    carroBase: { aero: 8, motor: 9, chassis: 8, pit: 7 }
  },
  {
    key: "mercedes",
    nome: "Mercedes",
    pais: "de",
    motor: "Mercedes",
    logo: "mercedes.png",
    rating: 90,
    carroBase: { aero: 8, motor: 8, chassis: 9, pit: 8 }
  },
  {
    key: "mclaren",
    nome: "McLaren",
    pais: "gb",
    motor: "Mercedes",
    logo: "mclaren.png",
    rating: 89,
    carroBase: { aero: 9, motor: 8, chassis: 8, pit: 7 }
  },
  {
    key: "aston_martin",
    nome: "Aston Martin",
    pais: "gb",
    motor: "Mercedes",
    logo: "aston_martin.png",
    rating: 85,
    carroBase: { aero: 8, motor: 8, chassis: 7, pit: 7 }
  },
  {
    key: "alpine",
    nome: "Alpine",
    pais: "fr",
    motor: "Renault",
    logo: "alpine.png",
    rating: 80,
    carroBase: { aero: 7, motor: 7, chassis: 7, pit: 6 }
  }
];

/* PILOTOS — versão reduzida (pode expandir depois)
   Avatares em assets/faces/ */
const PILOTOS = [
  // Red Bull
  { nome: "Max Verstappen",  equipe: "red_bull", pais: "nl", avatar: "verstappen.png", rating: 98, agressividade: 95, chuva: 95 },
  { nome: "Sergio Pérez",    equipe: "red_bull", pais: "mx", avatar: "perez.png",      rating: 90, agressividade: 88, chuva: 88 },

  // Ferrari
  { nome: "Charles Leclerc", equipe: "ferrari",  pais: "mc", avatar: "leclerc.png",    rating: 94, agressividade: 90, chuva: 90 },
  { nome: "Carlos Sainz Jr.",equipe: "ferrari",  pais: "es", avatar: "sainz.png",      rating: 93, agressividade: 88, chuva: 88 },

  // Mercedes
  { nome: "Lewis Hamilton",  equipe: "mercedes", pais: "gb", avatar: "hamilton.png",   rating: 96, agressividade: 90, chuva: 96 },
  { nome: "George Russell",  equipe: "mercedes", pais: "gb", avatar: "russell.png",    rating: 93, agressividade: 88, chuva: 92 },

  // McLaren
  { nome: "Lando Norris",    equipe: "mclaren",  pais: "gb", avatar: "norris.png",     rating: 95, agressividade: 90, chuva: 90 },
  { nome: "Oscar Piastri",   equipe: "mclaren",  pais: "au", avatar: "piastri.png",    rating: 91, agressividade: 86, chuva: 88 },

  // Aston Martin
  { nome: "Fernando Alonso", equipe: "aston_martin", pais: "es", avatar: "alonso.png", rating: 92, agressividade: 93, chuva: 88 },
  { nome: "Lance Stroll",   equipe: "aston_martin", pais: "ca", avatar: "stroll.png",  rating: 80, agressividade: 77, chuva: 70 },

  // Alpine
  { nome: "Pierre Gasly",   equipe: "alpine",    pais: "fr", avatar: "gasly.png",      rating: 87, agressividade: 82, chuva: 85 },
  { nome: "Esteban Ocon",   equipe: "alpine",    pais: "fr", avatar: "ocon.png",       rating: 87, agressividade: 83, chuva: 85 }
];

/* FUNCIONÁRIOS — impactam bônus da equipe */
const FUNCIONARIOS = [
  { nome: "Engenheiro de Pista N1", tipo: "engenheiro", bonus: 3, preco: 150000 },
  { nome: "Engenheiro de Pista N2", tipo: "engenheiro", bonus: 6, preco: 300000 },
  { nome: "Diretor Técnico N1",     tipo: "tecnico",    bonus: 4, preco: 180000 },
  { nome: "Diretor Técnico N2",     tipo: "tecnico",    bonus: 7, preco: 350000 },
  { nome: "Chefe de Box N1",        tipo: "box",        bonus: 4, preco: 200000 },
  { nome: "Chefe de Box N2",        tipo: "box",        bonus: 7, preco: 350000 },
  { nome: "Marketing Pro",          tipo: "marketing",  bonus: 5, preco: 250000 }
];

/* PATROCINADORES — receita por etapa
   Logos em assets/logos/ */
const PATROCINADORES = [
  { nome: "Petronas",   valor: 2500000, arquivo: "petronas.png" },
  { nome: "Shell",      valor: 2300000, arquivo: "shell.png" },
  { nome: "Red Bull",   valor: 2800000, arquivo: "redbull_sponsor.png" },
  { nome: "Santander",  valor: 2100000, arquivo: "santander.png" }
];

/* CALENDÁRIO — Temporada 2025 (resumido)
   Bandeiras em assets/flags/pais.png se quiser usar depois */
const CALENDARIO = [
  { etapa: 1, nome: "GP do Bahrein",        circuito: "Sakhir",        voltas: 57, pais: "bh" },
  { etapa: 2, nome: "GP da Arábia Saudita", circuito: "Jeddah",        voltas: 50, pais: "sa" },
  { etapa: 3, nome: "GP da Austrália",      circuito: "Albert Park",   voltas: 58, pais: "au" },
  { etapa: 4, nome: "GP do Japão",          circuito: "Suzuka",        voltas: 53, pais: "jp" },
  { etapa: 5, nome: "GP de Mônaco",         circuito: "Monte Carlo",   voltas: 78, pais: "mc" },
  { etapa: 6, nome: "GP da Espanha",        circuito: "Barcelona",     voltas: 66, pais: "es" },
  { etapa: 7, nome: "GP do Canadá",         circuito: "Montreal",      voltas: 70, pais: "ca" },
  { etapa: 8, nome: "GP da Áustria",        circuito: "Red Bull Ring", voltas: 71, pais: "at" },
  { etapa: 9, nome: "GP da Grã-Bretanha",   circuito: "Silverstone",   voltas: 52, pais: "gb" },
  { etapa: 10, nome: "GP da Itália",        circuito: "Monza",         voltas: 53, pais: "it" },
  { etapa: 11, nome: "GP dos EUA",          circuito: "Austin",        voltas: 56, pais: "us" },
  { etapa: 12, nome: "GP do Brasil",        circuito: "Interlagos",    voltas: 71, pais: "br" }
];

/* PONTUAÇÃO OFICIAL F1 (Top 10) */
const PONTOS = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];
