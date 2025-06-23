const { levelling } = '../lib/levelling.js'
import PhoneNumber from 'awesome-phonenumber'
let handler = async (m, { conn, usedPrefix }) => {
let pp = './src/lvl.jpg'
try {
} catch (e) {
} finally {
//let about = (await conn.getStatus(who).catch(console.error) || {}).status || ''
let username = await conn.getName(m.sender)
let str = `
*ミ💖 𝗛𝗢𝗟𝗔 _${username}_ 💖彡*
𝗕𝗜𝗘𝗡𝗩𝗘𝗡𝗜𝗗𝗢 𝗔𝗟 𝗠𝗘𝗡𝗨 𝗚𝗥𝗨𝗣𝗢𝗦

┏━━━━━━━━━━━━━┓
┃ *<𝗠𝗘𝗡𝗨 𝗚𝗥𝗨𝗣𝗢>*
┃≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ ඬ⃟💎 _${usedPrefix}admins_
┣ ඬ⃟💎 _${usedPrefix}add *<numero>*_
┣ ඬ⃟💎 _${usedPrefix}kick *<@tag>*_
┣ ඬ⃟💎 _${usedPrefix}grupo *<abrir / cerrar>*_
┣ ඬ⃟💎 _${usedPrefix}promote *<@tag>*_
┣ ඬ⃟💎 _${usedPrefix}demote *<@tag>*_
┣ ඬ⃟💎 _${usedPrefix}grupo abrir/cerrar_
┣ ඬ⃟💎 _${usedPrefix}banchat/unbanchat_
┣ ඬ⃟💎 _${usedPrefix}demote *<@tag>*_
┣ ඬ⃟💎 _${usedPrefix}infogroup_
┣ ඬ⃟💎 _${usedPrefix}link_
┣ ඬ⃟💎 _${usedPrefix}setname *<texto>*_
┣ ඬ⃟💎 _${usedPrefix}setdesc *<texto>*_
┣ ඬ⃟💎 _${usedPrefix}hidetag *<texto>*_
┣ ඬ⃟💎 _${usedPrefix}del *responder al mensaje del bot para borrarlo*_
┣ ඬ⃟💎 _${usedPrefix}setpp *establecer foto como perfil del grupo*_
┣ ඬ⃟💎 _${usedPrefix}simular *<welcome / bye / promote / demote>*_
┣ ඬ⃟💎 _${usedPrefix}fantasmas_
┣ ඬ⃟💎 _${usedPrefix}warn @user_
┣ ඬ⃟💎 _${usedPrefix}delwarn @user_
┣ ඬ⃟💎 _${usedPrefix}cekwarn_
┗━━━━━━━━━━━━━┛
`.trim()
conn.sendHydrated(m.chat, str, wm, pp, null, null, null, null, [
['🗒️𝗠𝗘𝗡𝗨 𝗟𝗜𝗦𝗧𝗔🗒️', '.menu'],
['🥵𝗖𝗥𝗘𝗔𝗗𝗢𝗥🥵', '.menu'],
['📮𝗗𝗢𝗡𝗔𝗥📮', '.donar']
], m)
}}
handler.help = ['menugp']
handler.tags = ['main']
handler.command = /^(menugrupos|menugrupo|memugrupos|menugrupos|menugp|memugp|comandosgrupo)$/i
handler.fail = null
handler.register = true
export default  handler
