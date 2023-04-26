import { utils as XLSX, write } from "xlsx";

const autoFitCol = (data) => {
  const objectMaxLength = [];
  const keyArr = Object.keys(data[0]);
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
  const ws = XLSX.json_to_sheet(dataToExport);
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };

  ws["!cols"] = autoFitCol(dataToExport);

  autoFitCol(dataToExport, ws);
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

  /* generate XLSX file and send to client */
  const excelBuffer = write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: fileType });

  return data;
};
