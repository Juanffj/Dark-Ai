/* import { facebookdl, facebookdlv2 } from '@bochilteam/scraper'
let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) throw `*\`Ingresa El link Del vídeo a descargar 🤍\`*`
await m.react('🕓');
const { result } = await facebookdl(args[0]).catch(async _ => await facebookdlv2(args[0]))
await m.react('✅');
for (const { url, isVideo } of result.reverse()) await conn.sendFile(m.chat, url, `facebook.${!isVideo ? 'bin' : 'mp4'}`, `*\`[ FACEBOOK VIDEO ]\`*`, m, null, rcanal)
}
handler.help = ['facebook2'].map(v => v + ' <url>')
handler.corazones = 2
handler.tags = ['dl']
handler.command = ['facebook2']
handler.exp = 35
export default handler */

import { facebookdl, facebookdlv2 } from '@bochilteam/scraper';

let handler = async (m, { conn, args }) => {
    if (!args[0]) throw `*\`Ingresa El link Del vídeo a descargar 🤍\`*`;
    
    await m.react('🕓');
    const { result } = await facebookdl(args[0]).catch(async _ => await facebookdlv2(args[0]));
    
    await m.react('✅');
    
    // Enviar solo el primer vídeo
    if (result.length > 0) {
        const { url, isVideo } = result[0];
        await conn.sendFile(m.chat, url, `facebook.${!isVideo ? 'bin' : 'mp4'}`, `*\`[ FACEBOOK VIDEO ]\`*`, m, null, rcanal);
    } else {
        throw `*\`No se encontró ningún vídeo.\`*`;
    }
}

handler.help = ['facebook2'].map(v => v + ' <url>');
handler.corazones = 2;
handler.tags = ['dl'];
handler.command = ['facebook2'];
handler.exp = 35;

export default handler;
