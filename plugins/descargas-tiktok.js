import fetch from 'node-fetch';


async function tiktokdl(url) {
  const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}&hd=1`;
  const response = await (await fetch(apiUrl)).json();
  return response;
}

const handler = async (m, { conn }) => {
  const regexTT = /(?:https?:\/\/)?(?:www\.)?(tiktok\.com|vm\.tiktok\.com)\/[^\s]+/i;
  const link = m.text?.trim();

  if (!regexTT.test(link)) return;

  try {
    await m.react('🕒');
    await conn.reply(m.chat, '♡ *Espere un momento, estoy descargando su video de TikTok...*', m, {
      contextInfo: {
        externalAdReply: {
          mediaUrl: null,
          mediaType: 1,
          title: `${wm}`,
          body: `${etiqueta}`,
          previewType: 0,
          thumbnail: await (await fetch('https://i.postimg.cc/nzRKNjVR/catalogo.jpg')).buffer(),
          sourceUrl: 'https://tiktok.com'
        }
      }
    });

    const tiktokData = await tiktokdl(link);

    if (!tiktokData || !tiktokData.data) {
      await m.react('❌');
      return conn.reply(m.chat, '❌ Error: No se pudo obtener información del video.', m);
    }

    const {
      play: videoURL,
      wmplay: videoURLWatermark,
      title,
      create_time,
      digg_count,
      comment_count,
      share_count,
      play_count,
      download_count,
      author,
      music
    } = tiktokData.data;

const info = `
˚ʚ꒰ ${botname} ꒱ɞ˚ 🍥
・┄┄┄┄・♡・┄┄┄┄・
🍨 ∿ ˚. ୭
﹔♡﹒ Descripción: ${title}

﹔♡﹒ Publicado: ${create_time}
・┄┄┄┄・♡・┄┄┄┄・

﹔♡﹒ Estado:
> ❤️ Likes = ${digg_count}
> 💬 Comentarios = ${comment_count}
> 🔄 Compartidas = ${share_count}
> 👀 Vistas = ${play_count}
> ⬇️ Descargas = ${download_count}

・┄┄┄┄・♡・┄┄┄┄・
Uploader: ${author.nickname || "No info"}
(${author.unique_id} - https://www.tiktok.com/@${author.unique_id})

🔊 Sonido: ${music}

🧷:  ૮꒰ ˶• ༝ •˶꒱ა ♡
`;

    if (videoURL || videoURLWatermark) {
      await conn.sendFile(m.chat, videoURL, 'tiktok.mp4', '`DESCARGA DE TIKTOK`\n\n' + info, m);
      await m.react('✅');
    } else {
      throw new Error('❌ No se encontró el video.');
    }

  } catch (error) {
    console.error(error);
    await m.react('⚠️');
    return conn.reply(m.chat, `⚠️ Ocurrió un error al descargar el video.\n\n${error.message}`, m);
  }
};


handler.customPrefix = /(?:https?:\/\/)?(?:www\.)?(tiktok\.com|vm\.tiktok\.com)\/[^\s]+/i;
handler.command = new RegExp();
handler.register = true;
handler.group = false;

export default handler;






/*import fetch from 'node-fetch'

var handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) {
        throw m.reply(`*☁️ Ejemplo: ${usedPrefix + command}* https://vm.tiktok.com/ZMhAk8tLx/`);
    }

    try {
        await conn.reply(m.chat, "♡ *Espere un momento, estoy descargando su video...*", m);

        const tiktokData = await tiktokdl(args[0]);

        if (!tiktokData) {
            throw m.reply("Error api!");
        }

        const videoURL = tiktokData.data.play;
        const videoURLWatermark = tiktokData.data.wmplay;
        const infonya_gan = `*📖 Descripción:* ${tiktokData.data.title}\n*🚀 Publicado:* ${tiktokData.data.create_time}\n\n*⚜️ Estado:*\n=====================\n> Likes = ${tiktokData.data.digg_count}\n> Comentarios = ${tiktokData.data.comment_count}\n> Compartidas = ${tiktokData.data.share_count}\n> Vistas = ${tiktokData.data.play_count}\n> Descargas = ${tiktokData.data.download_count}\n=====================\n\nUploader: ${tiktokData.data.author.nickname || "No info"}\n(${tiktokData.data.author.unique_id} - https://www.tiktok.com/@${tiktokData.data.author.unique_id})\n*🔊 Sonido:* ${tiktokData.data.music}\n`;

        if (videoURL || videoURLWatermark) {
            await conn.sendFile(m.chat, videoURL, "tiktok.mp4", "`DESCARGA DE TIKTOK`" + `\n\n${infonya_gan}`, m);
            setTimeout(async () => {
                // Aquí se eliminó la línea que enviaba el audio
                // await conn.sendFile(m.chat, `${tiktokData.data.music}`, "lagutt.mp3", "", m);
            }, 1500);
        } else {
            throw m.reply("No se pudo descargar.");
        }
    } catch (error1) {
        conn.reply(m.chat, `Error: ${error1}`, m);
    }
};

handler.help = ['tiktok'].map((v) => v + ' *<link>*')
handler.tags = ['descargas']
handler.command = ['tt','tiktok'];

handler.disable = false
handler.register = true
handler.limit = true

export default handler

async function tiktokdl(url) {
    let tikwm = `https://www.tikwm.com/api/?url=${url}?hd=1`
    let response = await (await fetch(tikwm)).json()
    return response
}*/
