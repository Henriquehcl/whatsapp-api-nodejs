const express = require('express');
const controller = require('../controllers/group.controller');
const keyVerify = require('../middlewares/keyCheck');
const loginVerify = require('../middlewares/loginCheck');

const router = express.Router();

/**
 * Rota para criar um grupo.
 * Route to create a group.
 */
router.route('/create').post(keyVerify, loginVerify, controller.create);

/**
 * Rota para listar todos os grupos.
 * Route to list all groups.
 */
router.route('/listall').get(keyVerify, loginVerify, controller.listAll);

/**
 * Rota para sair de um grupo.
 * Route to leave a group.
 */
router.route('/leave').get(keyVerify, loginVerify, controller.leaveGroup);

/**
 * Rota para convidar usuário para um grupo.
 * Route to invite a user to a group.
 */
router.route('/inviteuser').post(keyVerify, loginVerify, controller.addNewParticipant);

/**
 * Rota para tornar um usuário um administrador do grupo.
 * Route to make a user an admin of the group.
 */
router.route('/makeadmin').post(keyVerify, loginVerify, controller.makeAdmin);

/**
 * Rota para rebaixar um administrador do grupo.
 * Route to demote an admin of the group.
 */
router.route('/demoteadmin').post(keyVerify, loginVerify, controller.demoteAdmin);

/**
 * Rota para obter o código de convite do grupo.
 * Route to get the group's invite code.
 */
router.route('/getinvitecode').get(keyVerify, loginVerify, controller.getInviteCodeGroup);

/**
 * Rota para obter o código de convite da instância do grupo.
 * Route to get the group instance's invite code.
 */
router.route('/getinstanceinvitecode').get(keyVerify, loginVerify, controller.getInstanceInviteCodeGroup);

/**
 * Rota para obter todos os grupos.
 * Route to get all groups.
 */
router.route('/getallgroups').get(keyVerify, loginVerify, controller.getAllGroups);

/**
 * Rota para atualizar participantes do grupo.
 * Route to update group participants.
 */
router.route('/participantsupdate').post(keyVerify, loginVerify, controller.groupParticipantsUpdate);

/**
 * Rota para atualizar configurações do grupo.
 * Route to update group settings.
 */
router.route('/settingsupdate').post(keyVerify, loginVerify, controller.groupSettingUpdate);

/**
 * Rota para atualizar assunto do grupo.
 * Route to update group subject.
 */
router.route('/updatesubject').post(keyVerify, loginVerify, controller.groupUpdateSubject);

/**
 * Rota para atualizar descrição do grupo.
 * Route to update group description.
 */
router.route('/updatedescription').post(keyVerify, loginVerify, controller.groupUpdateDescription);

/**
 * Rota para obter informações do convite do grupo.
 * Route to get group invite information.
 */
router.route('/inviteinfo').post(keyVerify, loginVerify, controller.groupInviteInfo);

/**
 * Rota para ingressar no grupo.
 * Route to join the group.
 */
router.route('/groupjoin').post(keyVerify, loginVerify, controller.groupJoin);

module.exports = router;
