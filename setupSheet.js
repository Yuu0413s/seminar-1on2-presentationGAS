// シートのレイアウト・初期データを設定する

// 3時限のスロット（config.jsから移動: setupSheet.jsでのみ使用するため）
var THIRD_PERIOD = [
    ["13:15", "13:30"], ["13:30", "13:45"], ["13:45", "14:00"],
    ["14:00", "14:15"], ["14:15", "14:30"], ["14:30", "14:45"],
    ["14:45", "15:00"]
];

// 4時限のスロット
var FOURTH_PERIOD = [
    ["15:00", "15:15"], ["15:15", "15:30"], ["15:30", "15:45"],
    ["15:45", "16:00"], ["16:00", "16:15"], ["16:15", "16:30"],
    ["16:30", "16:45"]
];

// 5時限のスロット
var FIFTH_PERIOD = [
    ["16:45", "17:00"], ["17:00", "17:15"], ["17:15", "17:30"],
    ["17:30", "17:45"], ["17:45", "18:00"], ["18:00", "18:15"],
    ["18:15", "18:30"]
];

function setupSheet(sheet) {
    sheet.getRange("1:1").breakApart();
    sheet.getRange("A1:G1").merge();
    sheet.getRange("A1").setValue(
        "Please secure your slots by filling your name. Let's do 1 on 1 at least every couple of weeks."
    );
    sheet.getRange("A1").setBackground("#cccccc");
    sheet.getRange("A1").setFontSize(16);
    sheet.getRange("A1").setFontWeight("bold");

    sheet.getRange("A2:G2").setValues([[
        "時限(Period)", "開始時間(Start)", "終了時間(End)",
        "予約者名(Student name)", "状態(situation)",
        "要望(Request)", "先生からの連絡(teacher's info)"
    ]]);
    sheet.getRange("A2:G2").setBackground("#d9d9d9");
    sheet.getRange("A2:G2").setFontSize(10);

    sheet.getRange("A3").setValue("3rd");
    THIRD_PERIOD.forEach(function(slot, i) {
        var row = 3 + i;
        sheet.getRange(row, 2).setValue(slot[0]);
        sheet.getRange(row, 3).setValue(slot[1]);
    });

    var fourthLabelRow = 3 + THIRD_PERIOD.length;
    sheet.getRange(fourthLabelRow, 1).setValue("4th");
    FOURTH_PERIOD.forEach(function(slot, i) {
        var row = fourthLabelRow + i;
        sheet.getRange(row, 2).setValue(slot[0]);
        sheet.getRange(row, 3).setValue(slot[1]);
        sheet.getRange(row, 4, 1, 4).setBackground("#cccccc");
    });

    sheet.getRange(fourthLabelRow, 4).setValue("皆さんの前で、発表したい人はここに。");
    sheet.getRange(fourthLabelRow + 1, 4).setValue("If you like to present and discuss with others, please fill here.");

    var fifthLabelRow = fourthLabelRow + FOURTH_PERIOD.length;
    sheet.getRange(fifthLabelRow, 1).setValue("5th");
    FIFTH_PERIOD.forEach(function(slot, i) {
        var row = fifthLabelRow + i;
        sheet.getRange(row, 2).setValue(slot[0]);
        sheet.getRange(row, 3).setValue(slot[1]);
    });

    sheet.getRange("A2:G23").setFontSize(10);
}

// GASエディタから直接テスト実行するためのラッパー
function setupSheetTest() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    setupSheet(sheet);
}