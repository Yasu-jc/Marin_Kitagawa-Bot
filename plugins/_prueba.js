import yts from "yt-search";

const handler = async (m, { conn, text, command }) => {
  if (!text) return m.reply(`
⚡ Ingresa el nombre de un video o la URL de YouTube.
💡 Usa .help para ver los comandos disponibles.`);

  await m.react("🕛");

  try {
    const res = await yts(text);
    if (!res || !res.videos || res.videos.length === 0) {
      return m.reply("❌ No se encontraron resultados.");
    }

    const video = res.videos[0];
    const title = video.title || "Sin título";
    const authorName = video.author?.name || "Desconocido";
    const durationTimestamp = video.timestamp || "Desconocida";
    const views = video.views || "Desconocidas";
    const url = video.url || "";
    const thumbnail = video.thumbnail || "";

    const isAudio = ["play", "playaudio", "ytmp3"].includes(command);
    const isVideo = ["play2", "playvid", "ytv", "ytmp4"].includes(command);

    const infoMessage = `
╭ • ┄┄┄┄・𖤍・┄┄┄┄・
┊˚ʚ꒰ ᴹᴬᴿᴵᴺ ᴷᴵᵀᴬᴳᴬᵂᴬ ᴮᴼᵀ ꒱ɞ˚ 🍥
╞・┄┄┄┄・♡・┄┄┄┄・
┊🍨 ∿ título: ${title}
┊﹔♡﹒ duración: ${durationTimestamp} ⏳
┊﹔♡﹒ vistas: ${views} 👁‍🗨
┊﹔♡﹒ publicado por: ${authorName} 📅
┊﹔♡﹒ link: ${url} 🔗
╞ • ┄┄┄┄・♡・┄┄┄┄・
> > _Descargando tu ${isAudio ? "audio" : "video"}... por favor espera un momento._
╰ • ┄┄┄┄・𖤍・┄┄┄┄・
 ૮꒰ ˶• ༝ •˶꒱ა ♡
`;

    await conn.sendMessage(m.chat, {
      text: infoMessage,
      contextInfo: {
        externalAdReply: {
          title: `Resultado`,
          body: authorName,
          mediaType: 1,
          thumbnailUrl: thumbnail,
          mediaUrl: url,
          renderLargerThumbnail: null, // ← miniatura grande
        }
      }
    }, { quoted: m });

    // Descargar audio o video
    if (isAudio) {
      await downloadAudio(conn, m, url, title, thumbnail, authorName);
    } else if (isVideo) {
      await downloadVideo(conn, m, url, title, thumbnail, authorName);
    }

    await m.react("✅");

  } catch (error) {
    console.error("❌ Error general:", error);
    await m.reply(`❌ Ocurrió un error: ${error.message}`);
    await m.react("❌");
  }
};

const downloadAudio = async (conn, m, url, title, thumbnail, authorName) => {
  try {
    const cleanTitle = cleanName(title) + ".mp3";
    await conn.sendMessage(m.chat, {
      audio: { url: `http://173.208.200.227:3084/api/ytaudio?url=${encodeURIComponent(url)}` },
      mimetype: "audio/mpeg",
      fileName: cleanTitle,
      contextInfo: {
        externalAdReply: {
          title: `🎧 ¡ᴀǫᴜɪ ᴛɪᴇɴᴇs! ≧◔◡◔≦`,
          body: `${wm}`,
          mediaType: 1,
          thumbnailUrl: `https://i.postimg.cc/NF8BtxYg/20250617-143039.jpg`,
          mediaUrl: url,
          renderLargerThumbnail: true,
        }
      },
      caption: `🎧 Aquí tienes tu audio: *${title}*`
    }, { quoted: m });

    await m.react("✅");
  } catch (error) {
    console.error("❌ Error descargando audio:", error);
    await m.reply(`❌ Error descargando audio: ${error.message}`);
    await m.react("❌");
  }
};

const downloadVideo = async (conn, m, url, title, thumbnail, authorName) => {
  try {
    const cleanTitle = cleanName(title) + ".mp4";
    await conn.sendMessage(m.chat, {
      video: { url: `http://173.208.200.227:3084/api/ytvideo?url=${encodeURIComponent(url)}` },
      mimetype: "video/mp4",
      fileName: cleanTitle,
      contextInfo: {
        externalAdReply: {
          title: title,
          body: authorName,
          mediaType: 2,
          thumbnailUrl: thumbnail,
          mediaUrl: url,
          renderLargerThumbnail: null,
        }
      },
      caption: `📹 Aquí tienes tu video: *${title}*`
    }, { quoted: m });

    await m.react("✅");
  } catch (error) {
    console.error("❌ Error descargando video:", error);
    await m.reply(`❌ Error descargando video: ${error.message}`);
    await m.react("❌");
  }
};

function cleanName(name) {
  return name.replace(/[^\w\s\-_.]/gi, "").substring(0, 50);
}

handler.command = handler.help = ["play", "playaudio", "ytmp3", "play2", "playvid", "ytv", "ytmp4", "yt"];
handler.tags = ["descargas"];

export default handler;
