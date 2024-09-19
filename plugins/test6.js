import axios from 'axios';

const searchSpotify = async (query) => {
  try {
    const response = await axios.get(`https://api.spottyapi.com/v1/search`, {
      params: {
        q: query,
        type: 'track',
        limit: 5 // Número de resultados por búsqueda
      }
    });
    return response.data.tracks; // Ajusta esto según la estructura de respuesta de la API
  } catch (error) {
    console.error('Error buscando en Spotify:', error);
    throw new Error('Error al buscar en Spotify');
  }
};

const handler = async (m, { conn, usedPrefix, args, command }) => {
  try {
    const text = args.length >= 1 ? args.join(" ") : (m.quoted?.text || m.quoted?.caption || m.quoted?.description) || null;

    if (!text) {
      return conn.reply(m.chat, `🤍 *Escriba el título de una canción de Spotify*\n\nEjemplo, ${usedPrefix + command} Génesis AI`, m);
    }

    const tracks = await searchSpotify(text);

    if (!tracks || tracks.length === 0) {
      return conn.reply(m.chat, `🤍 *No se encontraron resultados para:* ${text}`, m);
    }

    const bestTrack = tracks[0];
    const formattedData = {
      title: `\`[ SPOTIFY - SEARCH ]\`\n\n> 🤍 *\`Título:\`* ${bestTrack.name}\n> 🤍 *\`Artista:\`* ${bestTrack.artists.map(artist => artist.name).join(', ')}\n> 🤍 *\`Álbum:\`* ${bestTrack.album.name}\n> 🤍 *\`Url:\`* ${bestTrack.external_urls.spotify}`,
      rows: tracks.map((track, index) => ({
        header: `${index + 1}). ${track.name}`,
        id: `play ${track.id}`, // Cambia esto por el comando que uses para reproducir
        title: track.name,
        description: track.artists.map(artist => artist.name).join(', ')
      }))
    };

    await conn.sendButtonMessages(m.chat, [
      [formattedData.title, null, bestTrack.album.images[0]?.url || null, [], null, [[], [["ʀᴇꜱᴜʟᴛᴀᴅᴏꜜ🍂", formattedData.rows]]]]
    ], m);

  } catch (error) {
    console.error(error);
    conn.reply(m.chat, `Ocurrió un error: ${error.message}`, m);
  }
};

handler.help = ['spotifysearch *<text>*'];
handler.tags = ['dl'];
handler.command = /^spotifysearchtg|spbuscar$/i;
handler.register = true;
handler.estrellas = 2;

export default handler;
