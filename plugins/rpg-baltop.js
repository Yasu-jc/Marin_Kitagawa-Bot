import fetch from 'node-fetch';

let handler = async (m, { conn, args }) => {
    global.db.data.users = global.db.data.users || {};

    let users = Object.entries(global.db.data.users).map(([jid, data]) => ({ ...data, jid }));
    let sorted = users.sort((a, b) => ((b.coin || 0) + (b.bank || 0)) - ((a.coin || 0) + (a.bank || 0)));
    let top = args[0] && !isNaN(args[0]) ? Math.min(10, Math.max(parseInt(args[0]), 1)) : 10;

    let text = `〔 💸 *Top Usuarios con mas ${moneda}* 〕\n\n`;

    text += await Promise.all(
        sorted.slice(0, top).map(async (user, i) => {
            let numero = user.jid.split('@')[0];
            let nombre = await conn.getName(user.jid);
            let mostrar = /^\d+$/.test(numero) ? numero : nombre;
            let total = (user.coin || 0) + (user.bank || 0);
            return `✰ ${i + 1} » *@${mostrar}*\n> Total→ *¥${total.toLocaleString()} ${global.moneda || 'coins'}*`;
        })
    ).then(lines => lines.join('\n'));

    // Obtener foto y nombre del TOP 1
    let topJid = sorted[0]?.jid;
    let topImg = 'https://i.imgur.com/JqeuF6b.jpg';
    try {
        topImg = await conn.profilePictureUrl(topJid, 'image');
    } catch {}

    let topNumero = topJid.split('@')[0];
    let topNombre = await conn.getName(topJid);
    let mostrarTop = /^\d+$/.test(topNumero) ? topNumero : topNombre;
    let totalTop = (sorted[0]?.coin || 0) + (sorted[0]?.bank || 0);

    // Texto destacado para el TOP 1, que irá en el 'caption'
    let textoDestacadoTop1 =  `『 *@${mostrarTop}* 』 es el top 1 \n` +
                             `💰 Total: *¥${totalTop.toLocaleString()} ${global.moneda || 'coins'}*\n\n` +
                             `-----------------------------------\n\n`; // Separador visual

    await conn.sendMessage(m.chat, {
        image: { url: topImg },
        // Combinamos el texto destacado del TOP 1 con el resto de la lista
        caption: textoDestacadoTop1 + text.trim(),
        mentions: [topJid, ...sorted.slice(0, top).map(u => u.jid)],
        footer: 'Ranking actualizado',
        buttons: [
            {
                buttonId: '.lb',
                buttonText: { displayText: '❀ Ver leaderboard' },
                type: 1
            }
        ],
        headerType: 4
    }, { quoted: m });
};

handler.help = ['baltop'];
handler.tags = ['rpg'];
handler.command = ['baltop', 'eboard'];
handler.group = true;
handler.register = true;
handler.fail = null;
handler.exp = 0;

export default handler;

