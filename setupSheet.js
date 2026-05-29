// シートのレイアウト・初期データを設定する
// 時限スロット定義は config.js の THIRD_PERIOD / FOURTH_PERIOD / FIFTH_PERIOD を参照

function setupSheet(sheet) {
  sheet.getRange("1:1").breakApart();
  sheet.getRange("A1:G1").merge();
  sheet.getRange("A1").setValue(
    "Please secure your slots by filling your name. Let's do 1 on 1 at least every couple of weeks."
  );
  sheet.getRange("A1").setBackground(COLORS.HEADER_TITLE);
  sheet.getRange("A1").setFontSize(FONTS.TITLE_SIZE);
  sheet.getRange("A1").setFontWeight("bold");

  sheet.getRange("A2:G2").setValues([[
    "時限(Period)", "開始時間(Start)", "終了時間(End)",
    "予約者名(Student name)", "状態(situation)",
    "要望(Request)", "先生からの連絡(teacher's info)"
  ]]);
  sheet.getRange("A2:G2").setBackground(COLORS.HEADER_ROW);
  sheet.getRange("A2:G2").setFontSize(FONTS.BODY_SIZE);

  sheet.getRange(ROWS.DATA_START, COLUMNS.PERIOD).setValue("3rd");
  THIRD_PERIOD.forEach(function(slot, i) {
    var row = ROWS.DATA_START + i;
    sheet.getRange(row, COLUMNS.START).setValue(slot[0]);
    sheet.getRange(row, COLUMNS.END).setValue(slot[1]);
  });

  var fourthLabelRow = ROWS.FOURTH_PERIOD_START;
  sheet.getRange(fourthLabelRow, COLUMNS.PERIOD).setValue("4th");
  FOURTH_PERIOD.forEach(function(slot, i) {
    var row = fourthLabelRow + i;
    sheet.getRange(row, COLUMNS.START).setValue(slot[0]);
    sheet.getRange(row, COLUMNS.END).setValue(slot[1]);
    sheet.getRange(row, COLUMNS.NAME, 1, 4).setBackground(COLORS.FOURTH_PERIOD_BG);
  });

  sheet.getRange(fourthLabelRow, COLUMNS.NAME).setValue("皆さんの前で、発表したい人はここに。");
  sheet.getRange(fourthLabelRow + 1, COLUMNS.NAME).setValue("If you like to present and discuss with others, please fill here.");

  var fifthLabelRow = ROWS.FOURTH_PERIOD_END + 1;
  sheet.getRange(fifthLabelRow, COLUMNS.PERIOD).setValue("5th");
  FIFTH_PERIOD.forEach(function(slot, i) {
    var row = fifthLabelRow + i;
    sheet.getRange(row, COLUMNS.START).setValue(slot[0]);
    sheet.getRange(row, COLUMNS.END).setValue(slot[1]);
  });

  sheet.getRange("A2:G" + ROWS.LAST_DATA_ROW).setFontSize(FONTS.BODY_SIZE);
}

// GASエディタから直接テスト実行するためのラッパー
function setupSheetTest() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  setupSheet(sheet);
}
