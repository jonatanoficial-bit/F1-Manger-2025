/* ============================================================
   DATA DO JOGO — F1 MANAGER AAA
   Edição Cinematográfica Preto + Dourado
   ============================================================ */

/* ============================================================
   AVATARES DO GERENTE (6 ETNIAS)
   ============================================================ */

const AVATARES_GERENTE = [
    { id: 1, arquivo: "manager_ethnic_01.png", nome: "Avatar Europeu" },
    { id: 2, arquivo: "manager_ethnic_02.png", nome: "Avatar Afrodescendente" },
    { id: 3, arquivo: "manager_ethnic_03.png", nome: "Avatar Asiático" },
    { id: 4, arquivo: "manager_ethnic_04.png", nome: "Avatar Latino" },
    { id: 5, arquivo: "manager_ethnic_05.png", nome: "Avatar Árabe" },
    { id: 6, arquivo: "manager_ethnic_06.png", nome: "Avatar Indiano" }
];

/* ============================================================
   BANDEIRAS — 50 PAÍSES IMPORTANTES
   ============================================================ */

const BANDEIRAS = [
    "br","us","gb","fr","de","it","es","pt","au","ca","mx","ar","cl",
    "nl","be","se","no","fi","dk","jp","kr","cn","in","za","ae","sa",
    "at","ch","pl","tr","gr","ro","hu","cz","sk","ie","is","il","nz",
    "sg","my","ph","id","rs","lk","ua","ru","co","pe"
].map((codigo) => {
    return { codigo, arquivo: `${codigo}.png` };
});


/* ============================================================
   GERENTES REAIS DAS EQUIPES 2025
   ============================================================ */

const GERENTES_REAIS = [
    { nome: "Andrea Stella", equipe: "mclaren", pais: "it", avatar: "manager_stella.png" },
    { nome: "Fred Vasseur", equipe: "ferrari", pais: "fr", avatar: "manager_vasseur.png" },
    { nome: "Laurent Mekies", equipe: "red_bull", pais: "fr", avatar: "manager_mekies.png" },
    { nome: "Toto Wolff", equipe: "mercedes", pais: "at", avatar: "manager_wolff.png" },
    { nome: "Andy Cowell", equipe: "aston_martin", pais: "gb", avatar: "manager_cowell.png" },
    { nome: "Flavio Briatore", equipe: "alpine", pais: "it", avatar: "manager_briatore.png" },
    { nome: "Ayao Komatsu", equipe: "haas", pais: "jp", avatar: "manager_komatsu.png" },
    { nome: "Alan Permane", equipe: "racing_bulls", pais: "gb", avatar: "manager_permane.png" },
    { nome: "James Vowles", equipe: "williams", pais: "gb", avatar: "manager_vowles.png" },
    { nome: "Jonathan Wheatley", equipe: "kick_sauber", pais: "gb", avatar: "manager_wheatley.png" }
];


/* ============================================================
   ESCUDERIAS 2025 (COM RATING REALISTA)
   ============================================================ */

const ESCUDERIAS = [
    {
        key: "red_bull",
        nome: "Red Bull Racing",
        pais: "at",
        motor: "Honda RBPT",
        logo: "red_bull.png",
        rating: 96
    },
    {
        key: "ferrari",
        nome: "Ferrari",
        pais: "it",
        motor: "Ferrari",
        logo: "ferrari.png",
        rating: 92
    },
    {
        key: "mercedes",
        nome: "Mercedes",
        pais: "de",
        motor: "Mercedes",
        logo: "mercedes.png",
        rating: 90
    },
    {
        key: "mclaren",
        nome: "McLaren",
        pais: "gb",
        motor: "Mercedes",
        logo: "mclaren.png",
        rating: 89
    },
    {
        key: "aston_martin",
        nome: "Aston Martin",
        pais: "gb",
        motor: "Mercedes",
        logo: "aston_martin.png",
        rating: 85
    },
    {
        key: "alpine",
        nome: "Alpine",
        pais: "fr",
        motor: "Renault",
        logo: "alpine.png",
        rating: 80
    },
    {
        key: "williams",
        nome: "Williams",
        pais: "gb",
        motor: "Mercedes",
        logo: "williams.png",
        rating: 78
    },
    {
        key: "haas",
        nome: "Haas",
        pais: "us",
        motor: "Ferrari",
        logo: "haas.png",
        rating: 74
    },
    {
        key: "racing_bulls",
        nome: "Racing Bulls",
        pais: "it",
        motor: "Honda RBPT",
        logo: "racing_bulls.png",
        rating: 76
    },
    {
        key: "kick_sauber",
        nome: "Kick Sauber",
        pais: "ch",
        motor: "Ferrari",
        logo: "kick_sauber.png",
        rating: 75
    }
];


/* ============================================================
   PILOTOS 2025 (COM RATING COMPLETO)
   ============================================================ */

const PILOTOS = [
    // RED BULL
    { nome: "Max Verstappen", equipe: "red_bull", pais: "nl", avatar: "verstappen.png", rating: 98, agressividade: 95, chuva: 92 },
    { nome: "Yuki Tsunoda",   equipe: "red_bull", pais: "jp", avatar: "tsunoda.png",    rating: 84, agressividade: 83, chuva: 80 },

    // FERRARI
    { nome: "Lewis Hamilton", equipe: "ferrari", pais: "gb", avatar: "hamilton.png",  rating: 96, agressividade: 90, chuva: 95 },
    { nome: "Charles Leclerc", equipe: "ferrari", pais: "mc", avatar: "leclerc.png", rating: 94, agressividade: 88, chuva: 90 },

    // MERCEDES
    { nome: "George Russell", equipe: "mercedes", pais: "gb", avatar: "russell.png", rating: 93, agressividade: 86, chuva: 91 },
    { nome: "Kimi Antonelli", equipe: "mercedes", pais: "it", avatar: "antonelli.png", rating: 82, agressividade: 80, chuva: 79 },

    // MCLAREN
    { nome: "Lando Norris", equipe: "mclaren", pais: "gb", avatar: "norris.png", rating: 95, agressividade: 89, chuva: 90 },
    { nome: "Oscar Piastri", equipe: "mclaren", pais: "au", avatar: "piastri.png", rating: 91, agressividade: 85, chuva: 87 },

    // ASTON MARTIN
    { nome: "Fernando Alonso", equipe: "aston_martin", pais: "es", avatar: "alonso.png", rating: 92, agressividade: 93, chuva: 88 },
    { nome: "Lance Stroll",   equipe: "aston_martin", pais: "ca", avatar: "stroll.png",  rating: 80, agressividade: 77, chuva: 70 },

    // ALPINE
    { nome: "Pierre Gasly", equipe: "alpine", pais: "fr", avatar: "gasly.png", rating: 87, agressividade: 82, chuva: 85 },
    { nome: "Franco Colapinto", equipe: "alpine", pais: "ar", avatar: "colapinto.png", rating: 79, agressividade: 75, chuva: 72 },

    // WILLIAMS
    { nome: "Alex Albon", equipe: "williams", pais: "th", avatar: "albon.png", rating: 86, agressividade: 81, chuva: 80 },
    { nome: "Carlos Sainz Jr.", equipe: "williams", pais: "es", avatar: "sainz.png", rating: 94, agressividade: 88, chuva: 88 },

    // HAAS
    { nome: "Esteban Ocon", equipe: "haas", pais: "fr", avatar: "ocon.png", rating: 87, agressividade: 83, chuva: 85 },
    { nome: "Oliver Bearman", equipe: "haas", pais: "gb", avatar: "bearman.png", rating: 78, agressividade: 74, chuva: 71 },

    // RACING BULLS
    { nome: "Isack Hadjar", equipe: "racing_bulls", pais: "fr", avatar: "hadjar.png", rating: 80, agressividade: 78, chuva: 72 },
    { nome: "Liam Lawson", equipe: "racing_bulls", pais: "nz", avatar: "lawson.png", rating: 83, agressividade: 82, chuva: 77 },

    // KICK SAUBER
    { nome: "Gabriel Bortoleto", equipe: "kick_sauber", pais: "br", avatar: "bortoleto.png", rating: 81, agressividade: 79, chuva: 76 },
    { nome: "Nico Hülkenberg", equipe: "kick_sauber", pais: "de", avatar: "hulkenberg.png", rating: 85, agressividade: 80, chuva: 82 }
];


/* ============================================================
   FUNCIONÁRIOS DISPONÍVEIS
   ============================================================ */

const FUNCIONARIOS = [
    { nome: "Engenheiro Nível 1", tipo: "engenheiro", bonus: 3, preco: 150000 },
    { nome: "Engenheiro Nível 2", tipo: "engenheiro", bonus: 6, preco: 300000 },
    { nome: "Diretor Técnico Nível 1", tipo: "tecnico", bonus: 3, preco: 180000 },
    { nome: "Diretor Técnico Nível 2", tipo: "tecnico", bonus: 7, preco: 350000 },
    { nome: "Chefe de Box", tipo: "box", bonus: 4, preco: 200000 },
    { nome: "Marketing Pro", tipo: "marketing", bonus: 6, preco: 250000 }
];


/* ============================================================
   PATROCINADORES
   ============================================================ */

const PATROCINADORES = [
    { nome: "Petronas", valor: 2500000, arquivo: "petronas.png" },
    { nome: "Shell", valor: 2300000, arquivo: "shell.png" },
    { nome: "Red Bull", valor: 2800000, arquivo: "redbull.png" },
    { nome: "Santander", valor: 2100000, arquivo: "santander.png" },
    { nome: "AWS", valor: 1900000, arquivo: "aws.png" },
    { nome: "Pirelli", valor: 2600000, arquivo: "pirelli.png" }
];


/* ============================================================
   CALENDÁRIO COMPLETO — F1 2025
   ============================================================ */

const CALENDARIO = [
    { etapa: 1, nome: "GP da Austrália", circuito: "Albert Park", voltas: 58, pais: "au" },
    { etapa: 2, nome: "GP da China", circuito: "Shanghai", voltas: 56, pais: "cn" },
    { etapa: 3, nome: "GP do Japão", circuito: "Suzuka", voltas: 53, pais: "jp" },
    { etapa: 4, nome: "GP do Bahrein", circuito: "Sakhir", voltas: 57, pais: "bh" },
    { etapa: 5, nome: "GP da Arábia Saudita", circuito: "Jeddah", voltas: 50, pais: "sa" },
    { etapa: 6, nome: "GP de Miami", circuito: "Miami", voltas: 57, pais: "us" },
    { etapa: 7, nome: "GP da Emília-Romanha", circuito: "Imola", voltas: 63, pais: "it" },
    { etapa: 8, nome: "GP de Mônaco", circuito: "Monte Carlo", voltas: 78, pais: "mc" },
    { etapa: 9, nome: "GP do Canadá", circuito: "Montreal", voltas: 70, pais: "ca" },
    { etapa: 10, nome: "GP da Espanha", circuito: "Catalunha", voltas: 66, pais: "es" },
    { etapa: 11, nome: "GP da Áustria", circuito: "Red Bull Ring", voltas: 71, pais: "at" },
    { etapa: 12, nome: "GP da Inglaterra", circuito: "Silverstone", voltas: 52, pais: "gb" },
    { etapa: 13, nome: "GP da Hungria", circuito: "Hungaroring", voltas: 70, pais: "hu" },
    { etapa: 14, nome: "GP da Bélgica", circuito: "Spa", voltas: 44, pais: "be" },
    { etapa: 15, nome: "GP da Holanda", circuito: "Zandvoort", voltas: 72, pais: "nl" },
    { etapa: 16, nome: "GP da Itália", circuito: "Monza", voltas: 53, pais: "it" },
    { etapa: 17, nome: "GP do Azerbaijão", circuito: "Baku", voltas: 51, pais: "az" },
    { etapa: 18, nome: "GP de Singapura", circuito: "Marina Bay", voltas: 61, pais: "sg" },
    { etapa: 19, nome: "GP dos EUA", circuito: "Austin", voltas: 56, pais: "us" },
    { etapa: 20, nome: "GP do México", circuito: "Hermanos Rodríguez", voltas: 71, pais: "mx" },
    { etapa: 21, nome: "GP do Brasil", circuito: "Interlagos", voltas: 71, pais: "br" },
    { etapa: 22, nome: "GP do Catar", circuito: "Lusail", voltas: 57, pais: "qa" },
    { etapa: 23, nome: "GP de Las Vegas", circuito: "Las Vegas Strip", voltas: 50, pais: "us" },
    { etapa: 24, nome: "GP de Abu Dhabi", circuito: "Yas Marina", voltas: 58, pais: "ae" }
];
