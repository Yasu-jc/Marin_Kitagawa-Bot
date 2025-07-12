import ws from 'ws'
import db from '../lib/database.js'
import { cpus as _cpus, totalmem, freemem, platform, hostname } from 'os'
import speed from 'performance-now'
import { sizeFormatter } from 'human-readable'

let format = sizeFormatter({
  std: 'JEDEC',
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
})

let handler = async (m, { conn, usedPrefix }) => {
  let bot = global.db.data.settings[conn.user.jid]
  let _uptime = process.uptime() * 1000
  let uptime = (_uptime).toTimeString()
  let totalreg = Object.keys(global.db.data.users).length
  let totalbots = Object.keys(global.db.data.settings).length
  let totalStats = Object.values(global.db.data.stats).reduce((total, stat) => total + stat.total, 0)
  const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
  let totalchats = Object.keys(global.db.data.chats).length
  let totalf = Object.values(global.plugins).filter((v) => v.help && v.tags).length
  const groupsIn = chats.filter(([id]) => id.endsWith('@g.us'))
  const used = process.memoryUsage()
  const cpus = _cpus().map(cpu => {
    cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
    return cpu
  })
  const cpu = cpus.reduce((last, cpu, _, { length }) => {
    last.total += cpu.total
    last.speed += cpu.speed / length
    last.times.user += cpu.times.user
    last.times.nice += cpu.times.nice
    last.times.sys += cpu.times.sys
    last.times.idle += cpu.times.idle
    last.times.irq += cpu.times.irq
    return last
  }, {
    speed: 0,
    total: 0,
    times: { user: 0, nice: 0, sys: 0, idle: 0, irq: 0 }
  })
  let _muptime
  if (process.send) {
    process.send('uptime')
    _muptime = await new Promise(resolve => {
      process.once('message', resolve)
      setTimeout(resolve, 1000)
    }) * 1000
  }
  let timestamp = speed()
  let latensi = speed() - timestamp

  // Personaliza aquí tu banner, título, descripción y link
  let imageBonner = 'https://telegra.ph/file/8c3a5d6b25bbfdbdf7c37.jpg' // URL de tu banner o bonner
  let previewTitle = '↷✦╎Info - Bot╎♡˖ ⸙'
  let previewBody = 'Bot de WhatsApp | Info completa'
  let previewDesc = 'Tu bot de confianza - Estado y estadísticas'
  let previewUrl = 'https://github.com/Yasu-jc' // O el link que quieras que lleve el preview

  let goku = `╭─⬣「 *Info De ${botname}* 」⬣
│ 👑 *Creador* : @${owner[0][0].split('@s.whatsapp.net')[0]}
│ 🍭 *Prefijo* : [  ${usedPrefix}  ]
│ 📦 *Total Plugins* : ${totalf}
│ 💫 *Plataforma* : ${platform()}
│ 🧿 *Servidor* : ${hostname()}
│ 🚀 *RAM* : ${format(totalmem() - freemem())} / ${format(totalmem())}
│ 🌟 *FreeRAM* : ${format(freemem())}
│ ✨️ *Speed* : ${latensi.toFixed(4)} ms
│ 🕗 *Uptime* : ${uptime}
│ 🍟 *Modo* : ${bot.public ? 'Privado' : 'Privado'}
│ 🚩 *Comandos Ejecutados* : ${toNum(totalStats)} ( *${totalStats}* )
│ 🐢 *Grupos Registrados* : ${toNum(totalchats)} ( *${totalchats}* )
│ 🍧 *Registrados* : ${toNum(totalreg)} ( *${totalreg}* ) Usuarios
╰─⬣

╭─⬣「 *Chats De ${botname}* 」⬣
│ 🧃 *${groupsIn.length}* Chats en Grupos
│ 🌸 *${groupsIn.length}* Grupos Unidos
│ 🍁 *${groupsIn.length - groupsIn.length}* Grupos Salidos
│ 💬 *${chats.length - groupsIn.length}* Chats Privados
│ 💭 *${chats.length}* Chats Totales
╰─⬣

╭─⬣「 *NodeJS Uso de memoria* 」⬣
${'```' + Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v => v.length)), ' ')}: ${format(used[key])}`).join('\n') + '```'}
╰─⬣`

  await conn.sendMessage(m.chat, {
    text: goku,
    contextInfo: {
      mentionedJid: [owner[0][0] + '@s.whatsapp.net'],
      externalAdReply: {
        title: previewTitle,
        body: previewBody,
        description: previewDesc,
        mediaType: 1,
        thumbnailUrl: banner,
        renderLargerThumbnail: true,
        mediaUrl: previewUrl,
        sourceUrl: previewUrl,
        previewType: 'PHOTO'
      }
    }
  }, { quoted: m })
}

handler.help = ['infobot']
handler.tags = ['info']
handler.command = ['info', 'infobot']

export default handler

function toNum(number) {
  if (number >= 1000 && number < 1000000) {
    return (number / 1000).toFixed(1) + 'k'
  } else if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M'
  } else if (number <= -1000 && number > -1000000) {
    return (number / 1000).toFixed(1) + 'k'
  } else if (number <= -1000000) {
    return (number / 1000000).toFixed(1) + 'M'
  } else {
    return number.toString()
  }
}
