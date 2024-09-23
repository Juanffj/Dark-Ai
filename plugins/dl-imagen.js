import {googleImage} from '@bochilteam/scraper';
const handler = async (m, {conn, text, usedPrefix, command}) => {
if (!text) return conn.reply(m.chat, '*\`Ingresa El Nombre De Lo Que Quieres Buscar\`*', m, fake)
await m.react('🕒')
let titu = '*[By: GenesisBot x Angel-OFC ]*'
const res = await googleImage(text);
const image = await res.getRandom();
const link = image;
const messages = [['Imagen 1', titu, await res.getRandom(),
[[]], [[]], [[]], [[]]], ['Imagen 2', titu, await res.getRandom(), [[]], [[]], [[]], [[]]], ['Imagen 3', titu, await res.getRandom(), [[]], [[]], [[]], [[]]], ['Imagen 4', titu, await res.getRandom(), [[]], [[]], [[]], [[]]], ['Imagen 5', titu, await res.getRandom(), [[]], [[]], [[]], [[]]], ['Imagen 6', titu, await res.getRandom(), [[]], [[]], [[]], [[]]], ['Imagen 7', titu, await res.getRandom(), [[]], [[]], [[]], [[]]], ['Imagen 8', titu, await res.getRandom(), [[]], [[]], [[]], [[]]], ['Imagen 9', titu, await res.getRandom(), [[]], [[]], [[]], [[]]], ['Imagen 10', titu, await res.getRandom(), [[]], [[]], [[]], [[]]]]
await m.react('✅')
await conn.sendCarousel(m.chat, `🤍 Resultado de ${text}`, '🔎 Imagen - Descargas', null, messages, m);
};
handler.help = ['imagen *<texto>*'];
handler.tags = ['search','dl'];
handler.command = ['image','imagen'];
handler.register = true
export default handler;
