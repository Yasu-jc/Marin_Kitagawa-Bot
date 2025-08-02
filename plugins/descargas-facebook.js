import { igdl } from 'ruhend-scraper'; 

const handler = async (m, { conn }) => {

  if (!m || !m.text) {
    return; 
  }

  const text = m.text;


  const regexFb = /https?:\/\/(www\.)?(facebook\.com|fb.watch)\/[^\s]+/gi;
  const match = text.match(regexFb);


  if (!match) {
    return;
  }

  const url = match[0]; 


  const packname = `${wm}`;
  const dev = `${etiqueta}`;
  const icons = 'https://i.postimg.cc/nzRKNjVR/catalogo.jpg';
  const channel = 'https://github.com/JosueAlmonte';
  const textbot = '✅ Video descargado correctamente.';
  const rwait = '⏳';
  const done = '✅';   
  const error = '❌';  


  const fake = {
    key: {
      fromMe: false,
      participant: `0@s.whatsapp.net`,
      ...(m.chat ? { remoteJid: m.chat } : {}),
    },
    message: { conversation: '✨' },
  };

  const fkontak = {
    key: { participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast' },
    message: {
      contactMessage: {
        displayName: 'Descargando...',
        vcard: 'BEGIN:VCARD\nVERSION:3.0\nFN:Bot\nEND:VCARD', 
      },
    },
  };


  try {
   
    await conn.reply(m.chat, `🕒 *Descargando su video de Facebook...*`, m, {
      contextInfo: {
        externalAdReply: {
          mediaUrl: null, 
          mediaType: 1,   
          title: packname,
          body: dev,
          previewType: 0, 
          thumbnailUrl: icons,
          sourceUrl: channel,
        },
      },
    });


    await m.react(rwait);


    const res = await igdl(url);
    const result = res.data;

    if (!result || result.length === 0) {
      await m.react(error); 
      return conn.reply(m.chat, '❌ *No se encontraron resultados para este enlace.*', m, fake);
    }


    const data = result.find(i => i.resolution === "720p (HD)") || result.find(i => i.resolution === "360p (SD)");


    if (!data) {
      await m.react(error);
      return conn.reply(m.chat, '❌ *No se encontró una resolución adecuada para descargar.*', m, fake);
    }


    await conn.sendMessage(m.chat, {
      video: { url: data.url }, 
      caption: '📽️ *Tu video de Facebook está listo!*\n' + textbot,
      fileName: 'facebook_video.mp4', 
      mimetype: 'video/mp4',         
    }, { quoted: fkontak }); 
    
    await m.react(done);

  } catch (e) {
    console.error('[ERROR FB]', e); 
    await m.react(error); 
    return conn.reply(m.chat, '⚠️ *Error al procesar el video. Verifica el enlace o intenta de nuevo.*', m, fake);
  }
};


handler.customPrefix = /https?:\/\/(www\.)?(facebook\.com|fb.watch)\/[^\s]+/i;
handler.command = new RegExp(); 
handler.register = true; 

export default handler;
