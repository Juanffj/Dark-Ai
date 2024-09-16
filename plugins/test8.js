const heartRewards = {
  'CODE123': 10, // Código de canje y cantidad de corazones que otorga
  'CODE456': 20,
  'CODE789': 30
};

const usedCodes = new Set(); // Conjunto para almacenar los códigos de canje ya utilizados

const free = 25;
const prem = 15;

var handler = async (m, { conn, isPrems, text }) => {
  if (text.startsWith('canjear ')) {
    const code = text.slice(8).trim(); // Extrae el código de canje del texto
    
    if (!code) {
      return conn.reply(m.chat, '❌ Por favor, proporciona un código de canje.', m);
    }
    
    if (usedCodes.has(code)) {
      return conn.reply(m.chat, '❌ Este código de canje ya ha sido utilizado.', m);
    }

    const hearts = heartRewards[code];

    if (hearts) {
      // Agrega la cantidad de corazones al usuario
      global.db.data.users[m.sender].hearts = (global.db.data.users[m.sender].hearts || 0) + hearts;
      usedCodes.add(code); // Marca el código como utilizado
      return conn.reply(m.chat, `🎉 ¡Has canjeado ${hearts} corazones con éxito!`, m);
    } else {
      return conn.reply(m.chat, '❌ Código de canje inválido.', m);
    }
  }

  // Código para el comando 'daily' y 'claim'
  let coin = pickRandom([5, 6, 7, 9, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 99, 100, 110, 120, 130, 600, 1000, 1500]) * 1;
  let exp = pickRandom([500, 600, 700, 800, 900, 999, 1000, 1300, 1500, 1800]) * 1;
  let exppremium = pickRandom([1000, 1500, 1800, 2100, 2500, 2900, 3300, 3600, 4000, 4500]) * 1;
  let d = Math.floor(Math.random() * 30);

  global.db.data.users[m.sender].diamond += d;
  global.db.data.users[m.sender].money += d;
  global.db.data.users[m.sender].exp += isPrems ? exppremium : exp;

  conn.reply(m.chat, `🎁 *Recompensa Diaria*

Recursos:
✨ Xp : *+${isPrems ? exppremium : exp}*
💎 Diamantes : *+${d}*
🪙 MiniCoins : *+${coin}*`, m);

  global.db.data.users[m.sender].lastclaim = new Date * 1;
}

handler.help = ['daily', 'claim', 'canjear'];
handler.tags = ['rpg'];
handler.command = /^(canjeo)$/i;

handler.register = true;

export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;

  return hours + ' Horas ' + minutes + ' Minutos';
}
