import { sticker } from '../lib/sticker.js'
import fetch from 'node-fetch'
import axios from 'axios'

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
    // Mejor UX: Responder con emoji para confirmar acción
    await m.react('🖍️')

    // Permite texto en argumento o citado
    if (!text) {
        if (m.quoted && m.quoted.text) {
            text = m.quoted.text
        } else {
            return m.reply(`❀ Por favor, ingresa un texto para generar tu sticker.\nEjemplo: *${usedPrefix + command} Hola mundo*`)
        }
    }

    // Limita la longitud del texto para evitar errores en la API
    if (text.length > 200) {
        return m.reply('❌ El texto es demasiado largo, por favor usa menos de 200 caracteres.')
    }

    let teks = encodeURIComponent(text)
    let userId = m.sender
    let packstickers = global.db?.data?.users?.[userId] || {}
    let texto1 = packstickers.text1 || global.packsticker || ''
    let texto2 = packstickers.text2 || global.packsticker2 || ''

    // URLs de APIs para ttp y attp
    let apiUrl = ''
    if (command === 'attp') {
        apiUrl = `https://api.fgmods.xyz/api/maker/attp?text=${teks}&apikey=dylux`
    } else if (command === 'ttp') {
        apiUrl = `https://api.fgmods.xyz/api/maker/ttp?text=${teks}&apikey=dylux`
    } else {
        return m.reply('❌ Comando desconocido.')
    }

    try {
        let stiker = await sticker(null, apiUrl, texto1, texto2)
        conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, true)
    } catch (e) {
        console.error('❌ Error al generar sticker:', e)
        m.reply('❌ Error generando el sticker. Intenta de nuevo más tarde o usa otro texto.')
    }
}

handler.tags = ['sticker']
handler.help = ['ttp <texto>', 'attp <texto>']
handler.command = ['ttp', 'attp']

export default handler