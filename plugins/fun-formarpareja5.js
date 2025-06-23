let R = Math.random;
let Fl = Math.floor;
let toM = (a) => "@" + a.split("@")[0];

function getRandom(arr) {
  return arr[Fl(R() * arr.length)];
}

function handler(m, { groupMetadata }) {
  let ps = groupMetadata.participants.map((v) => v.id);

  // Selecciona 10 elementos aleatorios, puede haber repetidos y no importa el orden
  let parejas = [];
  for (let k = 0; k < 5; k++) {
    let p1 = getRandom(ps);
    let p2 = getRandom(ps);
    parejas.push([p1, p2]);
  }

  let msg = `*😍 _Las 5 mejores parejas del grupo_ 😍*\n`;
  msg += `
*_1.- ${toM(parejas[0][0])} y ${toM(parejas[0][1])}_*
- Esta pareja está destinada a estar junta 💙

*_2.- ${toM(parejas[1][0])} y ${toM(parejas[1][1])}_*
- Esta pareja son dos pequeños tortolitos enamorados ✨

*_3.- ${toM(parejas[2][0])} y ${toM(parejas[2][1])}_*
- Ufff y qué decir de esta pareja, ya hasta familia deberían tener 🤱🧑‍🍼

*_4.- ${toM(parejas[3][0])} y ${toM(parejas[3][1])}_*
- Estos ya se casaron en secreto 💍

*_5.- ${toM(parejas[4][0])} y ${toM(parejas[4][1])}_*
- Esta pareja está de luna de miel ✨🥵😍❤️*
`;

  // Junta todos los usuarios mencionados para el array de mentions
  let allMentions = parejas.flat();

  m.reply(msg, null, {
    mentions: allMentions,
  });
}

handler.help = ["formarpareja5"];
handler.tags = ["fun"];
handler.command = ["formarpareja5"];
handler.register = true;
handler.group = true;

export default handler;