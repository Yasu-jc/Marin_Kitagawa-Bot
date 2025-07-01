import fs from 'fs/promises'
import path from 'path'
import { default as baileys, proto, generateWAMessageFromContent, prepareWAMessageMedia } from '@whiskeysockets/baileys'
import axios from 'axios'

const charactersFilePath = path.resolve('./src/database/characters.json')

let cachedCharacters = null

async function loadCharacters() {
  if (cachedCharacters) {
    return cachedCharacters
  }
  const json = await fs.readFile(charactersFilePath, 'utf-8')
  cachedCharacters = JSON.parse(json)
  return cachedCharacters
}

export function invalidateCharactersCache() {
  cachedCharacters = null
}

const handler = async (m, { conn, args }) => {
  try {

    await conn.reply(m.chat, '🩷 *Cargando harem...* por favor espera un momento.', m)


    const characters = await loadCharacters()

    let userId
    if (m.quoted?.sender) userId = m.quoted.sender
    else if (args[0]?.startsWith('@')) userId = args[0].replace('@', '') + '@s.whatsapp.net'
    else userId = m.sender

    const userChars = characters.filter(c => c.user === userId)
    const totalCharacters = userChars.length

    if (!totalCharacters) {
      throw new Error('❌ No tienes personajes reclamados.')
    }

    const pageSize = 10
    const requestedPage = parseInt(args[0]) || 1

    if (requestedPage <= 0) {
        throw new Error('❌ El número de página debe ser un valor positivo.')
    }

    const totalPages = Math.ceil(totalCharacters / pageSize)
    if (requestedPage > totalPages && totalCharacters > 0) {
        throw new Error(`❌ Solo hay ${totalPages} página(s) de personajes.`)
    }

    const startIndex = (requestedPage - 1) * pageSize
    const endIndex = startIndex + pageSize

    const displayChars = userChars.slice(startIndex, endIndex)

    if (!displayChars.length) {
        throw new Error('❌ No hay personajes para mostrar en esta página.')
    }

    const listedNames = userChars.map(c => `• ${c.name}`).join('\n').slice(0, 1500)
    const carruselHeader = `✿ *Personajes reclamados* ✿\n` +
                           `⌦ Usuario: @${userId.split('@')[0]}\n` +
                           `♡ Personajes: *(${totalCharacters})* ${totalCharacters > pageSize ? `(Pág. ${requestedPage}/${totalPages})` : ''}:\n\n` +
                           listedNames

    const cards = []
    const mediaResults = await Promise.allSettled(displayChars.map(async char => {
      const imgUrl = Array.isArray(char.img) ? char.img[0] : char.img
      if (!imgUrl) throw new Error('Sin imagen')

      const res = await axios.get(imgUrl, { responseType: 'arraybuffer' })
      const buffer = Buffer.from(res.data, 'binary')
      const media = await prepareWAMessageMedia({ image: buffer }, { upload: conn.waUploadToServer })

      return {
        name: char.name,
        value: char.value,
        media
      }
    }))

    for (let i = 0; i < mediaResults.length; i++) {
      const result = mediaResults[i]
      if (result.status === 'fulfilled') {
        const { name, value, media } = result.value
        cards.push({
          body: proto.Message.InteractiveMessage.Body.fromObject({ text: name }),
          footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: `⭐ Valor: ${value}` }),
          header: proto.Message.InteractiveMessage.Header.fromObject({
            hasMediaAttachment: true,
            title: name,
            imageMessage: media.imageMessage
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({ buttons: [] })
        })
      } else {
          console.warn(`[HAREM] Falló la descarga de imagen para un personaje: ${result.reason}`);
      }
    }

    if (!cards.length) throw new Error('🚩 No hay imágenes válidas para mostrar en esta página.')

    const message = generateWAMessageFromContent(
      m.chat,
      {
        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
          body: proto.Message.InteractiveMessage.Body.fromObject({ text: carruselHeader }),
          footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: '' }),
          header: proto.Message.InteractiveMessage.Header.fromObject({ hasMediaAttachment: false }),
          carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards })
        })
      },
      { quoted: m }
    )

    await conn.relayMessage(m.chat, message.message, { messageId: message.key.id })

  } catch (e) {
    console.error('[HAREM]', e)
    await conn.reply(m.chat, `❌ Error al cargar el harem:\n${e.message}`, m)
  }
}

handler.command = ['harem']
handler.tags = ['anime']
handler.help = ['harem [página]']
handler.group = true

export default handler
