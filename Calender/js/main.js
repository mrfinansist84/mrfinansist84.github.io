/* инициализатор */
function starter() {
  findDateForClockAndControl();
  buidClock();
  createCalender()
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

    containerForClockDate = document.querySelector('.calender__clock'),
    containerForControlDate = document.querySelector('.calender__controls-weekday-year'),
    formatedClockDate = date.toLocaleString('ru', options),
    formatedControlDate = date.toLocaleString('ru', {
      month: 'long',
      year: 'numeric'
    }),

    clockDate = buildElement('p', `${formatedClockDate}`, {
      class: 'calender__clock-date'
    }),
    controlDate = buildElement('span', `${formatedControlDate}`, {
      class: 'calender__controls-weekday-year-item'
    });
  containerForClockDate.appendChild(clockDate);
  containerForControlDate.appendChild(controlDate)
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
    currMonth = newMonth ? newMonth : date.getMonth(),
    currDate = new Date(currYear, currMonth); /*  по умолчанию текущая дата */
    
  let dayStartCurrMonth = currDate.getDay(new Date(currYear, currMonth, 1)) - 1,
    dayNumPrevMonth,
    dayCurrMonth,
    dayPrevMonth,
    weekdayNextMonth,
    numdayNextMonth,
    dayNextMonth,
    dayIsToday = new Date().getDate();

  currDate.setDate(currDate.getDate() - dayStartCurrMonth);
  /*сдвиг  объекта даты для расчета пред дней мес для отображения  */
  dayNumPrevMonth = currDate.getDate();
  /* дата с которой внести дни пред месяца  */

  for (let i = 0; i < dayStartCurrMonth; i++) {
    dayPrevMonth = buildElement('p', `${dayNumPrevMonth+i}`, {
      class: 'calender__date-container-item calender__date-container-item--prev-month'
    });
    fragment.appendChild(dayPrevMonth);
  }

  currDate.setDate(currDate.getDate() + dayStartCurrMonth);
  /* убираем сдвиг объекта даты */

  while (currDate.getMonth() == currMonth) {
    if (currDate.getDate() === dayIsToday) {
      dayCurrMonth = buildElement('p', `${currDate.getDate()}`, {
        class: 'calender__date-container-item calender__date-container-item--dayIsToday'
      });
    } else {
      dayCurrMonth = buildElement('p', `${currDate.getDate()}`, {
        class: 'calender__date-container-item'
      });
    }
    fragment.appendChild(dayCurrMonth);
    currDate.setDate(currDate.getDate() + 1);
  }

  weekdayNextMonth = 7 - (currDate.getDay()) + 1;
  numdayNextMonth = currDate.getDate();

  for (let i = 0; i < weekdayNextMonth; i++) {
    dayNextMonth = buildElement('p', `${numdayNextMonth+i}`, {
      class: 'calender__date-container-item calender__date-container-item--prev-month'
    });
    fragment.appendChild(dayNextMonth);
  }
  targetElement.appendChild(fragment);
}

/* конструктор элементов. */
/* НАДО использовать DocumentFragment */
function buildElement(tags, postText, className) {
  const elem = document.createElement(tags);
  for (const key in className) {
    elem.setAttribute(`${key}`, className[key]);
  };
  elem.textContent = postText;
  return elem;
}