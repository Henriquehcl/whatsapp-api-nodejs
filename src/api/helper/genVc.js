/**
 * generateVC function - Generates a vCard (VCF) format string from the provided data.
 * Função generateVC - Gera uma string no formato vCard (VCF) a partir dos dados fornecidos.
 * 
 * @param {object} data - Object containing information for the vCard
 * @returns {string} - Returns a string in vCard format
 */
module.exports = function generateVC(data) {
    const result =
        'BEGIN:VCARD\n' +
        'VERSION:3.0\n' +
        `FN:${data.fullName}\n` +
        `ORG:${data.organization};\n` +
        `TEL;type=CELL;type=VOICE;waid=${data.phoneNumber}:${data.phoneNumber}\n` +
        'END:VCARD'

    return result
}
