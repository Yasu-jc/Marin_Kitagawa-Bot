import fetch from 'node-fetch';

const SEARCH_APIS = [
  { name: 'Servidor Masha', url: 'http://api.alyabot.xyz:3269/search_youtube?query=' },
  { name: 'Servidor Alya', url: 'http://api2.alyabot.xyz:3108/search_youtube?query=' },
  { name: 'Servidor Masachika', url: 'https://api3.alyabot.xyz/search_youtube?query=' }
];

const DOWNLOAD_APIS = [
  { name: 'Servidor Masha', url: 'http://api.alyabot.xyz:3269/download_audioV2?url=' },
  { name: 'Servidor Alya', url: 'http://api2.alyabot.xyz:3108/download_audioV2?url=' },
  { name: 'Servidor Masachika', url: 'https://api3.alyabot.xyz/download_audioV2?url=' }
];

// Utilidad para probar múltiples endpoints
async function tryFetchJSON(servers, query) {
  for (let server of servers) {
    try {
      const res = await fetch(server.url + encodeURIComponent(query));
      if (!res.ok) continue;
      const json = await res.json();
      if (json && Object.keys(json).length) return { json, serverName: server.name };
    } catch {
      continue;
    }
  }
  return { json: null, serverName: null };
}

const handler = async (m, { text, conn }) => {
  if (!text) {
    return m.reply('🔍 Ingresa el nombre de una canción o el link de un video.\n\nEjemplo: *.play Yamete kudasai*');
  }

  try {
    await m.react('🔎');

    const { json: searchJson, serverName: searchServer } = await tryFetchJSON(SEARCH_APIS, text);
    if (!searchJson?.results?.length) {
      return m.reply('⚠️ No se encontraron resultados. Intenta con otro título.');
    }

    const video = searchJson.results[0];
    const title = video.title;
    const url = video.url;
    const duration = Math.floor(video.duration);
    const views = video.views?.toLocaleString() || 'N/A';
    const channel = video.channel;
    const thumbnail = video.thumbnails.find(t => t.width === 720)?.url || video.thumbnails[0]?.url;

    const info = `
┏• ゜✧・゜・゜⌬ ${botname} ⌬・゜・゜✧°・┓
> ·˚ · ͟͟͞͞꒰➳ *Título:* ${title}
> ·˚ · ͟͟͞͞꒰➳ *Duración:* ${timestamp || "?"}
> ·˚ · ͟͟͞͞꒰➳ *Vistas:* ${vistas}
> ·˚ · ͟͟͞͞꒰➳ *Hace:* ${ago}
┗・゜✧・゜・゜⌬ ${vs} ⌬・゜・゜✧・┛
`

    await conn.sendMessage(m.chat, {
      image: { url: thumbnail },
      caption: info
    }, { quoted: m });

    await m.react('🎧');

    const { json: downloadJson } = await tryFetchJSON(DOWNLOAD_APIS, url);
    if (!downloadJson?.file_url) {
      return m.reply('❌ No se pudo descargar el audio. Intenta más tarde.');
    }

    return await conn.sendMessage(m.chat, {
      audio: { url: downloadJson.file_url },
      mimetype: 'audio/mp4',
      fileName: `${downloadJson.title || title}.mp3`,
      contextInfo: {
        externalAdReply: {
          title: '🎧 Tu canción está lista',
          body: `${global.packname || ''} | ${global.dev || ''}`,
          thumbnailUrl: thumbnail,
          mediaType: 1,
          sourceUrl: url,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

  } catch (e) {
    console.error('Error en handler AlyaBot:', e);
    return m.reply('❌ Hubo un error al procesar tu solicitud.');
  }
};

handler.command = ['play', 'ytmp3', 'playmp3'];
handler.help = ['play <canción o link>'];
handler.tags = ['downloader'];

export default handler;













/*import fetch from "node-fetch"
import yts from "yt-search"
import axios from "axios"

const formatAudioFast = ["m4a", "webm", "mp3"]
const formatVideo = ["360", "480", "720", "1080", "1440", "4k"]

const ddownr = {
  download: async (url, format) => {
    const config = {
      method: "GET",
      url: `https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`,
      headers: { "User-Agent": "Mozilla/5.0" }
    }

    const response = await axios.request(config)
    if (response.data?.success) {
      const { id, title, info } = response.data
      const downloadUrl = await cekProgress(id)
      return { id, title, image: info?.image, downloadUrl }
    } else {
      throw new Error("⛔ Hinata no pudo encontrar los detalles del video...")
    }
  }
}

async function cekProgress(id) {
  const config = {
    method: "GET",
    url: `https://p.oceansaver.in/ajax/progress.php?id=${id}`,
    headers: { "User-Agent": "Mozilla/5.0" }
  }

  while (true) {
    const response = await axios.request(config)
    if (response.data?.success && response.data.progress === 1000) {
      return response.data.download_url
    }
    await new Promise(resolve => setTimeout(resolve, 500)) // menos espera que antes
  }
}

const handler = async (m, { conn, text, usedPrefix, command }) => {
  await m.react('⚡️')

  if (!text.trim()) {
    return conn.reply(m.chat,  `Escribe el nombre de la canción que estas buscando o envia un link de YouTube. ξ◕◡◕ξ`, m);
  }

  try {
    const search = await yts(text)
    if (!search.all.length) {
      return m.reply(`Lo siento no pude encontrar nada con ese nombre... ¿seguro que lo escribiste bien? 💭`)
    }

    const videoInfo = search.all[0]
    const { title, thumbnail, timestamp, views, ago, url } = videoInfo
    const vistas = formatViews(views)
    const thumb = (await conn.getFile(thumbnail))?.data

    const type = ["play2", "ytv", "ytmp4"].includes(command) ? "video" : "audio"
    const waitMsg = `> _Descargando tu ${type}... por favor espera un momento._`

    const infoMessage = `
┏• ゜✧・゜・゜⌬ ${botname} ⌬・゜・゜✧°・┓
> ·˚ · ͟͟͞͞꒰➳ *Título:* ${title}
> ·˚ · ͟͟͞͞꒰➳ *Duración:* ${timestamp || "?"}
> ·˚ · ͟͟͞͞꒰➳ *Vistas:* ${vistas}
> ·˚ · ͟͟͞͞꒰➳ *Hace:* ${ago}
┗・゜✧・゜・゜⌬ ${vs} ⌬・゜・゜✧・┛
${waitMsg}
`

    await conn.sendMessage(m.chat, {
      text: infoMessage,
      contextInfo: {
        externalAdReply: {
          title: "🔎 Resultado",
          body: `${wm}`,
          thumbnailUrl: thumbnail,
          thumbnail: thumb,
          mediaType: 1,
          sourceUrl: url,
          renderLargerThumbnail: false
        }
      }
    }, { quoted: m })

    // ✅ AUDIO optimizado
    if (type === "audio") {
      try {
        const result = await Promise.any(
          formatAudioFast.map(format =>
            ddownr.download(url, format).then(api => {
              if (!api?.downloadUrl) throw new Error(`Formato falló: ${format}`)
              return { ...api, format }
            })
          )
        )

        return await conn.sendMessage(m.chat, {
          audio: { url: result.downloadUrl },
          mimetype: 'audio/mpeg',
          fileName: `${result.title || "audio"}.${result.format}`,
          contextInfo: {
            externalAdReply: {
              title: `🎧 ¡ᴀǫᴜɪ ᴛɪᴇɴᴇs! ≧◔◡◔≦`,
              body: `${packname} | ${dev}`,
              thumbnailUrl: `https://i.postimg.cc/NF8BtxYg/20250617-143039.jpg`,
              thumbnail: thumb,
              mediaType: 1,
              sourceUrl: url,
              renderLargerThumbnail: true
            }
          }
        }, { quoted: m })
      } catch (err) {
        return conn.reply(m.chat, "❌ Hinata no pudo descargar el audio en ningún formato rápido disponible...", m)
      }
    }

    // 🎥 VIDEO optimizado
    if (type === "video") {
      const sources = [
        `https://api.zenkey.my.id/api/download/ytmp4?apikey=zenkey&url=${url}`,
        `https://api.siputzx.my.id/api/d/ytmp4?url=${url}`,
        `https://axeel.my.id/api/download/video?url=${encodeURIComponent(url)}`,
        `https://delirius-apiofc.vercel.app/download/ytmp4?url=${url}`
      ]

      const timeout = (ms) => new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), ms))

      try {
        const downloadUrl = await Promise.any(
          sources.map(source =>
            Promise.race([
              fetch(source).then(res => res.json()),
              timeout(5000)
            ]).then(data => {
              const link = data?.data?.dl || data?.result?.download?.url || data?.downloads?.url || data?.data?.download?.url
              if (!link) throw new Error("Sin enlace")
              return link
            })
          )
        )

        return await conn.sendMessage(m.chat, {
          video: { url: downloadUrl },
          fileName: `${title}.mp4`,
          mimetype: "video/mp4",
          caption: `${title}`,
          thumbnail: thumb,
          contextInfo: {
            externalAdReply: {
              title: " ✨",
              body: "Disfruta tu video",
              thumbnailUrl: `https://i.postimg.cc/NF8BtxYg/20250617-143039.jpg`,
              sourceUrl: url,
              mediaType: 1,
              renderLargerThumbnail: false
            }
          }
        }, { quoted: m })

      } catch (e) {
        console.error("❌ Ninguna fuente respondió:", e.message)
        return m.reply("❌ Lo siento no pude encontrar un enlace válido para descargar tu video... intenta con otro título 💔")
      }
    }

  } catch (error) {
    console.error("❌ Error:", error)
    return m.reply(`⚠️ Error: ${error.message}`)
  }
}

handler.command = handler.help = ["play", "play2", "ytmp3", "yta", "ytmp4", "ytv"]
handler.tags = ["downloader"]
handler.register = true

export default handler



handler.before = async (m, { conn }) => {
  if (!m.text || m.isBaileys || m.fromMe) return false;
  const text = m.text.trim().toLowerCase();

  const directCommands = {
    "play": "play",
    "play2": "play2"
  };

  for (let key in directCommands) {
    if (text === key || text.startsWith(`${key} `)) {
      const q = text.slice(key.length).trim();
      await handler(m, { conn, text: q, command: key, args: [q] });
      return true;
    }
  }

  return false;
};




function formatViews(views) {
  if (typeof views !== "number" || isNaN(views)) return "Desconocido"
  const abs = Math.abs(views)
  let short = ""

  if (abs >= 1e12) short = (views / 1e12).toFixed(1) + 'T'
  else if (abs >= 1e9) short = (views / 1e9).toFixed(1) + 'B'
  else if (abs >= 1e6) short = (views / 1e6).toFixed(1) + 'M'
  else if (abs >= 1e3) short = (views / 1e3).toFixed(1) + 'k'
  else short = views.toString()

  const full = views.toLocaleString("es-ES")
  return `${short} (${full})`
}*/













/*import fetch from 'node-fetch'

let handler = async (m, { conn, text, quoted }) => {
  if (!text.includes('|') && !quoted?.isImage) {
    return m.reply(`Uso correcto:\n.enlace <url> | <título> | <descripción> | <url imagen>\n\nO responde a una imagen y usa:\n.enlace <url> | <título> | <descripción>`)
  }

  let url, title, body, thumbnail

  if (quoted?.isImage && text.includes('|')) {
    [url, title, body] = text.split('|').map(v => v.trim())
    if (!url || !title || !body) return m.reply('Faltan datos. Usa: <url> | <título> | <descripción>')

    try {
      thumbnail = await quoted.download()
    } catch (e) {
      return m.reply('No se pudo descargar la imagen respondida.')
    }

  } else {
    let [u, t, b, thumbUrl] = text.split('|').map(v => v.trim())
    if (!u || !t || !b || !thumbUrl) return m.reply('Faltan datos. Usa: <url> | <título> | <descripción> | <url imagen>')
    url = u
    title = t
    body = b

    try {
      const res = await fetch(thumbUrl)
      if (!res.ok) throw 'No se pudo descargar la imagen'
      thumbnail = await res.buffer()
    } catch (e) {
      return m.reply('Error al descargar la imagen desde el enlace.')
    }
  }

  const doc = {
    text: '',
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true,
        mediaType: 1,
        title: title,
        body: body,
        mediaUrl: url,
        sourceUrl: url,
        thumbnail: thumbnail,
        renderLargerThumbnail: true,
      }
    }
  }

  await conn.sendMessage(m.chat, doc, { quoted: m })
}

handler.help = ['th']
handler.tags = ['tools']
handler.command = ['th']

export default handler*/
