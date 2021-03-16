const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.database();

async function getDocuments(collection) {
  try {
    const data = await db.ref(collection).once('value');
    if (!data.val()) return [];
    return Object.values(data.val()).map((e, i) => ({
      ...e,
      id: Object.keys(data.val())[i],
    }));
  } catch (error) {
    console.log('ERROR AL OBTENER DOCUMENTOS',error);
  }
}

module.exports = {
  getDocuments
}