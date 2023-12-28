const express = require('express');
const controller = require('../controllers/message.controller');
const keyVerify = require('../middlewares/keyCheck');
const loginVerify = require('../middlewares/loginCheck');
const multer = require('multer');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, inMemory: true }).single('file');

/**
 * Rota para enviar mensagem de texto
 * Route to send text message
 */
router.route('/text').post(keyVerify, loginVerify, controller.Text);

/**
 * Rota para enviar imagem
 * Route to send image
 */
router.route('/image').post(keyVerify, loginVerify, upload, controller.Image);

/**
 * Rota para enviar vídeo
 * Route to send video
 */
router.route('/video').post(keyVerify, loginVerify, upload, controller.Video);

/**
 * Rota para enviar áudio
 * Route to send audio
 */
router.route('/audio').post(keyVerify, loginVerify, upload, controller.Audio);

/**
 * Rota para enviar documento
 * Route to send document
 */
router.route('/doc').post(keyVerify, loginVerify, upload, controller.Document);

/**
 * Rota para enviar URL de mídia
 * Route to send media URL
 */
router.route('/mediaurl').post(keyVerify, loginVerify, controller.Mediaurl);

/**
 * Rota para enviar botão
 * Route to send button
 */
router.route('/button').post(keyVerify, loginVerify, controller.Button);

/**
 * Rota para enviar contato
 * Route to send contact
 */
router.route('/contact').post(keyVerify, loginVerify, controller.Contact);

/**
 * Rota para enviar lista
 * Route to send list
 */
router.route('/list').post(keyVerify, loginVerify, controller.List);

/**
 * Rota para definir status
 * Route to set status
 */
router.route('/setstatus').put(keyVerify, loginVerify, controller.SetStatus);

/**
 * Rota para enviar botão de mídia
 * Route to send media button
 */
router
    .route('/mediabutton')
    .post(keyVerify, loginVerify, controller.MediaButton);

/**
 * Rota para marcar mensagem como lida
 * Route to mark message as read
 */
router.route('/read').post(keyVerify, loginVerify, controller.Read);

/**
 * Rota para reagir a uma mensagem
 * Route to react to a message
 */
router.route('/react').post(keyVerify, loginVerify, controller.React);

module.exports = router;
