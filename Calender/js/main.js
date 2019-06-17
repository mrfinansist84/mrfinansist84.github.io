/* инициализатор */
function starter() {
  findDateForClockAndControl();
  buidClock();
  createCalender();
  slideMonth();
  checkingDay();
  markDay();
}

/* дата для верхушки */
function findDateForClockAndControl() {
  const date = new Date(),
    options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      timezone: 'UTC',
    },
    formatedClockDate = date.toLocaleString('ru', options),
    formatedControlDate = date.toLocaleString('ru', {
      month: 'long',
      year: 'numeric'
    }),
    containerForClockDate = document.querySelector('.calender__clock'),
    containerForControlDate = document.querySelector('.calender__controls-weekday-year'),
    clockDate = buildElement('p', `${formatedClockDate}`, {
      class: 'calender__clock-date'
    }),
    controlDate = buildElement('span', `${formatedControlDate}`, {
      class: 'calender__controls-weekday-year-item'
    });

  containerForClockDate.appendChild(clockDate);
  containerForControlDate.appendChild(controlDate);
}

/* часики */
function buidClock() {

  const date = new Date(),
    elementForClock = document.querySelector('.calender__clock-item'),
    clock = date.toLocaleTimeString('ru-Ru', {
      hour12: false
    });

  elementForClock.innerText = `${clock}`;
  setTimeout('buidClock()', 1000);
}


/* создание календаря */
function createCalender(newYear, newMonth) {

  const targetElement = document.querySelector('.calender__date-container'),
    fragment = document.createDocumentFragment(),
    date = new Date(),
    currYear = newYear ? newYear : date.getFullYear(),
    currMonth = newMonth > -1 ? newMonth : date.getMonth(),
    currDate = new Date(currYear, currMonth); /*  по умолчанию текущая дата */

  let dayStartCurrMonth = currDate.getDay(new Date(currYear, currMonth, 1)) - 1,
    dayIsToday = new Date().toLocaleString('ru', {
      month: 'long',
      year: 'numeric',
      day: 'numeric'
    }),
    dayNumMonth,
    dayMonth,
    todaysCheck;

  currDate.setDate(currDate.getDate() - dayStartCurrMonth);
  /*сдвиг  объекта даты для расчета пред дней мес для отображения  */
  dayNumMonth = currDate.getDate();
  /* дата с которой внести дни пред месяца  */

  for (let i = 0; i < 42; i++) {
    dayNumMonth = currDate.getDate();

    if (currDate.getMonth() == currMonth) {
      todaysCheck = currDate.toLocaleString('ru', {
        month: 'long',
        year: 'numeric',
        day: 'numeric'
      });

      if (todaysCheck === dayIsToday) {
        dayMonth = buildElement('p', `${currDate.getDate()}`, {
          class: `calender__date-container-item calender__date-container-item--dayIsToday
           calender__date-container-item--checked`
        });

      } else {
        dayMonth = buildElement('p', `${dayNumMonth}`, {
          class: 'calender__date-container-item'
        });
      }
      fragment.appendChild(dayMonth);
      currDate.setDate(currDate.getDate() + 1);
      continue;
    }

    dayMonth = buildElement('p', `${dayNumMonth}`, {
      class: 'calender__date-container-item calender__date-container-item--prev-month'
    });
    fragment.appendChild(dayMonth);
    currDate.setDate(currDate.getDate() + 1);
  }
  targetElement.appendChild(fragment);
}


/* конструктор элементов. */
function buildElement(tags, elemText, className) {
  const elem = document.createElement(tags);

  for (const key in className) {
    elem.setAttribute(`${key}`, className[key]);
  };
  elem.textContent = elemText;

  return elem;
}

function slideMonth() {
  const targetElementNext = document.querySelector('.calender__controls-btn--next-month'),
    targetElementPrev = document.querySelector('.calender__controls-btn--prev-month');

  targetElementNext.addEventListener('click', slideMonthNext);
  targetElementPrev.addEventListener('click', slideMonthPrev);

  localStorage.setItem("currMonth", `${new Date().getMonth()}`);
  localStorage.setItem("currYear", `${new Date().getFullYear()}`);
}

function slideMonthNext() {
  let incrementMonth = +(localStorage.getItem("currMonth")) + 1;
  let curYear = +(localStorage.getItem("currYear"));

  if (incrementMonth > 11) {
    localStorage.setItem("currMonth", `0`);
    localStorage.setItem("currYear", `${+(localStorage.getItem("currYear"))+1}`);
    incrementMonth = +(localStorage.getItem("currMonth"));
    curYear = +(localStorage.getItem("currYear"));

  } else {
    localStorage.setItem("currMonth", `${incrementMonth}`);
    incrementMonth = +(localStorage.getItem("currMonth"));
  }

  changeMonth(curYear, incrementMonth);
};

function slideMonthPrev() {
  let curYear = +(localStorage.getItem("currYear"))
  let decrementMonth = +(localStorage.getItem("currMonth")) - 1;

  if (decrementMonth < 0) {
    localStorage.setItem("currMonth", `11`);
    localStorage.setItem("currYear", `${+(localStorage.getItem("currYear"))-1}`);
    decrementMonth = +(localStorage.getItem("currMonth"));
    curYear = +(localStorage.getItem("currYear"));

  } else {
    localStorage.setItem("currMonth", `${decrementMonth}`);
    decrementMonth = +(localStorage.getItem("currMonth"));
  }

  changeMonth(curYear, decrementMonth);
};

function changeMonth(curYear, targertMonth) {
  document.querySelector('.calender__date-container').innerHTML = '';

  createCalender(curYear, targertMonth);
  changeInControlsWeekdayYear(curYear, targertMonth);
}

function changeInControlsWeekdayYear(curYear, targertMonth) {
  const strMonth = new Date(curYear, targertMonth, 1).toLocaleString('ru', {
    month: 'long',
    year: 'numeric'
  });

  document.querySelector('.calender__controls-weekday-year-item').innerHTML = `${strMonth}`;
}

function checkingDay() {
  const targetElementNext = document.querySelector('.calender__controls-btn--next-day'),
    targetElementPrev = document.querySelector('.calender__controls-btn--prev-day');

  targetElementNext.addEventListener('click', checkDayNext);
  targetElementPrev.addEventListener('click', checkDayPrev);
}

function checkDayNext() {
  checkDaySwitch('firstElementChild', 'nextElementSibling');
}

function checkDayPrev() {
  checkDaySwitch('lastChild', 'previousElementSibling');
}

function checkDaySwitch(next, sibling) {
  const nextElAfterEnd = document.querySelector('.calender__date-container')[next];
  let targetEl = document.querySelector('.calender__date-container-item--checked');

  targetEl ? targetEl.classList.remove('calender__date-container-item--checked') :
    targetEl = nextElAfterEnd;

  if (targetEl[sibling]) {
    targetEl[sibling].classList.add('calender__date-container-item--checked');
  } else {
    nextElAfterEnd.classList.add('calender__date-container-item--checked');
  }
}

function markDay() {
  const targetElement = document.querySelector('.calender__date-container');
  const targetElBody = document.body;

  targetElement.addEventListener('click', addBorder);
  targetElBody.addEventListener('keydown', addBorderByBtnArrow);
}

function addBorder(e) {
  const targetEl = document.querySelector('.calender__date-container-item--checked');

  targetEl ? targetEl.classList.remove('calender__date-container-item--checked') : 0;
  e.target.classList.add('calender__date-container-item--checked');
}

function addBorderByBtnArrow(e) {
  switch (e.keyCode) {
    case 37: // если нажата клавиша влево
      checkDayPrev()
      break;
    case 39: // если нажата клавиша вправо
      checkDayNext()
      break;
  }
}