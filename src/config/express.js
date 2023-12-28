const express = require('express');
const path = require('path');
const exceptionHandler = require('express-exception-handler');

/**
 * Inicializa o tratamento global de exceções para o Express
 * Initializes global exception handling for Express
 */
exceptionHandler.handle();

const app = express();
const error = require('../api/middlewares/error');
const tokenCheck = require('../api/middlewares/tokenCheck');
const { protectRoutes } = require('./config');

/**
 * Habilita o middleware para interpretar JSON no corpo das requisições
 * Enables middleware to parse JSON in request bodies
 */
app.use(express.json());
app.use(express.json({ limit: '50mb' }));

/**
 * Habilita o middleware para analisar dados de formulário enviados via URL
 * Enables middleware to parse URL-encoded form data
 */
app.use(express.urlencoded({ extended: true }));

/**
 * Define o mecanismo de visualização e o diretório de visualizações para o EJS
 * Sets the view engine and views directory for EJS
 */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../api/views'));

/**
 * Objeto global para armazenar instâncias do WhatsApp
 * Global object to store WhatsApp instances
 */
global.WhatsAppInstances = {};

const routes = require('../api/routes/');

/**
 * Verifica se é necessário proteger rotas com verificação de token
 * Checks if routes need to be protected with token verification
 */
if (protectRoutes) {
    app.use(tokenCheck);
}

/**
 * Define as rotas principais da aplicação
 * Sets the main routes for the application
 */
app.use('/', routes);

/**
 * Middleware para lidar com erros
 * Middleware to handle errors
 */
app.use(error.handler);

/**
 * Exporta a aplicação Express configurada
 * Exports the configured Express application
 */
module.exports = app;
