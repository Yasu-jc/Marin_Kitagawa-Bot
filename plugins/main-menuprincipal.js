import fetch from 'node-fetch'


const mediaUrls = [ `https://files.catbox.moe/y9eveu.mp4`, ];

let handler = async (m, { conn, args }) => {
    let mentionedJid = await m.mentionedJid;
    let userId = mentionedJid && mentionedJid[0] ? mentionedJid[0] : m.sender;
    let totalreg = Object.keys(global.db.data.users).length;
    let totalCommands = Object.values(global.plugins).filter((v) => v.help && v.tags).length;


    if (mediaUrls.length === 0) {
        return m.reply('❌ No hay URLs de imágenes/videos configuradas para el menú.');
    }
    const randomMediaUrl = mediaUrls[Math.floor(Math.random() * mediaUrls.length)];
    const isVideo = randomMediaUrl.endsWith('.mp4') || randomMediaUrl.endsWith('.gif');


    let txt = `
𓍯𓂃𓏧♡𝐖𝐄𝐋𝐂𝐎𝐌𝐄𓍯𓂃𓏧♡
₊‧.°.⋆✮⋆.°.‧₊(꯭${global.packname}𝐭𓏲֟፝₊✮⋆.°.
. ݁₊ ⊹ . ݁˖ . ݁𝙱𝙾𝚃-𝙻𝙸𝚂𝚃ִֶָ𓂃 ࣪˖ ִֶָ🐇་༘࿐

> ¡Hola, @${userId.split('@')[0]}, mi nombre es ${botname} (≧◡≦) 

✞͙͙͙͙͙͙͙͙͙͙⏜❟︵ֹ̩̥̩̥̩̥̩̩̥⏜੭♡୧ֹ⏜︵ֹ̩̥̩̥̩̥̩̥̩̥̩̥̩̥❟⏜፞✞͙͙͙͙͙͙͙͙͙͙.
┊⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪⚘۪۬ Modo » Privado 
┊⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪⚘۪۬ Usuarios » ${totalreg}
┊⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪⚘۬  Bot » ${(conn.user.jid == global.conn.user.jid ? 'Principal 🅥' : 'Sub-bot🅑')}
┊┈・──・──・﹕₊˚ ✦・୨୧・ 
┊♡ ᴍᴇɴᴜ ᴅɪsᴘᴏɴɪʙʟᴇs:
├┈・──・──・﹕₊˚ ✦・୨୧・ 
┊҉.❦•̩̩͙#menu18 
┊҉.❦•̩̩#menugp  
┊҉.❦•̩̩#menudl
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
*│* ┊▸ ✦ _ *#sorteo*  
*│* ┊▸ ✦ _*#top*  
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
*╰ ㊂ ▸▸ _${dev}*
`.trim();


    // Se ajusta el objeto de mensaje para enviar imagen o video
    let messageOptions = {
        caption: txt,
        contextInfo: {
            mentionedJid: [userId],
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: channelRD.id,
                serverMessageId: '',
                newsletterName: channelRD.name
            },
            externalAdReply: {
                title: botname,
                body: textbot,
                mediaType: 1,
                mediaUrl: redes,
                sourceUrl: redes,
                thumbnail: await (await fetch(banner)).buffer(),
                showAdAttribution: false,
                containsAutoReply: true,
                renderLargerThumbnail: false
            }
        }
    };

    if (isVideo) {
        messageOptions.video = { url: randomMediaUrl };
        messageOptions.gifPlayback = true;
    } else {
        messageOptions.image = { url: randomMediaUrl };
    }

    await conn.sendMessage(m.chat, messageOptions, { quoted: m });
};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ['menu', 'menú', 'help'];

export default handler;
