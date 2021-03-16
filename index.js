const functions = require("firebase-functions");
const excel = require('./excel');
const email = require('./email');
const db = require('./functions');

exports.senNotificacionsWpp = functions.pubsub.schedule('00 07 * * *').timeZone('America/Lima').onRun(async(context) => {
  try {
    const users = await db.getDocuments('USUARIOS');
    const indicators = await db.getDocuments('INDICADORES');
    const headers =  [
      {header: 'CALL', key: 'call'},
      {header: 'TIPIFICACIONES', key: 'tipificaciones'},
      {header: 'APTOS', key: 'aptos'},
      {header: 'AGENDADOS', key: 'agendados'},
      {header: 'CALIDAD', key: 'calidad'},
  ]; 
    const buffer = await excel.generateExcel(headers, indicators)
    users.forEach((user) => {
      email.sendEmail(user, buffer);
    })
    return console.log('Se ha ejecutado correctamente la cloud function');
  } catch (error) {
    console.log('error encontrado', error);
  }
});