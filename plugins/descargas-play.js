import axios from 'axios';
import FormData from 'form-data';
import yts from 'yt-search';

let handler = async (m, { conn, args, text }) => {
  if (!args[0]) throw m.reply('Proporcione una consulta');

  let results = await yts(text);
  let tes = results.videos[0];
  if (!tes) return m.reply("No se encontraron resultados.");

  const mp3Result = await youtubeScraper.youtubeMp3(tes.url);

  if (mp3Result.success) {
    const { title, downloadUrl } = mp3Result.data;

    await conn.sendMessage(m.chat, {
      audio: { url: downloadUrl },
      mimetype: "audio/mp4",
      fileName: title,
      contextInfo: {
        externalAdReply: {
          title: title,
          body: wm,
          thumbnailUrl: tes.thumbnail.replace('hqdefault', 'mqdefault'), // Más liviano
          mediaType: 1,
          mediaUrl: tes.url,
          sourceUrl: tes.url,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

    const emojis = ['🎶', '🔥', '🎧', '✅', '💯', '😎', '🙌', '🆒'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

    await conn.sendMessage(m.chat, {
      react: {
        text: randomEmoji,
        key: m.key
      }
    });

  } else {
    console.error("Error:", mp3Result.error);
    m.reply("❌ Error al convertir el video a MP3.");
  }
};

handler.help = ['play3 <consulta>'];
handler.tags = ['downloader'];
handler.command = ["play3", "song3", "musica3"];

export default handler;



class Success {
  constructor(data) {
    this.success = true;
    this.data = data;
  }
}

class ErrorResponse {
  constructor(error) {
    this.success = false;
    this.error = error;
  }
}

const youtubeScraper = {
  youtubeMp3: async (url) => {
    try {
      if (!url || (!url.includes('youtube.com') && !url.includes('youtu.be'))) {
        return new ErrorResponse({ message: "URL YouTube no válida" });
      }

      const ds = new FormData();
      ds.append("url", url);

      const { data } = await axios.post(
        "https://www.youtubemp3.ltd/convert",
        ds,
        {
          headers: {
            ...ds.getHeaders(),
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          },
          timeout: 45000
        }
      );

      if (!data || !data.link) {
        return new ErrorResponse({ message: "No se pudo obtener el link de descarga" });
      }

      return new Success({
        title: data.filename || "Título desconocido",
        downloadUrl: data.link,
        type: "mp3"
      });

    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        return new ErrorResponse({ message: "Tiempo de espera agotado, intente de nuevo" });
      }

      return new ErrorResponse({
        message: error.response?.data?.message || error.message || "Error al convertir YouTube a MP3"
      });
    }
  },

  ytdl: async (url, quality = "720") => {
    try {
      if (!url || (!url.includes('youtube.com') && !url.includes('youtu.be'))) {
        return new ErrorResponse({ message: "URL YouTube no válida" });
      }

      const validQuality = {
        "480": 480,
        "1080": 1080,
        "720": 720,
        "360": 360,
        "audio": "mp3",
      };

      if (!Object.keys(validQuality).includes(quality)) {
        return new ErrorResponse({
          message: "Calidad no válida",
          availableQuality: Object.keys(validQuality)
        });
      }

      const qualitys = validQuality[quality];

      const { data: firstRequest } = await axios.get(
        `https://p.oceansaver.in/ajax/download.php?button=1&start=1&end=1&format=${qualitys}&iframe_source=https://allinonetools.com/&url=${encodeURIComponent(url)}`,
        {
          timeout: 30000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        }
      );

      if (!firstRequest || !firstRequest.progress_url) {
        return new ErrorResponse({ message: "No se pudo iniciar la descarga" });
      }

      const { progress_url } = firstRequest;
      let metadata = {
        image: firstRequest.info?.image || "",
        title: firstRequest.info?.title || "Título desconocido",
        downloadUrl: "",
        quality: quality,
        type: quality === "audio" ? "mp3" : "mp4"
      };

      let datas;
      let attempts = 0;
      const maxAttempts = 30;

      console.log("Procesando la descarga...");

      do {
        if (attempts >= maxAttempts) {
          return new ErrorResponse({ message: "Timeout: el proceso tomó demasiado tiempo" });
        }

        await new Promise(resolve => setTimeout(resolve, 2000)); 

        try {
          const { data } = await axios.get(progress_url, {
            timeout: 15000,
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
          });

          datas = data;

          if (datas?.progress >= 100 && datas?.download_url) {
            break;
          }

          console.log(`Progreso: ${datas.progress || 0}%`);

        } catch (pollError) {
          console.log(`Intento de polling ${attempts + 1} fallido, reintentando...`);
        }

        attempts++;
      } while (!datas?.download_url);

      if (!datas.download_url) {
        return new ErrorResponse({ message: "No se pudo obtener la URL de descarga" });
      }

      metadata.downloadUrl = datas.download_url;
      console.log("¡Descarga lista!");

      return new Success(metadata);

    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        return new ErrorResponse({ message: "Tiempo de espera agotado, intente de nuevo" });
      }

      return new ErrorResponse({
        message: error.response?.data?.message || error.message || "Error al descargar el video"
      });
    }
  },

  isValidYouTubeUrl: (url) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    return youtubeRegex.test(url);
  },

  extractVideoId: (url) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }
};












/*import fetch from "node-fetch";
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
            await new Promise(r => setTimeout(r, 200)); // Más rápido
        } catch (error) {
            throw error;
        }
    }
}

const ddownr = {
    download: async (url, format) => {
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

async function playAudio(conn, m, videoInfo) {
    const { title, thumbnail, url, author } = videoInfo;
    await m.react('🎧');

    await conn.sendMessage(m.chat, {
        text: `\`𖹭︩︪Descargando𖹭︩︪:\` ${title}\n> Espera un momento...`,
        contextInfo: {
            externalAdReply: {
                title: "🎵 Audio en progreso",
                body: `${author?.name || 'Desconocido'} - ${title}`,
                thumbnailUrl: thumbnail || icono,
                thumbnail: await (await fetch(thumbnail || icono)).buffer(),
                mediaType: 1,
                sourceUrl: url,
                renderLargerThumbnail: false
            }
        }
    }, { quoted: m });

    try {
        const result = await Promise.any(formatAudio.map(async (format) => {
            const api = await ddownr.download(url, format);
            if (!api?.downloadUrl) throw new Error(`Formato falló: ${format}`);
            return { ...api, format };
        }));

        await conn.sendMessage(m.chat, {
            audio: { url: result.downloadUrl },
            mimetype: "audio/mpeg",
            fileName: `${result.title || "audio"}.${result.format}`
        }, { quoted: m });
    } catch (e) {
        await conn.reply(m.chat, "❌ No se pudo descargar el audio en ningún formato.", m);
    }
}

async function play2Video(conn, m, videoInfo) {
    const { title, thumbnail, url, author } = videoInfo;
    await m.react('📥');

    await conn.sendMessage(m.chat, {
        text: `\`𖹭︩︪Descargando𖹭︩︪:\` ${title}`,
        contextInfo: {
            externalAdReply: {
                title: "🎥 Video en progreso",
                body: `${author?.name || 'Desconocido'} - ${title}`,
                thumbnailUrl: thumbnail || icono,
                thumbnail: await (await fetch(thumbnail || icono)).buffer(),
                mediaType: 1,
                sourceUrl: url,
                renderLargerThumbnail: false
            }
        }
    }, { quoted: m });

    const sources = [
        `https://api.siputzx.my.id/api/d/ytmp4?url=${url}`,
        `https://api.zenkey.my.id/api/download/ytmp4?apikey=zenkey&url=${url}`,
        `https://axeel.my.id/api/download/video?url=${encodeURIComponent(url)}`,
        `https://delirius-apiofc.vercel.app/download/ytmp4?url=${url}`
    ];

    const timeout = (ms) => new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), ms));

    try {
        const downloadUrl = await Promise.any(
            sources.map(source =>
                Promise.race([
                    fetch(source).then(res => res.json()),
                    timeout(5000)
                ]).then(data => {
                    const link = data?.data?.dl || data?.result?.download?.url || data?.downloads?.url || data?.data?.download?.url;
                    if (!link) throw new Error("Sin enlace");
                    return link;
                })
            )
        );

        await conn.sendMessage(m.chat, {
            video: { url: downloadUrl },
            fileName: `${title}.mp4`,
            mimetype: "video/mp4",
            caption: `🎬 ${title}\n> ${packname} | ${dev}`
        }, { quoted: m });
    } catch (e) {
        console.error("❌ Ninguna fuente de video respondió:", e.message);
        await conn.reply(m.chat, "❌ No se pudo obtener un enlace válido de descarga.", m);
    }
}

const handler = async (m, { conn, text, command, args }) => {
    if (!text) return conn.reply(m.chat, "❗ Ingresa el nombre o enlace de YouTube", m);
    const search = await yts(text.trim());
    if (!search.all.length) return conn.reply(m.chat, "❌ No se encontraron resultados.", m);
    const videoInfo = search.all[0];

    switch (command) {
        case "play":
        case "p":
        case "yta":
        case "ytmp3":
            return await playAudio(conn, m, videoInfo);

        case "play2":
        case "ytv":
        case "ytmp4":
            return await play2Video(conn, m, videoInfo);

        default:
            return;
    }
};

handler.before = async (m, { conn }) => {
    if (!m.text || m.isBaileys || m.fromMe) return false;
    const text = m.text.trim().toLowerCase();

    const directCommands = {
        "play": "play",
        "play2": "play2"
    };

    for (let key in directCommands) {
        if (text === key) {
            await handler(m, { conn, text: "", command: key, args: [] });
            return true;
        }
        if (text.startsWith(`${key} `)) {
            const q = text.slice(key.length).trim();
            await handler(m, { conn, text: q, command: key, args: [q] });
            return true;
        }
    }

    return false;
};

handler.command = handler.help = ["play", "play2", "p", "yta", "ytmp3", "ytv", "ytmp4"];
handler.tags = ["downloader"];
handler.register = true;
handler.limit = 1;

export default handler;*/
