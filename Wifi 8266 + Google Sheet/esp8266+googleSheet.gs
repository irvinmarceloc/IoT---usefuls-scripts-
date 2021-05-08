/*
	Este scrip registra lectura de sensores para cargarlo en una hoja de cálculos de google
	Sensores utilizados 
		* ccs811 ---> Salidas TVOC y CO2
		* dht22 ---> Salidas temperatura y humedad
	Por lo tanto son 4 parametros mas hora y fecha
*/
function doGet(e) { 
  Logger.log( JSON.stringify(e) );  // view parameters
  var result = 'Ok'; // assume success
  if (e.parameter == 'undefined') {
    result = 'No Parameters';
  }
  else {
    var sheet_id = '1hlu0EFSVowbpx3sjIAaThsojx7ZlMYRLqytxRnD-9_Y'; 		// Spreadsheet ID
    var sheet = SpreadsheetApp.openById(sheet_id).getActiveSheet();		// get Active sheet
    var newRow = sheet.getLastRow() + 1;						
    var rowData = [];
	var Curr_Date = new Date(); 
    rowData[0] = Curr_Date; 											// Date in column A
	var Curr_Time = Utilities.formatDate(Curr_Date, "Asia/Jakarta", 'HH:mm:ss');
	rowData[1] = Curr_Time; 											// Time in column B
    for (var param in e.parameter) {
      Logger.log('In for loop, param=' + param);
      var value = stripQuotes(e.parameter[param]);
      Logger.log(param + ':' + e.parameter[param]);
      switch (param) {
        case 'CO2': //Parameter
          rowData[2] = value; //Value in column C
          break;
        case 'TOCV': //Parameter
          rowData[3] = value; //Value in column D
          break;  
        case 'TEMP': //Parameter
          rowData[4] = value; //Value in column D
          break;
        case 'HUME': //Parameter
          rowData[5] = value; //Value in column D
          break;  
        default:
          result = "unsupported parameter";
      }
    }
    Logger.log(JSON.stringify(rowData));
    // Write new row below
    var newRange = sheet.getRange(newRow, 1, 1, rowData.length);
    newRange.setValues([rowData]);
  }
  // Return result of operation
  return ContentService.createTextOutput(result);
}
/**
* Remove leading and trailing single or double quotes
*/
function stripQuotes(value) {
  return value.replace(/^["']|['"]$/g, "");
}

