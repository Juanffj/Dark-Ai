import yts from 'yt-search'

var handler = async (m, { text, conn, args, command, usedPrefix }) => {

if (!text) return conn.reply(m.chat, `> _*Escriba el título de algún vídeo de Youtube*_\n\nEjemplo, ${usedPrefix + command} Elaina Edit`, m, rcanal, )

try {
				let yts = require("yt-search")
				let search = await yts(text);
				let videos = search.all;
				console.log(videos)
				if (!videos || videos.length === 0) {
					m.reply('No Video Found');
					return;
				}
				// Choose between 1 and 5 videos at random
				const numVideos = Math.min(videos.length, Math.floor(Math.random() * 10) + 1);
				const selectedVideos = [];
				while (selectedVideos.length < numVideos) {
					const randomIndex = Math.floor(Math.random() * videos.length);
					const randomVideo = videos.splice(randomIndex, 1)[0]; // Avoid selecting the same videos
					selectedVideos.push(randomVideo);
				}
				let push = [];
				for (let i = 0; i < selectedVideos.length; i++) {
					let video = selectedVideos[i];
					let cap = `Titulo : ${video.title}`;
					const mediaMessage = await prepareWAMessageMedia({
						image: {
							url: video.thumbnail
						}
					}, {
						upload: conn.waUploadToServer
					});
					push.push({
						body: proto.Message.InteractiveMessage.Body.fromObject({
							text: cap
						}),
						footer: proto.Message.InteractiveMessage.Footer.fromObject({
							text: "𝑮𝒆𝒏𝒆𝒔𝒊𝒔-𝑩𝒐𝒕 - 𝑪𝒉𝒂𝒏𝒏𝒆𝒍"
						}),
						header: proto.Message.InteractiveMessage.Header.create({
							title: `Video ${i + 1}`,
							subtitle: '',
							hasMediaAttachment: true,
							...mediaMessage
						}),
						nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
							buttons: [{
								"name": "cta_copy",
								"buttonParamsJson": `{"display_text":"Copiar Link","id":"1234","copy_code":"${video.url}"}`
							}]
						})
					});
				}
				const msg = generateWAMessageFromContent(m.chat, {
					viewOnceMessage: {
						message: {
							messageContextInfo: {
								deviceListMetadata: {},
								deviceListMetadataVersion: 2
							},
							interactiveMessage: proto.Message.InteractiveMessage.fromObject({
								body: proto.Message.InteractiveMessage.Body.create({
									text: "𝑮𝒆𝒏𝒆𝒔𝒊𝒔-𝑩𝒐𝒕 - 𝑪𝒉𝒂𝒏𝒏𝒆𝒍"
								}),
								footer: proto.Message.InteractiveMessage.Footer.create({
									text: "𝑮𝒆𝒏𝒆𝒔𝒊𝒔-𝑩𝒐𝒕 - 𝑪𝒉𝒂𝒏𝒏𝒆𝒍"
								}),
								header: proto.Message.InteractiveMessage.Header.create({
									hasMediaAttachment: false
								}),
								carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
									cards: push
								}),
								contextInfo: {
									mentionedJid: [m.sender],
									forwardingScore: 999,
									isForwarded: true,
									forwardedNewsletterMessageInfo: {
										newsletterJid: "120363220939514640@newsletter",
										newsletterName: "𝑮𝒆𝒏𝒆𝒔𝒊𝒔-𝑩𝒐𝒕 - 𝑪𝒉𝒂𝒏𝒏𝒆𝒍",
										serverMessageId: 143
									}
								}
							})
						}
					}
				}, {
					quoted: fakegif3
				});
				await conn.relayMessage(m.chat, msg.message, {
					messageId: msg.key.id
				});
			} catch (e) {
				console.error(e);
				await m.reply(`Error`);
			}
}
handler.help = ['ytsearch']
handler.tags = ['buscador']
handler.command = ['playlist888', 'ytbuscar', 'yts', 'ytsearch']

handler.register = true