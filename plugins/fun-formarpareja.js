const toM = (a) => '@' + a.split('@')[0];

// Helper para obtener un elemento aleatorio del array
function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function handler(m, { groupMetadata }) {
  const participantes = groupMetadata.participants
    .map((v) => v.id)
    .filter((id) => id && id.endsWith('@s.whatsapp.net'));

  if (participantes.length < 2) {
    await m.reply('❗ El grupo necesita al menos 2 participantes para formar una pareja.');
    return;
  }

  let a = getRandom(participantes);
  let b;
  do b = getRandom(participantes);
  while (b === a);

  // Frases más divertidas y emojis para hacerlo llamativo
  const frases = [
    `💍 *${toM(a)}* y *${toM(b)}* deberían casarse, ¡son el OTP del grupo! 💖`,
    `💓 *${toM(a)}* y *${toM(b)}* hacen una pareja adorable, ¡que viva el amor! 🥰`,
    `💘 El destino une a *${toM(a)}* y *${toM(b)}*, ¡boda a la vista! 🎉`,
    `👩‍❤️‍👨 *${toM(a)}* y *${toM(b)}* tienen química, ¡no lo nieguen! 😏`,
    `✨ *${toM(a)}* + *${toM(b)}* = 💕 ¡Nueva pareja favorita del grupo!`
  ];
  const frase = getRandom(frases);

  // Separadores y marco decorativo
  const decorado = `
╭━━━[ 💞 *¡FORMANDO PAREJA!* 💞 ]━━━╮
┃═════════════════════════════════┃

\n> ${frase}

┃═════════════════════════════════┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`;

  await m.reply(decorado.trim(), null, {
    mentions: [a, b]
  });
}

handler.help = ['formarpareja'];
handler.tags = ['fun'];
handler.command = ['formarpareja', 'formarparejas'];
handler.group = true;
handler.register = true;

export default handler;