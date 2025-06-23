
let handler = m => m
handler.all = async function (m) {
  for (const message in audioMsg) {
    if (new RegExp(`^${message}$`, 'i').test(m.text)) {
      this.sendFile(m.chat, audioMsg[message], 'audio.mp3', null, m, true)
      break
    }
  }
  return !0
 }

export default handler


let audioMsg = {
  
  'sexo|Sexo':'./src/audios/Ya antojaron.mp3',
  'y este|Y este':'./src/audios/Y este quien es.mp3',
  'tu|Tu':'./src/audios/tunometecabrasaramambiche.mp3',
  'tu madre|tu mdr|mamá|maricon|hpt':'./src/audios/Traigan le una falda.mp3',
  'tal vez|Tal vez':'./src/audios/Tal vez.mp3',
  'Momento serió|en serio|Momento serio|momento serio':'./src/audios/suspenso.mp3',
  'pendejo|pndj|Pndj':'./src/audios/Su nivel de pendejo.mp3',
  'Jdr|jdr|joder|Joder':'./src/audios/Se estan riendo de mi.mp3',
  'chupala|Chupala':'./src/audios/no chu.mp3',
  'niko|Niko':'./src/audios/niconico.mp3',
  'XDD':'./src/audios/Momento equisde.mp3',
  'Calla|calla|Cállese':'./src/audios/Calla Fan de BTS.mp3',
  'Buenas':'./src/audios/grupo.mp3',
  'oficial|señor|Es el':'./src/audios/señoroficial.mp3',
  'Aaa|ª|Ahh|ahh':'./src/audios/a.mp3',
  'Ohh me vengo|hoo':'./src/audios/vengo.mp3',
  'puta|que mrd|Borren el grupo|Salte del grupo bot':'./src/audios/nopapu.mp3',
  '18+':'./src/audios/maau1.mp3',
  'Esto va a ser epico|epico|Epico':'./src/audios/Epico.mp3',
  'fino señores|🧐🍷':'./src/audios/fino.mp3',
  '@50557729139|@50577025053': './src/audios/etiqueta.mp3', 
  'uwu|UwU|Uwu': './src/audios/uwu.mp3',
  'oni|Onichan|Oni-chan|onichan|oni-chan': './src/audios/oni.mp3',
  'raw|rawr|rarw': './src/audios/rawr.mp3',
  'bot puto|puto bot| bot malparido|mierda de bot|bot de mierda': './src/audios/bot_puto.mp3'
}
