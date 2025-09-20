function main() {
  const sheetEventList = getEventListFromSheet();

  const eventList = CalendarApp.getDefaultCalendar().getEventsForDay(new Date()).reduce((eventList, event) => {
    const e = new Event();
    e.setDataFromGoogleCalendar(event);
    // ターゲットのイベントであり、またシートにないイベントをeventListに追加
    if (e.isTarget() && !sheetEventList.some(sheetEvent => sheetEvent.isSame(e))) eventList.push(e);
    return eventList;
  }, []);

  // シートに追記
  Shomin.addSheetLastRow(
    SHEET.calendar,
    eventList.map(e => e.getOutList())
  );
}

// 各自のGoogleアカウントで実行してもらうためトリガー作成をGASで処理する。このスクリプトと連動した画像がspreadsheetにある
function setTrigger(){
  ScriptApp.newTrigger('main').timeBased().everyDays(1).atHour(23).create();
  Browser.msgBox('トリガーを設定しました。');
}