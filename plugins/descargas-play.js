import fetch from "node-fetch";
import yts from "yt-search";
import axios from "axios";

const botname = typeof globalThis.botname === "string" ? globalThis.botname : "Marin-Bot ✨";
const packname = typeof globalThis.packname === "string" ? globalThis.packname : "Marin-Bot";
const dev = typeof globalThis.dev === "string" ? globalThis.dev : "Dev";
const icono = typeof globalThis.icono === "string" ? globalThis.icono : "https://i.postimg.cc/NF8BtxYg/20250617-143039.jpg";

const formatAudio = ["mp3", "m4a", "webm", "aac", "flac", "opus", "ogg", "wav"];
const formatVideo = ["360", "480", "720", "1080", "1440", "4k"];

async function cekProgress(id) {
    const config = {
        method: "GET",
        url: `https://p.oceansaver.in/ajax/progress.php?id=${id}`,
        headers: { "User-Agent": "Mozilla/5.0" }
    };
    while (true) {
        try {
            const response = await axios.request(config);
            if (response.data?.success && response.data.progress === 1000) {
                return response.data.download_url;
            }
            await new Promise(r => setTimeout(r, 200)); // Más rápido
        } catch (error) {
            throw error;
        }
    }
}

const ddownr = {
    download: async (url, format) => {
        const config = {
            method: "GET",
            url: `https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`,
            headers: { "User-Agent": "Mozilla/5.0" }
        };
        const response = await axios.request(config);
        if (response.data?.success) {
            const { id, title, info } = response.data;
            const downloadUrl = await cekProgress(id);
            return { id, title, image: info?.image, downloadUrl };
        } else {
            throw new Error("⛔ No se pudo obtener detalles del video");
        }
    }
};

async function formatViews(views) {
    if (views == null) return "Desconocido";
    if (typeof views === "string" && /^\d+$/.test(views)) views = Number(views);
    if (!Number.isFinite(views)) return "Desconocido";
    return views >= 1000
        ? (views / 1000).toFixed(1) + "k (" + views.toLocaleString() + ")"
        : String(views);
}

async function playAudio(conn, m, videoInfo) {
    const { title, thumbnail, url, author } = videoInfo;
    await m.react('🎧');

    await conn.sendMessage(m.chat, {
        text: `\`𖹭︩︪Descargando𖹭︩︪:\` ${title}\n> Espera un momento...`,
        contextInfo: {
            externalAdReply: {
                title: "🎵 Audio en progreso",
                body: `${author?.name || 'Desconocido'} - ${title}`,
                thumbnailUrl: thumbnail || icono,
                thumbnail: await (await fetch(thumbnail || icono)).buffer(),
                mediaType: 1,
                sourceUrl: url,
                renderLargerThumbnail: false
            }
        }
    }, { quoted: m });

    try {
        const result = await Promise.any(formatAudio.map(async (format) => {
            const api = await ddownr.download(url, format);
            if (!api?.downloadUrl) throw new Error(`Formato falló: ${format}`);
            return { ...api, format };
        }));

        await conn.sendMessage(m.chat, {
            audio: { url: result.downloadUrl },
            mimetype: "audio/mpeg",
            fileName: `${result.title || "audio"}.${result.format}`
        }, { quoted: m });
    } catch (e) {
        await conn.reply(m.chat, "❌ No se pudo descargar el audio en ningún formato.", m);
    }
}

async function play2Video(conn, m, videoInfo) {
    const { title, thumbnail, url, author } = videoInfo;
    await m.react('📥');

    await conn.sendMessage(m.chat, {
        text: `\`𖹭︩︪Descargando𖹭︩︪:\` ${title}`,
        contextInfo: {
            externalAdReply: {
                title: "🎥 Video en progreso",
                body: `${author?.name || 'Desconocido'} - ${title}`,
                thumbnailUrl: thumbnail || icono,
                thumbnail: await (await fetch(thumbnail || icono)).buffer(),
                mediaType: 1,
                sourceUrl: url,
                renderLargerThumbnail: false
            }
        }
    }, { quoted: m });

    const sources = [
        `https://api.siputzx.my.id/api/d/ytmp4?url=${url}`,
        `https://api.zenkey.my.id/api/download/ytmp4?apikey=zenkey&url=${url}`,
        `https://axeel.my.id/api/download/video?url=${encodeURIComponent(url)}`,
        `https://delirius-apiofc.vercel.app/download/ytmp4?url=${url}`
    ];

    const timeout = (ms) => new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), ms));

    try {
        const downloadUrl = await Promise.any(
            sources.map(source =>
                Promise.race([
                    fetch(source).then(res => res.json()),
                    timeout(5000)
                ]).then(data => {
                    const link = data?.data?.dl || data?.result?.download?.url || data?.downloads?.url || data?.data?.download?.url;
                    if (!link) throw new Error("Sin enlace");
                    return link;
                })
            )
        );

        await conn.sendMessage(m.chat, {
            video: { url: downloadUrl },
            fileName: `${title}.mp4`,
            mimetype: "video/mp4",
            caption: `🎬 ${title}\n> ${packname} | ${dev}`
        }, { quoted: m });
    } catch (e) {
        console.error("❌ Ninguna fuente de video respondió:", e.message);
        await conn.reply(m.chat, "❌ No se pudo obtener un enlace válido de descarga.", m);
    }
}

const handler = async (m, { conn, text, command, args }) => {
    if (!text) return conn.reply(m.chat, "❗ Ingresa el nombre o enlace de YouTube", m);
    const search = await yts(text.trim());
    if (!search.all.length) return conn.reply(m.chat, "❌ No se encontraron resultados.", m);
    const videoInfo = search.all[0];

    switch (command) {
        case "play":
        case "p":
        case "yta":
        case "ytmp3":
            return await playAudio(conn, m, videoInfo);

        case "play2":
        case "ytv":
        case "ytmp4":
            return await play2Video(conn, m, videoInfo);

        default:
            return;
    }
};

handler.before = async (m, { conn }) => {
    if (!m.text || m.isBaileys || m.fromMe) return false;
    const text = m.text.trim().toLowerCase();

    const directCommands = {
        "play": "play",
        "play2": "play2"
    };

    for (let key in directCommands) {
        if (text === key) {
            await handler(m, { conn, text: "", command: key, args: [] });
            return true;
        }
        if (text.startsWith(`${key} `)) {
            const q = text.slice(key.length).trim();
            await handler(m, { conn, text: q, command: key, args: [q] });
            return true;
        }
    }

    return false;
};

handler.command = handler.help = ["play", "play2", "p", "yta", "ytmp3", "ytv", "ytmp4"];
handler.tags = ["downloader"];
handler.register = true;
handler.limit = 1;

export default handler;














/*import fetch from "node-fetch";
import yts from "yt-search";
import axios from "axios";

const botname = typeof globalThis.botname === "string" ? globalThis.botname : "Marin-Bot ✨";
const packname = typeof globalThis.packname === "string" ? globalThis.packname : "Marin-Bot";
const dev = typeof globalThis.dev === "string" ? globalThis.dev : "Dev";

const icono = typeof globalThis.icono === "string" ? globalThis.icono : "https://i.postimg.cc/NF8BtxYg/20250617-143039.jpg";

const formatAudio = ["mp3", "m4a", "webm", "aac", "flac", "opus", "ogg", "wav"];
const formatVideo = ["360", "480", "720", "1080", "1440", "4k"];

async function cekProgress(id) {
    const config = {
        method: "GET",
        url: `https://p.oceansaver.in/ajax/progress.php?id=${id}`,
        headers: { "User-Agent": "Mozilla/5.0" }
    };
    while (true) {
        try {
            const response = await axios.request(config);
            if (response.data?.success && response.data.progress === 1000) {
                return response.data.download_url;
            }
            await new Promise(r => setTimeout(r, 1000));
        } catch (error) {
            throw error;
        }
    }
}

const ddownr = {
    download: async (url, format) => {
        if (!formatAudio.includes(format) && !formatVideo.includes(format)) {
            throw new Error("⚠️ Formato no soportado");
        }
        const config = {
            method: "GET",
            url: `https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`,
            headers: { "User-Agent": "Mozilla/5.0" }
        };
        const response = await axios.request(config);
        if (response.data?.success) {
            const { id, title, info } = response.data;
            const downloadUrl = await cekProgress(id);
            return { id, title, image: info?.image, downloadUrl };
        } else {
            throw new Error("⛔ No se pudo obtener detalles del video");
        }
    }
};

async function formatViews(views) {
    if (views == null) return "Desconocido";
    if (typeof views === "string" && /^\d+$/.test(views)) views = Number(views);
    if (!Number.isFinite(views)) return "Desconocido";
    return views >= 1000
        ? (views / 1000).toFixed(1) + "k (" + views.toLocaleString() + ")"
        : String(views);
}

// Función para reproducir audio (solo texto de información, sin imagen separada, y audio como archivo normal)
async function playAudio(conn, m, videoInfo) { // Recibe videoInfo directamente
    const { title, thumbnail, timestamp, views, ago, url, author } = videoInfo;
    const vistas = await formatViews(views);

    // Se eliminó el envío de la imagen del video por separado aquí

    const infoMessage = `
ִ𝆬 ⭒   .·:¨¨:·.♡.·:¨¨:·.   ·
╭︵୨♡୧‿︵‿୨${botname}୧‿︵‿୨♡୧︵╮

> ❥⊰⏤͟͟͞͞Título :⊱ ${title}
°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°
❥⊰⏤͟͟͞͞Duración :⊱ ${timestamp}
°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°
❥⊰⏤͟͟͞͞Vistas :⊱ ${vistas}
°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°
❥⊰⏤͟͟͞͞Canal :⊱ ${videoInfo.author.name || 'Desconocido'}
°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°
❥⊰⏤͟͟͞Publicado :⊱ ${ago}
°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°
❥⊰⏤͟͟͞͞Enlace :⊱ ${url}
꒷ଓ︶꒷꒦⊹˚₊꒷︶ଓ︶︶ଓ︶꒷꒦⊹˚₊꒷︶ଓ꒷`;

    await conn.sendMessage(m.chat, {
        text: infoMessage,
        footer: `${packname} | ${dev}`,
        headerType: 4,
        
    }, { quoted: m });

    const sentDownloadingMsg = await conn.reply(m.chat, `🎶 Descargando ${title}, espera un momento...`, m);

    try {
        const api = await ddownr.download(url, "mp3");
        const safeTitle = api.title || "audio";

        if (api.downloadUrl) {
            await conn.sendMessage(m.chat, {
  audio: { url: api.downloadUrl },
  mimetype: "audio/mpeg",
  fileName: `${safeTitle}.mp3`
}, { quoted: fkontak });
        } else {
            await conn.reply(m.chat, "❌ No se pudo obtener la URL de descarga del audio.", m);
        }

        await conn.sendMessage(m.chat, { delete: sentDownloadingMsg.key });

    } catch (e) {
        await conn.reply(m.chat, "❌ Error al descargar el audio. Intenta con un enlace directo si persiste el problema.", m);
        console.error("Error al descargar o enviar el audio (comando play):", e);
    }
}

// Función para reproducir video (mantiene el mensaje de información y fkontak)
async function play2Video(conn, m, queryText) {
    const search = await yts(queryText);
    if (!search.all.length) return conn.reply(m.chat, "❌ No se encontraron resultados.", m);

    const videoInfo = search.all[0];
    const { title, thumbnail, timestamp, views, ago, url, author } = videoInfo;
    const vistas = await formatViews(views);

    const infoMessage = `
ִ𝆬 ⭒   .·:¨¨:·.♡.·:¨¨:·.   ·
╭︵୨♡୧‿︵‿୨${botname}୧‿︵‿୨♡୧︵╮

> ❥⊰⏤͟͟͞͞Título :⊱ ${title}
°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°
❥⊰⏤͟͟͞͞Duración :⊱ ${timestamp}
°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°
❥⊰⏤͟͟͞͞Vistas :⊱ ${vistas}
°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°
❥⊰⏤͟͟͞͞Canal :⊱ ${videoInfo.author.name || 'Desconocido'}
°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°
❥⊰⏤͟͟͞Publicado :⊱ ${ago}
°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°
❥⊰⏤͟͟͞͞Enlace :⊱ ${url}
꒷ଓ︶꒷꒦⊹˚₊꒷︶ଓ︶︶ଓ︶꒷꒦⊹˚₊꒷︶ଓ꒷`;


    await conn.sendMessage(m.chat, {
        text: infoMessage,
        footer: `${packname} | ${dev}`,
        headerType: 4,
        contextInfo: {
            externalAdReply: {
                showAdAttribution: true,
                title: "Información del Video",
                body: title,
                thumbnailUrl: thumbnail || icono,
                mediaType: 1,
                renderLargerThumbnail: true,
                sourceUrl: url,
                thumbnail: await (await fetch(thumbnail || icono)).buffer(),
                containsAutoReply: true
            }
        }
    }, { quoted: m });

    const sentDownloadingMsg = await conn.reply(m.chat, "⏳ Buscando mejor enlace para video...", m);

    const sources = [
        `https://api.siputzx.my.id/api/d/ytmp4?url=${url}`,
        `https://api.zenkey.my.id/api/download/ytmp4?apikey=zenkey&url=${url}`,
        `https://axeel.my.id/api/download/video?url=${encodeURIComponent(url)}`,
        `https://delirius-apiofc.vercel.app/download/ytmp4?url=${url}`
    ];

    let sentVideo = false;

    for (const source of sources) {
        try {
            const res = await fetch(source);
            const dataRes = await res.json();

            const downloadUrl = dataRes?.data?.dl || dataRes?.result?.download?.url || dataRes?.downloads?.url || dataRes?.data?.download?.url;

            if (downloadUrl) {
                await conn.sendMessage(m.chat, {
                    video: { url: downloadUrl },
                    fileName: `${title}.mp4`,
                    mimetype: "video/mp4",
                    caption: `🎬 ${title}\n> ${packname} | ${dev}`
                }, { quoted: m });

                sentVideo = true;
                break;
            }
        } catch (e) {
            console.error(`Error en fuente ${source}:`, e.message);
        }

    }

    await conn.deleteMessage(m.chat, sentDownloadingMsg.key);

    if (!sentVideo) {
        await conn.reply(m.chat, "❌ No se pudo obtener un enlace válido de descarga.", m);
    }
}

const handler = async (m, { conn, text = "", command, args }) => {
    // Comandos con prefijo

    if (["play", "p"].includes(command)) {
        if (!text || !text.trim()) {
            return conn.reply(m.chat, `🎶 Ingresa el nombre o enlace de la música.`, m);
        }
        await m.react('🎧');
        const search = await yts(text.trim());
        if (!search.all.length) return conn.reply(m.chat, "❌ No se encontraron resultados.", m);
        const videoInfo = search.all[0];
        return await playAudio(conn, m, videoInfo);
    }

    if (command === "play2") {
        if (!text || !text.trim()) {
            return conn.reply(m.chat, `🎬 Ingresa el nombre o enlace del video.`, m);
        }
        await m.react('🎥');
        return await play2Video(conn, m, text.trim());
    }

    if (["yta", "ytmp3"].includes(command)) {
        const url = args[0];
        if (!url || !url.includes("youtu")) return conn.reply(m.chat, "❌ Enlace inválido de YouTube.", m);
        await m.react('🎶');
        const sentMsg = await conn.reply(m.chat, "🎵 Descargando audio, espera un momento...", m);

        const search = await yts(url); // Se busca una sola vez aquí
        if (!search.all.length) {
            await conn.sendMessage(m.chat, { delete: sentMsg.key }); // Eliminar el mensaje de "Descargando"
            return conn.reply(m.chat, "❌ No se encontraron resultados para el enlace.", m);
        }
        const videoInfo = search.all[0];
        const { title, thumbnail } = videoInfo;

        // Se eliminó el envío de la imagen del video por separado aquí

        try {
            const api = await ddownr.download(url, "mp3");
            const safeTitle = api.title || "audio";

            await conn.sendMessage(m.chat, {
                audio: { url: api.downloadUrl },
                mimetype: "audio/mpeg",
                fileName: `${safeTitle}.mp3`,
                // Se eliminó ptt: true para que no sea nota de voz
                // Se eliminó todo el contextInfo para que el audio no tenga fkontak ni vista previa
            }, { quoted: m });

            await conn.sendMessage(m.chat, { delete: sentMsg.key });

        } catch (e) {
            await conn.reply(m.chat, "❌ Error al descargar el audio.", m);
            console.error(e);
        }
        return;

    }

    if (["ytv", "ytmp4"].includes(command)) {
        const url = args[0];
        if (!url || !url.includes("youtu")) return conn.reply(m.chat, "❌ Enlace inválido de YouTube.", m);
        await m.react('📥');
        const sentMsg = await conn.reply(m.chat, "⏳ Buscando mejor enlace para video...", m);

        const sources = [
            `https://api.siputzx.my.id/api/d/ytmp4?url=${url}`,
            `https://api.zenkey.my.id/api/download/ytmp4?apikey=zenkey&url=${url}`,
            `https://axeel.my.id/api/download/video?url=${encodeURIComponent(url)}`,
            `https://delirius-apiofc.vercel.app/download/ytmp4?url=${url}`
        ];

        let sentVideo = false;

        for (const source of sources) {
            try {
                const res = await fetch(source);
                const dataRes = await res.json();

                const downloadUrl = dataRes?.data?.dl || dataRes?.result?.download?.url || dataRes?.downloads?.url || dataRes?.data?.download?.url;

                if (downloadUrl) {
                    await conn.sendMessage(m.chat, {
                        video: { url: downloadUrl },
                        fileName: `${url}.mp4`,
                        mimetype: "video/mp4",
                        caption: `🎬 Video descargado\n> ${packname} | ${dev}`
                    }, { quoted: m });

                    sentVideo = true;
                    break;
                }
            } catch (e) {
                console.error(`Error en fuente ${source}:`, e.message);
            }
        }

        await conn.deleteMessage(m.chat, sentMsg.key);

        if (!sentVideo) return conn.reply(m.chat, "❌ No se pudo obtener un enlace válido de descarga.", m);
        return;

    }
};

// Este bloque se ejecuta antes de manejar comandos para capturar "play" sin prefijo y demás
handler.before = async (m, { conn }) => {
    if (!m.text || m.isBaileys || m.fromMe) return false;
    const text = m.text.trim().toLowerCase();

    if (text === "play") {
        // Solo "play" sin argumento
        await handler(m, { conn, text: "", command: "play", args: [] });
        return true;
    }

    if (text.startsWith("play ")) {
        const query = m.text.trim().slice(5).trim();
        await handler(m, { conn, text: query, command: "play", args: [query] });
        return true;
    }

    if (text === "play2") {
        await handler(m, { conn, text: "", command: "play2", args: [] });
        return true;
    }

    if (text.startsWith("play2 ")) {
        const query = m.text.trim().slice(6).trim();
        await handler(m, { conn, text: query, command: "play2", args: [query] });
        return true;
    }

    return false;
};

handler.command = handler.help = ["play", "play2", "p", "yta", "ytmp3", "ytv", "ytmp4"];
handler.tags = ["downloader"];
handler.register = true;
handler.limit = 1;

export default handler;*/
