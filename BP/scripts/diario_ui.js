/**
 * SUPERNATURAL ADD-ON - DIÁRIO UI
 * Gerencia as 5 páginas do Diário do Caçador
 * Minecraft Bedrock 1.20.80 | Script API 1.10.0
 */

import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { CONFIG, MISSOES_T1, RACAS_T1, LOCAIS_T1 } from "./constants.js";
import { getPlayerProgress } from "./player_progress.js";

/**
 * PÁGINA 1: CAPA - Status Geral
 * @param {Player} player - O jogador
 */
export async function openDiarioCapa(player) {
  try {
    const progress = getPlayerProgress(player);
    const racaAtual = RACAS_T1.find((r) => r.id === progress.racaAtual);

    const form = new ActionFormData()
      .title("📖 DIÁRIO DO CAÇADOR")
      .body(
        `👤 Caçador: ${player.name}
🧬 Raça: ${racaAtual?.nome || "DESCONHECIDA"}
📊 Missões: ${progress.missoesConcluidas}/${progress.totalMissoes}
⭐ Nível: ${progress.nivel}
📈 Progresso: ${progress.progressoRaca}%
🌍 Temporada: ${progress.temporadaDesbloqueada}

━━━━━━━━━━━━━━━━━━━━━━━━━━
Bem-vindo ao seu Diário Pessoal.
Aqui estão seus dados de caçador.
`
      )
      .button("📖 Próxima")
      .button("❌ Fechar");

    const response = await form.show(player);

    if (response.canceled) {
      return;
    }

    if (response.selection === 0) {
      // Próxima página
      await openDiarioMissoes(player);
    }
  } catch (error) {
    console.error("❌ Erro ao abrir página Capa:", error);
    player.sendMessage("❌ Erro ao abrir o Diário");
  }
}

/**
 * PÁGINA 2: MISSÕES - Lista de 22 Missões T1
 * @param {Player} player - O jogador
 */
export async function openDiarioMissoes(player) {
  try {
    const progress = getPlayerProgress(player);
    let bodyText = "📋 MISSÕES - TEMPORADA 1\n\n";

    // Dividir em 2 colunas para caber 22 missões
    const missoesPorPagina = 11;
    const primeiraParte = MISSOES_T1.slice(0, missoesPorPagina);
    const segundaParte = MISSOES_T1.slice(missoesPorPagina);

    bodyText += "┌─────────────────────────────┐\n";
    primeiraParte.forEach((missao) => {
      const status =
        progress.missoesConcluidas >= missao.id
          ? "✅"
          : missao.id > progress.missoesConcluidas + 1
            ? "🔒"
            : "❌";
      bodyText += `${status} ${missao.numero} - ${missao.nome}\n`;
    });

    bodyText += "├─────────────────────────────┤\n";
    segundaParte.forEach((missao) => {
      const status =
        progress.missoesConcluidas >= missao.id
          ? "✅"
          : missao.id > progress.missoesConcluidas + 1
            ? "🔒"
            : "❌";
      bodyText += `${status} ${missao.numero} - ${missao.nome}\n`;
    });
    bodyText += "└─────────────────────────────┘";

    const form = new ActionFormData()
      .title("📖 DIÁRIO - MISSÕES T1")
      .body(bodyText)
      .button("⬅️ Anterior")
      .button("➡️ Próxima")
      .button("❌ Fechar");

    const response = await form.show(player);

    if (response.canceled) {
      return;
    }

    if (response.selection === 0) {
      // Anterior
      await openDiarioCapa(player);
    } else if (response.selection === 1) {
      // Próxima
      await openDiarioRacas(player);
    }
  } catch (error) {
    console.error("❌ Erro ao abrir página Missões:", error);
    player.sendMessage("❌ Erro ao abrir o Diário");
  }
}

/**
 * PÁGINA 3: RAÇAS - Raças Disponíveis
 * @param {Player} player - O jogador
 */
export async function openDiarioRacas(player) {
  try {
    const progress = getPlayerProgress(player);
    let bodyText = "🧬 RAÇAS DISPONÍVEIS\n\n";

    RACAS_T1.forEach((raca) => {
      const status = raca.desbloqueada ? "✅ DESBLOQUEADA" : "🔒 BLOQUEADA";
      const selecionada = raca.id === progress.racaAtual ? " 👈" : "";
      bodyText += `${raca.emoji} ${raca.nome}\n`;
      bodyText += `   Título: ${raca.titulo}\n`;
      bodyText += `   Nível: ${raca.nivel}\n`;
      bodyText += `   Poderes: ${raca.poderes}\n`;
      bodyText += `   Status: ${status}${selecionada}\n`;
      if (raca.fraquezas) {
        bodyText += `   Fraquezas: ${raca.fraquezas.join(", ")}\n`;
      }
      bodyText += `   "${raca.descricao}"\n\n`;
    });

    const form = new ActionFormData()
      .title("📖 DIÁRIO - RAÇAS")
      .body(bodyText)
      .button("⬅️ Anterior")
      .button("➡️ Próxima")
      .button("❌ Fechar");

    const response = await form.show(player);

    if (response.canceled) {
      return;
    }

    if (response.selection === 0) {
      // Anterior
      await openDiarioMissoes(player);
    } else if (response.selection === 1) {
      // Próxima
      await openDiarioTemporadas(player);
    }
  } catch (error) {
    console.error("❌ Erro ao abrir página Raças:", error);
    player.sendMessage("❌ Erro ao abrir o Diário");
  }
}

/**
 * PÁGINA 4: TEMPORADAS - T2 até T15 (Bloqueadas)
 * @param {Player} player - O jogador
 */
export async function openDiarioTemporadas(player) {
  try {
    const progress = getPlayerProgress(player);
    let bodyText = "🌍 TEMPORADAS\n\n";

    bodyText += `Temporada Atual: ${progress.temporadaDesbloqueada}\n\n`;

    bodyText += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    bodyText += "🔓 DESBLOQUEADA:\n";
    bodyText += "✅ T1 - A Jornada Começa (22 missões)\n\n";

    bodyText += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    bodyText += "🔒 BLOQUEADAS:\n";
    for (let i = 2; i <= 15; i++) {
      bodyText += `🔒 T${i} - [Em Desenvolvimento]\n`;
    }

    bodyText += "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    bodyText +=
      "Completa T1 para desbloquear temporadas futuras!\n";

    const form = new ActionFormData()
      .title("📖 DIÁRIO - TEMPORADAS")
      .body(bodyText)
      .button("⬅️ Anterior")
      .button("➡️ Próxima")
      .button("❌ Fechar");

    const response = await form.show(player);

    if (response.canceled) {
      return;
    }

    if (response.selection === 0) {
      // Anterior
      await openDiarioRacas(player);
    } else if (response.selection === 1) {
      // Próxima
      await openDiarioCoordenadas(player);
    }
  } catch (error) {
    console.error("❌ Erro ao abrir página Temporadas:", error);
    player.sendMessage("❌ Erro ao abrir o Diário");
  }
}

/**
 * PÁGINA 5: COORDENADAS - Mapa de Locais
 * @param {Player} player - O jogador
 */
export async function openDiarioCoordenadas(player) {
  try {
    const progress = getPlayerProgress(player);
    let bodyText = "🗺️ MAPA DE LOCAIS\n\n";

    bodyText += "Locais Desbloqueados:\n";

    LOCAIS_T1.forEach((local) => {
      if (local.desbloqueada) {
        bodyText += `${local.emoji} ${local.nome}\n`;
        bodyText += `   X: ${local.coords.x} | Y: ${local.coords.y} | Z: ${local.coords.z}\n`;
      }
    });

    bodyText += "\n🔒 Locais Bloqueados:\n";
    LOCAIS_T1.forEach((local) => {
      if (!local.desbloqueada) {
        bodyText += `${local.emoji} ${local.nome} (Bloqueado)\n`;
      }
    });

    bodyText +=
      "\nDica: Completa missões para desbloquear novos locais!\n";

    const form = new ActionFormData()
      .title("📖 DIÁRIO - COORDENADAS")
      .body(bodyText)
      .button("⬅️ Anterior")
      .button("🏠 Capa")
      .button("❌ Fechar");

    const response = await form.show(player);

    if (response.canceled) {
      return;
    }

    if (response.selection === 0) {
      // Anterior
      await openDiarioTemporadas(player);
    } else if (response.selection === 1) {
      // Capa
      await openDiarioCapa(player);
    }
  } catch (error) {
    console.error("❌ Erro ao abrir página Coordenadas:", error);
    player.sendMessage("❌ Erro ao abrir o Diário");
  }
}

/**
 * Função principal - Abre o Diário do Caçador
 * @param {Player} player - O jogador
 */
export async function openDiario(player) {
  try {
    await openDiarioCapa(player);
  } catch (error) {
    console.error("❌ Erro ao abrir Diário:", error);
    player.sendMessage("❌ Erro ao abrir o Diário do Caçador");
  }
}

export default {
  openDiario,
  openDiarioCapa,
  openDiarioMissoes,
  openDiarioRacas,
  openDiarioTemporadas,
  openDiarioCoordenadas
};
