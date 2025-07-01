import fetch from 'node-fetch';

let handler = async (m, { conn, args, participants }) => {
    global.db.data.users = global.db.data.users || {};

    let users = Object.entries(global.db.data.users).map(([jid, data]) => ({ ...data, jid }));
    let sortedLevel = users.sort((a, b) => (b.exp || 0) - (a.exp || 0));

    let page = parseInt(args[0]) || 1;
    let pageSize = 10;
    let startIndex = (page - 1) * pageSize;
    let endIndex = startIndex + pageSize;
    let totalPages = Math.ceil(sortedLevel.length / pageSize);


    let topJid = sortedLevel[0]?.jid;
    let topNumero = topJid.split('@')[0];
    let topNombre = await conn.getName(topJid);
    let mostrarTop = /^\d+$/.test(topNumero) ? topNumero : topNombre;

    let fotoTop = 'https://i.imgur.com/JqeuF6b.jpg';
    try {
        fotoTop = await conn.profilePictureUrl(topJid, 'image');
    } catch {}


    let encabezado = `🥇 \`TOP 1\`: 『 @${mostrarTop} 』\n\n`;
    let text = encabezado + `◢✨ *Top de usuarios con más experiencia* ✨◤\n\n`;


    let entries = await Promise.all(
        sortedLevel.slice(startIndex, endIndex).map(async ({ jid, exp, level }, i) => {
            let numero = jid.split('@')[0];
            let nombre = await conn.getName(jid);
            let mostrar = /^\d+$/.test(numero) ? numero : nombre;
            return `✰ ${startIndex + i + 1} » *@${mostrar}*\n\t\t ❖ XP » *${exp}*  ❖ LVL » *${level}*`;
        })
    );

    text += entries.join('\n');
    text += `\n\n> • Página *${page}* de *${totalPages}*`;
    if (page < totalPages) text += `\n> Para ver la siguiente página » *#lb ${page + 1}*`;


    await conn.sendMessage(m.chat, {
        image: { url: fotoTop },
        caption: text.trim(),
        mentions: [topJid, ...sortedLevel.slice(startIndex, endIndex).map(u => u.jid)],
        footer: `${wm}\n${etiqueta}`,
        buttons: [
            {
                buttonId: '.menucompleto',
                buttonText: { displayText: 'Ver menu 👻'},
                type: 1
            }
        ],
        headerType: 4
    }, { quoted: m });
};

handler.help = ['lb'];
handler.tags = ['rpg'];
handler.command = ['lboard', 'top', 'lb'];
handler.group = true;
handler.register = true;
handler.fail = null;
handler.exp = 0;

export default handler;