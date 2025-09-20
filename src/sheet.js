const SHEET = {
  calendar: {
    name: 'Calendar',
    row: {
      data: 2,
    },
    column: {
      title: 1,
      startTime: 2,
      description: 3,
    },
  },
};

function getEventListFromSheet(){
  return BaseLibrary.getSheetData(SHEET.calendar).map(row => {
    const event = new Event();
    event.setDataFromSheet(row);
    return event;
  });
}