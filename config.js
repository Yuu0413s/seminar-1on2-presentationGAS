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
  ["13:15", "13:30"], ["13:30", "13:45"], ["13:45", "14:00"],
  ["14:00", "14:15"], ["14:15", "14:30"], ["14:30", "14:45"],
  ["14:45", "15:00"]
];

var FOURTH_PERIOD = [
  ["15:00", "15:15"], ["15:15", "15:30"], ["15:30", "15:45"],
  ["15:45", "16:00"], ["16:00", "16:15"], ["16:15", "16:30"],
  ["16:30", "16:45"]
];

var FIFTH_PERIOD = [
  ["16:45", "17:00"], ["17:00", "17:15"], ["17:15", "17:30"],
  ["17:30", "17:45"], ["17:45", "18:00"], ["18:00", "18:15"],
  ["18:15", "18:30"]
];

// 行番号定義（時限スロット定義の後に配置する必要あり）
var ROWS = {
  DATA_START:          3,
  FOURTH_PERIOD_START: 3 + THIRD_PERIOD.length,
  FOURTH_PERIOD_END:   3 + THIRD_PERIOD.length + FOURTH_PERIOD.length - 1,
  LAST_DATA_ROW:       3 + THIRD_PERIOD.length + FOURTH_PERIOD.length + FIFTH_PERIOD.length - 1,
  COUNTER_DATA_START:  2,
  COUNTER_SORT_START:  3
};
