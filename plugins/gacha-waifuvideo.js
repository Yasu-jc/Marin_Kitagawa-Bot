import { promises as fs } from 'fs'

const charactersFilePath = './src/database/characters.json'

async function loadCharacters() {
    try {
        const data = await fs.readFile(charactersFilePath, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        throw new Error('❀ No se pudo cargar el archivo characters.json.')
    }
}

let handler = async (m, { conn, command, args }) => {
    if (!args.length) {
        await conn.reply(m.chat, '《✧》Por favor, proporciona el nombre de un personaje.\n\nEjemplo:\n.wvideo Aika Sano', m)
        return
    }

    const characterName = args.join(' ').toLowerCase().trim()

    try {
        const characters = await loadCharacters()
        // Búsqueda tolerante a errores y espacios, permite acentos y minúsculas/mayúsculas
        const character = characters.find(c =>
            c.name &&
            c.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') ===
            characterName.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        )

        if (!character) {
            await conn.reply(m.chat, `《✧》No se ha encontrado el personaje *${characterName}*.\nAsegúrate de que el nombre esté correcto (ejemplo: .wvideo Aika Sano).`, m)
            return
        }

        if (!Array.isArray(character.vid) || character.vid.length === 0) {
            await conn.reply(m.chat, `《✧》No se encontró un video para *${character.name}*.`, m)
            return
        }

        // Elige un video aleatorio
        const randomVideo = character.vid[Math.floor(Math.random() * character.vid.length)]
        const message =
`❀ Nombre: *${character.name}*
⚥ Género: *${character.gender || "Desconocido"}*
❖ Fuente: *${character.source || "Desconocida"}*
🆔 ID: *${character.id || "Sin ID"}*
${character.value ? `💰 Valor: *${character.value}*` : ""}
${character.user ? `👤 Reclamado por: wa.me/${character.user.replace(/@s\.whatsapp\.net$/,'')}` : ""}`

        // Usa gifPlayback solo si el video es corto (menos de 10MB recomendado)
        const sendAsGif = Math.random() < 0.5

        await conn.sendMessage(
            m.chat,
            { video: { url: randomVideo }, caption: message, ...(sendAsGif && { gifPlayback: true }) },
            { quoted: m }
        )

    } catch (error) {
        await conn.reply(
            m.chat,
            `✘ Error al cargar el video del personaje: ${error?.message || error}`,
            m
        )
    }
}

handler.help = ['wvideo <nombre del personaje>']
handler.tags = ['anime']
handler.command = ['charvideo', 'wvideo', 'waifuvideo']
handler.group = true

export default handler