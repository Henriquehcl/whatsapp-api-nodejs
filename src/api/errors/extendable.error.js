/**
 * ExtendableError class - Extends the default Error class to create custom error objects.
 * Classe ExtendableError - Estende a classe Error padrão para criar objetos de erro personalizados.
 */
class ExtendableError extends Error {
    /**
     * Constructor for ExtendableError class.
     * Construtor para a classe ExtendableError.
     * 
     * @param {Object} options - Options object containing message, errors, and status properties
     * @param {string} options.message - Error message
     * @param {any} options.errors - Additional error details
     * @param {number} options.status - Error status code
     */
    constructor({ message, errors, status }) {
        super(message)
        this.name = this.constructor.name
        this.message = message
        this.errors = errors
        this.status = status
    }
}

module.exports = ExtendableError
