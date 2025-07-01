const pHora = 30;
const pDia = 700;
const cHora = 1;
const cDia = 20;

// Asegúrate de que 'moneda' y 'fkontak' estén definidos en algún lugar globalmente
// Por ejemplo:
// global.moneda = '¥enes';
// global.fkontak = { key: { participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast' }, message: { contactMessage: { displayName: 'Marin-Bot' } } };

let handler = async (m, { conn, usedPrefix, command, args }) => {
  // Asegúrate de que global.db.data.users exista
  global.db.data.users = global.db.data.users || {};

  // Asegúrate de que el usuario esté inicializado en global.db.data.users
  if (!global.db.data.users[m.sender]) {
    global.db.data.users[m.sender] = {
      coin: 0, // Inicializa las monedas del usuario aquí
      premiumTime: 0,
      premium: false,
      exp: 0,
      limit: 0,
      level: 0,
      // Añade cualquier otra propiedad de usuario que uses
    };
  } else {
    // Si el usuario ya existe, asegúrate de que premiumTime, premium y coin estén definidos
    if (global.db.data.users[m.sender].premiumTime === undefined) global.db.data.users[m.sender].premiumTime = 0;
    if (global.db.data.users[m.sender].premium === undefined) global.db.data.users[m.sender].premium = false;
    if (global.db.data.users[m.sender].coin === undefined) global.db.data.users[m.sender].coin = 0;
  }
  
  // Ahora, 'user' será la única fuente de verdad para los datos del usuario, incluyendo las monedas
  let user = global.db.data.users[m.sender];

  let texto = `
✐ Opciones disponibles para comprar premium:

° *h :* Horas = ${pHora} ${moneda}
° *d :* Días = ${pDia} ${moneda}

✧ Ejemplo :
${usedPrefix}${command} 1 h ---> 1 hora premium.
${usedPrefix}${command} 1 d ---> 1 día premium.`;

  let name = await conn.getName(m.sender);
  if (!args[0]) return conn.reply(m.chat, texto, fkontak);

  if (isNaN(args[0])) return conn.reply(m.chat, `✧ Solo se aceptan números.\n> Ejemplo: ${usedPrefix}${command} 1 h`, m);
  
  let cantidad = parseInt(args[0]); // Convertir a número entero
  if (cantidad <= 0) return conn.reply(m.chat, `✧ La cantidad debe ser un número positivo.`, m);

  let tipoDuracion = args[1] || "h";
  let precioPorUnidad = tipoDuracion === "h" ? pHora : pDia;
  let comisionPorUnidad = tipoDuracion === "h" ? cHora : cDia;
  
  let costoTotal = (precioPorUnidad * cantidad) + (comisionPorUnidad * cantidad);

  if (!args[1] || (tipoDuracion !== "h" && tipoDuracion !== "d")) {
    return conn.reply(m.chat, `✧ Formato no válido. Asegúrate de usar 'h' para horas o 'd' para días.\n> Ejemplo: ${usedPrefix}${command} 1 h`, m);
  }

  // Debugging: Mostrar cuántas monedas tiene el usuario ANTES de la verificación
  console.log(`DEBUG: Monedas del usuario ${m.sender.split('@')[0]}: ${user.coin}`);
  console.log(`DEBUG: Costo total de la compra: ${costoTotal} ${moneda}`);

  // Verifica si el usuario tiene suficientes monedas usando user.coin
  if (user.coin < costoTotal) {
    return conn.reply(m.chat, `✧ No tienes suficientes ${moneda} para comprar la membresía premium! Necesitas ${costoTotal} ${moneda}. Tienes ${user.coin} ${moneda}.`, m);
  }

  let tiempoGanado; // Cambiado de 'tiempo' para mayor claridad
  let tipoTiempoDisplay; // Cambiado de 'type' para mayor claridad

  if (tipoDuracion === "h") {
    tiempoGanado = 3600000 * cantidad; // Horas a milisegundos
    let now = new Date() * 1;
    if (now < user.premiumTime) user.premiumTime += tiempoGanado;
    else user.premiumTime = now + tiempoGanado;
    user.premium = true;
    user.coin -= costoTotal; // Resta el costo total de las monedas del usuario
    tipoTiempoDisplay = "Hora(s)";
  } else if (tipoDuracion === "d") {
    tiempoGanado = 86400000 * cantidad; // Días a milisegundos
    let now = new Date() * 1;
    if (now < user.premiumTime) user.premiumTime += tiempoGanado;
    else user.premiumTime = now + tiempoGanado;
    user.premium = true;
    user.coin -= costoTotal; // Resta el costo total de las monedas del usuario
    tipoTiempoDisplay = "Día(s)";
  }

  let cap = `  \`\`\`乂 B U Y  -  P R E M I U M 乂\`\`\`

ᰔᩚ Usuario » @${m.sender.split`@`[0]}
ⴵ Tiempo Premium » ${cantidad} ${tipoTiempoDisplay}
✦ Total a pagar » ${costoTotal} ${moneda}
⛁ ${moneda} restantes » ${user.coin}
✰ ${moneda} que tenía » ${user.coin + costoTotal}
✧ Comisión » -${comisionPorUnidad * cantidad} (incluida)`;

  conn.sendMessage(m.chat, { text: cap, mentions: [m.sender] }, { quoted: fkontak });
};

handler.tags = ['rg'];
handler.help = ['premium'];
handler.command = ['vip', 'premium', 'prem'];

export default handler;







/*const pHora = 30
const pDia = 700
const cHora = 1  
const cDia = 20  

let handler = async (m, { conn, usedPrefix, command, args }) => {

  let texto = `
✐ Opciones disponibles para comprar premium:

° *h :* Horas = ${pHora} ${moneda}
° *d :* Días = ${pDia} ${moneda}

✧ Ejemplo :
${command} 1 h ---> 1 hora premium.
${command} 1 d ---> 1 día premium.`
  let name = await conn.getName(m.sender)
  if (!args[0]) return conn.reply(m.chat, texto, fkontak)
  let type
  let user = global.db.data.users[m.sender]
  let users = global.db.data.chats[m.chat].users[m.sender]
  if (isNaN(args[0])) return conn.reply(m.chat, `✧ Solo se aceptan números.\n> Ejemplo: ${command} 1 h`, m)
  let kk = args[1] || "h"
  let precio = kk === "h" ? pHora : pDia
  let comision = kk === "h" ? cHora : cDia 
  if (!args[1] || (args[1] !== "h" && args[1] !== "d")) {
    return conn.reply(m.chat, `✧ Formato no válido.`, m)
  }
  if (users.coin < (precio + comision)) {
    return conn.reply(m.chat, `✧ No tienes suficientes ${moneda} para comprar la membresía premium!`, m)
  }
  let tiempo
  if (args[1] === "h") {
    tiempo = 3600000 * args[0]
    let now = new Date() * 1
    if (now < user.premiumTime) user.premiumTime += tiempo
    else user.premiumTime = now + tiempo
    user.premium = true
    users.coin -= (pHora * args[0]) + (cHora * args[0])
    type = "Hora(s)"
  } else if (args[1] === "d") {
    tiempo = 86400000 * args[0]
    let now = new Date() * 1
    if (now < user.premiumTime) user.premiumTime += tiempo
    else user.premiumTime = now + tiempo
    user.premium = true
    users.coin -= (pDia * args[0]) + (cDia * args[0]) 
    type = "Día(s)"
  }
  let cap = `  \`\`\`乂 B U Y  -  P R E M I U M 乂\`\`\`

ᰔᩚ Usuario » @${m.sender.split`@`[0]}
ⴵ Tiempo Premium » ${args[0]} ${type}
✦ Total a pagar » ${precio * args[0] + comision * args[0]} ${moneda}
⛁ ${moneda} » ${users.coin}
✰ Tenía » ${users.coin + precio * args[0] + comision * args[0]}
✧ Comisión » -${comision * args[0]} (incluida)`
  conn.sendMessage(m.chat, { text: cap, mentions: [m.sender] }, { quoted: fkontak })
}

handler.tags = ['rg']
handler.help = ['premium']
handler.command = ['vip', 'premium', 'prem']

export default handler*/
