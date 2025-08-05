let handler = async (m, { conn, saludo, wm, vs }) => {
  let userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
  let _uptime = process.uptime() * 1000
  let uptime = clockString(_uptime)
  let totalreg = Object.keys(global.db.data.users).length

  let botname = global.botname || "NombreBot"
  let dev = global.dev || "Mi Dev"
  let redes = global.redes || "https://tucanal.com"

const gifLinks = [

`https://zero-two.info/uploads/videos/file-1754013053081-340721211.mp4`
    
 // 'https://zero-two.info/uploads/videos/file-1750697942583-439795193.mp4',
  //'https://zero-two.info/uploads/videos/file-1750697996985-639597320.mp4',
 // 'https://zero-two.info/uploads/videos/file-1750698044012-984946042.mp4',
 // 'https://zero-two.info/uploads/videos/file-1750698077733-694225094.mp4'
]

  const randomGif = gifLinks[Math.floor(Math.random() * gifLinks.length)]

  await m.react('❤️‍🔥')

  let txt = `𓍯𓂃𓏧♡𝐖𝐄𝐋𝐂𝐎𝐌𝐄𓍯𓂃𓏧♡
₊‧.°.⋆✮⋆.°.‧₊(꯭${global.packname}𝐭𓏲֟፝₊✮⋆.°.
. ݁₊ ⊹ . ݁˖ . ݁𝙱𝙾𝚃-𝙻𝙸𝚂𝚃ִֶָ𓂃 ࣪˖ ִֶָ🐇་༘࿐

> ¡Hola, @${userId.split('@')[0]}, ${saludo} mi nombre es ${botname} (≧◡≦) 

✞͙͙͙͙͙͙͙͙͙͙⏜❟︵ֹ̩̥̩̥̩̥̩̩̥⏜੭♡୧ֹ⏜︵ֹ̩̥̩̥̩̥̩̥̩̥̩̥̩̥❟⏜፞✞͙͙͙͙͙͙͙͙͙͙.
⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪⚘۪۬ Modo » Privado 
⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪⚘۪۬ Activada » ${uptime}
⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪⚘۪۬ Usuarios » ${totalreg}
⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪⚘۬  Bot » ${(conn.user.jid == global.conn.user.jid ? 'Principal 🅥' : 'Sub-bot🅑')}
*☆═━┈◈ ╰ ${vs}╯ ◈┈━═☆*
*│* 
*╰ ㊂ ▸▸ _𝙸𝚗𝚏𝚘-𝙱𝚘𝚝_ ◂◂*
*│* ┊
*│* ┊▸ ✦ _ *#help • #menu*
*│* ┊▸ ✦ _ *#uptime • #runtime* 
*│* ┊▸ ✦ _ *#serbot • #serbot code*
*│* ┊▸ ✦ _ *#bots • #sockets*
*│* ┊▸ ✦ _ *#creador*
*│* ┊▸ ✦ _ *#status • #estado* 
*│* ┊▸ ✦ _ *#infobot • #infobot*  
*│* ┊▸ ✦ _ *#sug • #newcommand*  
*│* ┊▸ ✦ _ *#p • #ping*  
*│* ┊▸ ✦ _ *#reporte • #reportar*  
*│* ┊▸ ✦ _ *#sistema • #system*  
*│* ┊▸ ✦ _ *#speed • #speedtest*  
*│* ┊▸ ✦ _ *#views • #usuarios*  
*│* ┊▸ ✦ _ *#funciones • #totalfunciones*  
*│* ┊▸ ✦ _ *#ds • #fixmsgespera*  
*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙ 
*│*
*╰ ㊂ ▸▸ _𝙱𝚞𝚜𝚌𝚊𝚍𝚘𝚛𝚎𝚜_ ◂◂*
*│* ┊
*│* ┊▸ ✦ _ *#tiktoksearch • #tiktoks*  
*│* ┊▸ ✦ _ *#tweetposts*  
*│* ┊▸ ✦ _ *#ytsearch • #yts*  
*│* ┊▸ ✦ _ *#githubsearch*  
*│* ┊▸ ✦ _ *#cuevana • #cuevanasearch* 
*│* ┊▸ ✦ _ *#google*  
*│* ┊▸ ✦ _ *#pin • #pinterest*  
*│* ┊▸ ✦ _ *animeinfo*  
*│* ┊▸ ✦ _ *#imagen • #image*  
*│* ┊▸ ✦ _ *#animesearch • #animess*  
*│* ┊▸ ✦ _ *#infoanime*  
*│* ┊▸ ✦ _ *#hentaisearch • #searchhentai*  
*│* ┊▸ ✦ _ *#xnxxsearch • #xnxxs*  
*│* ┊▸ ✦ _ *#xvsearch • #xvideossearch*  
*│* ┊▸ ✦ _ *#pornhubsearch • #phsearch*  
*│* ┊▸ ✦ _ *#npmjs*  
*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙  
*│*
*╰ ㊂ ▸▸ _𝙳𝚎𝚜𝚌𝚊𝚛𝚐𝚊𝚜_ ◂◂*
*│* ┊
*│* ┊▸ ✦ _ *#tiktok • #tt*
*│* ┊▸ ✦ _ *#mediafire • #mf* + [link]
*│* ┊▸ ✦ _ *#pindl • #pinterestdl* + [Link]
*│* ┊▸ ✦ _ *#mega • #mg* + [enlace]
*│* ┊▸ ✦ _ *#play • #play2*
*│* ┊▸ ✦ _ *#ytmp3 • #ytmp4* + [link]
*│* ┊▸ ✦ _ *#fb • #facebook*
*│* ┊▸ ✦ _ *#twitter • #x* + [link]
*│* ┊▸ ✦ _ *#ig • #instagram*
*│* ┊▸ ✦ _ *#tts • #tiktoks* + [búsqueda]
*│* ┊▸ ✦ _ *#terabox • #tb* + [enlace]
*│* ┊▸ ✦ _ *#gdrive • #drive* + [enlace]
*│* ┊▸ ✦ _ *#ttimg • #ttmp3* + <url>
*│* ┊▸ ✦ _ *#gitclone* + <url>
*│* ┊▸ ✦ _ *#xvideosdl*
*│* ┊▸ ✦ _ *#xnxxdl*
*│* ┊▸ ✦ _ *#apk • #modapk*
*│* ┊▸ ✦ _ *#tiktokrandom • #ttrandom*
*│* ┊▸ ✦ _ *#npmdl • #npmdownloader*
*│* ┊▸ ✦ _ *#animelinks • #animedl*
*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙  
*│*
*╰ ㊂ ▸▸ _𝙴𝚌𝚘𝚗𝚘𝚖𝚒𝚊_ ◂◂*
*│* ┊
*│* ┊▸ ✦ _ *#w • #work • #trabajar*
*│* ┊▸ ✦ _ *#slut • #protituirse*
*│* ┊▸ ✦ _ *#cf • #suerte*
*│* ┊▸ ✦ _ *#crime • #crimen*
*│* ┊▸ ✦ _ *#ruleta • #roulette • #rt*
*│* ┊▸ ✦ _ *#casino • #apostar*
*│* ┊▸ ✦ _ *#slot*
*│* ┊▸ ✦ _ *#cartera • #wallet*
*│* ┊▸ ✦ _ *#banco • #bank*
*│* ┊▸ ✦ _ *#deposit • #depositar • #d*
*│* ┊▸ ✦ _ *#with • #retirar • #withdraw*
*│* ┊▸ ✦ _ *#transfer • #pay*
*│* ┊▸ ✦ _ *#miming • #minar • #mine*
*│* ┊▸ ✦ _ *#buyall • #buy*
*│* ┊▸ ✦ _ *#daily • #diario*
*│* ┊▸ ✦ _ *#cofre*
*│* ┊▸ ✦ _ *#weekly • #semanal*
*│* ┊▸ ✦ _ *#monthly • #mensual*
*│* ┊▸ ✦ _ *#steal • #robar • #rob*
*│* ┊▸ ✦ _ *#robarxp • #robxp*
*│* ┊▸ ✦ _ *#eboard • #baltop*
*│* ┊▸ ✦ _ *#aventura • #adventure*
*│* ┊▸ ✦ _ *#curar • #heal*
*│* ┊▸ ✦ _ *#cazar • #hunt • #berburu*
*│* ┊▸ ✦ _ *#inv • #inventario*
*│* ┊▸ ✦ _ *#mazmorra • #explorar*
*│* ┊▸ ✦ _ *#halloween*
*│* ┊▸ ✦ _ *#christmas • #navidad*
*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
*│*
*╰ ㊂ ▸▸ _𝙶𝚊𝚌𝚑𝚊_ ◂◂*
*│* ┊
*│* ┊▸ ✦ _ *#rollwaifu • #rw • #roll*
*│* ┊▸ ✦ _ *#claim • #c • #reclamar*
*│* ┊▸ ✦ _ *#harem • #waifus • #claims*
*│* ┊▸ ✦ _ *#charimage • #waifuimage • #wimage*
*│* ┊▸ ✦ _ *#charinfo • #winfo • #waifuinfo*
*│* ┊▸ ✦ _ *#givechar • #givewaifu • #regalar*
*│* ┊▸ ✦ _ *#vote • #votar*
*│* ┊▸ ✦ _ *#waifusboard • #waifustop • #topw*
*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
*│*
*╰ ㊂ ▸▸ _𝚂𝚝𝚒𝚌𝚔𝚎𝚛𝚜_ ◂◂*
*│* ┊
*│* ┊▸ ✦ _ *#sticker • #s*
*│* ┊▸ ✦ _ *#setmeta*
*│* ┊▸ ✦ _ *#delmeta*
*│* ┊▸ ✦ _ *#pfp • #getpic*
*│* ┊▸ ✦ _ *#stickergen#*
*│* ┊▸ ✦ _ *#qc*
*│* ┊▸ ✦ _ *#toimg • #img*
*│* ┊▸ ✦ _ *#brat • #ttp • #attp*︎
*│* ┊▸ ✦ _ *#emojimix*
*│* ┊▸ ✦ _ *#wm*
*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
*│*
*╰ ㊂ ▸▸ _𝙷𝚎𝚛𝚛𝚊𝚖𝚒𝚎𝚗𝚝𝚊𝚜_ ◂◂*
*│* ┊
*│* ┊▸ ✦ _ *#calcular • #calcular • #cal*  
*│* ┊▸ ✦ _ *#tiempo • #clima*  
*│* ┊▸ ✦ _ *#horario*  
*│* ┊▸ ✦ _ *#fake • #fakereply*  
*│* ┊▸ ✦ _ *#qrcode*  
*│* ┊▸ ✦ _ *#compress • comprimir*  
*│* ┊▸ ✦ _ *#enhance • #remini • #hd*  
*│* ┊▸ ✦ _ *#letra*  
*│* ┊▸ ✦ _ *#read • #readviewonce • #ver*  
*│* ┊▸ ✦ _ *#whatmusic • #shazam*  
*│* ┊▸ ✦ _ *#spamwa • #spam*  
*│* ┊▸ ✦ _ *#ss • #ssweb*  
*│* ┊▸ ✦ _ *#length • #tamaño*  
*│* ┊▸ ✦ _ *#say • #decir* + [texto]  
*│* ┊▸ ✦ _ *#todoc • #toducument*  
*│* ┊▸ ✦ _ *#translate • #traducir • #trad*  
*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
*│*
*╰ ㊂ ▸▸ _𝙿𝚎𝚛𝚏𝚒𝚕_ ◂◂*
*│* ┊
*│* ┊▸ ✦ _ *#reg • #verificar • #register*
*│* ┊▸ ✦ _ *#unreg*
*│* ┊▸ ✦ _ *#profile*
*│* ┊▸ ✦ _ *#marry* [mension / etiquetar]
*│* ┊▸ ✦ _ *#divorce*
*│* ┊▸ ✦ _ *#setgenre • #setgenero*
*│* ┊▸ ✦ _ *#delgenre • #delgenero*
*│* ┊▸ ✦ _ *#setbirth • #setnacimiento*
*│* ┊▸ ✦ _ *#delbirth • #delnacimiento*
*│* ┊▸ ✦ _ *#setdescription • #setdesc*
*│* ┊▸ ✦ _ *#deldescription • #deldesc*
*│* ┊▸ ✦ _ *#lb • #lboard* + <Paginá>
*│* ┊▸ ✦ _ *#level • #lvl* + <@Mencion>
*│* ┊▸ ✦ _ *#comprarpremium • #premium*
*│* ┊▸ ✦ _ *#confesiones • #confesar*
*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
*│*
*╰ ㊂ ▸▸ _𝙶𝚛𝚞𝚙𝚘𝚜/𝙲𝚘𝚗𝚏𝚒𝚐_ ◂◂*
*│* ┊
*│* ┊▸ ✦ _ *#config • #on*
*│* ┊▸ ✦ _ *#hidetag*
*│* ┊▸ ✦ _ *#gp • #infogrupo*
*│* ┊▸ ✦ _ *#linea • #listonline*
*│* ┊▸ ✦ _ *#setwelcome*
*│* ┊▸ ✦ _ *#setbye*
*│* ┊▸ ✦ _ *#link*
*│* ┊▸ ✦ _ *#admins • #admin*
*│* ┊▸ ✦ _ *#restablecer • #revoke*
*│* ┊▸ ✦ _ *#grupo • #group* [open / abrir]
*│* ┊▸ ✦ _ *#grupo • #gruop* [close / cerrar]
*│* ┊▸ ✦ _ *#kick* [número / mención]
*│* ┊▸ ✦ _ *#add • #añadir • #agregar* [número]
*│* ┊▸ ✦ _ *#promote* [mención / etiquetar]
*│* ┊▸ ✦ _ *#demote* [mención / etiquetar]
*│* ┊▸ ✦ _ *#gpbanner • #groupimg*
*│* ┊▸ ✦ _ *#gpname • #groupname*
*│* ┊▸ ✦ _ *#gpdesc • #groupdesc*
*│* ┊▸ ✦ _ *#advertir • #warn • #warning*
*│* ┊▸ ✦ _ *#unwarn • #delwarn*
*│* ┊▸ ✦ _ *#advlist • #listadv*
*│* ┊▸ ✦ _ *#banchat*
*│* ┊▸ ✦ _ *#unbanchat*
*│* ┊▸ ✦ _ *#mute* [mención / etiquetar]
*│* ┊▸ ✦ _ *#unmute* [mención / etiquetar]
*│* ┊▸ ✦ _ *#encuesta • #poll*
*│* ┊▸ ✦ _ *#delete • #del*
*│* ┊▸ ✦ _ *#fantasmas*
*│* ┊▸ ✦ _ *#kickfantasmas*
*│* ┊▸ ✦ _ *#invocar • #tagall • #todos*
*│* ┊▸ ✦ _ *#setemoji • #setemo*
*│* ┊▸ ✦ _ *#listnum • #kicknum*
*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
*│*
*╰ ㊂ ▸▸ _𝙰𝚗𝚒𝚖𝚎_ ◂◂*
*│* ┊
*│* ┊▸ ✦ _ *#pixai* + <texto>
*│* ┊▸ ✦ _ *#angry • #enojado* + <mencion>
*│* ┊▸ ✦ _ *#bite* + <mencion>
*│* ┊▸ ✦ _ *#bleh* + <mencion>
*│* ┊▸ ✦ _ *#blush* + <mencion>
*│* ┊▸ ✦ _ *#bored • #aburrido* + <mencion>
*│* ┊▸ ✦ _ *#cry* + <mencion>
*│* ┊▸ ✦ _ *#cuddle* + <mencion>
*│* ┊▸ ✦ _ *#dance* + <mencion>
*│* ┊▸ ✦ _ *#drunk* + <mencion>
*│* ┊▸ ✦ _ *#eat • #comer* + <mencion>
*│* ┊▸ ✦ _ *#facepalm* + <mencion>
*│* ┊▸ ✦ _ *#happy • #feliz* + <mencion>
*│* ┊▸ ✦ _ *#hug* + <mencion>
*│* ┊▸ ✦ _ *#impregnate • #preg* + <mencion>
*│* ┊▸ ✦ _ *#kill* + <mencion>
*│* ┊▸ ✦ _ *#kiss • #besar* • #kiss2 + <mencion>
*│* ┊▸ ✦ _ *#laugh* + <mencion>
*│* ┊▸ ✦ _ *#lick* + <mencion>
*│* ┊▸ ✦ _ *#love • #amor* + <mencion>
*│* ┊▸ ✦ _ *#pat* + <mencion>
*│* ┊▸ ✦ _ *#poke* + <mencion>
*│* ┊▸ ✦ _ *#pout* + <mencion>
*│* ┊▸ ✦ _ *#punch* + <mencion>
*│* ┊▸ ✦ _ *#run* + <mencion>
*│* ┊▸ ✦ _ *#sad • #triste* + <mencion>
*│* ┊▸ ✦ _ *#scared* + <mencion>
*│* ┊▸ ✦ _ *#seduce* + <mencion>
*│* ┊▸ ✦ _ *#shy • #timido* + <mencion>
*│* ┊▸ ✦ _ *#slap* + <mencion>
*│* ┊▸ ✦ _ *#dias • #days*
*│* ┊▸ ✦ _ *#fraseanime • #phraseanime*
*│* ┊▸ ✦ _ *#noches • #nights*
*│* ┊▸ ✦ _ *#sleep* + <mencion>
*│* ┊▸ ✦ _ *#smoke* + <mencion>
*│* ┊▸ ✦ _ *#think* + <mencion>
*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
*│*
*╰ ㊂ ▸▸ _𝙽𝚂𝙵𝚆_ ◂◂*
*│* ┊
*│* ┊▸ ✦ _ *#anal* + <mencion>
*│* ┊▸ ✦ _ *#waifu*
*│* ┊▸ ✦ _ *#bath* + <mencion>
*│* ┊▸ ✦ _ *#blowjob • #mamada • #bj* + <mencion>
*│* ┊▸ ✦ _ *#boobjob* + <mencion>
*│* ┊▸ ✦ _ *#cum* + <mencion>
*│* ┊▸ ✦ _ *#fap* + <mencion>
*│* ┊▸ ✦ _ *#ppcouple • #ppcp*
*│* ┊▸ ✦ _ *#footjob* + <mencion>
*│* ┊▸ ✦ _ *#fuck • #coger • #fuck2* + <mencion>
*│* ┊▸ ✦ _ *#hentaivideo • #hentaivid*
*│* ┊▸ ✦ _ *#cafe • #coffe*
*│* ┊▸ ✦ _ *#violar • #perra* + <mencion>
*│* ┊▸ ✦ _ *#grabboobs* + <mencion>
*│* ┊▸ ✦ _ *#grop* + <mencion>
*│* ┊▸ ✦ _ *#lickpussy* + <mencion>
*│* ┊▸ ✦ _ *#rule34 • #r34* + [Tags]
*│* ┊▸ ✦ _ *#sixnine • #69* + <mencion>
*│* ┊▸ ✦ _ *#spank • #nalgada* + <mencion>
*│* ┊▸ ✦ _ *#suckboobs* + <mencion>
*│* ┊▸ ✦ _ *#undress • #encuerar* + <mencion>
*│* ┊▸ ✦ _ *#yuri • #tijeras* + <mencion>
*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
*│*
*╰ ㊂ ▸▸ _𝙹𝚞𝚎𝚐𝚘𝚜_ ◂◂*
*│* ┊
*│* ┊▸ ✦ _ *#amistad • #amigorandom* 
*│* ┊▸ ✦ _ *#chaqueta • #jalamela*  
*│* ┊▸ ✦ _ *#chiste*  
*│* ┊▸ ✦ _ *#consejo*  
*│* ┊▸ ✦ _ *#doxeo • #doxear* + <mención>  
*│* ┊▸ ✦ _ *#facto*  
*│* ┊▸ ✦ _ *#formarpareja*  
*│* ┊▸ ✦ _ *#formarpareja5*  
*│* ┊▸ ✦ _ *#reporte • #reportar*   *#frase*  
*│* ┊▸ ✦ _ *#huevo*  
*│* ┊▸ ✦ _ *#chupalo* + <mención>  
*│* ┊▸ ✦ _ *#aplauso* + <mención>  
*│* ┊▸ ✦ _ *#marron* + <mención>  
*│* ┊▸ ✦ _ *#suicidar*  
*│* ┊▸ ✦ _ *#iq • #iqtest* + <mención>  
*│* ┊▸ ✦ _ *#meme*  
*│* ┊▸ ✦ _ *#morse*  
*│* ┊▸ ✦ _ *#nombreninja*  
*│* ┊▸ ✦ _ *#paja • #pajeame*  
*│* ┊▸ ✦ _ *#personalidad* + <mención>  
*│* ┊▸ ✦ _ *#piropo*  
*│* ┊▸ ✦ _ *#pregunta*  
*│* ┊▸ ✦ _ *#ship • #pareja*  
*│* ┊▸ ✦ _ *#sorteo*   *│* ┊▸ ✦ _*#top*  
*│* ┊▸ ✦ _ *#formartrio* + <mención>  
*│* ┊▸ ✦ _ *#ahorcado*  
*│* ┊▸ ✦ _ *#genio*  
*│* ┊▸ ✦ _ *#mates • #matematicas*  
*│* ┊▸ ✦ _ *#ppt*  
*│* ┊▸ ✦ _ *#sopa • #buscarpalabra*  
*│* ┊▸ ✦ _ *#pvp • #suit* + <mención>  
*│* ┊▸ ✦ _ *#ttt*  
*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
*│*
*╰ ㊂ ▸▸ _${dev}*`

  await conn.sendMessage(m.chat, {
    video: { url: randomGif },
    caption: txt,
    gifPlayback: true,
    contextInfo: {
      mentionedJid: [m.sender, userId],
      isForwarded: true,
      forwardingScore: 999,
      externalAdReply: {
        title: `${global.wm}`,
        body: `${dev}`,
        thumbnailUrl: 'https://i.postimg.cc/Kv7Lcf7c/4581d7b3704643d9378eac636d9d394e.jpg',
        sourceUrl: redes,
        mediaType: 1,
        renderLargerThumbnail: false,
      }
    }
  }, { quoted: m })
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'help', 'menú', 'allmenú', 'allmenu', 'menucompleto']
handler.register = true;
export default handler

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

