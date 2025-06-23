import db from '../lib/database.js'
import fs from 'fs'
import PhoneNumber from 'awesome-phonenumber'
import { createHash } from 'crypto'  
import fetch from 'node-fetch'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i

let handler = async function (m, { conn, text, usedPrefix, command, args }) {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let mentionedJid = [who]
  let pp = await conn.profilePictureUrl(who, 'image').catch((_) => 'https://zero-two.info/uploads/images/file-1749594186448-972571381.jpg')
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)
  if (user.registered === true) return m.reply(`『✦』Ya estás registrado.\n\n*¿Quiere volver a registrarse?*\n\nUse este comando para eliminar su registro.\n*${usedPrefix}unreg*`)
  if (!Reg.test(text)) return m.reply(`『✦』Formato incorrecto.\n\nUso del comamdo: *${usedPrefix + command} nombre.edad*\nEjemplo : *${usedPrefix + command} ${name2}.18*`)
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) return m.reply(`『✦』El nombre no puede estar vacío.`)
  if (!age) return m.reply(`『✦』La edad no puede estar vacía.`)
  if (name.length >= 100) return m.reply(`『✦』El nombre es demasiado largo.`)
  age = parseInt(age)
  if (age > 1000) return m.reply(`『✦』Wow el abuelo quiere jugar al bot.`)
  if (age < 5) return m.reply(`『✦』hay un abuelo bebé jsjsj.`)
  user.name = name + '✓'.trim()
  user.age = age
  user.regTime = + new Date      
  user.registered = true
  global.db.data.users[m.sender].coin += 40
  global.db.data.users[m.sender].exp += 300
  global.db.data.users[m.sender].joincount += 20
  let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 20)
  let regbot =`
╭┈┈┈⋆┈┈⊰╯ ✩ ╰⊱┈┈⋆┈┈┈╮
'❥;;-; *𝑼𝒔𝒖𝒂𝒓𝒊𝒐 𝑹𝒆𝒈𝒊𝒔𝒕𝒓𝒂𝒅𝒐*
╰┈┈┈⋆┈┈⊰╮ ✩ ╭⊱┈┈⋆┈┈┈╯
> *˚ ༘♡ ⋆｡˚ nσmвrє* » ${name}
> *˚ ༘♡ ⋆｡˚ єdαd* » ${age} años
[ *recoмpenѕaѕ* ]Ժ╴ ╴ ╴ ╴ ╴  ╴ 
> ᦷᩘ•⛁ *˗ˏˋ${moneda}´ˎ˗* » 40                           
> ᦷᩘ•✰ *˗ˏˋExperiencia´ˎ˗* » 300
> ᦷᩘ•❖ *˗ˏˋTokens´ˎ˗* » 20
••••••••••••••••••••••••↺ :☆: ︿︿︿︿

> ${dev}`
  await m.react('📩')
  
  // Mensaje de registro
  await conn.sendMessage(m.chat, {
    text: regbot,
    contextInfo: {
      externalAdReply: {
        title: '୧⍤⃝ℰ⋆‿⋆ℰ 𝑼𝒔𝒖𝒂𝒓𝒊𝒐 𝑽𝒆𝒓𝒊𝒇𝒊𝒄𝒂𝒅𝒐 ❛░⃟ ⃟°˟',
        body: '✥ ׅ ֺ ֵ  ᡣᰍ ׄ ̸ׅ ˒˓ ֹ🄼🄰🅁🄸🄽-🄱🄾🅃—장ׅ✧',
        thumbnailUrl: pp,
        sourceUrl: typeof channel !== 'undefined' ? channel : '',
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m })

  // Botón para ver el perfil del usuario registrado (con JID completo)
  await conn.sendMessage(m.chat, {
    text: 'Presiona el botón para ver tu perfil.',
    buttons: [
      { buttonId: `.perfil ${m.sender}`, buttonText: { displayText: 'Ver perfil' }, type: 1 }
    ]
  }, { quoted: m })
} 

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'rg', 'register', 'registrar'] 

export default handler