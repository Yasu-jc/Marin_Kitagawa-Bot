import fetch from 'node-fetch';

const initialReactions = ['😺', '🐾', '😻', '💖', '✨']; 

const buttonReactions = ['💓', '🥰', '🌸', '🐱', '💘']; 

const handler = async (m, { conn, command }) => {


  if (m && m.key) {
    const initialReaction = initialReactions[Math.floor(Math.random() * initialReactions.length)];
    await conn.sendMessage(m.chat, { react: { text: initialReaction, key: m.key }});
  }

  const ne = await (await fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/anime/neko.txt')).text();
  const nek = ne.split('\n');
  const neko = await nek[Math.floor(Math.random() * nek.length)];
  if (neko === '') throw 'Error: No neko image found.'; 


  const sentMessage = await conn.sendButton(m.chat, 'Nyaww~ 🐾💗', '', neko, [['🔄 SIGUIENTE 🔄', `/${command}`]], m);



  if (sentMessage && sentMessage.key) {
    const buttonReaction = buttonReactions[Math.floor(Math.random() * buttonReactions.length)];
    await conn.sendMessage(m.chat, { react: { text: buttonReaction, key: sentMessage.key }});
  }
};

handler.command = ['neko'];
handler.tags = ['anime'];
handler.help = ['neko'];

export default handler;
