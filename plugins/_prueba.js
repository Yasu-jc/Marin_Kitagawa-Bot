import fetch from "node-fetch"
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
      throw new Error("⛔ Lo siento no pude encontrar los detalles del video...")
    }
  }
}

async function cekProgress(id) {
  const config = {
    method: "GET",
    url: `https://p.oceansaver.in/ajax/progress.php?id=${id}`,
    headers: { "User-Agent": "Mozilla/5.0" }
  }

  let attempts = 0
  while (true) {
    const response = await axios.request(config)
    if (response.data?.success && response.data.progress === 1000) {
      return response.data.download_url
    }
    

    const delay = attempts < 5 ? 100 : 500
    await new Promise(resolve => setTimeout(resolve, delay))
    attempts++
  }
}

const handler = async (m, { conn, text, usedPrefix, command }) => {
  await m.react('💫')

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
:･ﾟ✧:･.☽˚｡･ﾟ✧:･✯ ⋆ 
┊ ┊ ┊ ┊ ˚✩ ⋆｡˚ ✩
┊ ┊ ┊☆ Título: ${title}
┊ ┊☾ Duración: ${timestamp || "?"}
┊ִ ࣪ Vistas: ${vistas}
┊ִ ࣪ Publicado hace: ${ago}
┊ִ ࣪ Link: ${url}
┊ 
╰➜⋆｡ﾟ☁︎｡⋆｡ ﾟ☾ ﾟ｡⋆ ☾⋆｡ ༄ °✩
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
          renderLargerThumbnail: null
        }
      }
    }, { quoted: m })

    
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
              body: `${wm}`,
              thumbnailUrl: `https://i.postimg.cc/NF8BtxYg/20250617-143039.jpg`,
              thumbnail: thumb,
              mediaType: 1,
              sourceUrl: url,
              renderLargerThumbnail: true
            }
          }
        }, { quoted: m })
      } catch (err) {

        console.error("ddownr falló, intentando con otra API...", err)

        const backupSources = [
          `https://api.zenkey.my.id/api/download/ytmp3?apikey=zenkey&url=${url}`,
          `https://api.siputzx.my.id/api/d/ytmp3?url=${url}`
        ]

        try {
          const downloadUrl = await Promise.any(
            backupSources.map(source =>
              fetch(source).then(res => res.json()).then(data => {
                const link = data?.data?.dl || data?.result?.download?.url || data?.downloads?.url || data?.data?.download?.url
                if (!link) throw new Error("Sin enlace")
                return link
              })
            )
          )
          
          return await conn.sendMessage(m.chat, {
            audio: { url: downloadUrl },
            mimetype: 'audio/mpeg',
            fileName: `${title || "audio"}.mp3`,
            contextInfo: {
              externalAdReply: {
                title: `🎧 ¡ᴀǫᴜɪ ᴛɪᴇɴᴇs! ≧◔◡◔≦`,
                body: `${wm}`,
                thumbnailUrl: `https://i.postimg.cc/NF8BtxYg/20250617-143039.jpg`,
                thumbnail: thumb,
                mediaType: 1,
                sourceUrl: url,
                renderLargerThumbnail: true
              }
            }
          }, { quoted: m })
          
        } catch (backupError) {
          console.error("❌ Ninguna fuente de respaldo respondió:", backupError.message)
          return conn.reply(m.chat, "❌ Lo siento, no pude descargar el audio. Intenté con varias opciones y ninguna funcionó. 💔", m)
        }
      }
    }


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
}
