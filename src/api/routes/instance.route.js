const express = require('express');
const controller = require('../controllers/instance.controller');
const keyVerify = require('../middlewares/keyCheck');
const loginVerify = require('../middlewares/loginCheck');

const router = express.Router();

/**
 * Rota para inicializar
 * Route to initialize
 */
router.route('/init').get(controller.init);

/**
 * Rota para gerar QR code
 * Route to generate QR code
 */
router.route('/qr').get(keyVerify, controller.qr);

/**
 * Rota para gerar QR code em formato base64
 * Route to generate QR code in base64 format
 */
router.route('/qrbase64').get(keyVerify, controller.qrbase64);

/**
 * Rota para obter informações
 * Route to get information
 */
router.route('/info').get(keyVerify, controller.info);

/**
 * Rota para restaurar
 * Route to restore
 */
router.route('/restore').get(controller.restore);

/**
 * Rota para fazer logout
 * Route to logout
 */
router.route('/logout').delete(keyVerify, loginVerify, controller.logout);

/**
 * Rota para deletar
 * Route to delete
 */
router.route('/delete').delete(keyVerify, controller.delete);

/**
 * Rota para listar
 * Route to list
 */
router.route('/list').get(controller.list);

module.exports = router;
