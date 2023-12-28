const express = require('express');
const controller = require('../controllers/misc.controller');
const keyVerify = require('../middlewares/keyCheck');
const loginVerify = require('../middlewares/loginCheck');

const router = express.Router();

/**
 * Rota para verificar se está no WhatsApp
 * Route to check if on WhatsApp
 */
router.route('/onwhatsapp').get(keyVerify, loginVerify, controller.onWhatsapp);

/**
 * Rota para baixar perfil
 * Route to download profile
 */
router.route('/downProfile').get(keyVerify, loginVerify, controller.downProfile);

/**
 * Rota para obter status
 * Route to get status
 */
router.route('/getStatus').get(keyVerify, loginVerify, controller.getStatus);

/**
 * Rota para bloquear usuário
 * Route to block user
 */
router.route('/blockUser').get(keyVerify, loginVerify, controller.blockUser);

/**
 * Rota para atualizar imagem de perfil
 * Route to update profile picture
 */
router
    .route('/updateProfilePicture')
    .post(keyVerify, loginVerify, controller.updateProfilePicture);

/**
 * Rota para obter usuário ou grupo por ID
 * Route to get user or group by ID
 */
router
    .route('/getuserorgroupbyid')
    .get(keyVerify, loginVerify, controller.getUserOrGroupById);

module.exports = router;
