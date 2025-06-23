/* Código hecho por @Fabri115 y mejorado por BrunoSobrino — Optimizado por ChatGPT */

import { promises as fs, existsSync } from 'fs'
import path from 'path'

const handler = async (m, { conn }) => {
  try {
    // Verifica si el comando se está usando desde el número principal
    if (global.conn.user.jid !== conn.user.jid) {
      return conn.reply(m.chat, `${emoji} Utiliza este comando directamente desde el número principal del Bot.`, m)
    }

    const sessionPath = './sessions/' // Corrige aquí si tu carpeta tiene otro nombre
    if (!existsSync(sessionPath)) {
      return conn.reply(m.chat, `${emoji} La carpeta de sesiones no existe o ya está vacía.`, m)
    }

    await conn.reply(m.chat, `${emoji2} Iniciando eliminación de archivos de sesión (excepto creds.json)...`, m)
    m.react(rwait)

    const files = await fs.readdir(sessionPath)
    const filesToDelete = files.filter(file => file !== 'creds.json')

    if (filesToDelete.length === 0) {
      return conn.reply(m.chat, `${emoji2} Solo existe el archivo creds.json. No hay otros archivos por eliminar.`, m)
    }

    // Eliminar archivos
    await Promise.all(
      filesToDelete.map(file => fs.unlink(path.join(sessionPath, file)))
    )

    m.react(done)
    await conn.reply(m.chat, `${emoji} Se eliminaron ${filesToDelete.length} archivos de sesión (excepto creds.json).`, m)
    await conn.reply(m.chat, `${emoji} *¡Hola! ¿logras verme?*`, m)

  } catch (err) {
    console.error('❌ Error al eliminar los archivos de sesión:', err)
    await conn.reply(m.chat, `${msm} Ocurrió un error durante el proceso.`, m)
  }
}

handler.help = ['dsowner']
handler.tags = ['owner']
handler.command = ['delai', 'dsowner', 'clearallsession']
handler.rowner = true

export default handler