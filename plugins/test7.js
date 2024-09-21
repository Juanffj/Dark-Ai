// creado por Angel-OFC 
// no modifiques los créditos ñ
import axios from 'axios';
import cheerio from 'cheerio';

let handler = async (m, { args, conn }) => { 
    if (!args[0]) {
        return conn.reply(m.chat, '*\`Ingresa el link de la imagen a descargar 🤍\`*', m, fake);
    }

    try {
        await m.react('🕒');        
        const response = await axios.get(args[0]);
        const $ = cheerio.load(response.data);
        
        const imgUrl = $('meta[property="og:image"]').attr('content'); 
        const username = $('meta[property="title"]').attr('content'); // Nombre de quien subió la imagen
        const likes = $('span[data-testid="like"]').text() || '0'; // Likes
        const comments = $('span[data-testid="comment"]').text() || '0'; // Comentarios
        const shares = $('span[data-testid="share"]').text() || '0'; // Compartidos

        if (!imgUrl) {
            throw new Error('No se encontró la imagen.');
        }

        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const caption = `*\`IMAGEN THREADS\`*\n*Usuario:* ${username}\n*Likes:* ${likes}\n*Comentarios:* ${comments}\n*Compartidos:* ${shares}`;
        
        await m.react('✅');
        await conn.sendFile(m.chat, imgUrl, 'imagen.jpg', caption, null, m, fake);
    } catch (error) {
        console.error(error);
        await m.react('❌');
        return conn.reply(m.chat, '*\`Error al descargar la imagen. Asegúrate de que el link sea correcto.\`*', m);
    }
}

handler.corazones = 2;
handler.command = ['threads', 'thdl', 'thread'];
handler.tags = ['dl'];
handler.help = ['threads <link>'];

export default handler;
