/*import { igdl } from 'ruhend-scraper'

const handler = async (m, { text, conn, args, usedPrefix, command }) => {
if (!args[0]) {
return conn.reply(m.chat, ' *Ingresa Un Link De Facebook*', m, rcanal)}
let res
try {
conn.reply(m.chat, `🕒 *Descargando su video de facebook.*`, m, {
contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, showAdAttribution: true,
title: packname,
body: dev,
previewType: 0, thumbnail: icons,
sourceUrl: channel }}})
await m.react(rwait)
res = await igdl(args[0])
} catch {
await m.react(error)
return conn.reply(m.chat, '*Error al obtener datos. Verifica el enlace.*', m, fake)}
let result = res.data
if (!result || result.length === 0) {
return conn.reply(m.chat, '🐲 *No se encontraron resultados.*', m, fake)}
let data
try {
await m.react(rwait)
data = result.find(i => i.resolution === "720p (HD)") || result.find(i => i.resolution === "360p (SD)")
} catch {
await m.react(error)
return conn.reply(m.chat, '☁️ *Error al procesar los datos.*', m, rcanal)}
if (!data) {
return conn.reply(m.chat, ' *No se encontró una resolución adecuada.*', m, rcanal)}
let video = data.url
try {
await m.react(rwait)
await conn.sendMessage(m.chat, { video: { url: video }, caption: ' *Tu video de facebook.*\n> ' + textbot, fileName: 'fb.mp4', mimetype: 'video/mp4' }, { quoted: fkontak })
await m.react(done)
} catch {
await m.react(error)
return conn.reply(m.chat, '🐲 *Error al enviar el video.*', m, rcanal)}}

handler.help = ['facebook', 'fb']
handler.tags = ['descargas']
handler.command = ['facebook', 'fb']
handler.register = true

export default handler*/




import { igdl } from 'ruhend-scraper'; // Asegúrate de que este paquete esté instalado: npm install ruhend-scraper

const handler = async (m, { conn }) => {
  // Verifica si m.text existe y no está vacío
  if (!m || !m.text) {
    return; // No hay texto en el mensaje, así que no hacemos nada
  }

  const text = m.text;

  // Expresión regular para encontrar URLs de video de Facebook
  const regexFb = /https?:\/\/(www\.)?(facebook\.com|fb.watch)\/[^\s]+/gi;
  const match = text.match(regexFb);

  // Si no se encuentra una URL de Facebook en el mensaje, regresa
  if (!match) {
    return;
  }

  const url = match[0]; // Obtiene la primera URL encontrada

  // --- Información del Bot y Elementos de Interfaz de Usuario (UI) ---
  const packname = `${wm}`;
  const dev = `${etiqueta}`;
  const icons = 'https://i.postimg.cc/nzRKNjVR/catalogo.jpg';
  const channel = 'https://github.com/JosueAlmonte'; // Asumiendo que esta es la URL de origen para la respuesta de anuncio externo
  const textbot = '✅ Video descargado correctamente.';
  const rwait = '⏳'; // Emoji de reacción para "espera"
  const done = '✅';   // Emoji de reacción para "listo"
  const error = '❌';  // Emoji de reacción para "error"

  // Objetos de mensaje falsos para citar/responder, comunes en bots de WhatsApp
  const fake = {
    key: {
      fromMe: false,
      participant: `0@s.whatsapp.net`,
      ...(m.chat ? { remoteJid: m.chat } : {}),
    },
    message: { conversation: '✨' },
  };

  const fkontak = {
    key: { participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast' },
    message: {
      contactMessage: {
        displayName: 'Descargando...',
        vcard: 'BEGIN:VCARD\nVERSION:3.0\nFN:Bot\nEND:VCARD', // Una VCard simple para el mensaje de contacto
      },
    },
  };
  // --- Fin de Elementos de UI ---

  try {
    // Envía un mensaje de "descargando" con una respuesta de anuncio externo para una mejor UI
    await conn.reply(m.chat, `🕒 *Descargando su video de Facebook...*`, m, {
      contextInfo: {
        externalAdReply: {
          mediaUrl: null, // No hay una URL de medios específica para la respuesta del anuncio en sí
          mediaType: 1,   // 1 para imagen, 2 para video (aquí es solo una vista previa)
          showAdAttribution: true,
          title: packname,
          body: dev,
          previewType: 0, // 0 para URL, 1 para producto, 2 para sin vista previa
          thumbnailUrl: icons,
          sourceUrl: channel,
        },
      },
    });

    // Reacciona al mensaje del usuario con un emoji de "espera"
    await m.react(rwait);

    // Llama a la función igdl de ruhend-scraper para obtener los datos del video
    const res = await igdl(url);
    const result = res.data;

    // Verifica si se encontraron resultados
    if (!result || result.length === 0) {
      await m.react(error); // Reacciona con emoji de error
      return conn.reply(m.chat, '❌ *No se encontraron resultados para este enlace.*', m, fake);
    }

    // Prioriza 720p, luego 360p. Si ninguna, será indefinido.
    const data = result.find(i => i.resolution === "720p (HD)") || result.find(i => i.resolution === "360p (SD)");

    // Si no se encontró una resolución adecuada
    if (!data) {
      await m.react(error);
      return conn.reply(m.chat, '❌ *No se encontró una resolución adecuada para descargar.*', m, fake);
    }

    // Envía el video al chat
    await conn.sendMessage(m.chat, {
      video: { url: data.url }, // La URL del video a enviar
      caption: '📽️ *Tu video de Facebook está listo!*\n' + textbot,
      fileName: 'facebook_video.mp4', // Nombre de archivo sugerido
      mimetype: 'video/mp4',         // Tipo MIME para video
    }, { quoted: fkontak }); // Cita el mensaje fkontak para una mejor UI

    // Reacciona al mensaje del usuario con un emoji de "listo"
    await m.react(done);

  } catch (e) {
    console.error('[ERROR FB]', e); // Registra el error para depuración
    await m.react(error); // Reacciona con emoji de error
    return conn.reply(m.chat, '⚠️ *Error al procesar el video. Verifica el enlace o intenta de nuevo.*', m, fake);
  }
};

// Este handler se activará si el texto del mensaje coincide con una URL de Facebook
handler.customPrefix = /https?:\/\/(www\.)?(facebook\.com|fb.watch)\/[^\s]+/i;
handler.command = new RegExp(); // Esto desactiva efectivamente un nombre de comando específico; se basa en customPrefix
handler.register = true; // Esto probablemente significa que el handler debe registrarse en tu framework de bot

export default handler;
