/**
 * Arquivo: loginCheck.js
 * Descrição: Verificação de login.
 * Description: Login verification.
 */

/**
 * Verifica o login com a chave fornecida na query.
 * Checks login with the provided key in the query.
 */
function loginVerification(req, res, next) {
    const key = req.query['key']?.toString();

    /**
     * Verifica se a chave está presente na query.
     * Checks if the key is present in the query.
     */
    if (!key) {
        return res
            .status(403)
            .send({ error: true, message: 'no key query was present' });
    }

    const instance = WhatsAppInstances[key];

    /**
     * Verifica se a instância está online.
     * Checks if the instance is online.
     */
    if (!instance.instance?.online) {
        return res
            .status(401)
            .send({ error: true, message: "phone isn't connected" });
    }

    next();
}

module.exports = loginVerification;
