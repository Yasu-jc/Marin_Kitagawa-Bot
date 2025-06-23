const handler = async (m, { conn }) => {
  const user = global.db.data.users[m.sender];
  const wm = ''; // Define tu watermark o texto extra aquí
  if (!user) return conn.reply(m.chat, 'Usuario no encontrado en base de datos.', m);

  // Verificar cooldown de 45 minutos
  const COOLDOWN = 2700000; // 45 min en ms
  const now = Date.now();
  if (user.lastberburu && now - user.lastberburu < COOLDOWN) {
    const timeLeft = COOLDOWN - (now - user.lastberburu);
    return conn.reply(m.chat, `Por favor descansá un momento para seguir cazando\n\n⫹⫺ Tiempo ${clockString(timeLeft)}\n${wm}`, m);
  }

  // Listado de emojis para armas
  const armas = ['🪚', '⛏️', '🧨', '💣', '🔫', '🔪', '🗡️', '🏹', '🦾', '🥊', '🧹', '🔨', '🛻'];
  // Lista de animales a actualizar en usuario y mostrar resultados
  const animales = [
    'banteng', 'harimau', 'gajah', 'kambing', 'panda', 'buaya',
    'kerbau', 'sapi', 'monyet', 'babihutan', 'babi', 'ayam'
  ];
  const animalesEmojisIzq = ['🐂', '🐅', '🐘', '🐐', '🐼', '🐊'];
  const animalesEmojisDer = ['🐃', '🐮', '🐒', '🐗', '🐖', '🐓'];

  // Generar valores y emojis aleatorios para cada animal
  let resultadosIzq = [];
  let resultadosDer = [];

  for (let i = 0; i < 6; i++) {
    const cantidadIzq = getRandomInt(0, 4);
    const cantidadDer = getRandomInt(0, 4);
    const armaIzq = pickRandom(armas);
    const armaDer = pickRandom(armas);
    resultadosIzq.push(`*${animalesEmojisIzq[i]} ${armaIzq} ${cantidadIzq}*`);
    resultadosDer.push(`*${animalesEmojisDer[i]} ${armaDer} ${cantidadDer}*`);

    // Actualizar user
    user[animales[i]] = (user[animales[i]] || 0) + cantidadIzq;
    user[animales[i + 6]] = (user[animales[i + 6]] || 0) + cantidadDer;
  }

  const hsl = `
*✧ Resultados de la caza ${conn.getName(m.sender)} ✧*

 ${resultadosIzq[0]}		 ${resultadosDer[0]}
 ${resultadosIzq[1]}		 ${resultadosDer[1]}
 ${resultadosIzq[2]}		 ${resultadosDer[2]}
 ${resultadosIzq[3]}		 ${resultadosDer[3]}
 ${resultadosIzq[4]}		 ${resultadosDer[4]}
 ${resultadosIzq[5]}		 ${resultadosDer[5]}
`.trim();

  // Actualizar último tiempo de caza
  user.lastberburu = now;

  // Mensajes escalonados
  setTimeout(() => {
    conn.reply(m.chat, `@${m.sender.split('@')[0]} *Buscando implementos de caza...*`, m, { mentions: [m.sender] });
  }, 0);

  setTimeout(() => {
    conn.reply(m.chat, `@${m.sender.split('@')[0]} *Armas listas para la Caza!!*`, m, { mentions: [m.sender] });
  }, 15000);

  setTimeout(() => {
    conn.reply(m.chat, `@${m.sender.split('@')[0]} *ANIMALES DETECTADOS!! 🐂 🐅 🐘 🐼*`, m, { mentions: [m.sender] });
  }, 18000);

  setTimeout(() => {
    conn.reply(m.chat, hsl, m);
  }, 20000);
};

handler.help = ['berburu'];
handler.tags = ['rpg'];
handler.command = ['cazar', 'hunt', 'berburu'];
handler.group = true;
handler.register = true;

export default handler;

// Función para obtener entero aleatorio entre min y max inclusive
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para elegir elemento aleatorio de un array
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function clockString(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor(ms / 60000) % 60;
  const s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}
