let handler = async (m, { conn, usedPrefix, args }) => {

  let imageLink = (args[0] && args[0].startsWith('http')) 
    ? args[0] 
    : 'https://i.postimg.cc/MKRf37Mq/5e6a5ff29be47abef38634236b95e8e1.jpg';

  let txt = `
╭ - - - - - - -✎ 🌹   ❜ ⊹
*︵₊˚꒰Ꮺ 𝗠𝗮𝗻𝘂𝗮𝗹 𝗽𝗮𝗿𝗮 𝗲𝗱𝗶𝘁𝗮𝗿 𝘁𝘂 𝗽𝗲𝗿𝗳𝗶𝗹*
*꒰ ୨⚔️୧─・┈・୨⚡୧・┈・─୨⚔️୧ ꒱*
₊˚୨🍧 *${usedPrefix}setbirth:*
> Edita tu fecha de cumpleaños  
₊˚୨💥 *${usedPrefix}delbirth:*
> Elimina tu fecha de cumpleaños  
₊˚୨⚔️ *${usedPrefix}setdesc:*
> Edita tu descripción  
₊˚୨🍁 *${usedPrefix}deldesc:*
> Elimina tu descripción  
₊˚୨🌲 *${usedPrefix}setgenre:* 
> Edita tu género  
₊˚୨🏜️ *${usedPrefix}delgenre:*
> Elimina tu género  
₊˚୨❄️ *${usedPrefix}marry:*
> Cásate con alguien  
₊˚୨🍥 *${usedPrefix}divorce:*
> Divórciate  
٭꒷꒦ ✨︶︶︶︶︶︶︶︶︶︶ 🔥꒦꒷٭`;

  await conn.sendMessage(m.chat, {
    text: txt,
    contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
        title: `${wm}`,
        body: 'Configura tu perfil como desees',
        thumbnailUrl: imageLink, 
        sourceUrl: imageLink,    
        mediaType: 1,
        renderLargerThumbnail: true,
      }
    }
  }, { quoted: m });
};

handler.command = ['perfildates', 'pedates', 'perd'];
export default handler;






/*let handler = async(m, { conn, usedPrefix, command }) => {

let profilePic
try {
  profilePic = await conn.profilePictureUrl(m.sender, 'image')
} catch {
  profilePic = 'https://i.imgur.com/JqeuF6b.jpg' // Imagen por defecto si no tiene foto
}

let txt = `╭ - - - - - - -✎ 🌹   ❜ ⊹
*︵₊˚꒰Ꮺ mᥲᥒᥙᥲᥣ ⍴ᥲrᥲ ᥱძі𝗍ᥲr 𝗍ᥙ ⍴ᥱr𝖿іᥣ*
*꒰ ୨⚔️୧─・┈・୨⚡୧・┈・─୨⚔️୧ ꒱*
₊˚୨🍧 *${usedPrefix}setbirth*
> ✦ 𝐸𝑑𝑖𝑡𝑎 𝑡𝑢 𝑓𝑒𝑐𝒉𝑎 𝑑𝑒 𝑐𝑢𝑚𝑝𝑙𝑒𝑎ñ𝑜𝑠 🎂.
₊˚୨💥 *${usedPrefix}delbirth*
> ✦ 𝐸𝑙𝑖𝑚𝑖𝑛𝑎 𝑡𝑢 𝑓𝑒𝑐𝑕𝑎 𝑑𝑒 𝑐𝑢𝑚𝑝𝑙𝑒𝑎ñ𝑜𝑠 🎂.
₊˚୨⚔️ *${usedPrefix}setdesc*
> ♡ 𝐸𝑑𝑖𝑡𝑎 𝐿𝑎 𝑑𝑒𝑠𝑐𝑟𝑖𝑝𝑐𝑖ó𝑛 𝑑𝑒 𝑡𝑢 𝑝𝑒𝑟𝑓𝑖𝑙.
₊˚୨🍁 *${usedPrefix}setdesc*
> ♡ 𝐸𝑙𝑖𝑚𝑖𝑛𝑎 𝐿𝑎 𝑑𝑒𝑠𝑐𝑟𝑖𝑝𝑐𝑖ó𝑛 𝑑𝑒 𝑡𝑢 𝑝𝑒𝑟𝑓𝑖𝑙.
₊˚୨🌲 *${usedPrefix}setgenre*
> ✐ 𝐸𝑑𝑖𝑡𝑎 𝑡𝑢 𝑔𝑒𝑛𝑒𝑟𝑜 𝑒𝑛 𝑡𝑢 𝑝𝑒𝑟𝑓𝑖𝑙.
₊˚୨🏜️ *${usedPrefix}delgenre*
> ✐ 𝐸𝑙𝑖𝑚𝑖𝑛𝑎 𝑡𝑢 𝑔𝑒𝑛𝑒𝑟𝑜 𝑒𝑛 𝑡𝑢 𝑝𝑒𝑟𝑓𝑖𝑙.
₊˚୨❄️ *${usedPrefix}marry*
> ᰔᩚ 𝐶𝑎𝑠𝑎𝑡𝑒 𝑐𝑜𝑛 𝑢𝑛𝑎 𝑝𝑒𝑟𝑠𝑜𝑛𝑎.
₊˚୨🍥 *${usedPrefix}divorce*
> ঔ 𝐷𝑖𝑣𝑜𝑟𝑐𝑖𝑎𝑡𝑒 𝑑𝑒 𝑢𝑛𝑎 𝑝𝑒𝑟𝑠𝑜𝑛𝑎.
٭꒷꒦ ✨︶︶︶︶︶︶︶︶︶︶ 🔥꒦꒷٭`;

await conn.sendMessage(
  m.chat,
  {
    image: { url: profilePic },
    caption: txt,
    footer: `${wm}\n${etiqueta}`,
    buttons: [
      {buttonId: `${usedPrefix}menu`, buttonText: {displayText: 'Menú Principal'}, type: 1}
    ],
    headerType: 4
  },
  { quoted: m }
)
}

handler.command = ['perfildates', 'pedates', 'perd'];
handler.tag = ['rg'];
handler.help = ['perfildates'];
export default handler;*/
