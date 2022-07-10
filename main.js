const inputAreaElem = document.getElementById("input-area");
const outputAreaElem = document.getElementById("output-area");
const historicalEventNameElem = document.getElementById("historical-event-name");
const daysInputElem = document.getElementById("days-input");
const confirmBtnElem = document.getElementById("confirm-btn");
const outputDateElem = document.getElementById("output-date");
const retryBtnElem = document.getElementById("retry-btn");

let historicalDate = pickRndHistoricalEvent();

daysInputElem.addEventListener("input", () => {
  const days = daysInputElem.value;
  confirmBtnElem.disabled = (
    days === "" || days % 1 !== 0 ||
    isNaN(addDaysToDate(historicalDate, parseInt(days)).getTime())
  );
});

daysInputElem.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    confirmBtnElem.click();
  }
});

confirmBtnElem.addEventListener("click", () => {
  outputDateElem.innerText = formatDate(
    addDaysToDate(
      historicalDate,
      parseInt(daysInputElem.value)
    )
  );
  daysInputElem.value = "";
  confirmBtnElem.disabled = true;
  toggleInOutAreas();
});

retryBtnElem.addEventListener("click", () => {
  historicalDate = pickRndHistoricalEvent();
  toggleInOutAreas();
  daysInputElem.focus();
});

function pickRndHistoricalEvent() {
  const rndIndex = Math.floor(Math.random() * HISTORICAL_EVENTS.length);
  const pickedEvent = HISTORICAL_EVENTS[rndIndex]
  historicalEventNameElem.innerText = pickedEvent.name;
  const date = new Date();
  date.setFullYear(pickedEvent.year, pickedEvent.month - 1, pickedEvent.day);
  return date;
}

function toggleInOutAreas() {
  [inputAreaElem.style.display, outputAreaElem.style.display] =
  [outputAreaElem.style.display, inputAreaElem.style.display];
}

function addDaysToDate(date, days) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

function formatDate(date) {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  if (year < 0) {
    year = Math.abs(year) + " B.C.";
  }
  return `${day}/${month}/${year}`;
}
