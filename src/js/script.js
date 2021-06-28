const container = document.querySelector(".container");
const home = document.querySelector(".home");

// basic calc btns $ classes
const basicBtn = document.querySelector(".basic-btn");
const basic = document.querySelector(".basic");
const ansBtn = document.querySelector(".ans2");
const basicResult = document.querySelector(".basic-result");
const ansResBtn = document.querySelector(".ans2-res");
const goBackBasicBtn = document.querySelector(".go-back-basic");
const goBackAnsBtn = document.querySelector(".go-back-ans");
const clear1 = document.querySelector(".clear1");
const clear2 = document.querySelector(".clear2");

// basic calc event handlers
basicBtn.addEventListener("click", function (e) {
  e.preventDefault();
  home.classList.add("hidden");
  basic.classList.remove("hidden");
});

goBackBasicBtn.addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector(".inputB").value = "";
  basic.classList.add("hidden");
  home.classList.remove("hidden");
});

ansBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let input = document.querySelector(".inputB").value;
  document.querySelector(".input-def").textContent = input;
  let result = eval(input);
  if (result || result == 0) {
    document.querySelector(".Rinput").value = result;
  }
  basic.classList.add("hidden");
  basicResult.classList.remove("hidden");
});

ansResBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let input = document.querySelector(".Rinput").value;
  document.querySelector(".input-def").textContent = input;
  let result = eval(input);
  if (result || result == 0) {
    document.querySelector(".Rinput").value = result;
  }
});

goBackAnsBtn.addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector(".inputB").value = "";
  document.querySelector(".Rinput").value = "";
  document.querySelector(".input-def").textContent = "";
  basicResult.classList.add("hidden");
  home.classList.remove("hidden");
});

clear1.addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector(".inputB").value = "";
});
clear2.addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector(".Rinput").value = "";
  document.querySelector(".input-def").textContent = "";
});

// age calc btns & classes
const age = document.querySelector(".age");
const ageBtn = document.querySelector(".age-btn");
const calcAge = document.querySelector(".calcAge");
const goBackAgeBtn = document.querySelector(".go-back-age");
const ageResult = document.querySelector(".age-result");
const backToAgeBtn = document.querySelector(".back-to-age");
const clearC = document.querySelector(".clearC");
let inputDay = document.querySelector(".input-day");
let inputMonth = document.querySelector(".input-month");
let inputYear = document.querySelector(".input-year");
let resultLine = document.querySelector(".age-result-line");
// age calc event handlers

const daysInMonth = (month, year) => new Date(year, month, 0).getDate();

const ageCalc = function (bDay, bMonth, bYear) {
  const date = new Date();
  const cDay = date.getDate();
  const cMonth = +date.getMonth() + 1;
  const cYear = date.getFullYear();

  let age_dd, age_mm, age_yyyy;

  // calculating year
  if (
    cMonth > bMonth ||
    (cMonth === bMonth && cDay > bDay) ||
    cYear === bYear
  ) {
    age_yyyy = cYear - bYear;
  } else {
    age_yyyy = cYear - bYear - 1;
  }

  // calculating month
  if ((cMonth > bMonth && cDay > bDay) || (cMonth === bMonth && cDay > bDay)) {
    age_mm = cMonth - bMonth;
  } else if (cMonth > bMonth && bDay > cDay) {
    age_mm = cMonth - bMonth - 1;
  } else if (
    (cMonth === bMonth && bDay > cDay) ||
    (cMonth < bMonth && bDay > cDay)
  ) {
    age_mm = cMonth - bMonth + 11;
  } else if (cMonth < bMonth && cDay > bDay) {
    age_mm = cMonth - bMonth + 12;
  }

  // calculating days
  if (cDay >= bDay) {
    age_dd = cDay - bDay;
  } else {
    age_dd = cDay + (daysInMonth(cMonth - 1, cYear) - bDay);
  }

  return [age_yyyy, age_mm, age_dd];
};

const clearFields = function () {
  inputDay.value = "";
  inputMonth.value = "";
  inputYear.value = "";
};

const checkUnits = (track) => (track === 1 ? "" : "s");

ageBtn.addEventListener("click", function (e) {
  e.preventDefault();
  home.classList.add("hidden");
  age.classList.remove("hidden");
});

goBackAgeBtn.addEventListener("click", function (e) {
  e.preventDefault();
  clearFields();
  age.classList.add("hidden");
  home.classList.remove("hidden");
});

calcAge.addEventListener("click", function (e) {
  e.preventDefault();

  if (inputDay.value && inputMonth.value && inputYear.value) {
    const [Ayear, Amonth, Aday] = ageCalc(
      +inputDay.value,
      +inputMonth.value,
      +inputYear.value
    );

    const markup = `
      Your Age is
      <span class="years units">${Ayear} Year${checkUnits(Ayear)}</span> 
      <span class="months units">${Amonth} Month${checkUnits(Amonth)}</span> 
      <span class="days units">${Aday} Day${checkUnits(Aday)}   </span> 
    `;
    resultLine.innerHTML = "";
    resultLine.insertAdjacentHTML("afterbegin", markup);
  }

  age.classList.add("hidden");
  ageResult.classList.remove("hidden");
});

backToAgeBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const markup = `
  Your Age is
  <span class="years units">0 Years</span>
  <span class="months units">0 Months</span>
  <span class="days units">0 Days</span>
  `;
  resultLine.innerHTML = "";
  resultLine.insertAdjacentHTML("afterbegin", markup);

  ageResult.classList.add("hidden");
  age.classList.remove("hidden");
});

clearC.addEventListener("click", function (e) {
  e.preventDefault();
  clearFields();
});

// temp converter btns & classes

const temp = document.querySelector(".temp");
const tempBtn = document.querySelector(".temp-btn");
const convert = document.querySelector(".convert");
const goBackTempBtn = document.querySelector(".go-back-convert");
let exInput = document.querySelector(".ex-input");
let resField = document.querySelector(".Tresfield");

const resetField = function () {
  exInput.value = 1;
  resField.value = 1;
  document.querySelector(".from").value = "c";
  document.querySelector(".to").value = "c";
};
// temp converter event handlers

const tempConvert = function (value, from, to) {
  // celsius to fahrenheit
  if (from === "c" && to === "f") {
    return value * (9 / 5) + 32;
  }

  // celsius to kelvin
  else if (from === "c" && to === "k") {
    return value + 273.15;
  }

  // fahrenheit to celsius
  else if (from === "f" && to === "c") {
    return (value - 32) * (5 / 9);
  }

  // fahrenheit to kelvin
  else if (from === "f" && to === "k") {
    return (value - 32) * (5 / 9) + 273.15;
  }

  // kelvin to celsius
  else if (from === "k" && to === "c") {
    return value - 273.15;
  }

  // kelvin to fahrenheit
  else if (from === "k" && to === "f") {
    return (value - 273.15) * (9 / 5) + 32;
  }

  // same scale
  else if (from === to) {
    return value;
  }
};

tempBtn.addEventListener("click", function (e) {
  e.preventDefault();
  home.classList.add("hidden");
  temp.classList.remove("hidden");
});

goBackTempBtn.addEventListener("click", function (e) {
  e.preventDefault();
  resetField();
  temp.classList.add("hidden");
  home.classList.remove("hidden");
});

convert.addEventListener("click", function (e) {
  e.preventDefault();
  const from = document.querySelector(".from").value;
  const to = document.querySelector(".to").value;
  resField.value = tempConvert(+exInput.value, from, to).toFixed(3);
});

document.querySelector(".reset").addEventListener("click", function (e) {
  e.preventDefault();
  resetField();
});
