/**
 * APIError class - Extends ExtendableError to create API-specific error objects.
 * Classe APIError - Estende ExtendableError para criar objetos de erro específicos da API.
 */
const ExtendableError = require('../errors/extendable.error')

class APIError extends ExtendableError {
    /**
     * Constructor for APIError class.
     * Construtor para a classe APIError.
     * 
     * @param {Object} options - Options object containing message, errors, and status properties
     * @param {string} options.message - Error message
     * @param {any} options.errors - Additional error details
     * @param {number} options.status - Error status code (default: 500)
     */
    constructor({ message, errors, status = 500 }) {
        super({
            message,
            errors,
            status,
        })
    }
}

module.exports = APIError
