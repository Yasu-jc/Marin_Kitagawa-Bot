import fetch from 'node-fetch'; 

let handler = async (m, { conn, usedPrefix, text, args, command }) => {

    try {
        await m.react('🧐');
    } catch (e) {
        console.error("Error al reaccionar:", e);
    }


    const senderName = await conn.getName(m.sender);


    const ownerName = `${etiqueta}`;
    const ownerPhoneNumber = "50577025053"; 
    const ownerEmail = "x"; 
    const ownerGithubUrl = "https://github.com/Yasu-jc/Saki_Ayase-Bot";
    const ownerRegion = "Nicaragua";


    const ownerVcard = `
BEGIN:VCARD
VERSION:3.0
FN: ${ownerName}
item1.TEL;waid=${ownerPhoneNumber}:${ownerPhoneNumber}
item1.X-ABLabel:Número
${ownerEmail !== "x" ? `item2.EMAIL;type=INTERNET: ${ownerEmail}\nitem2.X-ABLabel:Email` : ''}
item3.URL:${ownerGithubUrl}
item3.X-ABLabel:Internet
item4.ADR:;; ${ownerRegion};;;;
item4.X-ABLabel:Región
END:VCARD`;


    const contactsList = [{
        displayName: ownerName,
        vcard: ownerVcard,
    }];


    await conn.sendMessage(m.chat, {
        contacts: {
            displayName: `${contactsList.length} Contacto`,
            contacts: contactsList
        },
        contextInfo: {
            externalAdReply: {
                showAdAttribution: true,
                title: `ΉӨᒪΛ, ƧӨY:\n${global.wm || 'Saki_Ayase-Bot'}`,
                body: global.dev || 'Desarrollador', 
                thumbnailUrl: 'https://i.postimg.cc/5ttCGWzS/6566a3679298a46030e51d633757bcd4.jpg', 
                sourceUrl: `https://wa.me/${ownerPhoneNumber}?text=Vengo+Del+Comando+.owner`,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, {
        quoted: m
    });


    const welcomeMessage = `👋 *Hola \`${senderName}\` este es*\n*el contacto de mi creador*`;
    await conn.sendMessage(m.chat, { text: welcomeMessage });
};

handler.help = ['owner', 'creator'];
handler.tags = ['main'];
handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;