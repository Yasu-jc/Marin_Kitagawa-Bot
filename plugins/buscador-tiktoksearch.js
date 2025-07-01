/*import axios from 'axios';
const {
  proto,
  generateWAMessageFromContent,
  prepareWAMessageMedia,
  generateWAMessageContent,
  getDevice
} = (await import("@whiskeysockets/baileys")).default;

let handler = async (message, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(message.chat, "❀ Por favor, ingrese un texto para realizar una búsqueda en tiktok.", message, rcanal);
  }

  async function createVideoMessage(url) {
    const { videoMessage } = await generateWAMessageContent({
      video: { url }
    }, {
      upload: conn.waUploadToServer
    });
    return videoMessage;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  try {
    conn.reply(message.chat, '✧ *ENVIANDO SUS RESULTADOS..*', message, {
      contextInfo: { 
        externalAdReply: { 
          mediaUrl: null, 
          mediaType: 1, 
          showAdAttribution: true,
          title: '♡  ͜ ۬︵࣪᷼⏜݊᷼𝘿𝙚𝙨𝙘𝙖𝙧𝙜𝙖𝙨⏜࣪᷼︵۬ ͜ ',
          body: dev,
          previewType: 0, 
          thumbnail: avatar,
          sourceUrl: redes 
        }
      }
    });

    let results = [];
    let { data } = await axios.get("https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=" + text);
    let searchResults = data.data;
    shuffleArray(searchResults);
    let topResults = searchResults.splice(0, 7);

    for (let result of topResults) {
      results.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({ text: null }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: dev }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: '' + result.title,
          hasMediaAttachment: true,
          videoMessage: await createVideoMessage(result.nowm)
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({ buttons: [] })
      });
    }

    const messageContent = generateWAMessageFromContent(message.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({
              text: "✧ RESULTADO DE: " + text
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: dev
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              hasMediaAttachment: false
            }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
              cards: [...results]
            })
          })
        }
      }
    }, {
      quoted: message
    });

    await conn.relayMessage(message.chat, messageContent.message, {
      messageId: messageContent.key.id
    });
  } catch (error) {
    conn.reply(message.chat, `⚠︎ *OCURRIÓ UN ERROR:* ${error.message}`, message);
  }
};

handler.help = ["tiktoksearch <txt>"];
handler.register = true
handler.group = true
handler.tags = ["buscador"];
handler.command = ["tiktoksearch", "ttss", "tiktoks"];

export default handler;*/






import axios from 'axios';
import fetch from 'node-fetch';

const {
  proto,
  generateWAMessageFromContent,
  generateWAMessageContent
} = (await import("@whiskeysockets/baileys")).default;

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, "❀ Por favor, ingrese un texto para realizar una búsqueda en TikTok.", m, rcanal);
  }

  // Función para mostrar mensaje de "Enviando resultados"
  const sendSearchBanner = async () => {
    let thumb;
    try {
      thumb = await (await fetch(avatar || 'https://i.imgur.com/JP52fdP.jpeg')).buffer();
    } catch (e) {
      thumb = null;
    }

    return conn.reply(m.chat, '✧ *ENVIANDO SUS RESULTADOS...*', m, {
      contextInfo: {
        externalAdReply: {
          title: '♡  ͜ ۬︵࣪᷼⏜݊᷼𝘿𝙚𝙨𝙘𝙖𝙧𝙜𝙖𝙨⏜࣪᷼︵۬ ͜ ',
          body: dev,
          previewType: 0,
          showAdAttribution: true,
          thumbnail: thumb,
          sourceUrl: redes
        }
      }
    });
  };

  const shuffleArray = arr => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  };

  const createVideoMessage = async (url) => {
    const { videoMessage } = await generateWAMessageContent({
      video: { url }
    }, { upload: conn.waUploadToServer });
    return videoMessage;
  };

  try {
    await sendSearchBanner();

    const { data } = await axios.get(`https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=${encodeURIComponent(text)}`);
    if (!data || !data.data || !Array.isArray(data.data) || data.data.length === 0) {
      return conn.reply(m.chat, '✘ No se encontraron resultados para esa búsqueda.', m);
    }

    const searchResults = [...data.data];
    shuffleArray(searchResults);
    const selectedResults = searchResults.slice(0, 7);

    const cards = [];
    for (const video of selectedResults) {
      const videoMsg = await createVideoMessage(video.nowm);

      cards.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({ text: null }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: dev }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: video.title || "Video de TikTok",
          hasMediaAttachment: true,
          videoMessage: videoMsg
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({ buttons: [] })
      });
    }

    const finalMessage = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: { text: `💫 *RESULTADOS DE:*\n${text}` },
            footer: { text: dev },
            header: { hasMediaAttachment: false },
            carouselMessage: { cards }
          })
        }
      }
    }, { quoted: m });

    await conn.relayMessage(m.chat, finalMessage.message, { messageId: finalMessage.key.id });

  } catch (error) {
    console.error(error);
    conn.reply(m.chat, `⚠︎ *OCURRIÓ UN ERROR:* ${error.message || error}`, m);
  }
};

handler.help = ["tiktoksearch <texto>"];
handler.tags = ["buscador"];
handler.command = ["tiktoksearch", "ttss", "tiktoks"];
handler.register = true;
handler.group = true;

export default handler;