/**
 * Arquivo: tokenVerification.js
 * Descrição: Verificação do token de autorização.
 * Description: Authorization token verification.
 */

const config = require('../../config/config');

/**
 * Verifica o token de autorização na requisição.
 * Checks the authorization token in the request.
 */
function tokenVerification(req, res, next) {
    /**
     * Obtém o token Bearer do cabeçalho de autorização.
     * Gets the Bearer token from the authorization header.
     */
    const bearer = req.headers.authorization;
    const token = bearer?.slice(7)?.toString();

    /**
     * Verifica se o token Bearer está presente.
     * Checks if the Bearer token is present.
     */
    if (!token) {
        return res.status(403).send({
            error: true,
            message: 'no bearer token header was present',
        });
    }

    /**
     * Verifica se o token fornecido é válido.
     * Checks if the provided token is valid.
     */
    if (config.token !== token) {
        return res
            .status(403)
            .send({ error: true, message: 'invalid bearer token supplied' });
    }
    next();
}

module.exports = tokenVerification;
