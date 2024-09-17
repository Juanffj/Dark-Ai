import axios from 'axios';
import fs from 'fs/promises';

const FILE_PATH = './Database/geminiSessions.json';

// Asegúrese de que el archivo exista
const ensureFileExists = async () => {
    try {
        await fs.access(FILE_PATH);
    } catch (error) {
        await fs.writeFile(FILE_PATH, JSON.stringify({}, null, 2));
    }
};

// Lee datos de sesión de un archivo JSON
const readGeminiData = async () => {
    await ensureFileExists();
    try {
        const data = await fs.readFile(FILE_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return {};
    }
};

// Escribe datos de sesión en un archivo JSON
const writeGeminiData = async (data) => {
    await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2));
};

// Procesar solicitudes de API de Gemini
async function gemini(options) {
    try {
        return await new Promise(async (resolve, reject) => {
            options = {
                model: 'gemini-pro',
                messages: options?.messages,
                temperature: options?.temperature || 0.9,
                top_p: options?.top_p || 0.7,
                top_k: options?.top_k || 40,
            };
            if (!options?.messages) return reject('¡Falta carga útil de mensaje!');
            if (!Array.isArray(options?.messages)) return reject('¡Matriz de mensajes no válida!');
            if (isNaN(options?.top_p)) return reject('¡El valor top_p no es válido!');
            if (isNaN(options?.top_k)) return reject('¡El valor Top_k no es válido!');
            axios.post('https://api.acloudapp.com/v1/completions', options, {
                headers: {
                    authorization: 'sk-9jL26pavtzAHk9mdF0A5AeAfFcE1480b9b06737d9eC62c1e'
                }
            }).then(res => {
                const data = res.data;
                if (!data.choices[0].message.content) return reject('¡No se pudo recibir el mensaje de respuesta!');
                resolve({
                    success: true,
                    answer: data.choices[0].message.content
                });
            }).catch(reject);
        });
    } catch (e) {
        return {
            success: false,
            errors: [e]
        };
    }
}

// Controlador principal de Gemini AI
const handler = async (m, { conn, text }) => {
    if (!text) return m.reply('¡Ingresa un mensaje!');

    try {
        const sender = m.sender;
        const currentTime = Date.now();
        const sessionTimeout = 600000; // 10 minutos en milisegundos

        const geminiData = await readGeminiData();

        // Elimina la sesión si se llama al comando para detener la sesión.
        if (/^\.gemini stop$/i.test(text.trim())) {
            if (geminiData[sender]) {
                delete geminiData[sender];
                await writeGeminiData(geminiData);
                return await conn.sendMessage(m.chat, { text: 'Tu sesión de Gemini ha sido eliminada.' }, { quoted: m });
            } else {
                return await conn.sendMessage(m.chat, { text: 'No hay sesiones activas de Géminis.' }, { quoted: m });
            }
        }

        // Consultar y actualizar sesiones
        if (geminiData[sender] && (currentTime - geminiData[sender].timestamp <= sessionTimeout)) {
            // Actualizar la marca de tiempo de la sesión
            geminiData[sender].timestamp = currentTime;
        } else {
            // Iniciar una nueva sesión
            geminiData[sender] = { timestamp: currentTime };
        }

        await writeGeminiData(geminiData);

        // Opciones para la API de Gemini
        const options = {
            messages: [
                { role: 'system', content: 'Eres un asistente útil.' },
                { role: 'user', content: text } // Mengirim pesan baru
            ],
            temperature: 0.8,
            top_p: 0.7,
            top_k: 40
        };

        // Envío de solicitudes a la API de Gemini
        const res = await gemini(options);
        const { answer } = res;

        // Enviar una respuesta al usuario
        await conn.sendMessage(m.chat, { text: answer }, { quoted: m });

    } catch (e) {
        return m.reply('Se produjo un error en el proceso de Gemini AI.');
    }
};

// Handler.before de manejar la sesión
handler.before = async (m, { conn, command }) => {
    if (!m || !m.sender || !m.text) return; // Asegúrese de que m, m.sender y m.text existan

    // Compruebe si el mensaje es una respuesta a un bot o a una etiqueta de bot
    const isReplyToBot = m.quoted && m.quoted.sender === conn.user.jid;
    const isMentioningBot = m.mentionedJid?.includes(conn.user.jid);

    if (!isReplyToBot && !isMentioningBot) return; // Si no es una respuesta o mención, ignora el mensaje.

    try {
        const geminiData = await readGeminiData(); // Lee datos de sesión de un archivo JSON
        const sender = m.sender;
        const currentTime = Date.now();
        const sessionTimeout = 60000; // 10 minutos en milisegundos

        // Comprobar si la sesión del usuario existe
        if (geminiData[sender]) {
            // Comprueba si la sesión sigue activa
            if (currentTime - geminiData[sender].timestamp <= sessionTimeout) {
                // Actualizar la marca de tiempo de la sesión
                geminiData[sender].timestamp = currentTime;
                await writeGeminiData(geminiData);

                // Enviar un mensaje al controlador principal si la sesión está activa
                await handler(m, { conn, text: m.text });
                return;
            } else {
                // Si la sesión ha caducado, elimine la sesión.
                delete geminiData[sender];
                await writeGeminiData(geminiData);
            }
        }
    } catch (error) {
        console.error('Error de handler.before:', error);
    }
};

// Asignar comandos y etiquetas al controlador
handler.help = ['kenisawa'];
handler.tags = ['ai'];
handler.command = /^(kenisawa)$/i;

export default handler;