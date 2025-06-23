import { addExif } from '../lib/sticker.js';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  // Emoji para UX
  const emoji = '🪄';
  const emoji2 = '❗';

  // Solo funciona respondiendo a un sticker
  if (!m.quoted || m.quoted.mtype !== 'stickerMessage') {
    return m.reply(
      `${emoji} Por favor, responde a un sticker con el comando *${usedPrefix + command}* seguido del nuevo nombre.\n` +
      `Ejemplo: *${usedPrefix + command} Nuevo Pack | Nuevo Autor*`
    );
  }

  // Descarga el sticker del mensaje citado
  const stickerBuffer = await m.quoted.download();
  if (!stickerBuffer) return m.reply(`${emoji2} No se pudo descargar el sticker.`);

  // Permite cambiar pack y autor con separadores | o •
  const textoParts = (text || '').split(/[\u2022|]/).map(part => part.trim());
  const userId = m.sender;
  let packstickers = global.db?.data?.users?.[userId] || {};
  let texto1 = textoParts[0] || packstickers.text1 || global.packsticker || 'StickerBot';
  let texto2 = textoParts[1] || packstickers.text2 || global.packsticker2 || 'By Pikachu-Bot';

  // Añade el exif personalizado
  let exif;
  try {
    exif = await addExif(stickerBuffer, texto1, texto2);
  } catch (e) {
    console.error('❌ Error al agregar exif:', e);
    return m.reply('❌ Hubo un error al agregar la marca personalizada.');
  }

  // Envía el sticker modificado
  await conn.sendMessage(m.chat, { sticker: exif }, { quoted: m });
  await m.react('✨');
};

handler.help = ['wm <pack> | <autor>'];
handler.tags = ['tools'];
handler.command = ['take', 'robar', 'wm'];
handler.register = true;

export default handler;