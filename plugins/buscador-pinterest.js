/*
• @David-Chian
- https://github.com/David-Chian
*/
/*
import fetch from 'node-fetch';
import baileys from '@whiskeysockets/baileys';

async function sendAlbumMessage(jid, medias, options = {}) {
    if (typeof jid !== "string") throw new TypeError(`jid must be string, received: ${jid}`);
    if (medias.length < 2) throw new RangeError("Se necesitan al menos 2 imágenes para un álbum");

    const caption = options.text || options.caption || "";
    const delay = !isNaN(options.delay) ? options.delay : 500;
    delete options.text;
    delete options.caption;
    delete options.delay;

    const album = baileys.generateWAMessageFromContent(
        jid,
        { messageContextInfo: {}, albumMessage: { expectedImageCount: medias.length } },
        {}
    );

    await conn.relayMessage(album.key.remoteJid, album.message, { messageId: album.key.id });

    for (let i = 0; i < medias.length; i++) {
        const { type, data } = medias[i];
        const img = await baileys.generateWAMessage(
            album.key.remoteJid,
            { [type]: data, ...(i === 0 ? { caption } : {}) },
            { upload: conn.waUploadToServer }
        );
        img.message.messageContextInfo = {
            messageAssociation: { associationType: 1, parentMessageKey: album.key },
        };
        await conn.relayMessage(img.key.remoteJid, img.message, { messageId: img.key.id });
        await baileys.delay(delay);
    }
    return album;
}

const pinterest = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `❀ Por favor, ingresa lo que deseas buscar por Pinterest.`, m);

    await m.react('🕒');
    conn.reply(m.chat, '✧ *Descargando imágenes de Pinterest...*', m, {
        contextInfo: {
            externalAdReply: {
                mediaUrl: null,
                mediaType: 1,
                showAdAttribution: true,
                title: packname,
                body: dev,
                previewType: 0,
                thumbnail: icono,
                sourceUrl: redes
            }
        }
    });

    try {
        const res = await fetch(`https://api.dorratz.com/v2/pinterest?q=${encodeURIComponent(text)}`);
        const data = await res.json();

        if (!Array.isArray(data) || data.length < 2) {
            return conn.reply(m.chat, '✧ No se encontraron suficientes imágenes para un álbum.', m);
        }

        const images = data.slice(0, 10).map(img => ({ type: "image", data: { url: img.image_large_url } }));

        const caption = `❀ *Resultados de búsqueda para:* ${text}`;
        await sendAlbumMessage(m.chat, images, { caption, quoted: m });

        await m.react('✅');
    } catch (error) {
        await m.react('❌');
        conn.reply(m.chat, '⚠︎ Hubo un error al obtener las imágenes de Pinterest.', m);
    }
};

pinterest.help = ['pinterest <query>'];
pinterest.tags = ['buscador', 'descargas'];
pinterest.command = ['pinterest', 'pin']
pinterest.register = true;
pinterest.group = true;

export default pinterest;*/
/* 2
import axios from 'axios';

const handler = async (m, { conn, text, command, args }) => {
    // Si es respuesta al botón "Ver todas", envía todas las imágenes
    if (args.length > 1 && args[args.length - 1] === 'ver_todas') {
        const query = args.slice(0, -1).join(' ');
        try {
            await m.react('🕓');
            const response = await axios.get(`https://api.siputzx.my.id/api/s/pinterest?query=${encodeURIComponent(query)}`);
            const data = response.data.data;

            if (!Array.isArray(data) || data.length === 0) {
                await conn.sendMessage(m.chat, { text: `❌ No se encontraron imágenes para "${query}".` }, { quoted: m });
                return;
            }

            // Enviamos máximo 10 imágenes
            const imagesToSend = data.slice(0, 10);

            for (const img of imagesToSend) {
                await conn.sendMessage(
                    m.chat,
                    { 
                        image: { url: img.images_url },
                        caption: `🚩 *${img.grid_title || `Imagen de ${query}`}*\n${global.dev ? `\n${global.dev}` : ''}`,
                        // Sin viewOnce ni headerType
                    },
                    { quoted: m }
                );
                await new Promise(r => setTimeout(r, 500)); // pequeña pausa para no saturar
            }

            await m.react('✅');
        } catch (error) {
            await m.react('✖️');
            console.error('Error al obtener las imágenes:', error);
            await conn.sendMessage(m.chat, { text: '❌ Ocurrió un error al intentar obtener las imágenes. Inténtalo nuevamente.' }, { quoted: m });
        }
        return;
    }

    // Primer mensaje: muestra una foto de ejemplo y el botón para ver todas las imágenes
    if (!text) {
        await conn.sendMessage(m.chat, { text: '🚩 Por favor proporciona un término de búsqueda.' }, { quoted: m });
        return;
    }

    try {
        await m.react('🕓');
        const response = await axios.get(`https://api.siputzx.my.id/api/s/pinterest?query=${encodeURIComponent(text)}`);
        const data = response.data.data;

        if (!Array.isArray(data) || data.length === 0) {
            await conn.sendMessage(m.chat, { text: `❌ No se encontraron imágenes para "${text}".` }, { quoted: m });
            return;
        }

        // Imagen de ejemplo: la primera
        const exampleImage = data[0];

        await conn.sendMessage(
            m.chat,
            {
                image: { url: exampleImage.images_url },
                caption: `🚩 *${exampleImage.grid_title || `Imagen de ${text}`}*\n¿Quieres ver todas las imágenes para: *${text}*?`,
                buttons: [
                    {
                        buttonId: `.${command} ${text} ver_todas`,
                        buttonText: { displayText: 'Ver todas las imágenes 🖼️' },
                        type: 1
                    }
                ],
                footer: 'Presiona el botón para recibirlas.'
            },
            { quoted: m }
        );
        await m.react('✅');
    } catch (error) {
        await m.react('✖️');
        console.error('Error al obtener la imagen:', error);
        await conn.sendMessage(m.chat, { text: '❌ Ocurrió un error al intentar obtener la imagen. Inténtalo nuevamente.' }, { quoted: m });
    }
};

handler.help = ['pinterest <término>'];
handler.tags = ['img'];
handler.register = true;
handler.command = ['pin','pinterest'];  

export default handler; */

import fetch from 'node-fetch';
import baileys from '@whiskeysockets/baileys';

// Esta función envía un álbum/carrousel de imágenes como en WhatsApp oficial
async function sendAlbumMessage(jid, medias, options = {}) {
    if (typeof jid !== "string") throw new TypeError(`jid must be string, received: ${jid}`);
    if (medias.length < 2) throw new RangeError("Se necesitan al menos 2 imágenes para un álbum");

    const caption = options.text || options.caption || "";
    const delay = !isNaN(options.delay) ? options.delay : 500;
    delete options.text;
    delete options.caption;
    delete options.delay;

    const album = baileys.generateWAMessageFromContent(
        jid,
        { messageContextInfo: {}, albumMessage: { expectedImageCount: medias.length } },
        {}
    );

    await conn.relayMessage(album.key.remoteJid, album.message, { messageId: album.key.id });

    for (let i = 0; i < medias.length; i++) {
        const { type, data } = medias[i];
        const img = await baileys.generateWAMessage(
            album.key.remoteJid,
            { [type]: data, ...(i === 0 ? { caption } : {}) },
            { upload: conn.waUploadToServer }
        );
        img.message.messageContextInfo = {
            messageAssociation: { associationType: 1, parentMessageKey: album.key },
        };
        await conn.relayMessage(img.key.remoteJid, img.message, { messageId: img.key.id });
        await baileys.delay(delay);
    }
    return album;
}

const pinterest = async (m, { conn, text, usedPrefix, command, args }) => {
    if (!text) return conn.reply(m.chat, `❀ Por favor, ingresa lo que deseas buscar por Pinterest.`, m);

    // Primer mensaje: muestra una foto de ejemplo y el botón para ver el álbum completo
    if (!args.includes('album')) {
        await m.react('🕒');
        conn.reply(m.chat, '✧ *Buscando imágenes de Pinterest...*', m, {
            contextInfo: {
                externalAdReply: {
                    mediaUrl: null,
                    mediaType: 1,
                    showAdAttribution: true,
                    title: typeof globalThis.packname === "string" ? globalThis.packname : "Pikachu-Bot",
                    body: typeof globalThis.dev === "string" ? globalThis.dev : "Dev",
                    previewType: 0,
                    thumbnail: typeof globalThis.icono === "string" ? globalThis.icono : "",
                    sourceUrl: typeof globalThis.redes === "string" ? globalThis.redes : ""
                }
            }
        });

        try {
            const res = await fetch(`https://api.dorratz.com/v2/pinterest?q=${encodeURIComponent(text)}`);
            const data = await res.json();

            if (!Array.isArray(data) || data.length < 2) {
                return conn.reply(m.chat, '✧ No se encontraron suficientes imágenes para un álbum.', m);
            }

            // Imagen de ejemplo
            const example = data[0];
            await conn.sendMessage(
                m.chat,
                {
                    image: { url: example.image_large_url },
                    caption: `❀ *Resultados de búsqueda para:* ${text}\n\n¿Quieres ver el álbum completo?`,
                    buttons: [
                        {
                            buttonId: `.${command} ${text} album`,
                            buttonText: { displayText: 'Ver álbum completo 🖼️' },
                            type: 1
                        }
                    ],
                    footer: 'Presiona el botón para recibirlas.'
                },
                { quoted: m }
            );
            await m.react('✅');
        } catch (error) {
            await m.react('❌');
            conn.reply(m.chat, '⚠︎ Hubo un error al obtener las imágenes de Pinterest.', m);
        }
        return;
    }

    // Si el usuario presiona el botón, manda el álbum completo
    try {
        await m.react('🕒');
        conn.reply(m.chat, '✧ *Descargando álbum de Pinterest...*', m);

        const res = await fetch(`https://api.dorratz.com/v2/pinterest?q=${encodeURIComponent(text.replace(' album', ''))}`);
        const data = await res.json();

        if (!Array.isArray(data) || data.length < 2) {
            return conn.reply(m.chat, '✧ No se encontraron suficientes imágenes para un álbum.', m);
        }

        const images = data.slice(0, 15).map(img => ({ type: "image", data: { url: img.image_large_url } }));
        const caption = `❀ *Resultados de búsqueda para:* ${text.replace(' album', '')}`;
        await sendAlbumMessage(m.chat, images, { caption, quoted: m });

        await m.react('✅');
    } catch (error) {
        await m.react('❌');
        conn.reply(m.chat, '⚠︎ Hubo un error al descargar el álbum de Pinterest.', m);
    }
};

pinterest.help = ['pinterest <query>'];
pinterest.tags = ['buscador', 'descargas'];
pinterest.command = ['pinterest', 'pin'];
pinterest.register = true;
pinterest.group = true;

export default pinterest;