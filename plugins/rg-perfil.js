import moment from 'moment-timezone';
import PhoneNumber from 'awesome-phonenumber';
import fetch from 'node-fetch';

let handler = async (m, { conn, args }) => {
    // Prioridad: args[0] → m.quoted.sender → m.mentionedJid[0] → m.sender
    let userId =
        (args[0] && args[0].includes('@')) ? args[0]
        : (m.quoted && m.quoted.sender) ? m.quoted.sender
        : (m.mentionedJid && m.mentionedJid[0]) ? m.mentionedJid[0]
        : m.sender;

    let user = global.db.data.users[userId] || {};
    let name = await conn.getName(userId);
    let cumpleanos = user.birth || 'No especificado';
    let genero = user.genre || 'No especificado';
    let pareja = user.marry || 'Nadie';
    let description = user.description || 'Sin Descripción';
    let exp = user.exp || 0;
    let nivel = user.level || 0;
    let role = user.role || 'Sin Rango';
    let coins = user.coin || 0;
    let bankCoins = user.bank || 0;
    let perfil = await conn.profilePictureUrl(userId, 'image').catch(_ => 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg');

    let profileText = `
  「 𖤘 *Perfil De Usuario* 」 『@${userId.split('@')[0]}』
   
 ✎ *Dᥱsᥴrі⍴ᥴі᥆́ᥒ:* » ${description}
   
╭──⪩ 𝐔𝐒𝐔𝐀𝐑𝐈𝑶 𝐏𝐑𝐄𝐌𝐈𝐔𝐌 ⪨
┊❀ *N᥆mᑲrᥱ:* » @${userId.split('@')[0]}
┊❖ *Eძᥲძ:* » ${user.age || 'Desconocida'}
┊❀ *Cᥙm⍴ᥣᥱᥲᥒ̃᥆s:* » ${cumpleanos}
┊⚥ *Gᥱᥒᥱr᥆:* » ${genero}
┊♡ *Cᥲsᥲძ@ con:* » ${pareja}
╰───⪨
> ❁ *⍴rᥱmіᥙm* » ${user.premium ? '✅' : '❌'}
╰─────
╭────⪩ 𝐑𝐄𝐂𝐔𝐑𝐒𝐎𝐒 ⪨
│◭ *E᥊⍴ᥱrіᥱᥴіᥲ:* » ${exp.toLocaleString()}
│◭ *ᥒі᥎ᥱᥣ:* » ${nivel}
│⚡︎ *Rᥲᥒg᥆:* » ${role}
│⛁ *ᥴ᥆іᥒs ᥴᥲr𝗍ᥱrᥲ* » ${coins.toLocaleString()} ${moneda}
│⛃ *ᥴ᥆іᥒs ᑲᥲᥒᥴ᥆* » ${bankCoins.toLocaleString()} ${moneda}
┢───⪨ *𝓤𝓼𝓾𝓪𝓻𝓲𝓸 𝓓𝓮𝓼𝓽𝓪𝓬𝓪𝓭𝓸* ⪩ 
> ✧ ⍴ᥲrᥲ ᥱძі𝗍ᥲr 𝗍ᥙ ⍴ᥱr𝖿іᥣ ᥙsᥲ *#perfildates*
╰────⪨
  `.trim();

    await conn.sendMessage(m.chat, {
        image: { url: perfil },
        caption: profileText,
        mentions: [userId],
        buttons: [
            {
                buttonId: '.perfildates',
                buttonText: { displayText: '◆ Editar Perfil' },
                type: 1
            }
        ],
        contextInfo: {
            mentionedJid: [userId]
        }
    }, { quoted: m });
};

handler.help = ['profile'];
handler.tags = ['rg'];
handler.command = ['profile', 'perfil'];

export default handler; 