// 設定値・定数

var SHEET_NAMES = {
  COUNTER: "counter"
};

var COLUMNS = {
  PERIOD:       1,
  START:        2,
  END:          3,
  NAME:         4,
  STATUS:       5,
  REQUEST:      6,
  TEACHER_INFO: 7
};

var COLORS = {
  ACTIVE:           "#00ff00",
  DONE_SIGNAL:      "#999999",
  HEADER_TITLE:     "#cccccc",
  FOURTH_PERIOD_BG: "#cccccc",
  HEADER_ROW:       "#d9d9d9"
};

var FONTS = {
  TITLE_SIZE: 16,
  BODY_SIZE:  10
};

var STATUSES = {
  DONE:          "済(Done)",
  NOT_AVAILABLE: "対応不可"
};

// 時限スロット定義（setupSheet.js / markSlots.js で共有）
var THIRD_PERIOD = [
  ["13:10", "13:35"], ["13:35", "14:00"], ["14:00", "14:25"], ["14:25", "14:50"]
];

var FOURTH_PERIOD = [
  ["15:00", "15:25"], ["15:25", "15:50"], ["15:50", "16:15"], ["16:15", "16:40"]
];

var FIFTH_PERIOD = [
  ["16:50", "17:15"], ["17:15", "17:40"], ["17:40", "18:05"], ["18:05", "18:30"]
];

// 行番号定義（時限スロット定義の後に配置する必要あり）
var ROWS = {
  DATA_START:          3,
  FOURTH_PERIOD_START: 3 + THIRD_PERIOD.length,
  FOURTH_PERIOD_END:   3 + THIRD_PERIOD.length + FOURTH_PERIOD.length - 1,
  LAST_DATA_ROW:       3 + THIRD_PERIOD.length + FOURTH_PERIOD.length + FIFTH_PERIOD.length - 1,
  COUNTER_DATA_START:  3,  // row1: タイトル, row2: ヘッダー, row3〜: データ
  COUNTER_SORT_START:  3
};

// counterシートの列番号定義
var COUNTER_COLS = {
  STUDENT_ID: 1,
  NAME:       2,
  GRADE:      3,
  COUNT:      4
};
