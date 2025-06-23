import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let stiker = false
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    // Soporta segundos o duration en video
    let duration = (q.msg || q).seconds || (q.msg || q).duration || 0

    if (/webp|image|video/g.test(mime)) {
      if (/video/g.test(mime) && duration > 15) {
        return m.reply(`✧ ¡El video no puede durar más de 15 segundos!...`)
      }
      let img = await q.download?.()
      if (!img) {
        return conn.reply(m.chat, `❀ Por favor, envía una imagen o video para hacer un sticker.`, m)
      }
      let out
      try {
        // Personalización de pack y autor (si existe)
        let userId = m.sender
        let packstickers = global.db?.data?.users?.[userId] || {}
        let texto1 = packstickers.text1 || global.packsticker
        let texto2 = packstickers.text2 || global.packsticker2
        stiker = await sticker(img, false, texto1, texto2)
      } catch (e) {
        // Si falla el sticker directo, intenta convertir a URL
        if (/webp/g.test(mime)) out = await webp2png(img)
        else if (/image/g.test(mime)) out = await uploadImage(img)
        else if (/video/g.test(mime)) out = await uploadFile(img)
        if (typeof out !== 'string') out = await uploadImage(img)
        stiker = await sticker(false, out, global.packsticker, global.packsticker2)
      }
    } else if (args[0]) {
      // Si es URL, acepta webp/png/jpg/gif
      if (isUrl(args[0])) {
        stiker = await sticker(false, args[0], global.packsticker, global.packsticker2)
      } else {
        return m.reply(`⚠︎ El URL es incorrecto o no soporta imágenes.`)
      }
    }
  } catch (e) {
    // Log para debug
    console.error('[STICKER ERROR]', e)
  } finally {
    if (stiker) {
      // Envía el sticker solo si es válido (Buffer o string base64)
      try {
        await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
      } catch (e) {
        return conn.reply(m.chat, `❀ Ocurrió un error al enviar el sticker.`, m)
      }
    } else {
      return conn.reply(m.chat, `❀ Por favor, envía una imagen o video para hacer un sticker.`, m)
    }
  }
}

handler.help = ['stiker <img>', 'sticker <url>']
handler.tags = ['sticker']
handler.command = ['s', 'sticker', 'stiker']

export default handler

// Mejorado: acepta webp, png, jpg, jpeg, gif (no solo png/jpg/gif)
function isUrl(text) {
  return /^https?:\/\/[^\s]+?\.(webp|jpe?g|png|gif)$/i.test(text)
}