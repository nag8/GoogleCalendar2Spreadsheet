class Event {
  constructor(event) {
    this.title;
    this.startTime = dayjs.dayjs(null);
    this.description;
  }

  setDataFromGoogleCalendar(event){
    this.title = event.getTitle();
    this.startTime = dayjs.dayjs(event.getStartTime());
    this.description = event.getDescription();
  }

  setDataFromSheet(row){
    this.title = row[SHEET.calendar.column.title - 1];
    this.startTime = dayjs.dayjs(row[SHEET.calendar.column.startTime - 1]);
    this.description = row[SHEET.calendar.column.description - 1];
  }

  isSame(event){
    return this.getTitle() === event.getTitle() && this.getStartTimeText() === event.getStartTimeText();
  }

  getTitle(){
    return this.title;
  }

  getStartTimeText(){
    return this.startTime.format('YYYY/MM/DD HH:mm');
  }

  isTarget(){
    return this.description.includes('予約者');
  }

  getOutList() {
    const descriptionTextList = this.description.split('\n');

    // 形式が変わったときにエラーにならないように念の為例外を握りつぶしている
    const getDescriptionList = _ => {
      try{
        return [
          descriptionTextList[1],
          descriptionTextList[2]
        ];
      }catch(e){
        return [
          e,
          ''
        ];
      }
    };

    return [
      this.title,
      this.getStartTimeText(),
      this.description
    ].concat(getDescriptionList());
  }
}