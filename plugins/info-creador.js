import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
   await m.react('🧐');

    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let name = await conn.getName(who);
    let edtr = `@${m.sender.split`@`[0]}`;
    let username = conn.getName(m.sender);

    // VCARD
    let list = [{
        displayName: "Yasu",
        vcard: `
BEGIN:VCARD
VERSION:3.0
FN: ${etiqueta}
item1.TEL;waid=50577025053:50577025053
item1.X-ABLabel:Número
item2.EMAIL;type=INTERNET: x
item2.X-ABLabel:Email\n
item3.URL:https://github.com/Yasu-jc/Saki_Ayase-Bot
item3.X-ABLabel:Internet
item4.ADR:;; Nicaragua;;;;
item4.X-ABLabel:Region
END:VCARD`,
    }];

    await conn.sendMessage(m.chat, {
        contacts: {
            displayName: `${list.length} Contacto`,
            contacts: list
        },
        contextInfo: {
            externalAdReply: {
                showAdAttribution: true,
                title: `ΉӨᒪΛ, ƧӨY:\n${wm}`,
                body: dev,
                thumbnailUrl: 'https://i.postimg.cc/5ttCGWzS/6566a3679298a46030e51d633757bcd4.jpg',
                sourceUrl: 'https://wa.me/50577025053?text=Vengo+Del+Comando+.owner',
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, {
        quoted: m
    });

    let txt = `👋 *Hola \`${username}\` este es*\n*el contacto de mi creador*`;

    await conn.sendMessage(m.chat, { text: txt });
};

handler.help = ['owner', 'creator'];
handler.tags = ['main'];
handler.command = ['owner','creator','creador','dueño'];

export default handler;