/**
 * Controller functions related to sending various types of messages via WhatsApp.
 * Funções de controle relacionadas ao envio de vários tipos de mensagens via WhatsApp.
 */
exports.Text = async (req, res) => {
    /**
     * Send a text message to the specified ID using the provided key.
     * Envie uma mensagem de texto para o ID especificado usando a chave fornecida.
     */
    const data = await WhatsAppInstances[req.query.key].sendTextMessage(
        req.body.id,
        req.body.message
    )
    return res.status(201).json({ error: false, data: data })
}

exports.Image = async (req, res) => {
    /**
     * Send an image message to the specified ID using the provided key and caption.
     * Envie uma mensagem de imagem para o ID especificado usando a chave e a legenda fornecidas.
     */
    const data = await WhatsAppInstances[req.query.key].sendMediaFile(
        req.body.id,
        req.file,
        'image',
        req.body?.caption
    )
    return res.status(201).json({ error: false, data: data })
}

exports.Video = async (req, res) => {
    /**
     * Send a video message to the specified ID using the provided key and caption.
     * Envie uma mensagem de vídeo para o ID especificado usando a chave e a legenda fornecidas.
     */
    const data = await WhatsAppInstances[req.query.key].sendMediaFile(
        req.body.id,
        req.file,
        'video',
        req.body?.caption
    )
    return res.status(201).json({ error: false, data: data })
}

exports.Audio = async (req, res) => {
    /**
     * Send an audio message to the specified ID using the provided key.
     * Envie uma mensagem de áudio para o ID especificado usando a chave fornecida.
     */
    const data = await WhatsAppInstances[req.query.key].sendMediaFile(
        req.body.id,
        req.file,
        'audio'
    )
    return res.status(201).json({ error: false, data: data })
}

exports.Document = async (req, res) => {
    /**
     * Send a document message to the specified ID using the provided key and filename.
     * Envie uma mensagem de documento para o ID especificado usando a chave e o nome do arquivo fornecidos.
     */
    const data = await WhatsAppInstances[req.query.key].sendMediaFile(
        req.body.id,
        req.file,
        'document',
        '',
        req.body.filename
    )
    return res.status(201).json({ error: false, data: data })
}

exports.Mediaurl = async (req, res) => {
    /**
     * Send a media message via URL to the specified ID using the provided key and parameters.
     * Envie uma mensagem de mídia via URL para o ID especificado usando a chave e os parâmetros fornecidos.
     */
    const data = await WhatsAppInstances[req.query.key].sendUrlMediaFile(
        req.body.id,
        req.body.url,
        req.body.type, // Types are [image, video, audio, document]
        req.body.mimetype, // mimeType of mediaFile / Check Common mimetypes in `https://mzl.la/3si3and`
        req.body.caption
    )
    return res.status(201).json({ error: false, data: data })
}

exports.Button = async (req, res) => {
    /**
     * Send a message with a button to the specified ID using the provided key and button data.
     * Envie uma mensagem com um botão para o ID especificado usando a chave e os dados do botão fornecidos.
     */
    const data = await WhatsAppInstances[req.query.key].sendButtonMessage(
        req.body.id,
        req.body.btndata
    )
    return res.status(201).json({ error: false, data: data })
}

exports.Contact = async (req, res) => {
    /**
     * Send a contact message to the specified ID using the provided key and vCard.
     * Envie uma mensagem de contato para o ID especificado usando a chave e o vCard fornecidos.
     */
    const data = await WhatsAppInstances[req.query.key].sendContactMessage(
        req.body.id,
        req.body.vcard
    )
    return res.status(201).json({ error: false, data: data })
}

exports.List = async (req, res) => {
    /**
     * Send a list message to the specified ID using the provided key and message data.
     * Envie uma mensagem de lista para o ID especificado usando a chave e os dados da mensagem fornecidos.
     */
    const data = await WhatsAppInstances[req.query.key].sendListMessage(
        req.body.id,
        req.body.msgdata
    )
    return res.status(201).json({ error: false, data: data })
}

exports.MediaButton = async (req, res) => {
    /**
     * Send a message with a media button to the specified ID using the provided key and button data.
     * Envie uma mensagem com um botão de mídia para o ID especificado usando a chave e os dados do botão fornecidos.
     */
    const data = await WhatsAppInstances[req.query.key].sendMediaButtonMessage(
        req.body.id,
        req.body.btndata
    )
    return res.status(201).json({ error: false, data: data })
}

exports.SetStatus = async (req, res) => {
    const presenceList = [
        'unavailable',
        'available',
        'composing',
        'recording',
        'paused',
    ]
    if (presenceList.indexOf(req.body.status) === -1) {
        return res.status(400).json({
            error: true,
            message:
                'status parameter must be one of ' + presenceList.join(', '),
        })
    }

    /**
     * Set the status for the provided ID using the specified status and key.
     * Defina o status para o ID fornecido usando o status e chave especificados.
     */
    const data = await WhatsAppInstances[req.query.key]?.setStatus(
        req.body.status,
        req.body.id
    )
    return res.status(201).json({ error: false, data: data })
}

exports.Read = async (req, res) => {
    /**
     * Read the specified message using the provided key and message ID.
     * Leia a mensagem especificada usando a chave e o ID da mensagem fornecidos.
     */
    const data = await WhatsAppInstances[req.query.key].readMessage(req.body.msg)
    return res.status(201).json({ error: false, data: data })
}

exports.React = async (req, res) => {
    /**
     * React to a message using the provided key, message ID, and emoji.
     * Reaja a uma mensagem usando a chave, ID da mensagem e emoji fornecidos.
     */
    const data = await WhatsAppInstances[req.query.key].reactMessage(
        req.body.id,
        req.body.key,
        req.body.emoji
    )
    return res.status(201).json({ error: false, data: data })
}
