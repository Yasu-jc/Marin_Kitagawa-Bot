/*import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;
  const fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net"}  
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg')
  let img = await (await fetch(`${pp}`)).buffer()
  let chat = global.db.data.chats[m.chat]
  let txt = 'ゲ◜៹ New Member ៹◞ゲ'
  let txt1 = 'ゲ◜៹ Bye Member ៹◞ゲ'
  let groupSize = participants.length
  if (m.messageStubType == 27) {
    groupSize++;
  } else if (m.messageStubType == 28 || m.messageStubType == 32) {
    groupSize--;
  }

  if (chat.welcome && m.messageStubType == 27) {
    let bienvenida = `❀ *Bienvenido* a ${groupMetadata.subject}\n✰ @${m.messageStubParameters[0].split`@`[0]}\n${global.welcom1}\n✦ Ahora somos ${groupSize} Miembros.\n•(=^●ω●^=)• Disfruta tu estadía en el grupo!\n> ✐ Puedes usar *#help* para ver la lista de comandos.`    
    await conn.sendMini(m.chat, txt, dev, bienvenida, img, img, redes, fkontak)
  }
  
  if (chat.welcome && (m.messageStubType == 28 || m.messageStubType == 32)) {
    let bye = `❀ *Adiós* de ${groupMetadata.subject}\n✰ @${m.messageStubParameters[0].split`@`[0]}\n${global.welcom2}\n✦ Ahora somos ${groupSize} Miembros.\n•(=^●ω●^=)• Te esperamos pronto!\n> ✐ Puedes usar *#help* para ver la lista de comandos.`
    await conn.sendMini(m.chat, txt1, dev, bye, img, img, redes, fkontak)
  }}*/
  
  
import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;

  // Frases sarcásticas aleatorias para bienvenida y despedida
  const welcomePhrases = [
    "¿Seguro que querías entrar aquí?",
    "Justo lo que necesitábamos... otro miembro.",
    "Prepárate, aquí no sobrevive cualquiera.",
    "Ojalá no seas como el anterior.",
    "¡Bienvenido! Ya veremos cuánto duras.",
    "No te ilusiones mucho, aquí nadie saluda.",
    "Aumentó el número, no la calidad.",
    "La paciencia es obligatoria, ¡bienvenido!",
    "Otro más a la colección.",
    "Esperamos que no te vayas pronto... o sí.",
    "¡Disfruta mientras dure!"
  ]
  const byePhrases = [
    "Jamás te quisimos aquí.",
    "Que lo atropelle un tren.",
    "No vuelvas nunca.",
    "Ya era hora que te fueras.",
    "La puerta está más feliz que tú.",
    "Se fue el que nadie extrañaba.",
    "Por fin, uno menos.",
    "Cuidado con la puerta en la salida.",
    "No te vayas a arrepentir.",
    "¡Al fin te fuiste!",
    "La fiesta empieza ahora que te vas.",
    "No dejes que la puerta te golpee al salir."
  ]

  const fkontak = { 
    key: { participants: "0@s.whatsapp.net", remoteJid: "status@broadcast", fromMe: false, id: "Halo" }, 
    message: { contactMessage: { vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` } }, 
    participant: "0@s.whatsapp.net"
  }  
  
  let stubJid = m.messageStubParameters[0] || ''
  let stubNumber = stubJid.split('@')[0]
  
  let pp
  try {
    pp = await conn.profilePictureUrl(stubJid, 'image')
  } catch {
    pp = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg'
  }
  let img
  try {
    img = await (await fetch(pp)).buffer()
  } catch {
    img = null
  }
  
  let chat = global.db.data.chats[m.chat]
  let groupSize = participants.length
  if (m.messageStubType == 27) groupSize++
  if (m.messageStubType == 28 || m.messageStubType == 32) groupSize--

  // Estilo diferente para bienvenida y despedida
  if (chat.welcome && m.messageStubType == 27) {
    const randomWelcome = welcomePhrases[Math.floor(Math.random() * welcomePhrases.length)]
    let bienvenida = 
`╔══════[ NUEVO INTEGRANTE ]══════╗
║ 📥 Usuario: @${stubNumber}
║ 🏷 Grupo: ${groupMetadata.subject}
║ 👥 Miembros ahora: ${groupSize}
║───────────────────────
║ 🗣: ${randomWelcome}
║
║ ${(global.welcom1 || '').trim()}
║───────────────────────
║ 💡 Usa *#help* para ver los comandos.
╚══════════════════════════════╝`
    await conn.sendMini(m.chat, "『 BIENVENID@ 』", global.dev || '', bienvenida, img, img, global.redes || '', fkontak)
  }

  if (chat.welcome && (m.messageStubType == 28 || m.messageStubType == 32)) {
    const randomBye = byePhrases[Math.floor(Math.random() * byePhrases.length)]
    let bye = 
`╭─────〔 ADIOSITO 〕─────╮
│ 🧍 Usuario: @${stubNumber}
│ 🏷 Grupo: ${groupMetadata.subject}
│ 👥 Ahora somos: ${groupSize} miembros 
│───────────────────
│ 💬 ${randomBye}
│
│ ${(global.welcom2 || '').trim()}
│───────────────────
│ 💡 Usa *#help* para ver los comandos.
╰───────────────────╯`
    await conn.sendMini(m.chat, "『 HASTA LUEGO 』", global.dev || '', bye, img, img, global.redes || '', fkontak)
  }
}