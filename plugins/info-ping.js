/*

import speed from 'performance-now'
import { spawn, exec, execSync } from 'child_process'

let handler = async (m, { conn }) => {
         let timestamp = speed();
         let latensi = speed() - timestamp;
         exec(`neofetch --stdout`, (error, stdout, stderr) => {
          let child = stdout.toString("utf-8");
          let ssd = child.replace(/Memory:/, "Ram:");

          conn.reply(m.chat, `✰ *¡Pong!*\n> Tiempo ⴵ ${latensi.toFixed(4)}ms`, m);
            });
}
handler.help = ['ping']
handler.tags = ['info']
handler.command = ['ping', 'p']
handler.register = true

export default handler
*/

import speed from 'performance-now'
import { exec } from 'child_process'

let handler = async (m, { conn }) => {
  let timestamp = speed();
  let latensi = speed() - timestamp;

  // Personaliza aquí tu icono y detalles
  let iconUrl = 'https://i.postimg.cc/JhdygXwr/fcc02548b2bfe98fdfc578fd8449944f.jpg'
  let previewTitle = `${wm}`
  let previewBody = 'Latencia del bot'
  let previewUrl = 'https://github.com/Yasu-jc/YasuBot-MD' // Si quieres que sea clickeable

  await conn.sendMessage(m.chat, {
    text: `🏓 *¡Pong!*\n> Tiempo ⴵ ${latensi.toFixed(4)} ms`,
    contextInfo: {
      externalAdReply: {
        showAdAttribution: false, // true para mostrar "Ad" pequeño (opcional)
        title: previewTitle,
        body: previewBody,
        mediaType: 1,
        thumbnailUrl: iconUrl,
        renderLargerThumbnail: false, // true si quieres que el icono salga más grande
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