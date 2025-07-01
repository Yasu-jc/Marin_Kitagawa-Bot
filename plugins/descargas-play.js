import fetch from "node-fetch";
import yts from "yt-search";
import axios from "axios";


const botname = typeof globalThis.botname === "string" ? globalThis.botname : "Marin-Bot ✨";
const packname = typeof globalThis.packname === "string" ? globalThis.packname : "Marin-Bot";
const dev = typeof globalThis.dev === "string" ? globalThis.dev : "Dev";

const icono = typeof globalThis.icono === "string" ? globalThis.icono : "https://i.postimg.cc/NF8BtxYg/20250617-143039.jpg";

const formatAudio = ["mp3", "m4a", "webm", "aac", "flac", "opus", "ogg", "wav"];
const formatVideo = ["360", "480", "720", "1080", "1440", "4k"];

async function cekProgress(id) {
  const config = {
    method: "GET",
    url: `https://p.oceansaver.in/ajax/progress.php?id=${id}`,
    headers: { "User-Agent": "Mozilla/5.0" }
  };
  while (true) {
    try {
      const response = await axios.request(config);
      if (response.data?.success && response.data.progress === 1000) {
        return response.data.download_url;
      }
      await new Promise(r => setTimeout(r, 1000));
    } catch (error) {
      throw error;
    }
  }
}

const ddownr = {
  download: async (url, format) => {
    if (!formatAudio.includes(format) && !formatVideo.includes(format)) {
      throw new Error("⚠️ Formato no soportado");
    }
    const config = {
      method: "GET",
      url: `https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`,
      headers: { "User-Agent": "Mozilla/5.0" }
    };
    const response = await axios.request(config);
    if (response.data?.success) {
      const { id, title, info } = response.data;
      const downloadUrl = await cekProgress(id);
      return { id, title, image: info?.image, downloadUrl };
    } else {
      throw new Error("⛔ No se pudo obtener detalles del video");
    }
  }
};

async function formatViews(views) {
  if (views == null) return "Desconocido";
  if (typeof views === "string" && /^\d+$/.test(views)) views = Number(views);
  if (!Number.isFinite(views)) return "Desconocido";
  return views >= 1000
    ? (views / 1000).toFixed(1) + "k (" + views.toLocaleString() + ")"
    : String(views);
}

async function playAudio(conn, m, queryText) {
  const search = await yts(queryText);
  if (!search.all.length) return conn.reply(m.chat, "❌ No se encontraron resultados.", m);

  const videoInfo = search.all[0];
  const { title, thumbnail, timestamp, views, ago, url, author } = videoInfo;
  const vistas = await formatViews(views);

  const infoMessage = `
     *ִ𝆬 ⭒   .·:*¨¨*:·.♡.·:*¨¨*:·.   ·* 
*╭︵୨♡୧‿︵‿୨${botname}୧‿︵‿୨♡୧︵╮*
> ❥⊰⏤͟͟͞͞Título :⊱ ${title}
*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*
> ❥⊰⏤͟͟͞͞Duración :⊱ ${timestamp}
*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*
> ❥⊰⏤͟͟͞͞Vistas :⊱ ${vistas}
*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*
> ❥⊰⏤͟͟͞͞Canal :⊱ ${videoInfo.author.name || 'Desconocido'}
*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°* 
> ❥⊰⏤͟͟͞Publicado :⊱ ${ago}
*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*
> ❥⊰⏤͟͟͞͞Enlace :⊱ ${url}
*꒷ଓ︶꒷꒦⊹˚₊꒷︶ଓ︶︶ଓ︶꒷꒦⊹˚₊꒷︶ଓ꒷*`;

  await conn.sendMessage(m.chat, {
    text: infoMessage,
    footer: `${packname} | ${dev}`,
    headerType: 4,
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true,
        title: "Información del Video",
        body: title,
        thumbnailUrl: thumbnail || icono,
        mediaType: 1,
        renderLargerThumbnail: true,
        sourceUrl: url
      }
    }
  }, { quoted: m });

  const sentDownloadingMsg = await conn.reply(m.chat, `${emoji3} Descargando ${title}, espera un momento...`, m); // Usé un emoji diferente para audio

  try {
    const api = await ddownr.download(url, "mp3");
    const safeTitle = api.title || "audio";

    if (api.downloadUrl) {
      await conn.sendMessage(m.chat, {
        audio: { url: api.downloadUrl },
        mimetype: "audio/mpeg", 
        fileName: `${safeTitle}.mp3`, 
        contextInfo: {
          externalAdReply: {
            showAdAttribution: true,
            title: "🎵 Aquí tienes ≧◔◡◔≦",
            body: safeTitle,
            thumbnailUrl: thumbnail || icono,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: m });
    } else {
      await conn.reply(m.chat, "❌ No se pudo obtener la URL de descarga del audio.", m);
    }

    await conn.sendMessage(m.chat, { delete: sentDownloadingMsg.key });

  } catch (e) {
    await conn.reply(m.chat, "❌ Error al descargar el audio. Intenta con un enlace directo si persiste el problema.", m);
    console.error("Error al descargar o enviar el audio (comando play):", e);
  }
}

async function play2Video(conn, m, queryText) {
  const search = await yts(queryText);
  if (!search.all.length) return conn.reply(m.chat, "❌ No se encontraron resultados.", m);

  const videoInfo = search.all[0];
  const { title, thumbnail, timestamp, views, ago, url, author } = videoInfo;
  const vistas = await formatViews(views);

  const infoMessage = `
    *ִ𝆬 ⭒   .·:*¨¨*:·.♡.·:*¨¨*:·.   ·* 
*╭︵୨♡୧‿︵‿୨${botname}୧‿︵‿୨♡୧︵╮*
> ❥⊰⏤͟͟͞͞Título :⊱ ${title}
*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*
> ❥⊰⏤͟͟͞͞Duración :⊱ ${timestamp}
*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*
> ❥⊰⏤͟͟͞͞Vistas :⊱ ${vistas}
*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*
> ❥⊰⏤͟͟͞͞Canal :⊱ ${videoInfo.author.name || 'Desconocido'}
*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*
> ❥⊰⏤͟͟͞Publicado :⊱ ${ago}
*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*
> ❥⊰⏤͟͟͞͞Enlace :⊱ ${url}
*꒷ଓ︶꒷꒦⊹˚₊꒷︶ଓ︶︶ଓ︶꒷꒦⊹˚₊꒷︶ଓ꒷*`;

  await conn.sendMessage(m.chat, {
    text: infoMessage,
    footer: `${packname} | ${dev}`,
    headerType: 4,
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true,
        title: "Información del Video",
        body: title,
        thumbnailUrl: thumbnail || icono,
        mediaType: 1,
        renderLargerThumbnail: true,
        sourceUrl: url
      }
    }
  }, { quoted: m });

  const sentDownloadingMsg = await conn.reply(m.chat, "⏳ Buscando mejor enlace para video...", m);

  const sources = [
    `https://api.siputzx.my.id/api/d/ytmp4?url=${url}`,
    `https://api.zenkey.my.id/api/download/ytmp4?apikey=zenkey&url=${url}`,
    `https://axeel.my.id/api/download/video?url=${encodeURIComponent(url)}`,
    `https://delirius-apiofc.vercel.app/download/ytmp4?url=${url}`
  ];

  let sentVideo = false;

  for (const source of sources) {
    try {
      const res = await fetch(source);
      const dataRes = await res.json();

      const downloadUrl = dataRes?.data?.dl || dataRes?.result?.download?.url || dataRes?.downloads?.url || dataRes?.data?.download?.url;

      if (downloadUrl) {
        await conn.sendMessage(m.chat, {
          video: { url: downloadUrl },
          fileName: `${title}.mp4`,
          mimetype: "video/mp4",
          caption: `🎬 ${title}\n> ${packname} | ${dev}`
        }, { quoted: m });

        sentVideo = true;
        break;
      }
    } catch (e) {
      console.error(`Error en fuente ${source}:`, e.message);
    }
  }

  await conn.deleteMessage(m.chat, sentDownloadingMsg.key);

  if (!sentVideo) {
    await conn.reply(m.chat, "❌ No se pudo obtener un enlace válido de descarga.", m);
  }
}

const handler = async (m, { conn, text = "", command, args }) => {
  // Comandos con prefijo

  if (["play", "p"].includes(command)) {
    if (!text || !text.trim()) {
      return conn.reply(m.chat, `${emoji3} Ingresa el nombre o enlace de la música.`, m); // Cambié el emoji
    }
    await m.react('🎧');
    return await playAudio(conn, m, text.trim());
  }

  if (command === "play2") {
    if (!text || !text.trim()) {
      return conn.reply(m.chat, `🎬 Ingresa el nombre o enlace del video.`, m); // Cambié el emoji
    }
    await m.react('🎥');
    return await play2Video(conn, m, text.trim());
  }

  if (["yta", "ytmp3"].includes(command)) {
    const url = args[0];
    if (!url || !url.includes("youtu")) return conn.reply(m.chat, "❌ Enlace inválido de YouTube.", m);
    await m.react('🎶');
    const sentMsg = await conn.reply(m.chat, "🎵 Descargando audio, espera un momento...", m);

    try {
      const api = await ddownr.download(url, "mp3");
      const safeTitle = api.title || "audio";

      await conn.sendMessage(m.chat, {
        audio: { url: api.downloadUrl },
        mimetype: "audio/mpeg", // Mantener como audio/mpeg para guardar como MP3
        fileName: `${safeTitle}.mp3`, // Mantener el nombre del archivo
        ptt: true, // ¡Esta es la clave! Hace que se muestre como nota de voz
        contextInfo: {
          externalAdReply: {
            showAdAttribution: true,
            title: "🎵 Aquí tienes ≧◔◡◔≦",
            body: dev,
            thumbnailUrl: api.image || icono,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: m });

      await conn.sendMessage(m.chat, { delete: sentMsg.key });

    } catch (e) {
      await conn.reply(m.chat, "❌ Error al descargar el audio.", m);
      console.error(e);
    }
    return;
  }

  if (["ytv", "ytmp4"].includes(command)) {
    const url = args[0];
    if (!url || !url.includes("youtu")) return conn.reply(m.chat, "❌ Enlace inválido de YouTube.", m);
    await m.react('📥');
    const sentMsg = await conn.reply(m.chat, "⏳ Buscando mejor enlace para video...", m);

    const sources = [
      `https://api.siputzx.my.id/api/d/ytmp4?url=${url}`,
      `https://api.zenkey.my.id/api/download/ytmp4?apikey=zenkey&url=${url}`,
      `https://axeel.my.id/api/download/video?url=${encodeURIComponent(url)}`,
      `https://delirius-apiofc.vercel.app/download/ytmp4?url=${url}`
    ];

    let sentVideo = false;

    for (const source of sources) {
      try {
        const res = await fetch(source);
        const dataRes = await res.json();

        const downloadUrl = dataRes?.data?.dl || dataRes?.result?.download?.url || dataRes?.downloads?.url || dataRes?.data?.download?.url;

        if (downloadUrl) {
          await conn.sendMessage(m.chat, {
            video: { url: downloadUrl },
            fileName: `${url}.mp4`,
            mimetype: "video/mp4",
            caption: `🎬 Video descargado\n> ${packname} | ${dev}`
          }, { quoted: m });

          sentVideo = true;
          break;
        }
      } catch (e) {
        console.error(`Error en fuente ${source}:`, e.message);
      }
    }

    await conn.deleteMessage(m.chat, sentMsg.key);

    if (!sentVideo) return conn.reply(m.chat, "❌ No se pudo obtener un enlace válido de descarga.", m);
    return;
  }
};

// Este bloque se ejecuta antes de manejar comandos para capturar "play" sin prefijo y demás
handler.before = async (m, { conn }) => {
  if (!m.text || m.isBaileys || m.fromMe) return false;
  const text = m.text.trim().toLowerCase();

  if (text === "play") {
    // Solo "play" sin argumento
    await handler(m, { conn, text: "", command: "play", args: [] });
    return true;
  }

  if (text.startsWith("play ")) {
    const query = m.text.trim().slice(5).trim();
    await handler(m, { conn, text: query, command: "play", args: [query] });
    return true;
  }

  if (text === "play2") {
    await handler(m, { conn, text: "", command: "play2", args: [] });
    return true;
  }

  if (text.startsWith("play2 ")) {
    const query = m.text.trim().slice(6).trim();
    await handler(m, { conn, text: query, command: "play2", args: [query] });
    return true;
  }

  return false;
};

handler.command = handler.help = ["play", "play2", "p", "yta", "ytmp3", "ytv", "ytmp4"];
handler.tags = ["downloader"];
handler.register = true;
handler.limit = 1;

export default handler;
