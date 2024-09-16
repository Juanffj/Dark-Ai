let handler = async (m, { conn, text, usedPrefix, command }) => {
  const rewardCodes = {
    'CODE456': 200,
    'CODE789': 300
  };

  // Para llevar un registro de los códigos ya utilizados, considera almacenamiento persistente
  const usedCodes = new Set();  // Esta variable solo retiene datos en memoria

  // Verifica si el mensaje empieza con el comando esperado
  if (text.startsWith(`${usedPrefix}${command}`)) {
    const code = text.slice(`${usedPrefix}${command}`.length).trim();  // Extrae el código de canje del texto

    if (!code) {
      return conn.reply(m.chat, '❌ Por favor, proporciona un código de canje.', m);
    }

    if (usedCodes.has(code)) {
      return conn.reply(m.chat, '❌ Este código de canje ya ha sido utilizado.', m);
    }

    const coins = rewardCodes[code];

    if (coins) {
      // Asegúrate de que el usuario tenga un registro y monedas iniciales
      if (!global.db.data.users[m.sender]) {
        global.db.data.users[m.sender] = { coins: 0 };
      }
      global.db.data.users[m.sender].coins = (global.db.data.users[m.sender].coins || 0) + coins;
      usedCodes.add(code);  // Marca el código como utilizado
      return conn.reply(m.chat, `🎉 ¡Has canjeado ${coins} monedas con éxito!`, m);
    } else {
      return conn.reply(m.chat, '❌ Código de canje inválido.', m);
    }
  } else {
    return conn.reply(m.chat, '❌ Comando no reconocido. Usa ".canjeo <código>" para canjear un código de monedas.', m);
  }
}

handler.help = ['canjeo <código>'];
handler.tags = ['economía'];
handler.command = /^(canjeo)$/i;

handler.register = true;

export default handler;
