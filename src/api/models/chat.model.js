/**
 * Arquivo: chat.model.js
 * Descrição: Modelo do schema para o chat.
 * Description: Schema model for the chat.
 */

const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    /**
     * Chave única para identificar o chat.
     * Unique key to identify the chat.
     */
    key: {
        type: String,
        required: [true, 'key is missing'],
        unique: true,
    },
    /**
     * Array contendo as mensagens do chat.
     * Array containing chat messages.
     */
    chat: {
        type: Array,
    },
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
