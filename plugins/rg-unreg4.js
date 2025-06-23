let handler = async (m, { conn, text }) => {

let user = global.db.data.users[m.sender]

user.registered = false
return conn.reply(m.chat, `No estes jodien, mejor salte tu gay hpt.`, m)

}
handler.help = ['unreg']
handler.tags = ['rg']
handler.command = ['eliminar bot']
//handler.register = true
export default handler
