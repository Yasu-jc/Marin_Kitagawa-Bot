import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
    try { await m.react('🧐'); } catch (e) {}

    const senderName = await conn.getName(m.sender);
    const senderMention = `@${m.sender.split('@')[0]}`; // 👈 para mención directa

    // Definir etiqueta por defecto si no existe
    const etiqueta = global.etiqueta || 'Saki_Ayase-Bot Owner';

    const owner1 = {
        name: etiqueta,
        number: '50577025053',
        email: 'x',
        github: 'https://github.com/Yasu-jc/Saki_Ayase-Bot',
        region: 'Nicaragua'
    };

    const owner2 = {
        name: '𝔯𝔲𝔦𝔷 𝔇𝔬𝔪𝔦𝔫𝔞😈👺',
        number: '526636700428',
        email: 'X',
        github: 'X',
        region: 'México'
    };

    const createVCard = (owner) => `
BEGIN:VCARD
VERSION:3.0
FN:${owner.name}
item1.TEL;waid=${owner.number}:${owner.number}
item1.X-ABLabel:Número
${owner.email !== "x" ? `item2.EMAIL;type=INTERNET:${owner.email}\nitem2.X-ABLabel:Email` : ''}
item3.URL:${owner.github}
item3.X-ABLabel:GitHub
item4.ADR:;;${owner.region};;;;
item4.X-ABLabel:Región
END:VCARD`;

    const contactsList = [
        { displayName: owner1.name, vcard: createVCard(owner1) },
        { displayName: owner2.name, vcard: createVCard(owner2) }
    ];

    // Descargar imagen como buffer
    const getBuffer = async (url) => {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Error al obtener la imagen');
        return await res.buffer();
    };

    const thumbnailBuffer = await getBuffer('https://i.postimg.cc/90n5XzPC/78d4531fc65ffda93012747d66b6c435.jpg');

    // Enviar tarjeta de contactos
    const contactMsg = await conn.sendMessage(m.chat, {
        contacts: {
            displayName: `${contactsList.length} Contactos`,
            contacts: contactsList
        },
        contextInfo: {
            externalAdReply: {
                title: `ΉӨᒪΛ, ƧӨY:\n${global.wm || 'Saki_Ayase-Bot'}`,
                body: global.dev || 'Desarrollador',
                thumbnail: thumbnailBuffer,
                sourceUrl: `https://wa.me/${owner1.number}?text=Vengo+Del+Comando+.owner`,
                mediaType: 2,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });

    // Enviar mensaje de bienvenida con mención directa
    const welcomeMessage = `👋 Hola ${senderMention}, este es el contacto de mis desarrolladores`;

    await conn.sendMessage(m.chat, {
        text: welcomeMessage,
        mentions: [m.sender], 
        quoted: contactMsg
    });
};

handler.help = ['owner', 'creator'];
handler.tags = ['main'];
handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler





/*import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
    try {
        await m.react('🧐');
    } catch (e) {
        console.error("Error al reaccionar:", e);
    }

    const senderName = await conn.getName(m.sender);
    const ownerName = `${global.etiqueta || 'Saki_Ayase-Bot Owner'}`;
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

    
    const contactMsg = await conn.sendMessage(m.chat, {
        contacts: {
            displayName: `${contactsList.length} Contacto`,
            contacts: contactsList
        },
        contextInfo: {
            externalAdReply: {
                title: `ΉӨᒪΛ, ƧӨY:\n${global.wm || 'Saki_Ayase-Bot'}`,
                body: global.dev || 'Desarrollador',
                thumbnailUrl: 'https://i.postimg.cc/5ttCGWzS/6566a3679298a46030e51d633757bcd4.jpg',
                sourceUrl: `https://wa.me/${ownerPhoneNumber}?text=Vengo+Del+Comando+.owner`,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });

    
    const welcomeMessage = `👋 *Hola \`${senderName}\` este es*\n*el contacto de mi creador*`;
    await conn.sendMessage(m.chat, {
        text: welcomeMessage,
        quoted: contactMsg 
    });
};

handler.help = ['owner', 'creator'];
handler.tags = ['main'];
handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;*/
