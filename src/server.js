const dotenv = require('dotenv');
const mongoose = require('mongoose');
const logger = require('pino')();
dotenv.config();

const app = require('./config/express');
const config = require('./config/config');

const { Session } = require('./api/class/session');
const connectToCluster = require('./api/helper/connectMongoClient');

/**
 * Declaração de uma variável server, ainda não inicializada
 * Declaration of a server variable, not yet initialized
 */
let server;

/**
 * Verifica se a configuração do mongoose está habilitada e conecta ao MongoDB usando as opções fornecidas
 * Checks if the mongoose configuration is enabled and connects to MongoDB using the provided options
 */
if (config.mongoose.enabled) {
    mongoose.set('strictQuery', true);
    mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
        /**
         * Registra uma mensagem de log indicando a conexão bem-sucedida
         * Logs a message indicating the successful connection
         */
        logger.info('Conectado ao MongoDB');
    });
}

/**
 * Inicia o servidor Express e escuta na porta especificada no arquivo de configuração
 * Starts the Express server and listens on the port specified in the configuration file
 */
server = app.listen(config.port, async () => {
    /**
     * Registra uma mensagem de log indicando que o servidor está ouvindo na porta especificada
     * Logs a message indicating that the server is listening on the specified port
     */
    logger.info(`Ouvindo na porta ${config.port}`);
    /**
     * Conecta ao cliente MongoDB e o torna acessível globalmente
     * Connects to the MongoDB client and makes it globally accessible
     */
    global.mongoClient = await connectToCluster(config.mongoose.url);

    /**
     * Se a restauração das sessões estiver habilitada nas configurações, restaura as sessões
     * If restoring sessions is enabled in the settings, restores sessions
     */
    if (config.restoreSessionsOnStartup) {
        /**
         * Registra uma mensagem de log indicando a restauração das sessões
         * Logs a message indicating the restoration of sessions
         */
        logger.info(`Restaurando Sessões`);
        /**
         * Cria uma instância da classe Session
         * Creates an instance of the Session class
         */
        const session = new Session();
        /**
         * Restaura as sessões
         * Restores sessions
         */
        let restoreSessions = await session.restoreSessions();
        /**
         * Registra a quantidade de sessões restauradas
         * Logs the number of restored sessions
         */
        logger.info(`${restoreSessions.length} Sessão(ões) Restaurada(s)`);
    }
});

/**
 * Manipulador para encerrar o servidor e o processo Node.js
 * Handler to close the server and the Node.js process
 */
const exitHandler = () => {
    if (server) {
        server.close(() => {
            /**
             * Registra uma mensagem de log indicando que o servidor foi fechado
             * Logs a message indicating that the server was closed
             */
            logger.info('Servidor fechado');
            /**
             * Encerra o processo Node.js com um código de saída específico
             * Terminates the Node.js process with a specific exit code
             */
            process.exit(1);
        });
    } else {
        /**
         * Encerra o processo Node.js com um código de saída específico
         * Terminates the Node.js process with a specific exit code
         */
        process.exit(1);
    }
};

/**
 * Manipulador para lidar com erros não capturados de exceções não tratadas
 * Handler to deal with uncaught errors from unhandled exceptions
 * @param {Error} error 
 */
const unexpectedErrorHandler = (error) => {
    /**
     * Registra o erro não tratado
     * Logs the unhandled error
     */
    logger.error(error);
    /**
     * Chama a função exitHandler para encerrar o servidor e o processo Node.js
     * Calls the exitHandler function to close the server and the Node.js process
     */
    exitHandler();
};

/**
 * Registra o manipulador para exceções não capturadas
 * Registers the handler for uncaught exceptions
 */
process.on('uncaughtException', unexpectedErrorHandler);

/**
 * Registra o manipulador para rejeições não tratadas de Promises
 * Registers the handler for unhandled Promise rejections
 */
process.on('unhandledRejection', unexpectedErrorHandler);

/**
 * Manipulador para o sinal SIGTERM, frequentemente enviado para parar o servidor
 * Handler for the SIGTERM signal, often sent to stop the server
 */
process.on('SIGTERM', () => {
    /**
     * Registra uma mensagem de log indicando o recebimento do sinal SIGTERM
     * Logs a message indicating the receipt of the SIGTERM signal
     */
    logger.info('SIGTERM recebido');

    if (server) {
        /**
         * Fecha o servidor
         * Closes the server
         */
        server.close();
    }
});
/**
 * Exporta o servidor
 * Exports the server
 */
module.exports = server;
