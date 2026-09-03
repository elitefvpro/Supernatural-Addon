/**
 * SUPERNATURAL ADD-ON - CONSTANTS
 * Contém todas as constantes: missões, raças, locais, coordenadas
 * Minecraft Bedrock 1.20.80 | Script API 1.10.0
 */

// ============================================
// TEMPORADA 1 - 22 MISSÕES
// ============================================
export const MISSOES_T1 = [
  {
    id: 1,
    numero: "01",
    nome: "Piloto — Mulher de Branca",
    emoji: "🩸",
    local: "Casa Winchester",
    coords: { x: 0, y: 64, z: 0 }
  },
  {
    id: 2,
    numero: "02",
    nome: "Wendigo",
    emoji: "🌲",
    local: "Floresta Densa",
    coords: { x: 150, y: 72, z: -200 }
  },
  {
    id: 3,
    numero: "03",
    nome: "Morto na Água",
    emoji: "🚗",
    local: "Lago Blackwater",
    coords: { x: -80, y: 62, z: 120 }
  },
  {
    id: 4,
    numero: "04",
    nome: "Viajante Fantasma",
    emoji: "🏚️",
    local: "Aeroporto Abandonado",
    coords: { x: 200, y: 80, z: 50 }
  },
  {
    id: 5,
    numero: "05",
    nome: "Bloody Mary",
    emoji: "🔪",
    local: "Mansão Holloway",
    coords: { x: -120, y: 68, z: -90 }
  },
  {
    id: 6,
    numero: "06",
    nome: "Pele — Metamorfo",
    emoji: "🐍",
    local: "Cidade Central",
    coords: { x: 50, y: 64, z: 100 }
  },
  {
    id: 7,
    numero: "07",
    nome: "Homem-Gancho",
    emoji: "🪝",
    local: "Igreja Antiga",
    coords: { x: -60, y: 70, z: -150 }
  },
  {
    id: 8,
    numero: "08",
    nome: "Insetos — Infestação",
    emoji: "🐛",
    local: "Vale dos Insetos",
    coords: { x: 180, y: 58, z: -70 }
  },
  {
    id: 9,
    numero: "09",
    nome: "Lar — Casa Original",
    emoji: "🏠",
    local: "Casa Winchester",
    coords: { x: -50, y: 64, z: 200 }
  },
  {
    id: 10,
    numero: "10",
    nome: "Asilo",
    emoji: "🏥",
    local: "Asilo Rockwell",
    coords: { x: -200, y: 75, z: -100 }
  },
  {
    id: 11,
    numero: "11",
    nome: "Espantalho",
    emoji: "🎃",
    local: "Estrada Rural",
    coords: { x: 100, y: 65, z: -250 }
  },
  {
    id: 12,
    numero: "12",
    nome: "Fé",
    emoji: "✝️",
    local: "Cidade da Fé",
    coords: { x: -150, y: 64, z: 80 }
  },
  {
    id: 13,
    numero: "13",
    nome: "Rota 666",
    emoji: "🚗💀",
    local: "Rodovia 666",
    coords: { x: 300, y: 63, z: 0 }
  },
  {
    id: 14,
    numero: "14",
    nome: "Pesadelo",
    emoji: "👁️",
    local: "Bairro Residencial",
    coords: { x: -220, y: 66, z: 180 }
  },
  {
    id: 15,
    numero: "15",
    nome: "Os Benders",
    emoji: "🔫",
    local: "Zona Rural",
    coords: { x: 80, y: 70, z: -300 }
  },
  {
    id: 16,
    numero: "16",
    nome: "Sombra",
    emoji: "👤",
    local: "Cidade Velha",
    coords: { x: -100, y: 64, z: -200 }
  },
  {
    id: 17,
    numero: "17",
    nome: "Casa do Inferno",
    emoji: "🔥",
    local: "Floresta Sombria",
    coords: { x: 250, y: 60, z: 150 }
  },
  {
    id: 18,
    numero: "18",
    nome: "Algo Maligno",
    emoji: "🐺",
    local: "Cidade Pequena",
    coords: { x: -300, y: 58, z: 50 }
  },
  {
    id: 19,
    numero: "19",
    nome: "Proveniência",
    emoji: "🖼️",
    local: "Loja de Antiguidades",
    coords: { x: 40, y: 64, z: -120 }
  },
  {
    id: 20,
    numero: "20",
    nome: "Sangue do Morto",
    emoji: "📂",
    local: "Hotel Abandonado",
    coords: { x: -180, y: 65, z: 220 }
  },
  {
    id: 21,
    numero: "21",
    nome: "Salvação",
    emoji: "👹",
    local: "Fazenda Remota",
    coords: { x: 320, y: 72, z: -180 }
  },
  {
    id: 22,
    numero: "22",
    nome: "Armadilha do Diabo — FINAL",
    emoji: "🔒",
    local: "Confronto Final",
    coords: { x: 0, y: 80, z: -350 }
  }
];

// ============================================
// RAÇAS - TEMPORADA 1
// ============================================
export const RACAS_T1 = [
  {
    id: 1,
    nome: "HUMANO",
    titulo: "Caçador",
    emoji: "👤",
    nivel: 1,
    poderes: "Nenhum — evolui com armas e equipamentos",
    desbloqueada: true,
    descricao: "A forma humana padrão. Sem poderes especiais, mas versátil."
  },
  {
    id: 2,
    nome: "DEMÔNIO",
    titulo: "Inferior",
    emoji: "👹",
    nivel: 2,
    poderes: "Fogo, resistência, sombras",
    desbloqueada: false,
    descricao: "Desbloqueia durante a Temporada 1. Poderes: Fogo, resistência, sombras.",
    requisitos: "Derrote o demônio correspondente"
  },
  {
    id: 3,
    nome: "VAMPIRO",
    titulo: "Clássico",
    emoji: "🧛",
    nivel: 2,
    poderes: "Força, velocidade, visão noturna",
    fraquezas: ["Sol", "Prata", "Madeira"],
    desbloqueada: false,
    descricao: "Desbloqueia durante a Temporada 1. Poderes: Força, velocidade, visão noturna.",
    requisitos: "Derrote um Vampiro"
  }
];

// ============================================
// PONTOS DE INTERESSE - COORDENADAS
// ============================================
export const LOCAIS_T1 = [
  {
    id: 1,
    nome: "Casa Winchester",
    emoji: "🏠",
    coords: { x: 0, y: 64, z: 0 },
    desbloqueada: true
  },
  {
    id: 2,
    nome: "Garagem Impala",
    emoji: "🚗",
    coords: { x: 8, y: 64, z: 0 },
    desbloqueada: true
  },
  {
    id: 3,
    nome: "Motel Caçadores",
    emoji: "🏨",
    coords: { x: 120, y: 64, z: 80 },
    desbloqueada: false
  },
  {
    id: 4,
    nome: "Aeroporto Abandonado",
    emoji: "✈️",
    coords: { x: 200, y: 80, z: 50 },
    desbloqueada: false
  },
  {
    id: 5,
    nome: "Asilo Rockwell",
    emoji: "🏥",
    coords: { x: -200, y: 75, z: -100 },
    desbloqueada: false
  },
  {
    id: 6,
    nome: "Igreja Antiga",
    emoji: "⛪",
    coords: { x: -60, y: 70, z: -150 },
    desbloqueada: false
  },
  {
    id: 7,
    nome: "Casa do Inferno",
    emoji: "🏚️",
    coords: { x: 250, y: 60, z: 150 },
    desbloqueada: false
  },
  {
    id: 8,
    nome: "Floresta Wendigo",
    emoji: "🌲",
    coords: { x: 150, y: 72, z: -200 },
    desbloqueada: false
  },
  {
    id: 9,
    nome: "Lago Blackwater",
    emoji: "💧",
    coords: { x: -80, y: 62, z: 120 },
    desbloqueada: false
  },
  {
    id: 10,
    nome: "Mansão Holloway",
    emoji: "🏰",
    coords: { x: -120, y: 68, z: -90 },
    desbloqueada: false
  },
  {
    id: 11,
    nome: "Hotel Abandonado",
    emoji: "🏨",
    coords: { x: -180, y: 65, z: 220 },
    desbloqueada: false
  },
  {
    id: 12,
    nome: "Fazenda Remota",
    emoji: "🏡",
    coords: { x: 320, y: 72, z: -180 },
    desbloqueada: false
  },
  {
    id: 13,
    nome: "Rodovia 666",
    emoji: "🛣️",
    coords: { x: 300, y: 63, z: 0 },
    desbloqueada: false
  },
  {
    id: 14,
    nome: "Cidade Velha",
    emoji: "🏙️",
    coords: { x: -100, y: 64, z: -200 },
    desbloqueada: false
  }
];

// ============================================
// CONFIGURAÇÃO GERAL
// ============================================
export const CONFIG = {
  addon: {
    nome: "Supernatural Add-on",
    versao: "1.0.0",
    namespace: "supernatural"
  },
  minecraft: {
    versao: "1.20.80",
    scriptApi: "1.10.0"
  },
  item: {
    id: "supernatural:diario_do_cacador",
    nome: "Diário do Caçador",
    textura: "diario_do_cacador"
  },
  scoreboards: {
    missoes: "diario_missoes",
    raca: "diario_raca",
    nivel: "diario_nivel",
    progressoRaca: "diario_progresso_raca",
    temporada: "diario_temporada"
  },
  temporadas: {
    total: 15,
    atual: 1,
    missoesPorTemporada: {
      1: 22,
      2: 22,
      3: 16,
      4: 22,
      5: 22
      // T6-T15 a definir
    }
  }
};

// ============================================
// STATUS INICIAIS
// ============================================
export const STATUS_INICIAL = {
  missoesConcluidas: 0,
  racaAtual: 1, // Humano
  nivel: 1,
  progressoRaca: 0, // %
  temporadaDesbloqueada: 1
};

export default {
  MISSOES_T1,
  RACAS_T1,
  LOCAIS_T1,
  CONFIG,
  STATUS_INICIAL
};
