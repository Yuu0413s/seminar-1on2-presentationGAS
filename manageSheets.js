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
        setupSheet(sheet); // ← ここでsheetを渡しているか？
    }
}

function archiveOldSheets(ss) {
    if (!ss) {
        ss = SpreadsheetApp.getActiveSpreadsheet();
    }

    var oldestKeepDate = getFriday(new Date(), 0);
    oldestKeepDate.setHours(0, 0, 0, 0);

    ss.getSheets().forEach(function(sheet) {
        var name = sheet.getName();
        if (name === ARCHIVE_SHEET_PREFIX) return;
        if (!/^\d{4}-\d{2}-\d{2}$/.test(name)) return;

        var parts = name.split("-");
        var sheetDate = new Date(
            parseInt(parts[0]),
            parseInt(parts[1]) - 1,
            parseInt(parts[2])
        );

        if (sheetDate < oldestKeepDate) {
            var allSheets = ss.getSheets();
            var counterIndex = -1;
            for (var j = 0; j < allSheets.length; j++) {
                if (allSheets[j].getName() === ARCHIVE_SHEET_PREFIX) {
                    counterIndex = j;
                    break;
                }
            }
            if (counterIndex === -1) return;
            sheet.activate();
            ss.moveActiveSheet(Math.min(counterIndex + 2, allSheets.length));
        }
    });
}