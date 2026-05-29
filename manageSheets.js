// シートの生成とアーカイブ

// トリガーから呼ばれるメイン関数
function manageSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  createFourWeekSheets(ss);
  archiveOldSheets(ss);
}

function createFourWeekSheets(ss) {
  var today = new Date();
  for (var i = 0; i < 4; i++) {
    var friday = getFriday(today, i);
    var sheetName = formatDate(friday);
    if (ss.getSheetByName(sheetName)) continue;
    var totalSheets = ss.getSheets().length;
    var sheet = ss.insertSheet(sheetName, totalSheets - 1);
    setupSheet(sheet);
  }
}

function archiveOldSheets(ss) {
  if (!ss) {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  }

  var oldestKeepDate = getFriday(new Date(), 0);
  oldestKeepDate.setHours(0, 0, 0, 0);

  var allSheets = ss.getSheets();
  var counterIndex = allSheets.findIndex(function(s) {
    return s.getName() === SHEET_NAMES.COUNTER;
  });
  if (counterIndex === -1) return;

  ss.getSheets().forEach(function(sheet) {
    var name = sheet.getName();
    if (name === SHEET_NAMES.COUNTER) return;
    if (!isDateSheetName_(name)) return;

    var sheetDate = parseDateSheetName_(name);
    if (sheetDate < oldestKeepDate) {
      sheet.activate();
      ss.moveActiveSheet(ss.getSheets().length);
    }
  });
}

function isDateSheetName_(name) {
  return /^\d{4}-\d{2}-\d{2}$/.test(name);
}

function parseDateSheetName_(name) {
  var parts = name.split("-");
  return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
}
