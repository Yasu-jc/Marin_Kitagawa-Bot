import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender];
  let img = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745557963353.jpeg';
  const emoji = '⚠️';      // Define o importa tus emojis
  const emoji3 = '⏳';
  const moneda = '💰';     // Define o importa según tu contexto
  const fkontak = null;    // Define si usas contacto o deja null

  if (!user) {
    return conn.reply(m.chat, `${emoji} El usuario no se encuentra en la base de datos.`, m);
  }

  if (user.health < 80) {
    return conn.reply(m.chat, '💔 No tienes suficiente salud para aventurarte. Usa el comando .heal para curarte.', m);
  }

  const COOLDOWN = 1500000; // 25 minutos en milisegundos
  const now = Date.now();

  if (user.lastAdventure && (now - user.lastAdventure) <= COOLDOWN) {
    let timeLeft = COOLDOWN - (now - user.lastAdventure);
    return conn.reply(m.chat, `${emoji3} Debes esperar ${msToTime(timeLeft)} antes de aventurarte de nuevo.`, m);
  }

  // Opciones de reinos y recompensas
  const kingdoms = [
    'Reino de Eldoria', 'Reino de Drakonia', 'Reino de Arkenland',
    'Reino de Valoria', 'Reino de Mystara', 'Reino de Ferelith',
    'Reino de Thaloria', 'Reino de Nimboria', 'Reino de Galadorn', 'Reino de Elenaria'
  ];
  const randomKingdom = pickRandom(kingdoms);

  const coin = pickRandom([20, 5, 7, 8, 88, 40, 50, 70, 90, 999, 300]);
  const emerald = pickRandom([1, 5, 7, 8]);
  const iron = pickRandom([5, 6, 7, 9, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80]);
  const gold = pickRandom([20, 5, 7, 8, 88, 40, 50]);
  const coal = pickRandom([20, 5, 7, 8, 88, 40, 50, 80, 70, 60, 100, 120, 600, 700, 64]);
  const stone = pickRandom([200, 500, 700, 800, 900, 4000, 300]);
  const diamonds = pickRandom([1, 2, 3, 4, 5]);
  const exp = pickRandom([10, 20, 30, 40, 50]);

  // Actualizar usuario
  user.coin += coin;
  user.emerald += emerald;
  user.iron += iron;
  user.gold += gold;
  user.coal += coal;
  user.stone += stone;
  user.diamonds += diamonds;
  user.exp += exp;

  // Reducir salud y registrar tiempo de aventura
  user.health = Math.max(user.health - 50, 0);
  user.lastAdventure = now;

  const info = `
🛫 Te has aventurado en el *<${randomKingdom}>*

🏞️ *Aventura Finalizada* 🏞️

${moneda} *Ganados:* ${coin}
♦️ *Esmeralda:* ${emerald}
🔩 *Hierro:* ${iron}
🏅 *Oro:* ${gold}
🕋 *Carbón:* ${coal}
🪨 *Piedra:* ${stone}
💎 *Diamantes Ganados:* ${diamonds}
✨ *Experiencia Ganada:* ${exp}
❤️ *Salud Actual:* ${user.health}
  `.trim();

  await conn.sendFile(m.chat, img, 'aventura.jpg', info, fkontak);
};

handler.help = ['aventura', 'adventure'];
handler.tags = ['rpg'];
handler.command = ['adventure', 'aventura'];
handler.group = true;
handler.register = true;
handler.cooldown = 1500000; // 25 minutos

export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function msToTime(duration) {
  const minutes = Math.floor((duration / 60000) % 60);
  const seconds = Math.floor((duration / 1000) % 60);
  return `${minutes} m y ${seconds} s`;
}
