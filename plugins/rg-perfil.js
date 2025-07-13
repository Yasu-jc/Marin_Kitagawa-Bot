import moment from 'moment-timezone';
import PhoneNumber from 'awesome-phonenumber';
import fetch from 'node-fetch';

let handler = async (m, { conn, args }) => {
    let userId;

    if (m.mentionedJid && m.mentionedJid[0]) {
        userId = m.mentionedJid[0];
    } else if (m.quoted && m.quoted.sender) {
        userId = m.quoted.sender;
    } else {
        userId = m.sender;
    }

    global.db.data.users = global.db.data.users || {};
    if (!global.db.data.users[userId]) {
        global.db.data.users[userId] = {
            exp: 0, coin: 10, joincount: 1, diamond: 3, lastadventure: 0, lastclaim: 0,
            health: 100, crime: 0, lastcofre: 0, lastdiamantes: 0, lastpago: 0,
            lastcode: 0, lastcodereg: 0, lastduel: 0, lastmining: 0, muto: false,
            premium: false, premiumTime: 0, registered: false, genre: '', birth: '',
            marry: '', description: '', packstickers: null, name: await conn.getName(userId),
            age: -1, regTime: -1, afk: -1, afkReason: '', role: 'Nuv', banned: false,
            useDocument: false, level: 0, bank: 0, warn: 0,
        };
    }

    let user = global.db.data.users[userId];
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

✎ *Descripción:* » ${description}

╭──⪩ \`INFORMACIÓN\` ⪨
┊❀ *Nombre:* » ${name}
┊❖ *Edad:* » ${user.age !== -1 ? user.age : 'Desconocida'}
┊❀ *Cumpleaños:* » ${cumpleanos}
┊⚥ *Género:* » ${genero}
┊♡ *Casad@ con:* » ${pareja}
╰───⪨
> ❁ *Premium* » ${user.premium ? '✅' : '❌'}

╭────⪩ \`RECURSOS\` ⪨
│◭ *Experiencia:* » ${exp.toLocaleString()}
│◭ *Nivel:* » ${nivel}
│⚡︎ *Rango:* » ${role}
│⛁ *Coins Cartera:* » ${coins.toLocaleString()} ${global.moneda || 'coins'}
│⛃ *Coins Banco:* » ${bankCoins.toLocaleString()} ${global.moneda || 'coins'}
╰────⪨
`.trim();

    
    await conn.sendMessage(m.chat, {
        text: profileText, 
        mentions: [userId],
        contextInfo: {
            mentionedJid: [userId],
            externalAdReply: {
                title: `Perfil de ${name}`, // 
                body: `Usuario registrado`, 
                thumbnailUrl: perfil, 
                sourceUrl: 'https://wa.me/' + userId.split('@')[0], 
                mediaType: 1, 
                renderLargerThumbnail: true, 
            }
        }
    }, { quoted: m });
};

handler.help = ['profile'];
handler.tags = ['rg'];
handler.command = ['profile', 'perfil'];

export default handler;







/*import moment from 'moment-timezone';
import PhoneNumber from 'awesome-phonenumber';
import fetch from 'node-fetch';

let handler = async (m, { conn, args }) => {
    let userId;

    // 1. Intentar con mención directa (ej: @usuario)
    if (m.mentionedJid && m.mentionedJid[0]) {
        userId = m.mentionedJid[0];
    } 
    // 2. Si no hay mención, intentar con el remitente del mensaje citado (si se respondió a alguien)
    else if (m.quoted && m.quoted.sender) {
        userId = m.quoted.sender;
    } 
    // 3. Si no hay mención ni cita, usar el ID del remitente del comando
    else {
        userId = m.sender;
    }

    // Asegurarse de que el usuario exista en la base de datos antes de acceder a sus propiedades
    // Esto es vital para evitar errores si el usuario es nuevo o no tiene datos aún.
    global.db.data.users = global.db.data.users || {}; // Asegura que 'users' existe
    if (!global.db.data.users[userId]) {
        global.db.data.users[userId] = {
            exp: 0,
            coin: 10,
            joincount: 1,
            diamond: 3,
            lastadventure: 0,
            lastclaim: 0,
            health: 100,
            crime: 0,
            lastcofre: 0,
            lastdiamantes: 0,
            lastpago: 0,
            lastcode: 0,
            lastcodereg: 0,
            lastduel: 0,
            lastmining: 0,
            muto: false,
            premium: false,
            premiumTime: 0,
            registered: false,
            genre: '',
            birth: '',
            marry: '',
            description: '',
            packstickers: null,
            name: await conn.getName(userId), // Intentar obtener el nombre aquí
            age: -1,
            regTime: -1,
            afk: -1,
            afkReason: '',
            role: 'Nuv',
            banned: false,
            useDocument: false,
            level: 0,
            bank: 0,
            warn: 0,
        };
    }

    let user = global.db.data.users[userId];
    let name = await conn.getName(userId); // Obtener el nombre de visualización
    let cumpleanos = user.birth || 'No especificado';
    let genero = user.genre || 'No especificado';
    let pareja = user.marry || 'Nadie';
    let description = user.description || 'Sin Descripción';
    let exp = user.exp || 0;
    let nivel = user.level || 0;
    let role = user.role || 'Sin Rango';
    let coins = user.coin || 0;
    let bankCoins = user.bank || 0;
    
    // Obtener foto de perfil
    let perfil = await conn.profilePictureUrl(userId, 'image').catch(_ => 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg');

    let profileText = `
  「 𖤘 *Perfil De Usuario* 」 『@${userId.split('@')[0]}』
   
 ✎ *Dᥱsᥴrі⍴ᥴі᥆́ᥒ:* » ${description}
   
╭──⪩ \`INFORMACIÓN\` ⪨
┊❀ *N᥆mᑲrᥱ:* » ${name}
┊❖ *Eძᥲძ:* » ${user.age !== -1 ? user.age : 'Desconocida'}
┊❀ *Cᥙm⍴ᥣᥱᥲᥒ̃᥆s:* » ${cumpleanos}
┊⚥ *Gᥱᥒᥱr᥆:* » ${genero}
┊♡ *Cᥲsᥲძ@ con:* » ${pareja}
╰───⪨
> ❁ *⍴rᥱmіᥙm* » ${user.premium ? '✅' : '❌'}
╰─────
╭────⪩ \`RECURSOS\` ⪨
│◭ *E᥊⍴ᥱrіᥱᥴіᥲ:* » ${exp.toLocaleString()}
│◭ *ᥒі᥎ᥱᥣ:* » ${nivel}
│⚡︎ *Rᥲᥒg᥆:* » ${role}
│⛁ *ᥴ᥆іᥒs ᥴᥲr𝗍ᥱrᥲ* » ${coins.toLocaleString()} ${global.moneda || 'coins'}
│⛃ *ᥴ᥆іᥒs ᑲᥲᥒᥴ᥆* » ${bankCoins.toLocaleString()} ${global.moneda || 'coins'}
┢───⪨ *𝓤𝓼𝓾𝓪𝓻𝓲𝓸 𝓓𝓮𝓼𝓽𝓪𝓬𝓪𝓭𝓸* ⪩ 
> ✧ ⍴ᥲrᥲ ᥱძі𝗍ᥲr 𝗍ᥙ ⍴ᥱr𝖿іᥣ ᥙsᥲ *#perfildates*
╰────⪨
  `.trim();

    await conn.sendMessage(m.chat, {
        image: { url: perfil },
        caption: profileText,
        mentions: [userId], // Asegura que el usuario sea mencionado en el mensaje
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

export default handler;*/
