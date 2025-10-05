import axios from 'axios';
import baileys from '@whiskeysockets/baileys';


async function sendAlbumMessage(conn, jid, medias, options = {}) {
  if (typeof jid !== "string") {
    throw new TypeError(`jid must be string, received: ${jid} (${jid?.constructor?.name})`);
  }
  for (const media of medias) {
    if (!media.type || (media.type !== "image" && media.type !== "video")) {
      throw new TypeError(`media.type must be "image" or "video", received: ${media.type} (${media.type?.constructor?.name})`);
    }
    if (!media.data || !Buffer.isBuffer(media.data)) { 
      throw new TypeError(`media.data must be Buffer, received: ${media.data} (${media.data?.constructor?.name})`);
    }
  }
  if (medias.length < 2) {
    throw new RangeError("Minimum 2 media");
  }

  const caption = options.text || options.caption || "";
  delete options.text;
  delete options.caption;
  delete options.delay;

  const album = baileys.generateWAMessageFromContent(
    jid,
    {
      messageContextInfo: {},
      albumMessage: {
        expectedImageCount: medias.filter(media => media.type === "image").length,
        expectedVideoCount: medias.filter(media => media.type === "video").length,
        ...(options.quoted
          ? {
              contextInfo: {
                remoteJid: options.quoted.key.remoteJid,
                fromMe: options.quoted.key.fromMe,
                stanzaId: options.quoted.key.id,
                participant: options.quoted.key.participant || options.quoted.key.remoteJid,
                quotedMessage: options.quoted.message,
              },
            }
          : {}),
      },
    },
    {}
  );

  await conn.relayMessage(album.key.remoteJid, album.message, { messageId: album.key.id });

  const messages = await Promise.all(
    medias.map((media, i) =>
      baileys.generateWAMessage(
        album.key.remoteJid,
        { [media.type]: media.data, ...(i === 0 ? { caption } : {}) },
        { upload: conn.waUploadToServer }
      )
    )
  );
  
  await Promise.all(
    messages.map(msg => {
      msg.message.messageContextInfo = {
        messageAssociation: { associationType: 1, parentMessageKey: album.key },
      };
      return conn.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });
    })
  );

  return album;
}


const pins = async (judul) => {
  try {
    const res = await axios.get(`https://api.kirito.my/api/pinterest?q=${encodeURIComponent(judul)}&apikey=by_deylin`);
    if (Array.isArray(res.data.images)) {
      return res.data.images.map(url => ({
        image_large_url: url,
        image_medium_url: url,
        image_small_url: url
      }));
    }
    return [];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, `${emojis} Ingresa un texto. Ejemplo: .pinterest ${botname}`, m, rcanal);

  try {

    const res2 = await fetch('https://files.catbox.moe/875ido.png');
    const thumb2 = Buffer.from(await res2.arrayBuffer());

    const userJid = m.sender;
    const fkontak = {
      key: { fromMe: false, participant: userJid },
      message: {
        documentMessage: {
          title: botname,
          fileName: `DERCARGAS • PINTEREST`,
          jpegThumbnail: thumb2
        }
      }
    };

    m.react('🕒');


    await conn.sendMessage(m.chat, {  
        text: `⏳ Espera un momento...\nEstoy buscando y descargando tus imágenes de *Pinterest*.`,  
        contextInfo: {  
          externalAdReply: {  
            title: `𝐃𝐞𝐬𝐜𝐚𝐫𝐠𝐚𝐬 • 𝐏𝐢𝐧𝐭𝐞𝐫𝐞𝐬𝐭`,  
            body: `Búsqueda: ${text}`,
            thumbnailUrl: "https://i.postimg.cc/pTNf2mLy/ed00b71319fa25c0eb7ae86a0a88ea1c.jpg", 
            sourceUrl: "https://pinterest.com",
            mediaType: 1,  
            renderLargerThumbnail: false  
          }  
        }  
    }, { quoted: m }); 
    // ---------------------------------------------

    const results = await pins(text);
    if (!results || results.length === 0) return conn.reply(m.chat, `No se encontraron resultados para "${text}".`, m, rcanal);

    const maxImages = Math.min(results.length, 15);


    const downloadPromises = results.slice(0, maxImages).map(async (r) => {
        const url = r.image_large_url || r.image_medium_url || r.image_small_url;
        try {
            const response = await axios.get(url, { responseType: 'arraybuffer' });
            return {
                type: 'image',
                data: Buffer.from(response.data) 
            };
        } catch (e) {
            console.error(`Error al descargar ${url}:`, e);
            return null;
        }
    });

    const downloadedMedias = await Promise.all(downloadPromises);
    const medias = downloadedMedias.filter(media => media !== null); 

    if (medias.length < 2) return conn.reply(m.chat, `Solo se pudo descargar ${medias.length} imagen válida. Se necesitan al menos 2.`, m, rcanal);

    await sendAlbumMessage(conn, m.chat, medias, {
      caption: `Resultados de: ${text}\nCantidad de Imágenes Enviadas: ${medias.length}`,
      quoted: fkontak
    });

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

  } catch (error) {
    console.error(error);
    conn.reply(m.chat, 'Error al obtener imágenes de Pinterest.', m, rcanal);
  }
};

handler.help = ['pinterest'];
handler.command = ['pinterest', 'pin'];
handler.tags = ['buscador'];

export default handler;













/*import axios from 'axios';
import baileys from '@whiskeysockets/baileys';

async function sendAlbumMessage(jid, medias, options = {}) {
  if (typeof jid !== "string") {
    throw new TypeError(`jid must be string, received: ${jid} (${jid?.constructor?.name})`);
  }

  for (const media of medias) {
    if (!media.type || (media.type !== "image" && media.type !== "video")) {
      throw new TypeError(`media.type must be "image" or "video", received: ${media.type} (${media.type?.constructor?.name})`);
    }
    if (!media.data || (!media.data.url && !Buffer.isBuffer(media.data))) {
      throw new TypeError(`media.data must be object with url or buffer, received: ${media.data} (${media.data?.constructor?.name})`);
    }
  }

  if (medias.length < 2) {
    throw new RangeError("Minimum 2 media");
  }

  const caption = options.text || options.caption || "";
  const delay = !isNaN(options.delay) ? options.delay : 500;
  delete options.text;
  delete options.caption;
  delete options.delay;

  const album = baileys.generateWAMessageFromContent(
    jid,
    {
      messageContextInfo: {},
      albumMessage: {
        expectedImageCount: medias.filter(media => media.type === "image").length,
        expectedVideoCount: medias.filter(media => media.type === "video").length,
        ...(options.quoted
          ? {
              contextInfo: {
                remoteJid: options.quoted.key.remoteJid,
                fromMe: options.quoted.key.fromMe,
                stanzaId: options.quoted.key.id,
                participant: options.quoted.key.participant || options.quoted.key.remoteJid,
                quotedMessage: options.quoted.message,
              },
            }
          : {}),
      },
    },
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

const pins = async (judul) => {
  try {
    const res = await axios.get(`https://anime-xi-wheat.vercel.app/api/pinterest?q=${encodeURIComponent(judul)}`);
    if (Array.isArray(res.data.images)) {
      return res.data.images.map(url => ({
        image_large_url: url,
        image_medium_url: url,
        image_small_url: url
      }));
    }
    return [];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, `${emojis} Ingresa un texto. Ejemplo: .pinterest ${botname}`, m, fake);
  

  try {
    m.react('🕒');
    const results = await pins(text);
    if (!results || results.length === 0) return conn.reply(m.chat, `No se encontraron resultados para "${text}".`, m, fake);

    const maxImages = Math.min(results.length, 15);
    const medias = [];

    for (let i = 0; i < maxImages; i++) {
      medias.push({
        type: 'image',
        data: { url: results[i].image_large_url || results[i].image_medium_url || results[i].image_small_url }
      });
    }

    await sendAlbumMessage(m.chat, medias, {
      caption: `𝗥𝗲𝘀𝘂𝗹𝘁𝗮𝗱𝗼𝘀 𝗱𝗲: ${text}\n𝗖𝗮𝗻𝘁𝗶𝗱𝗮𝗱 𝗱𝗲 𝗿𝗲𝘀𝘂𝗹𝘁𝗮𝗱𝗼𝘀: 15\n𝗖𝗿𝗲𝗮𝗱𝗼𝗿: ${dev}`,
      quoted: m
    });

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

  } catch (error) {
    conn.reply(m.chat, 'Error al obtener imágenes de Pinterest.', m, fake);
  }
};

handler.help = ['pinterest'];
handler.command = ['pinterest', 'pin'];
handler.tags = ['buscador'];

export default handler;*/
