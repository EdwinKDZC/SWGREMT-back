import XLSX from "xlsx";

const importExcel = async (file) => {
    const excel = XLSX.readFile(file);
    const sheetName = excel.SheetNames; // Get the first sheet name
    const excelData = XLSX.utils.sheet_to_json(excel.Sheets[sheetName[0]]);
    return excelData;
}

export default importExcel;