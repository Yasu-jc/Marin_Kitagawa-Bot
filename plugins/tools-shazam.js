import acrcloud from 'acrcloud'

const acr = new acrcloud({
   host: "identify-ap-southeast-1.acrcloud.com",
   access_key: "ee1b81b47cf98cd73a0072a761558ab1",
   access_secret: "ya9OPe8onFAnNkyf9xMTK8qRyMGmsghfuHrIMmUI"
})

let handler = async (m, { conn, usedPrefix, command }) => {
  // Emojis para mejor UX
  const emoji = '🎵';
  // Selecciona mensaje citado o el mensaje actual
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || q.mediaType || ''
  if (/video|audio/.test(mime)) {
    let buffer = await q.download()
    let res;
    try {
      res = await acr.identify(buffer)
    } catch (e) {
      return conn.reply(m.chat, `❌ Hubo un error al intentar identificar la música.`, m)
    }
    let { status, metadata } = res
    if (status.code !== 0) throw status.msg 
    let music = metadata.music?.[0]
    if (!music) return conn.reply(m.chat, '❌ No se pudo identificar la canción.', m)
    let { title, artists, album, genres, release_date } = music
    let txt = '╭─⬣「 *Whatmusic Tools* 」⬣\n'
    txt += `│  ≡◦ *🍭 Título ∙* ${title ?? 'Desconocido'}`
    txt += artists ? `\n│  ≡◦ *👤 Artista ∙* ${artists.map(v => v.name).join(', ')}` : ''
    txt += album ? `\n│  ≡◦ *📚 Álbum ∙* ${album.name}` : ''
    txt += genres ? `\n│  ≡◦ *🪴 Género ∙* ${genres.map(v => v.name).join(', ')}` : ''
    txt += `\n│  ≡◦ *🕜 Lanzamiento ∙* ${release_date ?? 'Desconocido'}`
    txt += `\n╰─⬣`
    conn.reply(m.chat, txt, m)
  } else {
    return conn.reply(
      m.chat,
      `${emoji} Etiqueta un audio o video corto con el comando *${usedPrefix + command}* para identificar la música.`,
      m
    )
  }
}
handler.help = ['whatmusic <audio/video>']
handler.tags = ['tools']
handler.command = ['shazam', 'whatmusic']
handler.register = true 
export default handler