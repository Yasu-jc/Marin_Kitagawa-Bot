import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;

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



  let chat = global.db.data.chats[m.chat]
  let groupSize = participants.length
  if (m.messageStubType == 27) groupSize++
  if (m.messageStubType == 28 || m.messageStubType == 32) groupSize--


  if (chat.welcome && m.messageStubType == 27) {
  const randomWelcome = welcomePhrases[Math.floor(Math.random() * welcomePhrases.length)]
  let bienvenida =`
╭┈──̇─̇─̇────̇─̇─̇──◯◝
┊「 *(⊃･ᴗ･)⊃* \`𖹭︩︪ᴡᴇʟᴄᴏᴍᴇ𖹭︩︪\` 」
┊︶︶︶︶︶︶︶︶︶︶︶
┊  _¡Hola!_ @${stubNumber}!
┊  ⇝ Bienvenido a:
┊  ↝ ${groupMetadata.subject}
┊┈─────̇─̇─̇─────◯◝ 
┊➤ "${randomWelcome}"
┊➤ Ahora Somos ${groupSize} miembros.
┊➤ ${(global.welcom1 || '').trim()}
┊ ︿︿︿︿︿︿︿︿︿︿︿
╰─────────────────╯
> Usa *#help* para ver los comandos`


    await conn.sendMessage(m.chat, {
      text: bienvenida,
      contextInfo: {
        mentionedJid: [stubJid], 
        externalAdReply: {
          title: "BIENVENID@",
          body: `Disfruta tu estadía en el grupo`, 
          thumbnailUrl: pp, 
          renderLargerThumbnail: false, // 
          mediaType: 1, 
          sourceUrl: global.redes || 'https://github.com/The-King-Destroy/Adiciones' 
        }
      }
    });

  }

  if (chat.welcome && (m.messageStubType == 28 || m.messageStubType == 32)) {
    const randomBye = byePhrases[Math.floor(Math.random() * byePhrases.length)]
    let bye =`
╭┈──̇─̇─̇────̇─̇─̇──◯◝
┊「 *(⊃･ᴗ･)⊃* \`𖹭︩︪Bye𖹭︩︪\` 」
┊︶︶︶︶︶︶︶︶︶︶︶
┊  _¡Adios!_ @${stubNumber}!
┊┈─────̇─̇─̇─────◯◝ 
┊➤ "${randomBye}"
┊➤ Ahora Somos ${groupSize} miembros.
┊➤ ${(global.welcom1 || '').trim()}
┊ ︿︿︿︿︿︿︿︿︿︿︿
╰─────────────────╯  
> Usa *#help* para ver los comandos.`


    await conn.sendMessage(m.chat, {
      text: bye,
      contextInfo: {
        mentionedJid: [stubJid], 
        externalAdReply: {
          title: "HASTA LUEGO",
          body: `Se salió del grupo por gay`, 
          thumbnailUrl: pp, 
          renderLargerThumbnail: false, 
          mediaType: 1, 
          sourceUrl: global.redes || 'https://github.com/The-King-Destroy/Adiciones' 
        }
      }
    });

  }
}
