import ws from 'ws'

let handler = async (m, { conn, usedPrefix, isRowner }) => {
    // Variables globales con valores por defecto si no existen
    const botname = typeof global.botname === 'string' ? global.botname : 'MiBot';
    const etiqueta = typeof global.etiqueta === 'string' ? global.etiqueta : '@Yasu-jc';
    const avatar = typeof global.avatar === 'string' ? global.avatar : 'https://i.imgur.com/JP52fdP.jpg';
    const vs = typeof global.vs === 'string' ? global.vs : '1.0.0';
    const fkontak = typeof global.fkontak === 'object' ? global.fkontak : {};

    // Uptime
    let _uptime = process.uptime() * 1000;
    let uptime = clockString(_uptime);

    // Total de usuarios registrados
    let totalreg = Object.keys(global.db.data?.users || {}).length;

    // Total de chats y grupos
    const chats = Object.entries(conn.chats || {}).filter(([id, data]) => id && data.isChats);
    const groupsIn = chats.filter(([id]) => id.endsWith('@g.us'));
    const totalChats = chats.length;
    const totalGroups = groupsIn.length;
    const privateChats = totalChats - totalGroups;

    // Sub-bots activos (si usas multi-conexión)
    const users = [...new Set([
        ...(global.conns || []).filter((c) => c.user && c.ws?.socket && c.ws.socket.readyState !== ws.CLOSED)
    ])];
    const totalUsers = users.length;

    // Medición real de velocidad
    let old = performance.now();
    // Puedes poner un pequeño cálculo aquí si quieres medir "real speed"
    let speed = performance.now() - old;

    // Texto del estado
    let info = `ᥫ᭡ Información - ${botname} ❀\n`
    info += `ᰔᩚ  *◜Creador◞* ⇢ ${etiqueta}\n`
    info += `🜸  *◜Prefijo◞* ⇢ [ ${usedPrefix} ]\n`
    info += `✧  *◜Versión◞* ⇢ ${vs}\n`
    info += `❖  *◜Chats Privados◞* ⇢ ${privateChats}\n`
    info += `✎  *◜Total De Chats◞* ⇢ ${totalChats}\n`
    info += `❍  *◜Usuarios◞* ⇢ ${totalreg}\n`
    info += `❑  *◜Grupos◞* ⇢ ${totalGroups}\n`
    info += `✰  *◜Actividad◞* ⇢ ${uptime}\n`
    info += `ⴵ  *◜Velocidad◞* ⇢ ${(speed * 1000).toFixed(0) / 1000}\n`
    info += `✦  *◜Sub-Bots Activos◞* ⇢ ${totalUsers || '0'}`

    // Envía la imagen con el estado
    try {
        await conn.sendFile(m.chat, avatar, 'estado.jpg', info, fkontak)
    } catch (e) {
        await conn.reply(m.chat, info, m)
    }
};

handler.help = ['estado']
handler.tags = ['info']
handler.command = ['estado', 'status', 'estate', 'state', 'stado', 'stats']
handler.register = true

export default handler

function clockString(ms) {
    let seconds = Math.floor((ms / 1000) % 60);
    let minutes = Math.floor((ms / (1000 * 60)) % 60);
    let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    return `${hours}h ${minutes}m ${seconds}s`;
}