const Excel = require('exceljs');

async function generateExcel(headers, items) {
    let workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet('Informe');
    worksheet.columns = headers;
    items.forEach((e) => {
        worksheet.addRow(e);
    });
    const excelBuffer = await workbook.xlsx.writeBuffer();
    return excelBuffer;
};

module.exports = {
  generateExcel,
}