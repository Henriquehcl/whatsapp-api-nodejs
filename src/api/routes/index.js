const express = require('express');
const router = express.Router();
const instanceRoutes = require('./instance.route');
const messageRoutes = require('./message.route');
const miscRoutes = require('./misc.route');
const groupRoutes = require('./group.route');

/**
 * Rota para verificar o status
 * Route to check status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * Rota para as rotas relacionadas à instância
 * Route for instance-related routes
 */
router.use('/instance', instanceRoutes);

/**
 * Rota para as rotas relacionadas a mensagens
 * Route for message-related routes
 */
router.use('/message', messageRoutes);

/**
 * Rota para as rotas relacionadas a grupos
 * Route for group-related routes
 */
router.use('/group', groupRoutes);

/**
 * Rota para rotas diversas
 * Route for miscellaneous routes
 */
router.use('/misc', miscRoutes);

module.exports = router;
