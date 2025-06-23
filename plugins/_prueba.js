import fetch from 'node-fetch'

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

export default handler