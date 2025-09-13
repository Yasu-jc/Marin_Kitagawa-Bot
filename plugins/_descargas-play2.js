import axios from "axios";
import yts from "yt-search";
import fetch from "node-fetch";

const handler = async (m, { conn, text, command }) => {
  try {
    if (!text?.trim()) {
      return conn.reply(m.chat, `Escribe el nombre del video que estas buscando o envia un link de YouTube. ξ◕◡◕ξ`, m)
    }

    let results = await yts(text);
    if (!results.videos?.length) {
      return m.reply("No se encontraron resultados para tu búsqueda.");
    }

    let videoInfo = results.videos[0];
    const { title, thumbnail, timestamp, views, ago, url, author } = videoInfo;

    if (command === "play2" || command === "ytmp4") {

      const infoMessage = `
╭ • ┄┄┄┄・𖤍・┄┄┄┄・
┊📺 título: ${title}
┊⏳ duración: ${timestamp || "?"}
┊👁️ vistas: ${formatViews(views)}
┊📅 publicado hace: ${ago || "?"}
┊🔗 link: ${url}
╞ • ┄┄┄┄・♡・┄┄┄┄・
૮꒰ ˶• ༝ •˶꒱ა ♡
`.trim();

      await conn.sendMessage(
        m.chat,
        {
          text: infoMessage,
          contextInfo: {
            externalAdReply: {
              title: title,
              body: author?.name || "YouTube",
              thumbnailUrl: thumbnail,
              sourceUrl: url,
              mediaUrl: url,
              mediaType: 1,
              renderLargerThumbnail: true,
            },
          },
          mentions: [m.sender],
        },
        { quoted: m }
      );


      let estimatedTime = "⏳ El video estará listo en aproximadamente 15-40 segundos...";
      if (timestamp) {

        const [min, sec] = timestamp.split(":").map(n => parseInt(n));
        const totalSeconds = (min || 0) * 60 + (sec || 0);
        if (totalSeconds > 1200) {
          estimatedTime = "⏳ Este video es largo, puede tardar 1-2 minutos en enviarse...";
        } else if (totalSeconds > 600) {
          estimatedTime = "⏳ Puede tardar alrededor de 1 minuto...";
        }
      }

      await conn.sendMessage(m.chat, { text: estimatedTime }, { quoted: m });


      let sources = [
        `https://api.siputzx.my.id/api/d/ytmp4?url=${url}`,
        `https://api.zenkey.my.id/api/download/ytmp4?apikey=zenkey&url=${url}`,
        `https://axeel.my.id/api/download/video?url=${encodeURIComponent(url)}`,
        `https://delirius-apiofc.vercel.app/download/ytmp4?url=${url}`
      ];

      let downloadUrl = await getFirstValidUrl(sources);

      // 📌 Fallback si no funcionó ninguna API
      if (!downloadUrl) {
        const fallback = await youtubeScraper.ytdl(url, "720");
        if (fallback.success) downloadUrl = fallback.data.downloadUrl;
      }

      if (downloadUrl) {
        await conn.sendMessage(
          m.chat,
          {
            video: { url: downloadUrl },
            fileName: `${title}.mp4`,
            mimetype: "video/mp4",
            caption: `${title}`,
            thumbnail: thumbnail,
          },
          { quoted: m }
        );
      } else {
        return m.reply(`⚠︎ *No se pudo descargar el video:* No se encontró un enlace válido.`);
      }
    }
  } catch (error) {
    return m.reply(`⚠︎ *Error:* ${error.message}`);
  }
};

handler.command = ["ytmp4", "play2"];
handler.help = ["ytmp4 *<consulta>*", "play2 *<consulta>*"];
handler.tags = ["downloader"];

export default handler;


async function getFirstValidUrl(sources) {
  const requests = sources.map(src =>
    fetch(src)
      .then(r => r.json())
      .then(json => json?.data?.dl || json?.result?.download?.url || json?.downloads?.url || json?.data?.download?.url)
      .catch(() => null)
  );

  const results = await Promise.allSettled(requests);
  return results.map(r => r.value).find(v => v);
}

function formatViews(views) {
  return views >= 1000
    ? (views / 1000).toFixed(1) + "k (" + views.toLocaleString() + ")"
    : views.toString();
}

class Success {
  constructor(data) {
    this.success = true;
    this.data = data;
  }
}
class ErrorResponse {
  constructor(error) {
    this.success = false;
    this.error = error;
  }
}

const youtubeScraper = {
  ytdl: async (url, quality = "720") => {
    try {
      if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
        return new ErrorResponse({ message: "URL YouTube no válida!" });
      }

      const validQuality = { "480": 480, "1080": 1080, "720": 720, "360": 360 };
      if (!validQuality[quality]) {
        return new ErrorResponse({ message: "Calidad no válida!", availableQuality: Object.keys(validQuality) });
      }

      const { data: firstRequest } = await axios.get(
        `https://p.oceansaver.in/ajax/download.php?format=${validQuality[quality]}&url=${encodeURIComponent(url)}`,
        { timeout: 20000, headers: { "User-Agent": "Mozilla/5.0" } }
      );

      if (!firstRequest?.progress_url) {
        return new ErrorResponse({ message: "Error al iniciar descarga" });
      }

      const { progress_url } = firstRequest;
      let datas;
      let attempts = 0;

      while (!datas?.download_url && attempts < 20) {
        await new Promise(r => setTimeout(r, 1500));
        try {
          const { data } = await axios.get(progress_url, { timeout: 10000 });
          datas = data;
        } catch {}
        attempts++;
      }

      if (!datas?.download_url) {
        return new ErrorResponse({ message: "Timeout en descarga" });
      }

      return new Success({ downloadUrl: datas.download_url, quality, type: "mp4" });
    } catch (error) {
      return new ErrorResponse({ message: error.message || "Error al descargar video" });
    }
  }
};
