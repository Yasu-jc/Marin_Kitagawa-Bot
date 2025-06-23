let cooldowns = {};

const handler = async (m, { conn }) => {
  const users = global.db.data.users;
  const senderId = m.sender;
  const COOLDOWN_SECONDS = 5 * 60; // 5 minutos
  const emoji = '🌲'; // o el emoji que quieras usar
  const moneda = 'Coins'; // Define aquí tu moneda
  const fkontak = null; // Define el contacto o quita si no usas

  // Verificar cooldown
  if (cooldowns[senderId] && (Date.now() - cooldowns[senderId] < COOLDOWN_SECONDS * 1000)) {
    const timeLeft = cooldowns[senderId] + COOLDOWN_SECONDS * 1000 - Date.now();
    const tiempoRestante = segundosAHMS(Math.ceil(timeLeft / 1000));
    return conn.reply(m.chat, `${emoji} Ya exploraste el bosque recientemente. Espera ⏳ *${tiempoRestante}* antes de aventurarte de nuevo.`, m);
  }
  cooldowns[senderId] = Date.now();

  // Inicializar usuario si no existe
  if (!users[senderId]) {
    users[senderId] = { health: 100, coin: 0, exp: 0 };
  }

  const eventos = [
    { nombre: '💰 Tesoro Escondido', coin: 100, exp: 50, health: 0, mensaje: `¡Encontraste un cofre lleno de ${moneda}!` },
    { nombre: '🐻 Oso Salvaje', coin: -50, exp: 20, health: -10, mensaje: `Un oso te atacó y perdiste algunas ${moneda} mientras escapabas.` },
    { nombre: '🕸️ Trampa Antigua', coin: 0, exp: 10, health: 0, mensaje: 'Caiste en una trampa, pero lograste escapar ileso.' },
    { nombre: '💎 Piedra Mágica', coin: 200, exp: 100, health: 0, mensaje: `¡Descubriste una piedra mágica que te otorgó ${moneda} adicionales!` },
    { nombre: '🧙 Viejo Sabio', coin: 50, exp: 30, health: 0, mensaje: 'Un sabio te recompensó por escuchar sus historias.' },
    { nombre: '⚔️ Enemigo Oculto', coin: -30, exp: 15, health: -10, mensaje: `Te enfrentaste a un enemigo oculto y perdiste algunos ${moneda}.` },
    { nombre: '🍄 Setas Extrañas', coin: 0, exp: 5, health: 0, mensaje: 'Comiste unas setas del bosque, pero no pasó nada interesante.' }
  ];

  const evento = pickRandom(eventos);

  // Actualizar stats
  users[senderId].coin += evento.coin;
  users[senderId].exp += evento.exp;
  users[senderId].health += evento.health;

  // Evitar salud negativa
  if (users[senderId].health < 0) users[senderId].health = 0;

  const saludMsg = evento.health < 0 ? `bajó en: ${Math.abs(evento.health)}` : 'se mantuvo igual';

  const info = `
╭━〔 Exploración en el Bosque〕
┃ Misión: *${evento.nombre}*
┃ Evento: ${evento.mensaje}
┃ Recompensa: ${evento.coin >= 0 ? '+' : '-'}${Math.abs(evento.coin)} *${moneda}* y +${evento.exp} *XP*.
┃ Tu salud ${saludMsg}.
╰━━━━━━━━━━━━⬣`.trim();

  const img = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745557951898.jpeg';

  await conn.sendFile(m.chat, img, 'exploracion.jpg', info, fkontak);

  await global.db.write();
};

handler.tags = ['rpg'];
handler.help = ['explorar'];
handler.command = ['explorar', 'bosque'];
handler.register = true;
handler.group = true;

export default handler;

// Funciones auxiliares
function segundosAHMS(segundos) {
  const minutos = Math.floor(segundos / 60);
  const segundosRestantes = segundos % 60;
  return `${minutos} minutos y ${segundosRestantes} segundos`;
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}