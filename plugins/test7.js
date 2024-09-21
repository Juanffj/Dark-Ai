import axios from 'axios';
import cheerio from 'cheerio';

let handler = async (m, { args, conn }) => { 
    if (!args[0]) {
        return conn.reply(m.chat, '*\`Ingresa el link de la publicación a descargar 🤍\`*', m, fake);
    }

    try {
        await m.react('🕑');
        
        const response = await axios.get(args[0]);
        const $ = cheerio.load(response.data);

        // Busca la imagen
        const imgUrl = $('meta[property="og:image"]').attr('content');
        // Busca el video
        const videoUrl = $('meta[property="og:video"]').attr('content');

        if (imgUrl) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            await m.react('✅');
            await conn.sendFile(m.chat, imgUrl, 'imagen.jpg', 'Imagen descargada de Threads', null, m);
        } else if (videoUrl) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            await m.react('✅');
            await conn.sendFile(m.chat, videoUrl, 'video.mp4', 'Vídeo descargado de Threads', null, m);
        } else {
            throw new Error('No se encontró contenido multimedia.');
        }
    } catch (error) {
        console.error(error);
        await m.react('❌');
        return conn.reply(m.chat, '*\`Error al descargar el contenido. Asegúrate de que el link sea correcto.\`*', m);
    }
}

handler.corazones = 2;
handler.command = ['threads', 'thdl', 'thread'];
handler.tags = ['dl'];
handler.help = ['threads <link>'];

export default handler;
