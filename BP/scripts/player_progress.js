/**
 * SUPERNATURAL ADD-ON - PLAYER PROGRESS
 * Gerencia progresso do jogador usando scoreboards
 * Minecraft Bedrock 1.20.80 | Script API 1.10.0
 */

import { world } from "@minecraft/server";
import { CONFIG, STATUS_INICIAL } from "./constants.js";

/**
 * Inicializa os scoreboards necessários para o addon
 */
export function initializeScoreboards() {
  try {
    const scoreboardManager = world.scoreboard;

    // Lista de scoreboards a criar
    const scoreboards = [
      CONFIG.scoreboards.missoes,
      CONFIG.scoreboards.raca,
      CONFIG.scoreboards.nivel,
      CONFIG.scoreboards.progressoRaca,
      CONFIG.scoreboards.temporada
    ];

    scoreboards.forEach((scoreboard) => {
      try {
        scoreboardManager.addObjective(scoreboard, scoreboard);
      } catch (error) {
        // Scoreboard já existe, isso é esperado
      }
    });

    console.log("✅ Scoreboards inicializados com sucesso");
    return true;
  } catch (error) {
    console.error("❌ Erro ao inicializar scoreboards:", error);
    return false;
  }
}

/**
 * Obtém o progresso atual de um jogador
 * @param {Player} player - O jogador
 * @returns {Object} Objeto com progresso do jogador
 */
export function getPlayerProgress(player) {
  try {
    const scoreboardManager = world.scoreboard;

    const missoesConcluidas =
      scoreboardManager
        .getObjective(CONFIG.scoreboards.missoes)
        ?.getScore(player) || STATUS_INICIAL.missoesConcluidas;

    const racaAtual =
      scoreboardManager
        .getObjective(CONFIG.scoreboards.raca)
        ?.getScore(player) || STATUS_INICIAL.racaAtual;

    const nivel =
      scoreboardManager
        .getObjective(CONFIG.scoreboards.nivel)
        ?.getScore(player) || STATUS_INICIAL.nivel;

    const progressoRaca =
      scoreboardManager
        .getObjective(CONFIG.scoreboards.progressoRaca)
        ?.getScore(player) || STATUS_INICIAL.progressoRaca;

    const temporadaDesbloqueada =
      scoreboardManager
        .getObjective(CONFIG.scoreboards.temporada)
        ?.getScore(player) || STATUS_INICIAL.temporadaDesbloqueada;

    return {
      missoesConcluidas,
      racaAtual,
      nivel,
      progressoRaca,
      temporadaDesbloqueada,
      totalMissoes: CONFIG.temporadas.missoesPorTemporada[temporadaDesbloqueada]
    };
  } catch (error) {
    console.error("❌ Erro ao obter progresso do jogador:", error);
    return STATUS_INICIAL;
  }
}

/**
 * Define o valor de um scoreboard para um jogador
 * @param {Player} player - O jogador
 * @param {string} scoreboard - Nome do scoreboard
 * @param {number} value - Valor a ser definido
 */
export function setScoreboardValue(player, scoreboard, value) {
  try {
    const scoreboardManager = world.scoreboard;
    const objective = scoreboardManager.getObjective(scoreboard);

    if (objective) {
      objective.setScore(player, value);
      return true;
    } else {
      console.error(`❌ Scoreboard '${scoreboard}' não encontrado`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Erro ao definir scoreboard '${scoreboard}':`, error);
    return false;
  }
}

/**
 * Incrementa o valor de um scoreboard para um jogador
 * @param {Player} player - O jogador
 * @param {string} scoreboard - Nome do scoreboard
 * @param {number} amount - Quantidade a incrementar (padrão: 1)
 */
export function incrementScoreboardValue(player, scoreboard, amount = 1) {
  try {
    const scoreboardManager = world.scoreboard;
    const objective = scoreboardManager.getObjective(scoreboard);

    if (objective) {
      const currentValue = objective.getScore(player) || 0;
      objective.setScore(player, currentValue + amount);
      return true;
    } else {
      console.error(`❌ Scoreboard '${scoreboard}' não encontrado`);
      return false;
    }
  } catch (error) {
    console.error(
      `❌ Erro ao incrementar scoreboard '${scoreboard}':`,
      error
    );
    return false;
  }
}

/**
 * Marca uma missão como concluída para um jogador
 * @param {Player} player - O jogador
 * @param {number} missionId - ID da missão
 */
export function completeMission(player, missionId) {
  try {
    return incrementScoreboardValue(player, CONFIG.scoreboards.missoes);
  } catch (error) {
    console.error("❌ Erro ao completar missão:", error);
    return false;
  }
}

/**
 * Muda a raça do jogador
 * @param {Player} player - O jogador
 * @param {number} raceId - ID da raça
 */
export function changeRace(player, raceId) {
  try {
    return setScoreboardValue(player, CONFIG.scoreboards.raca, raceId);
  } catch (error) {
    console.error("❌ Erro ao mudar raça:", error);
    return false;
  }
}

/**
 * Atualiza o nível do jogador
 * @param {Player} player - O jogador
 * @param {number} newLevel - Novo nível
 */
export function setPlayerLevel(player, newLevel) {
  try {
    return setScoreboardValue(player, CONFIG.scoreboards.nivel, newLevel);
  } catch (error) {
    console.error("❌ Erro ao definir nível:", error);
    return false;
  }
}

/**
 * Atualiza o progresso da raça
 * @param {Player} player - O jogador
 * @param {number} progress - Progresso em %
 */
export function setRaceProgress(player, progress) {
  try {
    // Garante que não ultrapasse 100%
    const clampedProgress = Math.min(Math.max(progress, 0), 100);
    return setScoreboardValue(
      player,
      CONFIG.scoreboards.progressoRaca,
      clampedProgress
    );
  } catch (error) {
    console.error("❌ Erro ao definir progresso de raça:", error);
    return false;
  }
}

/**
 * Desbloqueia uma temporada para o jogador
 * @param {Player} player - O jogador
 * @param {number} seasonNumber - Número da temporada
 */
export function unlockSeason(player, seasonNumber) {
  try {
    return setScoreboardValue(
      player,
      CONFIG.scoreboards.temporada,
      seasonNumber
    );
  } catch (error) {
    console.error("❌ Erro ao desbloquear temporada:", error);
    return false;
  }
}

/**
 * Reseta o progresso de um jogador para os valores iniciais
 * @param {Player} player - O jogador
 */
export function resetPlayerProgress(player) {
  try {
    const scoreboardManager = world.scoreboard;

    setScoreboardValue(
      player,
      CONFIG.scoreboards.missoes,
      STATUS_INICIAL.missoesConcluidas
    );
    setScoreboardValue(
      player,
      CONFIG.scoreboards.raca,
      STATUS_INICIAL.racaAtual
    );
    setScoreboardValue(
      player,
      CONFIG.scoreboards.nivel,
      STATUS_INICIAL.nivel
    );
    setScoreboardValue(
      player,
      CONFIG.scoreboards.progressoRaca,
      STATUS_INICIAL.progressoRaca
    );
    setScoreboardValue(
      player,
      CONFIG.scoreboards.temporada,
      STATUS_INICIAL.temporadaDesbloqueada
    );

    console.log(`✅ Progresso de ${player.name} foi resetado`);
    return true;
  } catch (error) {
    console.error("❌ Erro ao resetar progresso:", error);
    return false;
  }
}

export default {
  initializeScoreboards,
  getPlayerProgress,
  setScoreboardValue,
  incrementScoreboardValue,
  completeMission,
  changeRace,
  setPlayerLevel,
  setRaceProgress,
  unlockSeason,
  resetPlayerProgress
};
