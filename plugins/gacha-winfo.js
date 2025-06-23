import { promises as fs } from 'fs';

const charactersFilePath = './src/database/characters.json';
const haremFilePath = './src/database/harem.json';

async function loadCharacters() {
    try {
        const data = await fs.readFile(charactersFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error('No se pudo cargar el archivo characters.json.');
    }
}

async function loadHarem() {
    try {
        const data = await fs.readFile(haremFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args.length) {
        await conn.reply(
            m.chat,
            `《✧》Debes especificar un personaje para ver su información.\n> Ejemplo » *${usedPrefix}${command} Aika Sano*`,
            m
        );
        return;
    }

    const characterName = args.join(' ').toLowerCase().trim();

    try {
        const characters = await loadCharacters();
        // Búsqueda tolerante a acentos y espacios extras
        const normalize = str => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ').trim();
        const character = characters.find(
            c => c.name && normalize(c.name.toLowerCase()) === normalize(characterName)
        );

        if (!character) {
            await conn.reply(m.chat, `《✧》No se encontró el personaje *${characterName}*.\nAsegúrate de escribir bien el nombre.`, m);
            return;
        }

        const harem = await loadHarem();
        // Puede estar reclamado varias veces, muestra todos los usuarios
        const userEntries = harem.filter(entry => entry.characterId == character.id);
        let statusMessage;
        let mentions = [];
        if (userEntries.length > 0) {
            statusMessage = userEntries.map(entry => `@${entry.userId.split('@')[0]}`).join(', ');
            mentions = userEntries.map(entry => entry.userId);
        } else {
            statusMessage = 'Libre';
        }

        let info = `❀ *${character.name}*\n`;
        info += character.gender ? `⚥ Género: *${character.gender}*\n` : "";
        info += character.value ? `✰ Valor: *${character.value}*\n` : "";
        info += `♡ Estado: ${statusMessage}\n`;
        info += character.source ? `❖ Fuente: *${character.source}*\n` : "";
        if (character.id) info += `🆔 ID: *${character.id}*\n`;
        if (character.img && Array.isArray(character.img) && character.img.length > 0) {
            info += `🖼️ Imágenes: *${character.img.length}*`;
        }

        // Si hay imagen, mándala junto al mensaje
        if (character.img && Array.isArray(character.img) && character.img.length > 0) {
            await conn.sendMessage(
                m.chat,
                {
                    image: { url: character.img[0] },
                    caption: info,
                    mentions
                },
                { quoted: m }
            );
        } else {
            await conn.reply(m.chat, info, m, { mentions });
        }
    } catch (error) {
        await conn.reply(m.chat, `✘ Error al cargar la información del personaje: ${error?.message}`, m);
    }
};

handler.help = ['charinfo <nombre>', 'winfo <nombre>', 'waifuinfo <nombre>'];
handler.tags = ['anime'];
handler.command = ['charinfo', 'winfo', 'waifuinfo'];
handler.group = true;
handler.register = true;

export default handler;