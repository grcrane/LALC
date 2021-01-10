function updateAudio() {
  var listnames = [];
  var listids = [];
  var audiofolder = '1IdRQs6G-C6wvWiY_voD8cb2LT8g5Ccd3'; // audio_services folder_id 
  var bulletinfolder = '1Tkt2iqcXxMEb_TeJvDj84-vGKrVIwBns'; // docs/bulletins folder_id 
  var newsletterfolder = '1-piWFBJYbL153m44OXvvDggKjIYjbfaa'; // docs/newsletters folder_id
 
  var activeSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Audio");
  var lastRow = activeSheet.getLastRow();
  var lastCol = activeSheet.getLastColumn();
  var targetValues = [];
  var sourceRange = activeSheet.getRange(1, 1, lastRow, lastCol+1);
  var sourceData = sourceRange.getValues();
  //Logger.log(lastRow + " " + lastCol);
  
  // loop through spreadsheet and fill in missing ID's
  sourceData.forEach(function(row) {
    //Logger.log('row6=' + row[6] + ' row2=' + row[2]);
    if (row[6] == '') {
    var fileName = row[2];
    var year = fileName.substr(0,4);
    var id = getTheId(audiofolder, listnames, listids, row[2], year);
    row[6] = listids[id];
    }
  });
  sourceRange.setValues(sourceData);
}

function updateBulletin() {
  
  var listnames = [];
  var listids = [];
  var audiofolder = '1IdRQs6G-C6wvWiY_voD8cb2LT8g5Ccd3'; // audio_services folder_id 
  var bulletinfolder = '1Tkt2iqcXxMEb_TeJvDj84-vGKrVIwBns'; // docs/bulletins folder_id 
  var newsletterfolder = '1-piWFBJYbL153m44OXvvDggKjIYjbfaa'; // docs/newsletters folder_id
 
  var activeSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Bulletin");
  var lastRow = activeSheet.getLastRow();
  var lastCol = activeSheet.getLastColumn();
  var targetValues = [];
  var sourceRange = activeSheet.getRange(1, 1, lastRow, lastCol+1);
  var sourceData = sourceRange.getValues();
  //Logger.log(lastRow + " " + lastCol);
  
  // loop through spreadsheet and fill in missing ID's
  sourceData.forEach(function(row) {
    if (row[3] == '') {
    var fileName = row[2];
    var year = fileName.substr(0,4);
    var id = getTheId(bulletinfolder, listnames, listids, row[2], year);
    row[3] = listids[id];
    }
  });
  sourceRange.setValues(sourceData);
}

function updateNewsletter() {
  
  var listnames = [];
  var listids = [];
  var audiofolder = '1IdRQs6G-C6wvWiY_voD8cb2LT8g5Ccd3'; // audio_services folder_id 
  var bulletinfolder = '1Tkt2iqcXxMEb_TeJvDj84-vGKrVIwBns'; // docs/bulletins folder_id 
  var newsletterfolder = '1-piWFBJYbL153m44OXvvDggKjIYjbfaa'; // docs/newsletters folder_id

  var activeSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Newsletter");
  var lastRow = activeSheet.getLastRow();
  var lastCol = activeSheet.getLastColumn();
  var targetValues = [];
  var sourceRange = activeSheet.getRange(1, 1, lastRow, lastCol+1);
  var sourceData = sourceRange.getValues();
  //Logger.log(lastRow + " " + lastCol);
  
  // loop through spreadsheet and fill in missing ID's
  sourceData.forEach(function(row) {
    if (row[3] == '') {
    var fileName = row[2];
    var year = row[0].substr(0,4);
    //Logger.log('looking for=' + fileName + ' year=' + year);
    var id = getTheId(newsletterfolder, listnames, listids, row[2], year);
    row[3] = listids[id];
    }
  });
  sourceRange.setValues(sourceData);
}
  
/* -------------------------------------------------------------------- */
/* getTheId - Gets the Google file id of the filename found within      */
/*            the audio_services folder and sub folder                  */
/*            Builds arrays.   If found in array then just returns      */
/* -------------------------------------------------------------------- */

function getTheId(lookin, listnames, listids, fileName, year) {
  var i = listnames.indexOf(fileName);
  if (i > 0) {return i;}
  var audiofolders = DriveApp.getFolderById(lookin);
  var audiosub = audiofolders.getFolders();
  //var year = fileName.substr(0,4);
  while (audiosub.hasNext()) {
    var folders = audiosub.next();
    var folderid = folders.getId(); 
    foldername = folders.getName();
    if (foldername.substr(0,4) == year) {
      var folder = DriveApp.getFolderById(folderid);
      var files = folder.getFiles();
      while (files.hasNext()) {
        var file = files.next();
        file_id = file.getId();
        file_name =file.getName();
        listnames.push(file.getName());
        listids.push(file.getId());
      }
    }
  } 
  
  var i = listnames.indexOf(fileName);
  return i;
}
