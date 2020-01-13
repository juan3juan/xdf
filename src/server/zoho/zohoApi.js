const baseUrl = "xdf/getRecords/";
const preUrl = "localhost:3300/";

export function getRecordsByModule(module) {
  console.log(module);
  let url = baseUrl + module;
  console.log("url :");
  console.log(url);
  return fetch(url).then(response => {
    console.log(response);
    //if (!response.ok) throw new Error("Network not ok.");
    return response.json().then(records => {
      if (records.length === 0) throw new Error("Record not found!");
      return records;
    });
  });
}
