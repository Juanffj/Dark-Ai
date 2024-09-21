import axios from 'axios';
import cheerio from 'cheerio';

let handler = async (m, { args, conn }) => { 
    if (!args[0]) {
        return conn.reply(m.chat, '*\`Ingresa el link del vídeo a descargar 🤍\`*', m, fake);
    }

    try {
        await m.react('🕑');
        
        const response = await axios.get(args[0]);
        const $ = cheerio.load(response.data);
        
        // Busca la URL del vídeo
        const videoUrl = $('meta[property="og:video"]').attr('content');

        if (!videoUrl) {
            throw new Error('No se encontró el vídeo.');
        }

        await new Promise(resolve => setTimeout(resolve, 2000));
        
        await m.react('✅');
        await conn.sendFile(m.chat, videoUrl, 'video.mp4', 'Vídeo descargado de Threads', null, m);
    } catch (error) {
        console.error(error);
        await m.react('❌');
        return conn.reply(m.chat, '*\`Error al descargar el vídeo. Asegúrate de que el link sea correcto.\`*', m);
    }
}

handler.corazones = 2;
handler.command = ['threads2'];
handler.tags = ['dl'];
handler.help = ['threads2 <link>'];

export default handler;
