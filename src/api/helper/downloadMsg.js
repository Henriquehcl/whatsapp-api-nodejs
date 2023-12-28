/**
 * downloadMessage function - Downloads content from a message and converts it to base64 format.
 * Função downloadMessage - Faz o download do conteúdo de uma mensagem e converte para o formato base64.
 * 
 * @param {object} msg - The message object from which to download content
 * @param {string} msgType - The type of message (e.g., 'audio', 'video', 'image', etc.)
 * @returns {string} - Returns a base64 string of the downloaded content
 */
const { downloadContentFromMessage } = require('@whiskeysockets/baileys')

module.exports = async function downloadMessage(msg, msgType) {
    let buffer = Buffer.from([])
    try {
        const stream = await downloadContentFromMessage(msg, msgType)
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
    } catch {
        return console.log('error downloading file-message')
    }
    return buffer.toString('base64')
}
