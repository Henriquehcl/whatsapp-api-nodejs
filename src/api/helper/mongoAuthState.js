/**
 * useMongoDBAuthState function - Handles authentication state using MongoDB.
 * Função useMongoDBAuthState - Manipula o estado de autenticação usando o MongoDB.
 */
const { proto } = require('@whiskeysockets/baileys/WAProto')
const {
    Curve,
    signedKeyPair,
} = require('@whiskeysockets/baileys/lib/Utils/crypto')
const {
    generateRegistrationId,
} = require('@whiskeysockets/baileys/lib/Utils/generics')
const { randomBytes } = require('crypto')

/**
 * initAuthCreds function - Initializes authentication credentials.
 * Função initAuthCreds - Inicializa as credenciais de autenticação.
 */
const initAuthCreds = () => {
    const identityKey = Curve.generateKeyPair()
    return {
        noiseKey: Curve.generateKeyPair(),
        signedIdentityKey: identityKey,
        signedPreKey: signedKeyPair(identityKey, 1),
        registrationId: generateRegistrationId(),
        advSecretKey: randomBytes(32).toString('base64'),
        processedHistoryMessages: [],
        nextPreKeyId: 1,
        firstUnuploadedPreKeyId: 1,
        accountSettings: {
            unarchiveChats: false,
        },
    }
}

/**
 * BufferJSON object - Handles Buffer to JSON conversions.
 * Objeto BufferJSON - Manipula as conversões de Buffer para JSON.
 */
const BufferJSON = {
    /**
     * replacer function - Replaces Buffer-like objects with base64 encoded strings.
     * Função replacer - Substitui objetos semelhantes a Buffer por strings codificadas em base64.
     */
    replacer: (k, value) => {
        if (
            Buffer.isBuffer(value) ||
            value instanceof Uint8Array ||
            value?.type === 'Buffer'
        ) {
            return {
                type: 'Buffer',
                data: Buffer.from(value?.data || value).toString('base64'),
            }
        }

        return value
    },

    /**
     * reviver function - Reverts base64 encoded strings to Buffer-like objects.
     * Função reviver - Reverte strings codificadas em base64 para objetos semelhantes a Buffer.
     */
    reviver: (_, value) => {
        if (
            typeof value === 'object' &&
            !!value &&
            (value.buffer === true || value.type === 'Buffer')
        ) {
            const val = value.data || value.value
            return typeof val === 'string'
                ? Buffer.from(val, 'base64')
                : Buffer.from(val || [])
        }

        return value
    },
}

/**
 * useMongoDBAuthState function - Handles authentication state using MongoDB.
 * Função useMongoDBAuthState - Manipula o estado de autenticação usando o MongoDB.
 */
module.exports = useMongoDBAuthState = async (collection) => {
    /**
     * writeData function - Writes data to the MongoDB collection.
     * Função writeData - Escreve dados na coleção do MongoDB.
     */
    const writeData = (data, id) => {
        return collection.replaceOne(
            { _id: id },
            JSON.parse(JSON.stringify(data, BufferJSON.replacer)),
            { upsert: true }
        )
    }

    /**
     * readData function - Reads data from the MongoDB collection.
     * Função readData - Lê dados da coleção do MongoDB.
     */
    const readData = async (id) => {
        try {
            const data = JSON.stringify(await collection.findOne({ _id: id }))
            return JSON.parse(data, BufferJSON.reviver)
        } catch (error) {
            return null
        }
    }

    /**
     * removeData function - Removes data from the MongoDB collection.
     * Função removeData - Remove dados da coleção do MongoDB.
     */
    const removeData = async (id) => {
        try {
            await collection.deleteOne({ _id: id })
        } catch (_a) {}
    }

    const creds = (await readData('creds')) || (0, initAuthCreds)()

    return {
        state: {
            creds,
            keys: {
                get: async (type, ids) => {
                    const data = {}
                    await Promise.all(
                        ids.map(async (id) => {
                            let value = await readData(`${type}-${id}`)
                            if (type === 'app-state-sync-key') {
                                value =
                                    proto.Message.AppStateSyncKeyData.fromObject(
                                        data
                                    )
                            }
                            data[id] = value
                        })
                    )
                    return data
                },
                set: async (data) => {
                    const tasks = []
                    for (const category of Object.keys(data)) {
                        for (const id of Object.keys(data[category])) {
                            const value = data[category][id]
                            const key = `${category}-${id}`
                            tasks.push(
                                value ? writeData(value, key) : removeData(key)
                            )
                        }
                    }
                    await Promise.all(tasks)
                },
            },
        },
        saveCreds: () => {
            return writeData(creds, 'creds')
        },
    }
}
