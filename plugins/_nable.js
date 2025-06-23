/*import { createHash } from 'crypto' 
import fetch from 'node-fetch'

const handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
  let chat = global.db.data.chats[m.chat]
  let user = global.db.data.users[m.sender]
  let bot = global.db.data.settings[conn.user.jid] || {}
  let type = command.toLowerCase()
  let isAll = false, isUser = false
  let isEnable = chat[type] || false

  if (args[0] === 'on' || args[0] === 'enable') {
    isEnable = true;
} else if (args[0] === 'off' || args[0] === 'disable') {
    isEnable = false
} else {
    const estado = isEnable ? '✓ Activado' : '✗ Desactivado'
    return conn.reply(m.chat, `「✦」Un administrador puede activar o desactivar el *${command}* utilizando:\n\n> ✐ *${usedPrefix}${command} on* para activar.\n> ✐ *${usedPrefix}${command} off* para desactivar.\n\n✧ Estado actual » *${estado}*`, m)
  }

  switch (type) {
    case 'welcome':
    case 'bienvenida':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.welcome = isEnable
      break  
      
    case 'antiprivado':
    case 'antiprivate':
      isAll = true
      if (!isOwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      bot.antiPrivate = isEnable
      break

    case 'restrict':
    case 'restringir':
      isAll = true
      if (!isOwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      bot.restrict = isEnable
      break

    case 'antibot':
    case 'antibots':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiBot = isEnable
      break

    case 'autoaceptar':
    case 'aceptarauto':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.autoAceptar = isEnable
      break

    case 'autorechazar':
    case 'rechazarauto':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.autoRechazar = isEnable
      break

    case 'autoresponder':
    case 'autorespond':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.autoresponder = isEnable
      break

    case 'antisubbots':
    case 'antibot2':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiBot2 = isEnable
      break

    case 'modoadmin':
    case 'soloadmin':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      chat.modoadmin = isEnable;
      break;

    case 'reaction':
    case 'reaccion':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.reaction = isEnable
      break
      
    case 'nsfw':
    case 'modohorny':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.nsfw = isEnable
      break 

    case 'jadibotmd':
    case 'modejadibot':
      isAll = true
      if (!isOwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      bot.jadibotmd = isEnable
      break

    case 'detect':
    case 'avisos':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!(isAdmin|| isOwner)) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.detect = isEnable
      break

    case 'antilink':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiLink = isEnable
      break

      case 'antifake':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antifake = isEnable
      break
  }
  
  chat[type] = isEnable;
  
  conn.reply(m.chat, `《✦》La función *${type}* se *${isEnable ? 'activó' : 'desactivó'}* ${isAll ? 'para este Bot' : isUser ? '' : 'para este chat'}`, m);
};

handler.help = ['welcome', 'bienvenida', 'antiprivado', 'antiprivate', 'restrict', 'restringir', 'autolevelup', 'autonivel', 'antibot', 'antibots', 'autoaceptar', 'aceptarauto', 'autorechazar', 'rechazarauto', 'autoresponder', 'autorespond', 'antisubbots', 'antibot2', 'modoadmin', 'soloadmin', 'reaction', 'reaccion', 'nsfw', 'modohorny', 'antispam', 'jadibotmd', 'modejadibot', 'subbots', 'detect', 'avisos', 'antilink']
handler.tags = ['nable'];
handler.command = ['welcome', 'bienvenida', 'antiprivado', 'antiprivate', 'restrict', 'restringir', 'autolevelup', 'autonivel', 'antibot', 'antibots', 'autoaceptar', 'aceptarauto', 'autorechazar', 'rechazarauto', 'autoresponder', 'autorespond', 'antisubbots', 'antibot2', 'modoadmin', 'soloadmin', 'reaction', 'reaccion', 'nsfw', 'modohorny', 'antispam', 'jadibotmd', 'modejadibot', 'subbots', 'detect', 'avisos', 'antilink','antifake']

export default handler*/


import { createHash } from 'crypto';
import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin }) => {
  const chat = global.db.data.chats[m.chat];
  const user = global.db.data.users[m.sender];
  const bot = global.db.data.settings[conn.user.jid] || {};
  const type = command.toLowerCase();

  const isGroup = !!m.isGroup;
  const isEnable = /^(on|enable)$/i.test(args[0]) ? true : /^(off|disable)$/i.test(args[0]) ? false : null;

  if (isEnable === null) {
    const estado = chat[type] || false;
    const estadoTexto = estado ? '✓ Activado' : '✗ Desactivado';
    return conn.reply(m.chat,
      `「✦」Un administrador puede activar o desactivar el *${command}* usando:\n\n` +
      `> ✐ *${usedPrefix + command} on* para activar.\n` +
      `> ✐ *${usedPrefix + command} off* para desactivar.\n\n` +
      `✧ Estado actual » *${estadoTexto}*`, m);
  }

  const opciones = {
    welcome: { chatProp: 'welcome', group: true, admin: true },
    bienvenida: { chatProp: 'welcome', group: true, admin: true },
    antiprivado: { botProp: 'antiPrivate', owner: true },
    antiprivate: { botProp: 'antiPrivate', owner: true },
    restrict: { botProp: 'restrict', owner: true },
    restringir: { botProp: 'restrict', owner: true },
    antibot: { chatProp: 'antiBot', group: true, admin: true },
    antibots: { chatProp: 'antiBot', group: true, admin: true },
    autoaceptar: { chatProp: 'autoAceptar', group: true, admin: true },
    aceptarauto: { chatProp: 'autoAceptar', group: true, admin: true },
    autorechazar: { chatProp: 'autoRechazar', group: true, admin: true },
    rechazarauto: { chatProp: 'autoRechazar', group: true, admin: true },
    autoresponder: { chatProp: 'autoresponder', group: true, admin: true },
    autorespond: { chatProp: 'autoresponder', group: true, admin: true },
    antisubbots: { chatProp: 'antiBot2', group: true, admin: true },
    antibot2: { chatProp: 'antiBot2', group: true, admin: true },
    modoadmin: { chatProp: 'modoadmin', group: true, admin: true },
    soloadmin: { chatProp: 'modoadmin', group: true, admin: true },
    reaction: { chatProp: 'reaction', group: true, admin: true },
    reaccion: { chatProp: 'reaction', group: true, admin: true },
    nsfw: { chatProp: 'nsfw', group: true, admin: true },
    modohorny: { chatProp: 'nsfw', group: true, admin: true },
    jadibotmd: { botProp: 'jadibotmd', owner: true },
    modejadibot: { botProp: 'jadibotmd', owner: true },
    detect: { chatProp: 'detect', group: true, admin: true },
    avisos: { chatProp: 'detect', group: true, admin: true },
    antilink: { chatProp: 'antiLink', group: true, admin: true },
    antifake: { chatProp: 'antifake', group: true, admin: true }
  };

  const opt = opciones[type];
  if (!opt) return conn.reply(m.chat, '⚠️ Opción no reconocida.', m);

  // Verificaciones con excepción para el owner
  if (opt.owner && !isOwner) {
    global.dfail('rowner', m, conn);
    return;
  }

  if (opt.group && !isGroup && !isOwner) {
    global.dfail('group', m, conn);
    return;
  }

  if (opt.admin && isGroup && !isAdmin && !isOwner) {
    global.dfail('admin', m, conn);
    return;
  }

  // Aplicar el cambio
  if (opt.chatProp) {
    chat[opt.chatProp] = isEnable;
  } else if (opt.botProp) {
    bot[opt.botProp] = isEnable;
  }

  conn.reply(m.chat,
    `《✦》La función *${command}* se *${isEnable ? 'activó' : 'desactivó'}* ${opt.botProp ? 'para el Bot' : 'en este chat'}`,
    m
  );
};

handler.help = [
  'welcome', 'bienvenida', 'antiprivado', 'antiprivate', 'restrict', 'restringir', 'autolevelup', 'autonivel',
  'antibot', 'antibots', 'autoaceptar', 'aceptarauto', 'autorechazar', 'rechazarauto', 'autoresponder', 'autorespond',
  'antisubbots', 'antibot2', 'modoadmin', 'soloadmin', 'reaction', 'reaccion', 'nsfw', 'modohorny',
  'jadibotmd', 'modejadibot', 'detect', 'avisos', 'antilink', 'antifake'
];

handler.tags = ['nable'];
handler.command = handler.help;

export default handler;