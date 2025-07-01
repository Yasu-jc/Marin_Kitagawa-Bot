import { promises as fs } from 'fs';

const charactersFilePath = './src/database/characters.json';
const cooldowns = {};


const COOLDOWN_TIME = 3 * 1000;

async function loadCharacters() {
    try {
        const data = await fs.readFile(charactersFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {

        if (error.code === 'ENOENT') { 
            console.warn('El archivo characters.json no existe. Se creará uno nuevo al guardar.');
            return []; 
        }
        throw new Error('❀ No se pudo cargar el archivo characters.json: ' + error.message);
    }
}

async function saveCharacters(characters) {
    try {
        await fs.writeFile(charactersFilePath, JSON.stringify(characters, null, 2), 'utf-8');
    } catch (error) {
        throw new Error('❀ No se pudo guardar el archivo characters.json: ' + error.message);
    }
}

let handler = async (m, { conn }) => {
    const userId = m.sender;
    const now = Date.now();

    if (cooldowns[userId] && now < cooldowns[userId]) {
        const remainingTime = Math.ceil((cooldowns[userId] - now) / 1000);
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        return await conn.reply(m.chat, `《✧》Debes esperar *${minutes} minutos y ${seconds} segundos* para usar *#c* de nuevo.`, m);
    }



    if (m.quoted && m.quoted.text) {


        try {
            const characters = await loadCharacters();

            const characterIdMatch = m.quoted.text.match(/✦ ID: \*(.+?)\*/);

            if (!characterIdMatch) {
                await conn.reply(m.chat, '《✧》No se pudo encontrar el ID del personaje en el mensaje citado. Asegúrate de que el mensaje tenga el formato "✦ ID: *[ID]*".', m);
                return;
            }

            const characterId = characterIdMatch[1];
            const character = characters.find(c => c.id === characterId);

            if (!character) {
                await conn.reply(m.chat, `《✧》El ID *${characterId}* no corresponde a un personaje válido en mi base de datos.`, m);
                return;
            }

            if (character.user && character.user !== userId) {
                await conn.reply(m.chat, `《✧》El personaje ya ha sido reclamado por @${character.user.split('@')[0]}, inténtalo a la próxima :v.`, m, { mentions: [character.user] });
                return;
            }

            character.user = userId;
            character.status = "Reclamado";

            await saveCharacters(characters);

            await conn.reply(m.chat, `✦ Has reclamado a *${character.name}* con éxito.`, m);


            cooldowns[userId] = now + COOLDOWN_TIME;
        } catch (error) {
            await conn.reply(m.chat, `✘ Error al reclamar el personaje: ${error.message}`, m);
        }

    } else {
        await conn.reply(m.chat, '《✧》Debes citar un mensaje válido para reclamar. Asegúrate de citar el mensaje que contiene el personaje con su ID.', m);
    }
};

handler.help = ['claim'];
handler.tags = ['gacha'];
handler.command = ['c', 'claim', 'reclamar'];
handler.group = true;

export default handler;
