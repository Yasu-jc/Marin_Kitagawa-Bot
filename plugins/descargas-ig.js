import { igdl } from 'ruhend-scraper'
import fetch from 'node-fetch'

const handler = async (m, { conn }) => {
  const regexIG = /(?:https?:\/\/)?(?:www\.)?(?:instagram\.com|instagr\.am)\/(?:p|reel|tv)\/[a-zA-Z0-9_\-]+/i
  const link = m.text?.trim()


  if (!regexIG.test(link)) return

  try {
    await m.react('🕒')


    await conn.reply(m.chat, `🕒 *Descargando video de Instagram...*`, m, {
      contextInfo: {
        externalAdReply: {
          mediaUrl: null,
          mediaType: 1,
          showAdAttribution: true,
          title: `${wm}`,
          body: `${etiqueta}`,
          previewType: 0,
          thumbnail: await (await fetch('https://i.postimg.cc/nzRKNjVR/catalogo.jpg')).buffer(),
          sourceUrl: 'https://instagram.com'
        }
      }
    })

    const res = await igdl(link)
    const data = res.data

    if (!data || data.length === 0) {
      await m.react('❌')
      return conn.reply(m.chat, '❌ No se encontraron resultados.', m)
    }

    for (let media of data) {
      await new Promise(resolve => setTimeout(resolve, 1500))
      await conn.sendFile(m.chat, media.url, 'instagram.mp4', '🎞️ *Aquí tienes tu video de Instagram.*', m)
    }

    await m.react('✅')

  } catch (e) {
    console.error(e)
    await m.react('⚠️')
    return conn.reply(m.chat, '⚠️ Ocurrió un error al descargar el video.', m)
  }
}

handler.customPrefix = /(?:https?:\/\/)?(?:www\.)?(?:instagram\.com|instagr\.am)\/(?:p|reel|tv)\/[a-zA-Z0-9_\-]+/i
handler.command = new RegExp() 
handler.register = true
handler.group = false 

export default handler