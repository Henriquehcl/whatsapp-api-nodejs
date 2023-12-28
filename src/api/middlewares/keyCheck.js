/**
 * Arquivo: keyCheck.js
 * Descrição: Verificação de chave.
 * Description: Key verification.
 */

/**
 * Verifica a chave presente na query.
 * Checks the key present in the query.
 */
function keyVerification(req, res, next) {
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
     * Verifica se a instância é válida.
     * Checks if the instance is valid.
     */
    if (!instance) {
        return res
            .status(403)
            .send({ error: true, message: 'invalid key supplied' });
    }

    next();
}

module.exports = keyVerification;
