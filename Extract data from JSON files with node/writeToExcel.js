const fs = require('fs');
const ExcelJS = require('exceljs');

const writeToExcel = async (data) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet 1');

  // Add column headers
  worksheet.columns = [
    { header: 'Email', key: 'email', width: 32 },
    { header: 'First Name', key: 'firstName', width: 32 },
    { header: 'Last Name', key: 'lastName', width: 32 }
  ];

  // Add rows
  data.forEach(({ email, firstName, lastName }) => {
    worksheet.addRow({ email, firstName, lastName });
  });

  await workbook.xlsx.writeFile('./extractedData.xlsx');
  console.log('Data has been written to extractedData.xlsx');
};

const extractDataAndWriteToExcel = () => {
  const path = './customerFile.json'; // Assuming the path to your JSON file
  const data = fs.readFileSync(path, 'utf8');
  const jsonData = JSON.parse(data);
  writeToExcel(jsonData).catch(console.error);
};

extractDataAndWriteToExcel();