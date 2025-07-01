

import fetch from 'node-fetch';


const reaccionesIniciales = ['😻', '🐾', '✨', '💖', '🥰'];


const reaccionesBoton = ['😊', '🌸', '🐱', '💘', '💕'];

let handler = async (m, { conn, command }) => {
  try {


    if (m && m.key) {
      const reaccionInicialAleatoria = reaccionesIniciales[Math.floor(Math.random() * reaccionesIniciales.length)];
      await conn.sendMessage(m.chat, { react: { text: reaccionInicialAleatoria, key: m.key } });
    }


    let response = await fetch('https://nekos.life/api/v2/img/neko');
    let data = await response.json();
    let imageUrl = data.url;


    const textoBoton = 'Nyaww~ 🐾💗'; 
    const idBoton = `/${command}`; 
    
    const mensajeEnviado = await conn.sendButton(
      m.chat,
      textoBoton,
      'Aquí tienes tu neko!', 
      imageUrl,
      [['🔄 SIGUIENTE 🔄', idBoton]],
      m
    );

    
    if (mensajeEnviado && mensajeEnviado.key) {
      const reaccionBotonAleatoria = reaccionesBoton[Math.floor(Math.random() * reaccionesBoton.length)];
      await conn.sendMessage(m.chat, { react: { text: reaccionBotonAleatoria, key: mensajeEnviado.key } });
    }

  } catch (error) {

    console.error('Error al obtener o enviar la imagen de neko:', error);

    if (m && m.key) {
      await conn.sendMessage(m.chat, { react: { text: '✖️', key: m.key } });
    }

    await conn.reply(m.chat, 'Lo siento, no pude obtener una imagen de neko en este momento. Intenta de nuevo más tarde.', m);
  }
};

handler.command = ['neko2'];
handler.tags = ['img'];
handler.help = ['neko2'];

handler.register = true;

export default handler;
