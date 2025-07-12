
/*

let handler = async (m, { conn, text }) => {

let user = global.db.data.users[m.sender]

user.registered = false
return conn.reply(m.chat, `${emoji} Tu registro fue borrado de mi base de datos.`, m)

}
handler.help = ['unreg']
handler.tags = ['rg']
handler.command = ['unreg']
handler.register = true
export default handler
*/


let handler = async (m, { conn, text }) => {
  let user = global.db.data.users[m.sender];
  user.registered = false;

  // Obtener la foto de perfil del usuario, si falla usar una imagen por defecto GRANDE
  let pp;
  try {
    pp = await conn.profilePictureUrl(m.sender, "image");
  } catch {
    pp = "https://telegra.ph/file/6d16dabfa8dacc87f03c3.jpg"; // Imagen de respaldo (grande, cuadrada)
  }

  // Mensaje con vista previa tipo link usando la foto, en GRANDE
  await conn.sendMessage(m.chat, {
    text: "❌ Tu registro fue borrado de mi base de datos.",
    contextInfo: {
      externalAdReply: {
        title: "Registro eliminado",
        body: "Tu información fue borrada.",
        mediaType: 1,
        thumbnailUrl: pp, // OBLIGATORIO para imagen grande
        renderLargerThumbnail: false, 
        previewType: "PHOTO", // Opcional
        sourceUrl: "https://wa.me/" + m.sender.split("@")[0] // Opcional, para mostrar el enlace
      }
    }
  }, { quoted: m });
};

handler.help = ['unreg'];
handler.tags = ['rg'];
handler.command = ['unreg'];
handler.register = true;

export default handler;
