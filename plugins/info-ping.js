import speed from 'performance-now'
import { exec } from 'child_process'

let handler = async (m, { conn }) => {
  let timestamp = speed();
  let latensi = speed() - timestamp;


  let iconUrl = 'https://i.postimg.cc/JhdygXwr/fcc02548b2bfe98fdfc578fd8449944f.jpg'
  let previewTitle = `${wm}`
  let previewBody = 'Latencia del bot'
  let previewUrl = 'https://github.com/Yasu-jc/YasuBot-MD' 
  
  await conn.sendMessage(m.chat, {
    text: `🏓 *¡Pong!*\n> Tiempo ⴵ ${latensi.toFixed(4)} ms`,
    contextInfo: {
      externalAdReply: {
        showAdAttribution: false, 
        title: previewTitle,
        body: previewBody,
        mediaType: 1,
        thumbnailUrl: iconUrl,
       renderLargerThumbnail: false, 
        mediaUrl: previewUrl,
        sourceUrl: previewUrl,
        previewType: 'PHOTO'
      }
    }
  }, { quoted: m })
}

handler.help = ['ping']
handler.tags = ['info']
handler.command = ['ping', 'p']
handler.register = true

export default handler