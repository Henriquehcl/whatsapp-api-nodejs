/**
 * Número da porta
 * Port number
 */
const PORT = process.env.PORT || '3333';

/**
 * Token
 * Token
 */
const TOKEN = process.env.TOKEN || '';

/**
 * Proteger rotas
 * Protect routes
 */
const PROTECT_ROUTES = !!(
    process.env.PROTECT_ROUTES && process.env.PROTECT_ROUTES === 'true'
);

/**
 * Restaurar sessões na inicialização
 * Restore sessions on startup
 */
const RESTORE_SESSIONS_ON_START_UP = !!(
    process.env.RESTORE_SESSIONS_ON_START_UP &&
    process.env.RESTORE_SESSIONS_ON_START_UP === 'true'
);

/**
 * URL do aplicativo
 * App URL
 */
const APP_URL = process.env.APP_URL || false;

/**
 * Nível de log
 * Log level
 */
const LOG_LEVEL = process.env.LOG_LEVEL;

/**
 * Número máximo de tentativas para o QR
 * Maximum number of retry for QR
 */
const INSTANCE_MAX_RETRY_QR = process.env.INSTANCE_MAX_RETRY_QR || 2;

/**
 * Plataforma do cliente
 * Client platform
 */
const CLIENT_PLATFORM = process.env.CLIENT_PLATFORM || 'Whatsapp MD';

/**
 * Navegador do cliente
 * Client browser
 */
const CLIENT_BROWSER = process.env.CLIENT_BROWSER || 'Chrome';

/**
 * Versão do cliente
 * Client version
 */
const CLIENT_VERSION = process.env.CLIENT_VERSION || '4.0.0';

/**
 * Habilitar ou desabilitar o MongoDB
 * Enable or disable MongoDB
 */
const MONGODB_ENABLED = !!(
    process.env.MONGODB_ENABLED && process.env.MONGODB_ENABLED === 'true'
);

/**
 * URL do MongoDB
 * MongoDB URL
 */
const MONGODB_URL =
    process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/WhatsAppInstance';

/**
 * Habilitar ou desabilitar webhook globalmente no projeto
 * Enable or disable webhook globally on project
 */
const WEBHOOK_ENABLED = !!(
    process.env.WEBHOOK_ENABLED && process.env.WEBHOOK_ENABLED === 'true'
);

/**
 * URL do webhook
 * Webhook URL
 */
const WEBHOOK_URL = process.env.WEBHOOK_URL;

/**
 * Receber conteúdo da mensagem no webhook (formato Base64)
 * Receive message content in webhook (Base64 format)
 */
const WEBHOOK_BASE64 = !!(
    process.env.WEBHOOK_BASE64 && process.env.WEBHOOK_BASE64 === 'true'
);

/**
 * Eventos permitidos que devem ser enviados para o webhook
 * Allowed events which should be sent to webhook
 */
const WEBHOOK_ALLOWED_EVENTS =
    process.env.WEBHOOK_ALLOWED_EVENTS?.split(',') || ['all'];

/**
 * Marcar mensagens como vistas
 * Mark messages as seen
 */
const MARK_MESSAGES_READ = !!(
    process.env.MARK_MESSAGES_READ && process.env.MARK_MESSAGES_READ === 'true'
);

module.exports = {
    port: PORT,
    token: TOKEN,
    restoreSessionsOnStartup: RESTORE_SESSIONS_ON_START_UP,
    appUrl: APP_URL,
    log: {
        level: LOG_LEVEL,
    },
    instance: {
        maxRetryQr: INSTANCE_MAX_RETRY_QR,
    },
    mongoose: {
        enabled: MONGODB_ENABLED,
        url: MONGODB_URL,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
    browser: {
        platform: CLIENT_PLATFORM,
        browser: CLIENT_BROWSER,
        version: CLIENT_VERSION,
    },
    webhookEnabled: WEBHOOK_ENABLED,
    webhookUrl: WEBHOOK_URL,
    webhookBase64: WEBHOOK_BASE64,
    protectRoutes: PROTECT_ROUTES,
    markMessagesRead: MARK_MESSAGES_READ,
    webhookAllowedEvents: WEBHOOK_ALLOWED_EVENTS,
};
