let handler = async (m, { conn, text }) => {
  if (!text) return m.reply(`*𝙄𝙉𝙂𝙍𝙀𝙎𝘼 𝙀𝙇 𝘾𝙊́𝘿𝙄𝙂𝙊 𝙌𝙐𝙀 𝙑𝘼𝙎 𝘼 𝙊𝙁𝙐𝙎𝘾𝘼𝙍*`);

  function simplifyCode(code) {
    // Simulación de simplificación: simplemente elimina comentarios y espacios adicionales
    return code
      .replace(/\/\/.*$/gm, '') // Elimina comentarios de una sola línea
      .replace(/\/\*[\s\S]*?\*\//g, '') // Elimina comentarios multilínea
      .replace(/\s+/g, ' ') // Reemplaza múltiples espacios por un solo espacio
      .trim(); // Elimina espacios al principio y al final
  }

  let simplifiedCode = simplifyCode(text);
  conn.sendMessage(m.chat, { text: simplifiedCode }, { quoted: m });
};

handler.help = ["desofuscar *<texto>*"];
handler.tags = ["fun"];
handler.command = /^(desofuscar|desofuscador)$/i;

export default handler;
