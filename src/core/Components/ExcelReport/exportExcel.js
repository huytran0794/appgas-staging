import { utils as XLSX, write } from "xlsx";

const autoFitCol = (data, headers) => {
  const objectMaxLength = [];
  const keyArr = headers.length ? headers : Object.keys(data[0]);
  keyArr.forEach((k, idx) => {
    objectMaxLength[idx] =
      objectMaxLength[idx] >= k.length ? objectMaxLength[idx] : k.length;
  });

  data.forEach((item) => {
    Object.values(item).forEach((v, idx) => {
      objectMaxLength[idx] =
        objectMaxLength[idx] >= v.length ? objectMaxLength[idx] : v.length;
    });
  });

  return objectMaxLength.map((w) => {
    w += 20;
    return { width: w };
  });
};

export const exportToExcel = (fileName, dataToExport) => {
  const headers = [
    "Id",
    "Full Name",
    "Email",
    "Sđt",
    "Address",
    "Note",
    "Order id",
    "Order content",
    "Order note",
    "Order complete date",
  ];

  const ws = XLSX.json_to_sheet(dataToExport);
  ws["!cols"] = autoFitCol(dataToExport, headers);
  /* add custom headers */
  XLSX.sheet_add_aoa(ws, [headers], { origin: "A1" });
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

  /* generate XLSX file and send to client */
  const excelBuffer = write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: fileType });

  return data;
};
