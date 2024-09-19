import axios from 'axios';
import fetch from 'node-fetch';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';
import search from 'yt-search';

// Función para buscar en Spotify a través de un proxy o API pública
async function spotifySearch(query) {
    const response = await axios.get(`https://api.spotify.com/v1/search?q=`, {
        params: {
            q: query,
            type: 'track',
        }
    });

    const tracks = response.data.tracks;
    return tracks.map((track) => ({
        name: track.name,
        artist: track.artists.map((artist) => artist.name).join(', '),
        album: track.album.name,
        duration: formatDuration(track.duration_ms),
        url: track.external_urls.spotify,
        image: track.album.images.length ? track.album.images[0].url : '',
    }));
}

// Formatear duración
function formatDuration(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Búsqueda en YouTube
async function searchYouTube(query) {
    const { all: [bestItem, ...moreItems] } = await search(query);
    return {
        bestItem,
        videoItems: moreItems.filter(item => item.type === 'video'),
    };
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `⊱ *${usedPrefix + command} Bellyache*`;

    try {
        m.react('🕒');
        const spotifyResults = await spotifySearch(text);
        const youtubeResults = await searchYouTube(text);

        if (!spotifyResults.length && !youtubeResults.videoItems.length) {
            throw `*No se encontró ninguna canción o video.*`;
        }

        const buttons = [];

        // Resultados de Spotify
        if (spotifyResults.length) {
            const res = spotifyResults[0];
            buttons.push({
                buttonId: `play ${res.url}`,
                buttonText: { displayText: `🎶 ${res.name} - ${res.artist}` },
                type: 1,
            });
        }

        // Resultados de YouTube
        youtubeResults.videoItems.forEach((item, index) => {
            buttons.push({
                buttonId: `ytplay ${item.url}`,
                buttonText: { displayText: `${index + 1}. ${item.title}` },
                type: 1,
            });
        });

        const buttonMessage = {
            text: `Resultados encontrados:\n\nSpotify:\n- ${spotifyResults[0]?.name || 'No disponible'}\n\nYouTube:\n${youtubeResults.videoItems.map((item, i) => `${i + 1}. ${item.title}`).join('\n')}`,
            footer: 'Selecciona un resultado',
            buttons,
            headerType: 1,
        };

        await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
        m.react('✅');
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, `Ocurrió un error: ${error.message}`, m);
    }
};

handler.help = ['spotify <cancion>', 'ytsearch <cancion>'];
handler.tags = ['search', 'dl'];
handler.command = /^(spotifytgd|music|ytsearch)$/i;
handler.register = true;

export default handler;
