function formatCurrentDate(){
    const today = new Date();
    let Month = today.getMonth() + 1;
    if (Month < 10){
        Month = `0${Month}`;
    }
    let Day = today.getDate();
    if (Day < 10){
        Day = `0${Day}`;
    }
    const formattedDate = `${Month}-${Day}-${today.getFullYear()}`;
    return formattedDate
}

module.exports = {formatCurrentDate}