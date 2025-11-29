// Dados de base da temporada 2025
// Times, pilotos, chefes de equipe, pistas e motores.

// Tabela de equipes (construtores)
const TEAMS = [
  { key: "mclaren", name: "McLaren", country: "Reino Unido", engine: "Mercedes", baseStats: { aero: 92, engine: 90, chassis: 90, reliability: 90, pitCrew: 88 } },
  { key: "ferrari", name: "Scuderia Ferrari HP", country: "Itália", engine: "Ferrari", baseStats: { aero: 90, engine: 91, chassis: 88, reliability: 86, pitCrew: 87 } },
  { key: "red_bull", name: "Oracle Red Bull Racing", country: "Áustria", engine: "Honda RBPT", baseStats: { aero: 91, engine: 93, chassis: 89, reliability: 88, pitCrew: 89 } },
  { key: "mercedes", name: "Mercedes-AMG Petronas", country: "Alemanha", engine: "Mercedes", baseStats: { aero: 88, engine: 89, chassis: 90, reliability: 90, pitCrew: 88 } },
  { key: "aston_martin", name: "Aston Martin Aramco", country: "Reino Unido", engine: "Mercedes", baseStats: { aero: 84, engine: 88, chassis: 85, reliability: 86, pitCrew: 83 } },
  { key: "alpine", name: "BWT Alpine F1 Team", country: "França", engine: "Renault", baseStats: { aero: 80, engine: 82, chassis: 81, reliability: 82, pitCrew: 80 } },
  { key: "haas", name: "MoneyGram Haas F1 Team", country: "Estados Unidos", engine: "Ferrari", baseStats: { aero: 77, engine: 82, chassis: 78, reliability: 80, pitCrew: 78 } },
  { key: "racing_bulls", name: "Visa Cash App Racing Bulls", country: "Itália", engine: "Honda RBPT", baseStats: { aero: 82, engine: 86, chassis: 82, reliability: 82, pitCrew: 81 } },
  { key: "williams", name: "Atlassian Williams Racing", country: "Reino Unido", engine: "Mercedes", baseStats: { aero: 81, engine: 84, chassis: 80, reliability: 82, pitCrew: 80 } },
  { key: "kick_sauber", name: "Stake F1 Team Kick Sauber", country: "Suíça", engine: "Ferrari", baseStats: { aero: 79, engine: 84, chassis: 80, reliability: 81, pitCrew: 79 } }
];

// Pilotos oficiais de 2025 (simplificado, 2 por equipe)
const DRIVERS = [
  // McLaren
  { key: "lando_norris", name: "Lando Norris", teamKey: "mclaren", countryCode: "gb", rating: 95, wetSkill: 92, tyreManagement: 90, aggression: 90 },
  { key: "oscar_piastri", name: "Oscar Piastri", teamKey: "mclaren", countryCode: "au", rating: 94, wetSkill: 90, tyreManagement: 88, aggression: 91 },

  // Ferrari
  { key: "charles_leclerc", name: "Charles Leclerc", teamKey: "ferrari", countryCode: "mc", rating: 93, wetSkill: 90, tyreManagement: 88, aggression: 92 },
  { key: "lewis_hamilton", name: "Lewis Hamilton", teamKey: "ferrari", countryCode: "gb", rating: 93, wetSkill: 95, tyreManagement: 90, aggression: 88 },

  // Red Bull
  { key: "max_verstappen", name: "Max Verstappen", teamKey: "red_bull", countryCode: "nl", rating: 96, wetSkill: 94, tyreManagement: 90, aggression: 94 },
  { key: "yuki_tsunoda", name: "Yuki Tsunoda", teamKey: "red_bull", countryCode: "jp", rating: 88, wetSkill: 86, tyreManagement: 84, aggression: 92 },

  // Mercedes
  { key: "george_russell", name: "George Russell", teamKey: "mercedes", countryCode: "gb", rating: 92, wetSkill: 90, tyreManagement: 87, aggression: 89 },
  { key: "kimi_antonelli", name: "Kimi Antonelli", teamKey: "mercedes", countryCode: "it", rating: 88, wetSkill: 84, tyreManagement: 82, aggression: 90 },

  // Aston Martin
  { key: "fernando_alonso", name: "Fernando Alonso", teamKey: "aston_martin", countryCode: "es", rating: 91, wetSkill: 92, tyreManagement: 89, aggression: 90 },
  { key: "lance_stroll", name: "Lance Stroll", teamKey: "aston_martin", countryCode: "ca", rating: 84, wetSkill: 82, tyreManagement: 82, aggression: 83 },

  // Alpine
  { key: "pierre_gasly", name: "Pierre Gasly", teamKey: "alpine", countryCode: "fr", rating: 88, wetSkill: 87, tyreManagement: 85, aggression: 86 },
  { key: "franco_colapinto", name: "Franco Colapinto", teamKey: "alpine", countryCode: "ar", rating: 84, wetSkill: 83, tyreManagement: 82, aggression: 85 },

  // Haas
  { key: "esteban_ocon", name: "Esteban Ocon", teamKey: "haas", countryCode: "fr", rating: 87, wetSkill: 86, tyreManagement: 84, aggression: 86 },
  { key: "oliver_bearman", name: "Oliver Bearman", teamKey: "haas", countryCode: "gb", rating: 83, wetSkill: 81, tyreManagement: 80, aggression: 84 },

  // Racing Bulls
  { key: "isack_hadjar", name: "Isack Hadjar", teamKey: "racing_bulls", countryCode: "fr", rating: 82, wetSkill: 80, tyreManagement: 80, aggression: 85 },
  { key: "liam_lawson", name: "Liam Lawson", teamKey: "racing_bulls", countryCode: "nz", rating: 84, wetSkill: 84, tyreManagement: 82, aggression: 86 },

  // Williams
  { key: "alex_albon", name: "Alexander Albon", teamKey: "williams", countryCode: "th", rating: 88, wetSkill: 86, tyreManagement: 86, aggression: 87 },
  { key: "carlos_sainz", name: "Carlos Sainz Jr.", teamKey: "williams", countryCode: "es", rating: 90, wetSkill: 88, tyreManagement: 89, aggression: 88 },

  // Kick Sauber
  { key: "gabriel_bortoleto", name: "Gabriel Bortoleto", teamKey: "kick_sauber", countryCode: "br", rating: 84, wetSkill: 83, tyreManagement: 82, aggression: 85 },
  { key: "nico_hulkenberg", name: "Nico Hülkenberg", teamKey: "kick_sauber", countryCode: "de", rating: 86, wetSkill: 84, tyreManagement: 83, aggression: 84 }
];

// Chefes de equipe (gerentes reais 2025)
const TEAM_PRINCIPALS = [
  { key: "andrea_stella", name: "Andrea Stella", teamKey: "mclaren", countryCode: "it" },
  { key: "fred_vasseur", name: "Frédéric Vasseur", teamKey: "ferrari", countryCode: "fr" },
  { key: "laurent_mekies", name: "Laurent Mekies", teamKey: "red_bull", countryCode: "fr" },
  { key: "toto_wolff", name: "Toto Wolff", teamKey: "mercedes", countryCode: "at" },
  { key: "andy_cowell", name: "Andy Cowell", teamKey: "aston_martin", countryCode: "gb" },
  { key: "flavio_briatore", name: "Flavio Briatore", teamKey: "alpine", countryCode: "it" },
  { key: "ayao_komatsu", name: "Ayao Komatsu", teamKey: "haas", countryCode: "jp" },
  { key: "alan_permane", name: "Alan Permane", teamKey: "racing_bulls", countryCode: "gb" },
  { key: "james_vowles", name: "James Vowles", teamKey: "williams", countryCode: "gb" },
  { key: "jonathan_wheatley", name: "Jonathan Wheatley", teamKey: "kick_sauber", countryCode: "gb" }
];

// Calendário 2025 simplificado (24 GPs)
const CALENDAR = [
  { round: 1, name: "GP da Austrália", circuit: "Albert Park", country: "Austrália", laps: 58, baseLapTime: 88.0, downforceDemand: 0.7, tyreWear: 0.6, rainChance: 0.35 },
  { round: 2, name: "GP da China", circuit: "Xangai", country: "China", laps: 56, baseLapTime: 94.0, downforceDemand: 0.7, tyreWear: 0.7, rainChance: 0.4 },
  { round: 3, name: "GP do Japão", circuit: "Suzuka", country: "Japão", laps: 53, baseLapTime: 92.0, downforceDemand: 0.9, tyreWear: 0.8, rainChance: 0.45 },
  { round: 4, name: "GP do Bahrein", circuit: "Sakhir", country: "Bahrein", laps: 57, baseLapTime: 90.0, downforceDemand: 0.6, tyreWear: 0.8, rainChance: 0.05 },
  { round: 5, name: "GP da Arábia Saudita", circuit: "Jeddah", country: "Arábia Saudita", laps: 50, baseLapTime: 88.0, downforceDemand: 0.8, tyreWear: 0.7, rainChance: 0.1 },
  { round: 6, name: "GP de Emilia-Romagna", circuit: "Imola", country: "Itália", laps: 63, baseLapTime: 79.0, downforceDemand: 0.9, tyreWear: 0.6, rainChance: 0.5 },
  { round: 7, name: "GP de Mônaco", circuit: "Monte Carlo", country: "Mônaco", laps: 78, baseLapTime: 74.0, downforceDemand: 1.0, tyreWear: 0.5, rainChance: 0.3 },
  { round: 8, name: "GP da Espanha", circuit: "Barcelona", country: "Espanha", laps: 66, baseLapTime: 80.0, downforceDemand: 0.85, tyreWear: 0.7, rainChance: 0.3 },
  { round: 9, name: "GP do Canadá", circuit: "Montreal", country: "Canadá", laps: 70, baseLapTime: 76.0, downforceDemand: 0.7, tyreWear: 0.7, rainChance: 0.5 },
  { round: 10, name: "GP da Áustria", circuit: "Red Bull Ring", country: "Áustria", laps: 71, baseLapTime: 65.0, downforceDemand: 0.6, tyreWear: 0.6, rainChance: 0.3 },
  { round: 11, name: "GP da Grã-Bretanha", circuit: "Silverstone", country: "Reino Unido", laps: 52, baseLapTime: 87.0, downforceDemand: 0.8, tyreWear: 0.7, rainChance: 0.45 },
  { round: 12, name: "GP da Hungria", circuit: "Hungaroring", country: "Hungria", laps: 70, baseLapTime: 78.0, downforceDemand: 0.95, tyreWear: 0.6, rainChance: 0.4 },
  { round: 13, name: "GP da Bélgica", circuit: "Spa-Francorchamps", country: "Bélgica", laps: 44, baseLapTime: 104.0, downforceDemand: 0.85, tyreWear: 0.7, rainChance: 0.6 },
  { round: 14, name: "GP dos Países Baixos", circuit: "Zandvoort", country: "Holanda", laps: 72, baseLapTime: 72.0, downforceDemand: 0.9, tyreWear: 0.7, rainChance: 0.5 },
  { round: 15, name: "GP da Itália", circuit: "Monza", country: "Itália", laps: 53, baseLapTime: 82.0, downforceDemand: 0.5, tyreWear: 0.7, rainChance: 0.35 },
  { round: 16, name: "GP do Azerbaijão", circuit: "Baku", country: "Azerbaijão", laps: 51, baseLapTime: 100.0, downforceDemand: 0.7, tyreWear: 0.6, rainChance: 0.3 },
  { round: 17, name: "GP de Singapura", circuit: "Marina Bay", country: "Singapura", laps: 63, baseLapTime: 100.0, downforceDemand: 1.0, tyreWear: 0.7, rainChance: 0.55 },
  { round: 18, name: "GP dos Estados Unidos", circuit: "COTA", country: "Estados Unidos", laps: 56, baseLapTime: 99.0, downforceDemand: 0.85, tyreWear: 0.7, rainChance: 0.3 },
  { round: 19, name: "GP do México", circuit: "Hermanos Rodríguez", country: "México", laps: 71, baseLapTime: 78.0, downforceDemand: 0.8, tyreWear: 0.6, rainChance: 0.35 },
  { round: 20, name: "GP de São Paulo", circuit: "Interlagos", country: "Brasil", laps: 71, baseLapTime: 71.0, downforceDemand: 0.85, tyreWear: 0.7, rainChance: 0.55 },
  { round: 21, name: "GP de Las Vegas", circuit: "Las Vegas Strip", country: "Estados Unidos", laps: 50, baseLapTime: 99.0, downforceDemand: 0.7, tyreWear: 0.6, rainChance: 0.15 },
  { round: 22, name: "GP do Qatar", circuit: "Lusail", country: "Qatar", laps: 57, baseLapTime: 88.0, downforceDemand: 0.8, tyreWear: 0.8, rainChance: 0.1 },
  { round: 23, name: "GP de Abu Dhabi", circuit: "Yas Marina", country: "Emirados Árabes", laps: 58, baseLapTime: 95.0, downforceDemand: 0.8, tyreWear: 0.7, rainChance: 0.1 },
  { round: 24, name: "GP de Mônaco Noturno (show)", circuit: "Monte Carlo", country: "Mônaco", laps: 60, baseLapTime: 76.0, downforceDemand: 1.0, tyreWear: 0.5, rainChance: 0.3 }
];

// Tabela de pontuação oficial
const POINTS_TABLE = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];

// Utilitários simples
function getTeamByKey(teamKey) {
  return TEAMS.find(t => t.key === teamKey);
}

function getDriversByTeam(teamKey) {
  return DRIVERS.filter(d => d.teamKey === teamKey);
}
