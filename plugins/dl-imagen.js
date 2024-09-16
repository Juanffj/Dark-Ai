import {googleImage} from '@bochilteam/scraper';
const handler = async (m, {conn, text, usedPrefix, command}) => {
if (!text) return conn.reply(m.chat, `*🤍 Uso Correcto: ${usedPrefix + command} la playa*`, m, rcanal);
await m.react('🕓');
let capt = `*[ GenesisBot By Angel-OFC ]*`
const res = await googleImage(text);
const image = await res.getRandom();
const link = image;
const messages = [['Imagen 1', capt, await res.getRandom(),
[[]], [[]], [[]], [[]]], ['Imagen 2', capt, await res.getRandom(), [[]], [[]], [[]], [[]]], ['Imagen 3', capt, await res.getRandom(), [[]], [[]], [[]], [[]]], ['Imagen 4', capt, await res.getRandom(), [[]], [[]], [[]], [[]]], ['Imagen 5', capt, await res.getRandom(), [[]], [[]], [[]], [[]]], ['Imagen 6', capt, await res.getRandom(), [[]], [[]], [[]], [[]]], ['Imagen 7', capt, await res.getRandom(), [[]], [[]], [[]], [[]]], ['Imagen 8', capt, await res.getRandom(), [[]], [[]], [[]], [[]]], ['Imagen 9', capt, await res.getRandom(), [[]], [[]], [[]], [[]]], ['Imagen 10', capt, await res.getRandom(), [[]], [[]], [[]], [[]]]]
await m.react('✅');
await conn.sendCarousel(m.chat, '🤍 Buscador - Imagenes', `🔍 Resultado de: ${text}`, text, messages, fakegif3);
};
handler.help = ['imagen <query>'];
handler.tags = ['buscador', 'tools', 'descargas'];
handler.command = ['image', 'imagen'];
handler.register = true;
export default handler;