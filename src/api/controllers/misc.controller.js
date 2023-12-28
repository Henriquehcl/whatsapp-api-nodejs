exports.onWhatsapp = async (req, res) => {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const data = await WhatsAppInstances[req.query.key]?.verifyId(
        WhatsAppInstances[req.query.key]?.getWhatsAppId(req.query.id)
    )
    return res.status(201).json({ error: false, data: data })
}

exports.downProfile = async (req, res) => {
    const data = await WhatsAppInstances[req.query.key]?.DownloadProfile(
        req.query.id
    )
    return res.status(201).json({ error: false, data: data })
}

exports.getStatus = async (req, res) => {
    const data = await WhatsAppInstances[req.query.key]?.getUserStatus(
        req.query.id
    )
    return res.status(201).json({ error: false, data: data })
}

exports.blockUser = async (req, res) => {
    const data = await WhatsAppInstances[req.query.key]?.blockUnblock(
        req.query.id,
        req.query.block_status
    )
    if (req.query.block_status == 'block') {
        return res
            .status(201)
            .json({ error: false, message: 'Contact Blocked' })
    } else
        return res
            .status(201)
            .json({ error: false, message: 'Contact Unblocked' })
}

exports.updateProfilePicture = async (req, res) => {
    const data = await WhatsAppInstances[req.query.key].updateProfilePicture(
        req.body.id,
        req.body.url
    )
    return res.status(201).json({ error: false, data: data })
}

exports.getUserOrGroupById = async (req, res) => {
    const data = await WhatsAppInstances[req.query.key].getUserOrGroupById(
        req.query.id
    )
    return res.status(201).json({ error: false, data: data })
}
/**
 * Controller functions related to WhatsApp actions.
 * Funções de controle relacionadas às ações do WhatsApp.
 */
exports.onWhatsapp = async (req, res) => {
    // Verify and retrieve data from WhatsApp instance based on the provided key and ID.
    // Verificar e obter dados da instância do WhatsApp com base na chave e no ID fornecidos.
    const data = await WhatsAppInstances[req.query.key]?.verifyId(
        WhatsAppInstances[req.query.key]?.getWhatsAppId(req.query.id)
    )
    return res.status(201).json({ error: false, data: data })
}

/**
 * Download profile information from WhatsApp based on the provided key and ID.
 * Baixar informações do perfil do WhatsApp com base na chave e no ID fornecidos.
 */
exports.downProfile = async (req, res) => {
    const data = await WhatsAppInstances[req.query.key]?.DownloadProfile(
        req.query.id
    )
    return res.status(201).json({ error: false, data: data })
}

/**
 * Get status of a user or group on WhatsApp using the provided key and ID.
 * Obter o status de um usuário ou grupo no WhatsApp usando a chave e o ID fornecidos.
 */
exports.getStatus = async (req, res) => {
    const data = await WhatsAppInstances[req.query.key]?.getUserStatus(
        req.query.id
    )
    return res.status(201).json({ error: false, data: data })
}

/**
 * Block or unblock a user on WhatsApp based on the provided key, ID, and block status.
 * Bloquear ou desbloquear um usuário no WhatsApp com base na chave, ID e status de bloqueio fornecidos.
 */
exports.blockUser = async (req, res) => {
    const data = await WhatsAppInstances[req.query.key]?.blockUnblock(
        req.query.id,
        req.query.block_status
    )
    if (req.query.block_status == 'block') {
        return res
            .status(201)
            .json({ error: false, message: 'Contact Blocked' })
    } else
        return res
            .status(201)
            .json({ error: false, message: 'Contact Unblocked' })
}

/**
 * Update profile picture on WhatsApp using the provided key, ID, and URL.
 * Atualizar a foto do perfil no WhatsApp usando a chave, ID e URL fornecidos.
 */
exports.updateProfilePicture = async (req, res) => {
    const data = await WhatsAppInstances[req.query.key].updateProfilePicture(
        req.body.id,
        req.body.url
    )
    return res.status(201).json({ error: false, data: data })
}

/**
 * Get user or group details by ID from WhatsApp using the provided key.
 * Obter detalhes do usuário ou grupo por ID no WhatsApp usando a chave fornecida.
 */
exports.getUserOrGroupById = async (req, res) => {
    const data = await WhatsAppInstances[req.query.key].getUserOrGroupById(
        req.query.id
    )
    return res.status(201).json({ error: false, data: data })
}
