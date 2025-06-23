// editado y optimizado por https://github.com/deylin-eliac & Copilot
/*
import fetch from "node-fetch";
import yts from "yt-search";
import axios from "axios";

// Variables globales por defecto (ajusta si ya están definidas en tu bot)
const botname = typeof globalThis.botname === "string" ? globalThis.botname : "Pikachu-Bot";
const packname = typeof globalThis.packname === "string" ? globalThis.packname : "Pikachu-Bot";
const dev = typeof globalThis.dev === "string" ? globalThis.dev : "Dev";
const icono = typeof globalThis.icono === "string" ? globalThis.icono : "";
const redes = typeof globalThis.redes === "string" ? globalThis.redes : "";

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
        return { id, title, image: info?.image, downloadUrl };
      } else {
        throw new Error("⛔ Lo siento no pudo encontrar los detalles del video.");
      }
    } catch (error) {
      console.error("❌ Error en ddownr.download:", error);
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
      console.error("❌ Error en ddownr.cekProgress:", error);
      throw error;
    }
  }
};

const handler = async (m, { conn, text, usedPrefix, command }) => {
  await m.react('⚡️');

  if (!text || !text.trim()) {
    return conn.reply(m.chat, `${emoji2} Ingresa el nombre de la música a descargar ξ◕◡◕ξ`, m);
  }

  try {
    const search = await yts(text);
    if (!search.all || !search.all.length) {
      return m.reply("Lo siento no encontró nada con ese nombre...");
    }

    const videoInfo = search.all[0] || {};
    const {
      title = "Desconocido",
      thumbnail = "",
      timestamp = "Desconocido",
      views = null,
      ago = "Desconocido",
      url = "",
      author = {}
    } = videoInfo;

    // Logs de depuración
    console.log({ title, thumbnail, timestamp, views, ago, url, command, videoInfo });

    if (!url || !title || !thumbnail || !timestamp) {
      return m.reply("❌ Error: Información incompleta del video. Intenta con otro título.");
    }

    const vistas = views != null ? formatViews(views) : "Desconocido";
    let thumb = null;
    try {
      thumb = (await conn.getFile(thumbnail))?.data || null;
    } catch (e) {
      console.error("No se pudo obtener el thumbnail:", e);
    }

    const infoMessage = ` 
         *ִ𝆬 ⭒   .·:*¨¨*:·.♡.·:*¨¨*:·.   ·* 
*╭︵‿୨♡୧‿︵‿୨${botname}୧‿︵‿୨♡୧‿︵╮*
> ❥⊰⏤͟͟͞͞Título :⊱ ${title}
┄ׅׄ─ׅׄ┄ׅׄ─ׂׅ┄ׅׄ─ׂׅ┄ׅׄ─ׅׄ┄ׅׄ─ׂׅ┄ׅׄ─ׂׅ┄
> ❥⊰⏤͟͟͞͞Duración :⊱ ${timestamp}
┄ׅׄ─ׅׄ┄ׅׄ─ׂׅ┄ׅׄ─ׂׅ┄ׅׄ─ׅׄ┄ׅׄ─ׂׅ┄ׅׄ─ׂׅ┄
> ❥⊰⏤͟͟͞͞Vistas :⊱ ${vistas}
┄ׅׄ─ׅׄ┄ׅׄ─ׂׅ┄ׅׄ─ׂׅ┄ׅׄ─ׅׄ┄ׅׄ─ׂׅ┄ׅׄ─ׂׅ┄
> ❥⊰⏤͟͟͞͞Canal :⊱ ${videoInfo.author.name || 'Desconocido'}
┄ׅׄ─ׅׄ┄ׅׄ─ׂׅ┄ׅׄ─ׂׅ┄ׅׄ─ׅׄ┄ׅׄ─ׂׅ┄ׅׄ─ׂׅ┄
> ❥⊰⏤͟͟͞Publicado :⊱ ${ago}
┄ׅׄ─ׅׄ┄ׅׄ─ׂׅ┄ׅׄ─ׂׅ┄ׅׄ─ׅׄ┄ׅׄ─ׂׅ┄ׅׄ─ׂׅ┄
> ❥⊰⏤͟͟͞͞Enlace :⊱ ${url}
*꒷︶ଓ︶꒷꒦⊹˚₊꒷︶ଓ︶︶ଓ︶꒷꒦⊹˚₊꒷︶ଓ︶꒷*`;

    const JT = {
      contextInfo: {
        externalAdReply: {
          title: wm,
          body: "♡ Espera un momento estoy buscando tu música",
          mediaType: 1,
          previewType: 0,
          mediaUrl: url,
          sourceUrl: url,
          thumbnail: thumb,
          renderLargerThumbnail: true
        }
      }
    };

    await m.react('🎧');
    await conn.reply(m.chat, infoMessage, m, JT);

    // Audio (play/yta/ytmp3)
    if (["play", "yta", "ytmp3"].includes(command)) {
      const api = await ddownr.download(url, "mp3");
      const safeTitle = (api.title && typeof api.title === "string") ? api.title : "audio";

      const doc = {
        audio: { url: api.downloadUrl },
        mimetype: 'audio/mpeg',
        fileName: `${safeTitle}.mp3`,
        contextInfo: {
          externalAdReply: {
            mediaType: 1,
            title: `${emoji3} Aquí tienes ≧◔◡◔≦`,
            body: dev,
          thumbnailUrl: `https://i.postimg.cc/t4LZ6fvC/20250617-143039.jpg`,
          thumbnailUrl: `https://i.postimg.cc/t4LZ6fvC/20250617-143039.jpg`,
          showAdAttribution: true,
          renderLargerThumbnail: true,
          }
        }
      };
      return await conn.sendMessage(m.chat, doc, { quoted: m });
    }

    // Video (play2/ytv/ytmp4)
    if (["play2", "ytv", "ytmp4"].includes(command)) {
      const sources = [
        `https://api.siputzx.my.id/api/d/ytmp4?url=${url}`,
        `https://api.zenkey.my.id/api/download/ytmp4?apikey=zenkey&url=${url}`,
        `https://axeel.my.id/api/download/video?url=${encodeURIComponent(url)}`,
        `https://delirius-apiofc.vercel.app/download/ytmp4?url=${url}`
      ];

      let success = false;
      for (let source of sources) {
        try {
          const res = await fetch(source);
          const dataRes = await res.json();
          const { data, result, downloads } = dataRes;
          let downloadUrl = data?.dl || result?.download?.url || downloads?.url || data?.download?.url;
          if (downloadUrl) {
            success = true;
            const safeTitle = (title && typeof title === "string") ? title : "video";
            await conn.sendMessage(m.chat, {
              video: { url: downloadUrl },
              fileName: `${safeTitle}.mp4`,
              mimetype: "video/mp4",
              caption: "🎬 Aquí tienes tu video, descargado por *Pikachu-Bot MD* ⚡",
              thumbnail: thumb,
              contextInfo: {
                externalAdReply: {
                  showAdAttribution: true,
                  title: packname,
                  body: dev,
                  mediaUrl: null,
                  description: null,
                  previewType: "PHOTO",
                  thumbnailUrl: icono,
                  sourceUrl: redes,
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
        return m.reply("❌ Lo sinergia no pudo encontrar un enlace válido para descargar.");
      }
    }
  } catch (error) {
    console.error("❌ Error general en handler:", error);
    return m.reply(`⚠️ Ocurrió un error: ${error.message}`);
  }
};

handler.command = handler.help = ["play", "play2", "ytmp3", "yta", "ytmp4", "ytv"];
handler.tags = ["downloader"];

export default handler;

function formatViews(views) {
  if (views == null || !Number.isFinite(views)) return "Desconocido";
  try {
    return views >= 1000
      ? (views / 1000).toFixed(1) + "k (" + views.toLocaleString() + ")"
      : String(views);
  } catch {
    return "Desconocido";
  }
} */