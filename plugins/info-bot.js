import fs from 'fs';
const handler = (m) => m;
handler.all = async function(m) {

const chat = global.db.data.chats[m.chat];
if (chat.isBaneed) return
if (/^bot$/i.test(m.text)) {
conn.reply(m.chat, `🌠 ¡Hola! Soy ${wm}, en que puedo ayudarte hoy?\n\n✰ Usa *.menu* para ver mis comandos.`, m,  )
}
/*if (/^que|q$/i.test(m.text)) {
conn.reply(m.chat, `*so*`, m, rcanal, )
}*/
if (/^English$/i.test(m.text)) {
conn.reply(m.chat, `*The first one to speak is gay*`, m,  )
}

if (/^Bot de mierda/i.test(m.text)) {
conn.reply(m.chat, `*No digas mamadas, Meriyein*`, m,  )
}

if (/^porno|gore/i.test(m.text)) {
conn.reply(m.chat, `*Lotex tetón el papá de tdos 😈*`, m, )
}

if (/^Bot Perzonalizado Simple/i.test(m.text)) {
conn.reply(m.chat, `*Claro, El Bot Perzonalizado Simple Cuesta 14$ Con Server Incluído y comisión, trae comandos básicos.[🌠]*`, m,  )
}

if (/^Bot de mrd/i.test(m.text)) {
conn.reply(m.chat, `*Ya te dieron De Comer?🥵🍆*`, m,  )
}


if (/^Bot en decadencia/i.test(m.text)) {
conn.reply(m.chat, `*Tu Mamá en 4 😋🥵*`, m,  )
}


if (/^reglasgp|.reglasgp$/i.test(m.text)) {
conn.reply(m.chat, `**R꙰EGLAS DEL GRUP❍ꪜ*

📸 *Presentarse*
🚫𝗡𝗼 𝗘𝗻𝘃𝗶𝗮𝗿 𝗣𝗩 𝘀𝗶𝗻 𝗽𝗲𝗿𝗺𝗶𝘀𝗼
🚫𝗡𝗼 𝘃𝗶𝗱𝗲𝗼🎥 𝗣𝗼𝗿𝗻𝗼𝗴𝗿𝗮𝗳𝗶𝗮 𝗜𝗻𝗳𝗮𝗻𝘁𝗶𝗹 𝘆 𝗱𝗲 𝗮𝗱𝘂𝗹𝘁𝗼

━━━━━━V͇̿I͇̿P͇̿━━━━━━

⚜️🔰🅿🆁🅾🅷🅸🅱🅸🅳🅾⚜️𝗡𝗼 𝗣𝗼𝗿𝗻𝗼𝗴𝗿𝗮𝗳𝗶𝗮 
➬⃢⃞⃟🔞𝗡𝗼 𝗺𝗲𝗻𝗼𝗿𝗲𝘀 𝗱𝗲 16 años
➬⃢⃞⃟🩸𝗡𝗼 𝘃𝗶𝗱𝗲𝗼𝘀 𝗦𝗮𝗻𝗴𝗿𝗶𝗲𝗻𝘁𝗼𝘀
➬⃢⃞⃟🚫𝗡𝗼 𝗣𝗼𝗿𝗻𝗼𝗴𝗿𝗮𝗳𝗶𝗰𝗼𝘀
➬⃢⃞⃟❌𝗡𝗼 𝗠𝗮𝗻𝗱𝗮𝗿 𝗣𝗩 𝘀𝗶𝗻 𝗽𝗲𝗿𝗺𝗶𝘀𝗼 
➬⃢⃞⃟👀𝗡𝗼 𝗺𝗶𝗿𝗼𝗻𝗲𝘀
➬⃢⃞⃟👾𝗡𝗼 𝘀𝗼𝗽𝗹𝗼𝗻𝗲𝘀
➬⃢⃞⃟👻𝗡𝗼 𝗳𝗮𝗻𝘁𝗮𝘀𝗺𝗮
➬⃢⃞⃟📱🚫𝗡𝗼 𝗦𝗽𝗮𝗺
➬⃢⃞⃟🦠𝗩𝗶𝗿𝘂𝘀 𝘆 𝗧𝗿𝗮𝗯𝗮𝘀
🚫NO ENLACES 🔗
➬⃢⃞⃟💣𝗦𝗶 𝗻𝗼 𝗰𝘂𝗺𝗽𝗹𝗲 𝘁𝗲 𝗱𝗮𝗻 𝗕𝗮𝗺💣

█║║██║║██║║██║║██║║█
✧･ﾟ: *✧･Atte.

☆ ፝͜★ৡ͜͡✞ *${wm}* ➵͡☠️⃪̸ੵ᷒ᰰ↱

✧･ﾟ: *✧･ﾟ:*✧･ﾟ: *✧･ﾟ:*✧･ﾟ: *✧･ﾟ:*`, m,  )
}
return !0;
};
export default handler;