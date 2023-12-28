/**
 * Controller functions related to WhatsApp group management and operations.
 * Funções de controle relacionadas à gestão e operações de grupo do WhatsApp.
 */
exports.create = async (req, res) => {
    /**
     * Creates a new group with the provided name and users.
     * Cria um novo grupo com o nome e usuários fornecidos.
     */
    const data = await WhatsAppInstances[req.query.key].createNewGroup(
        req.body.name,
        req.body.users
    )
    return res.status(201).json({ error: false, data: data })
}

exports.addNewParticipant = async (req, res) => {
    /**
     * Adds new participants to a specific group.
     * Adiciona novos participantes a um grupo específico.
     */
    const data = await WhatsAppInstances[req.query.key].addNewParticipant(
        req.body.id,
        req.body.users
    )
    return res.status(201).json({ error: false, data: data })
}

exports.makeAdmin = async (req, res) => {
    /**
     * Makes users admin in a particular group.
     * Torna usuários administradores em um grupo específico.
     */
    const data = await WhatsAppInstances[req.query.key].makeAdmin(
        req.body.id,
        req.body.users
    )
    return res.status(201).json({ error: false, data: data })
}

exports.demoteAdmin = async (req, res) => {
    /**
     * Demotes admin privileges of users in a specific group.
     * Reduz os privilégios de administrador dos usuários em um grupo específico.
     */
    const data = await WhatsAppInstances[req.query.key].demoteAdmin(
        req.body.id,
        req.body.users
    )
    return res.status(201).json({ error: false, data: data })
}

exports.listAll = async (req, res) => {
    /**
     * Fetches all groups associated with a particular key.
     * Obtém todos os grupos associados a uma chave específica.
     */
    const data = await WhatsAppInstances[req.query.key].getAllGroups(
        req.query.key
    )
    return res.status(201).json({ error: false, data: data })
}

exports.leaveGroup = async (req, res) => {
    /**
     * Leaves a specific group based on the provided ID.
     * Sai de um grupo específico com base no ID fornecido.
     */
    const data = await WhatsAppInstances[req.query.key].leaveGroup(req.query.id)
    return res.status(201).json({ error: false, data: data })
}

exports.getInviteCodeGroup = async (req, res) => {
    /**
     * Gets the invite code for a specific group.
     * Obtém o código de convite para um grupo específico.
     */
    const data = await WhatsAppInstances[req.query.key].getInviteCodeGroup(
        req.query.id
    )
    return res
        .status(201)
        .json({ error: false, link: 'https://chat.whatsapp.com/' + data })
}

exports.getInstanceInviteCodeGroup = async (req, res) => {
    /**
     * Gets the instance invite code for a specific group.
     * Obtém o código de convite da instância para um grupo específico.
     */
    const data = await WhatsAppInstances[
        req.query.key
    ].getInstanceInviteCodeGroup(req.query.id)
    return res
        .status(201)
        .json({ error: false, link: 'https://chat.whatsapp.com/' + data })
}

exports.getAllGroups = async (req, res) => {
    /**
     * Fetches all participating groups.
     * Obtém todos os grupos participantes.
     */
    const instance = WhatsAppInstances[req.query.key]
    let data
    try {
        data = await instance.groupFetchAllParticipating()
    } catch (error) {
        data = {}
    }
    return res.json({
        error: false,
        message: 'Instance fetched successfully',
        instance_data: data,
    })
}

exports.groupParticipantsUpdate = async (req, res) => {
    /**
     * Updates the participant list in a group.
     * Atualiza a lista de participantes em um grupo.
     */
    const data = await WhatsAppInstances[req.query.key].groupParticipantsUpdate(
        req.body.id,
        req.body.users,
        req.body.action
    )
    return res.status(201).json({ error: false, data: data })
}

exports.groupSettingUpdate = async (req, res) => {
    /**
     * Updates group settings.
     * Atualiza as configurações do grupo.
     */
    const data = await WhatsAppInstances[req.query.key].groupSettingUpdate(
        req.body.id,
        req.body.action
    )
    return res.status(201).json({ error: false, data: data })
}

exports.groupUpdateSubject = async (req, res) => {
    /**
     * Updates the subject of a group.
     * Atualiza o assunto de um grupo.
     */
    const data = await WhatsAppInstances[req.query.key].groupUpdateSubject(
        req.body.id,
        req.body.subject
    )
    return res.status(201).json({ error: false, data: data })
}

exports.groupUpdateDescription = async (req, res) => {
    /**
     * Updates the description of a group.
     * Atualiza a descrição de um grupo.
     */
    const data = await WhatsAppInstances[req.query.key].groupUpdateDescription(
        req.body.id,
        req.body.description
    )
    return res.status(201).json({ error: false, data: data })
}

exports.groupInviteInfo = async (req, res) => {
    /**
     * Fetches information about a group invite.
     * Obtém informações sobre um convite de grupo.
     */
    const data = await WhatsAppInstances[req.query.key].groupGetInviteInfo(
        req.body.code
    )
    return res.status(201).json({ error: false, data: data })
}

exports.groupJoin = async (req, res) => {
    /**
     * Accepts an invitation code to join a group.
     * Aceita um código de convite para entrar em um grupo.
     */
    const data = await WhatsAppInstances[req.query.key].groupAcceptInvite(
        req.body.code
    )
    return res.status(201).json({ error: false, data: data })
}
