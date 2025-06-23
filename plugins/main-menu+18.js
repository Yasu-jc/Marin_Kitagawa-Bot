let handler = async (m, { isPrems, conn }) => {

let img = 'https://i.postimg.cc/wB4dn8vV/images.jpg' 
let texto = `

*╭━━━━•『  MENU NSFW  』•━━━━╮*
*│╭─────━───────━────*
││ ◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸✦ _ *#anal* + <mencion>
││ ◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸✦ _ *#waifu*
││ ◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸✦ _ *#bath* + <mencion>
││ ◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸✦ _ *#blowjob • #mamada • #bj* + <mencion>
││ ◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸✦ _ *#boobjob* + <mencion>
││ ◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸✦ _ *#cum* + <mencion>
││ ◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸✦ _ *#fap* + <mencion>
││ ◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸✦ _ *#ppcouple • #ppcp*
││ ◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸✦ _ *#footjob* + <mencion>
││ ◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸✦ _ *#fuck • #coger • #fuck2* + <mencion>
││ ◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸✦ _ *#hentaivideo • #hentaivid*
││ ◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸✦ _ *#cafe • #coffe*
││ ◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸✦ _ *#violar • #perra* + <mencion>
││ ◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸✦ _ *#grabboobs* + <mencion>
││ ◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸✦ _ *#grop* + <mencion>
││ ◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸✦ _ *#lickpussy* + <mencion>
││ ◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸✦ _ *#rule34 • #r34* + [Tags]
││ ◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸✦ _ *#sixnine • #69* + <mencion>
││ ◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸✦ _ *#spank • #nalgada* + <mencion>
││ ◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸✦ _ *#suckboobs* + <mencion>
││ ◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸✦ _ *#undress • #encuerar* + <mencion>
││ ◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸✦ _ *#yuri • #tijeras* + <mencion>
*│╰人人人人人人人人人人人人╯*
*╰─ - ✦⢄⢁✩*⢄⢁♡⡠*✩⡈⡠✦ - ─╯*
`
const fkontak = {
        "key": {
    "participants":"0@s.whatsapp.net",
                "remoteJid": "status@broadcast",
                "fromMe": false,
                "id": "Halo"
        },
        "message": {
                "contactMessage": {
                        "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
        },
        "participant": "0@s.whatsapp.net"
}
await conn.sendFile(m.chat, img, 'img.jpg', texto, fkontak)
}
handler.help = ['menuhot (menu +18)']
handler.tags = ['crow']
handler.command = ['menu18', 'menuhorny', 'menunsfw', 'menuhot'] 
export default handler;