let handler = async (m, { conn, args, participants }) => {
    let users = Object.entries(global.db.data.users).map(([key, value]) => {
        return { ...value, jid: key };
    });

    let sortedLim = users.sort((a, b) => (b.coin || 0) + (b.bank || 0) - (a.coin || 0) - (a.bank || 0));
    let len = args[0] && args[0].length > 0 ? Math.min(10, Math.max(parseInt(args[0]), 10)) : Math.min(10, sortedLim.length);

    let text = `「${emoji}」Los usuarios con más *${moneda}* son:\n\n`;

    text += await Promise.all(sortedLim.slice(0, len).map(async ({ jid, coin, bank }, i) => {
        let total = (coin || 0) + (bank || 0);
        let name = await conn.getName(jid);
        return `✰ ${i + 1} » *${participants.some(p => jid === p.jid) ? `(${name}) wa.me/` : '@'}${jid.split`@`[0]}:*` +
               `\n> Total→ *¥${total} ${moneda}*`;
    })).then(lines => lines.join('\n'));

    // Obtener la foto del top 1
    let topJid = sortedLim[0]?.jid;
    let topImg;
    try {
        topImg = await conn.profilePictureUrl(topJid, 'image');
    } catch (e) {
        topImg = 'https://i.imgur.com/JqeuF6b.jpg'; // Imagen por defecto si no tiene perfil
    }

    // Enviar todo junto: imagen, caption y botón
    await conn.sendMessage(m.chat, {
        image: { url: topImg },
        caption: text.trim(),
        footer: 'Ranking actualizado',
        buttons: [
            {buttonId: '.lb', buttonText: {displayText: 'Ver leaderboard'}, type: 1}
        ],
        headerType: 4
    }, { quoted: m, mentions: conn.parseMention(text) });
}

handler.help = ['baltop'];
handler.tags = ['rpg'];
handler.command = ['baltop', 'eboard'];
handler.group = true;
handler.register = true;
handler.fail = null;
handler.exp = 0;

export default handler;