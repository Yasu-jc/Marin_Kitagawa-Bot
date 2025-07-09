/*
import fetch from "node-fetch";
import yts from "yt-search";
import axios from "axios";

const formatAudio = ["mp3", "m4a", "webm", "acc", "flac", "opus", "ogg", "wav"];
const formatVideo = ["360", "480", "720", "1080", "1440", "4k"];

const ddownr = {
  download: async (url, format) => {
    if (!formatAudio.includes(format) && !formatVideo.includes(format)) {
      throw new Error("⚠️ Ese formato no es compatible.");
    }
    const config = {
      method: "GET",
      url: `https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`,
      headers: { "User-Agent": "Mozilla/5.0" }
    };
    try {
      const response = await axios.request(config);
      if (response.data?.success) {
        const { id, title, info } = response.data;
        const downloadUrl = await ddownr.cekProgress(id);
        return { id, title, image: info.image, downloadUrl };
      } else {
        throw new Error("⛔ Lo siento no pude encontrar los detalles del video.");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      throw error;
    }
  },
  cekProgress: async (id) => {
    const config = {
      method: "GET",
      url: `https://p.oceansaver.in/ajax/progress.php?id=${id}`,
      headers: { "User-Agent": "Mozilla/5.0" }
    };
    try {
      while (true) {
        const response = await axios.request(config);
        if (response.data?.success && response.data.progress === 1000) {
          return response.data.download_url;
        }
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    } catch (error) {
      console.error("❌ Error:", error);
      throw error;
    }
  }
};

// Emojis para reacciones aleatorias según el resultado
const emojiSuccess = ['⚡️', '🎶', '✔️', '✨', '😸', '✅', '🎧', '🥤', '🚀', '🎵'];
const emojiNoText = ['😅', '💡', '❓', '🤔', '😳', '🧐', '🙃', '😕'];
const emojiNotFound = ['😿', '😭', '🙀', '😞', '😕', '☹️', '😔', '😓'];
const emojiDownloadFail = ['❌', '⚠️', '🛑', '😵‍💫', '😬', '😖', '🥲'];
const emojiDownloadAudio = ['🎼', '🎤', '🎧', '🪗', '🎵', '🥁', '🦜'];
const emojiDownloadVideo = ['🎬', '📹', '🎥', '📼', '🖥️', '📺', '🕹️'];

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const handler = async (m, { conn, text, usedPrefix, command, args }) => {
  await m.react(pickRandom(emojiSuccess));
  if (!text.trim()) {
    await m.react(pickRandom(emojiNoText));
    return conn.reply(m.chat, `${pickRandom(emojiNoText)} Ingresa el nombre de la música a descargar ( ￣ー￣)`, m);
  }

  // Solo mostramos info y botones con 'play' o 'play2'
  const showInfo = ["play", "play2"].includes(command);

  let videoInfo, url, title, thumbnail, timestamp, views, ago, thumb;
  if (showInfo) {
    const search = await yts(text);
    if (!search.all.length) {
      await m.react(pickRandom(emojiNotFound));
      return m.reply(`${pickRandom(emojiNotFound)} Lo siento, no se encontró nada con ese nombre...`);
    }
    videoInfo = search.all[0];
    ({ title, thumbnail, timestamp, views, ago, url } = videoInfo);
    thumb = (await conn.getFile(thumbnail))?.data;
  } else {
    url = text.trim();
  }

  // Mensaje de información con imagen y botones SOLO la primera vez, SIN preview de enlace
  if (showInfo) {
    await m.react('🔍');
    const vistas = formatViews(views)
    const infoMessage = `
           *ִ𝆬 ⭒   .·:*¨¨*:·.♡.·:*¨¨*:·.   ·* 
*╭︵୨♡୧‿︵‿୨${typeof botname !== "undefined" ? botname : "Bot"}୧‿︵‿୨♡୧︵╮*
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

    const buttons = [
      { buttonId: `${usedPrefix}yta ${url}`, buttonText: { displayText: '🎵 Descargar MP3' }, type: 1 },
      { buttonId: `${usedPrefix}ytv ${url}`, buttonText: { displayText: '🎬 Descargar MP4' }, type: 1 },
    ];

    await conn.sendMessage(m.chat, {
      image: { url: thumbnail },
      caption: infoMessage,
      footer: `${typeof wm !== "undefined" ? wm : ""}\n${typeof etiqueta !== "undefined" ? etiqueta : ""}\nSelecciona una opción:`,
      buttons,
      headerType: 4
    }, { quoted: m });

    return;
  }

  // Si viene de botón, solo manda el archivo, sin imagen ni info de nuevo
  if (["yta", "ytmp3"].includes(command)) {
    await m.react(pickRandom(emojiDownloadAudio));
    try {
      const api = await ddownr.download(url, "mp3");
      return await conn.sendMessage(m.chat, {
        audio: { url: api.downloadUrl },
        mimetype: 'audio/mpeg',
        fileName: `${api.title || 'audio'}.mp3`,
        contextInfo: {
          externalAdReply: {
            showAdAttribution: true,
            title: typeof packname !== "undefined" ? packname : "Bot",
            body: typeof dev !== "undefined" ? dev : "Desarrollado por Josue 🧃",
            thumbnailUrl: api.image,
            mediaType: 1,
            renderLargerThumbnail: false,
          }
        }
      }, { quoted: m });
    } catch (e) {
      await m.react(pickRandom(emojiDownloadFail));
      return m.reply(`${pickRandom(emojiDownloadFail)} Ocurrió un error al descargar el audio.`);
    }
  }

  if (["ytv", "ytmp4"].includes(command)) {
    await m.react(pickRandom(emojiDownloadVideo));
    const sources = [
        `https://api.siputzx.my.id/api/d/ytmp4?url=${url}`,
        `https://api.zenkey.my.id/api/download/ytmp4?apikey=zenkey&url=${url}`,
        `https://axeel.my.id/api/download/video?url=${encodeURIComponent(url)}`,
        `https://delirius-apiofc.vercel.app/download/ytmp4?url=${url}`
    ];
    let success = false;
    let videoTitle = null;
    for (let source of sources) {
      try {
        const res = await fetch(source);
        const { data, result, downloads } = await res.json();
        let downloadUrl = data?.dl || result?.download?.url || downloads?.url || data?.download?.url;
        videoTitle = data?.title || result?.download?.title || downloads?.title || null;
        if (downloadUrl) {
          success = true;
          // Usar el título correcto (si lo trae la API) o el texto original
          await conn.sendMessage(m.chat, {
            video: { url: downloadUrl },
            fileName: `${videoTitle || 'video'}.mp4`,
            mimetype: "video/mp4",
            caption: videoTitle ? `🎬 ${videoTitle}` : `🎬 ${url}`,
            contextInfo: {
              externalAdReply: {
                showAdAttribution: true,
                title: typeof packname !== "undefined" ? packname : "Bot",
                body: typeof dev !== "undefined" ? dev : "Desarrollado por Josue 🧃",
                thumbnailUrl: null,
                mediaType: 1,
                renderLargerThumbnail: false
              }
            }
          }, { quoted: m });
          break;
        }
      } catch (e) {
        console.error(`⚠️ Error con la fuente ${source}:`, e.message);
      }
    }
    if (!success) {
      await m.react(pickRandom(emojiDownloadFail));
      return m.reply(`${pickRandom(emojiDownloadFail)} Lo siento, no se encontró un enlace válido para descargar.`);
    }
  }
};

handler.command = handler.help = ["play", "play2", "ytmp3", "yta", "ytmp4", "ytv"];
handler.tags = ["downloader"];

export default handler;

function formatViews(views) {
  if (typeof views !== "number" || isNaN(views)) return "Desconocido";
  return views >= 1000
    ? (views / 1000).toFixed(1) + "k (" + views.toLocaleString() + ")"
    : views.toString();*/
} 
