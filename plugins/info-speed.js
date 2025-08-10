import { totalmem, freemem } from 'os'
import os from 'os'
import util from 'util'
import osu from 'node-os-utils'
import { performance } from 'perf_hooks'
import { sizeFormatter } from 'human-readable'
import speed from 'performance-now'
import { spawn, exec, execSync } from 'child_process'
const format = sizeFormatter({ std: 'JEDEC', decimalPlaces: 2, keepTrailingZeroes: false, render: (literal, symbol) => `${literal} ${symbol}B` })

var handler = async (m, { conn }) => {

let timestamp = speed()
let latensi = speed() - timestamp

let _muptime = process.uptime() * 1000
let muptime = clockString(_muptime)

let chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
let groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce).map(v => v[0])


let texto = `
‿︵‿︵ʚ˚̣̣̣͙ɞ・🪁・ʚ˚̣̣̣͙ɞ‿︵‿︵

s̶y̶s̶t̶e̶m̶ ̶s̶t̶a̶t̶u̶s̶
➜ \`🚀 ꒦꒷velocidad: ${latensi.toFixed(4)} ms\`
➜ \`🕒 ꒦꒷activo por: ${muptime}\`
➜ \`💌 ꒦꒷chats privados: ${chats.length}\`
➜ \`🎀 ꒦꒷grupos: ${groups.length}\`
➜ \`💻 ꒦꒷ram usada: ${format(totalmem() - freemem())} / ${format(totalmem())}\`

»»————-　♡　————-«

🧸 ꒰ ${packname} ꒱
`.trim()

m.react('✈️')

let imageUrl = 'https://i.postimg.cc/fTDTKV8x/e0287dbbd83754e62df09d0823a28447.jpg' 

conn.reply(m.chat, texto, m, {
  contextInfo: {
    externalAdReply: {
      title: '🌟 Estado del Bot',
      body: '¡Mira el rendimiento actual del bot!',
      thumbnailUrl: imageUrl,
      sourceUrl: '', 
      mediaType: 1, 
      renderLargerThumbnail: null
    }
  }
})

}
handler.help = ['speed']
handler.tags = ['info']
handler.command = ['speed']
handler.register = true

export default handler

function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}
