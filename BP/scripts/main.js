/**
 * SUPERNATURAL ADD-ON - MAIN SCRIPT
 * Orquestrador principal do addon
 * Minecraft Bedrock 1.20.80 | Script API 1.10.0
 */

import { world, system } from "@minecraft/server";
import { openDiario } from "./diario_ui.js";
import { initializeScoreboards } from "./player_progress.js";

// ============================================
// VARIÁVEIS GLOBAIS
// ============================================
const ADDON_NAME = "Supernatural Add-on v1.0.0";
const DIARIO_ITEM_ID = "supernatural:diario_do_cacador";
let scoreboardsInitialized = false;

// ============================================
// INICIALIZAÇÃO DO MUNDO
// ============================================
world.afterEvents.worldInitialize.subscribe((event) => {
  try {
    console.log(`✅ ${ADDON_NAME} carregado com sucesso!`);
    console.log("🌍 Inicializando scoreboards...");

    // Inicializa scoreboards na primeira execução
    if (!scoreboardsInitialized) {
      initializeScoreboards();
      scoreboardsInitialized = true;
      console.log("✅ Scoreboards inicializados");
    }
  } catch (error) {
    console.error("❌ Erro ao inicializar o addon:", error);
  }
});

// ============================================
// EVENT LISTENER - ITEM USE (DIÁRIO)
// ============================================
world.afterEvents.playerInteractWithItem.subscribe((event) => {
  try {
    const { player, itemStack } = event;

    // Verifica se é o Diário do Caçador
    if (itemStack.typeId === DIARIO_ITEM_ID) {
      console.log(`📖 ${player.name} abriu o Diário do Caçador`);

      // Abre a interface do Diário
      openDiario(player);
    }
  } catch (error) {
    console.error("❌ Erro ao processar item:", error);
  }
});

// ============================================
// EVENT LISTENER - COMANDO (OPCIONAL)
// ============================================
world.beforeEvents.chatSend.subscribe((event) => {
  try {
    const { sender, message } = event;

    // Comando: /diario
    if (message.toLowerCase() === "/diario") {
      event.cancel = true;
      console.log(`📖 ${sender.name} usou /diario`);
      openDiario(sender);
    }

    // Comando: /diario reset
    if (message.toLowerCase() === "/diario reset") {
      event.cancel = true;
      console.log(`🔄 ${sender.name} resetou seu progresso`);
      sender.sendMessage("❌ Comando /diario reset ainda não implementado");
    }

    // Comando: /diario info
    if (message.toLowerCase() === "/diario info") {
      event.cancel = true;
      sender.sendMessage(`
╔════════════════════════════╗
║   ${ADDON_NAME}   ║
╠════════════════════════════╣
║ 📖 Usar: /diario           ║
║ 🔄 Reset: /diario reset    ║
║ 📊 Info: /diario info      ║
╠════════════════════════════╣
║ Missões: 22                ║
║ Raças: 3                   ║
║ Temporadas: 15             ║
╚════════════════════════════╝
      `);
    }
  } catch (error) {
    console.error("❌ Erro ao processar comando:", error);
  }
});

// ============================================
// EVENT LISTENER - PLAYER JOIN
// ============================================
world.afterEvents.playerSpawn.subscribe((event) => {
  try {
    const { player } = event;

    // Verifica se é primeira vez que entra (sem scoreboards setados)
    // Se sim, envia mensagem de boas-vindas
    const scoreboardManager = world.scoreboard;
    const raceScore = scoreboardManager
      .getObjective("diario_raca")
      ?.getScore(player);

    if (raceScore === undefined) {
      console.log(`🎉 ${player.name} entrou pela primeira vez`);
      player.sendMessage("🎉 Bem-vindo ao Supernatural Add-on!");
      player.sendMessage("📖 Use /diario ou clique no Diário do Caçador");
    }
  } catch (error) {
    console.error("❌ Erro ao processar spawn:", error);
  }
});

// ============================================
// LOGGING - Tick System
// ============================================
let tickCounter = 0;
system.runInterval(() => {
  tickCounter++;

  // Log a cada 20 ticks (1 segundo)
  if (tickCounter % 20 === 0) {
    // Pode adicionar lógicas periódicas aqui
    // Por enquanto, apenas monitorando
  }

  // Log a cada 1200 ticks (1 minuto)
  if (tickCounter % 1200 === 0) {
    console.log(`⏱️ [${new Date().toLocaleTimeString()}] ${ADDON_NAME} operacional`);
  }
});

// ============================================
// TRATAMENTO DE ERROS GLOBAL
// ============================================
world.afterEvents.playerLeave.subscribe((event) => {
  try {
    const { playerName } = event;
    console.log(`👋 ${playerName} saiu do mundo`);
  } catch (error) {
    console.error("❌ Erro ao processar saída:", error);
  }
});

// ============================================
// LOG INICIAL
// ============================================
console.log("╔════════════════════════════╗");
console.log("║  SUPERNATURAL ADD-ON v1.0  ║");
console.log("║  Minecraft Bedrock 1.20.80 ║");
console.log("║  Script API 1.10.0         ║");
console.log("╚════════════════════════════╝");
console.log("✅ Sistema iniciado com sucesso");
console.log("📖 Comandos: /diario, /diario info, /diario reset");

export default {
  ADDON_NAME,
  DIARIO_ITEM_ID,
  scoreboardsInitialized
};
