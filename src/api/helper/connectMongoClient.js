/**
 * connectToCluster function - Establishes a connection to a MongoDB cluster using the provided URI.
 * Função connectToCluster - Estabelece uma conexão com um cluster MongoDB usando o URI fornecido.
 * 
 * @param {string} uri - The MongoDB URI to connect to the cluster
 * @returns {MongoClient | undefined} - Returns a MongoClient instance if connection is successful, otherwise undefined
 */
const { MongoClient } = require('mongodb')
const logger = require('pino')()

module.exports = async function connectToCluster(uri) {
    let mongoClient

    try {
        mongoClient = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        logger.info('STATE: Connecting to MongoDB')
        await mongoClient.connect()
        logger.info('STATE: Successfully connected to MongoDB')
        return mongoClient
    } catch (error) {
        logger.error('STATE: Connection to MongoDB failed!', error)
        process.exit()
    }
}
