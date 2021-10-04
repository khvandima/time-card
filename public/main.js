//** <-- DOM elements

const createBtn = document.querySelector(".create-btn");
const img = document.querySelector(".container img");
const container = document.querySelector(".container");
const canvasTT = document.createElement("canvas");

// Массив номеров даты
const dayNumArray = document.querySelectorAll(".cardInput__span");

// DOM input elemtnts year and month
const dateYear = document.querySelector(".date__year");
const dateMonth = document.querySelector(".date__month");

const modalName = document.querySelector(".modal__name");
const modalMonth = document.querySelector(".modal__month");
const modalMonthIncorrect = document.querySelector(".modal__month-incorrect");

const memberName = document.querySelector(".member__name-text");

//** DOM elements -->

// prettier-ignore
const monthsFull = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//** */ Определение даты
let yearNow = new Date().getFullYear(); // Определяем данный год
let monthNum = new Date().getMonth(); // Определяем данный месяц в номере месяца
let monthNow = monthNum - 1; // Определяем предыдущий месяц


//? Функция отрисовки выходних (субботы и воскресенья) дней в виде красных кружков вокруг номера дня
function drawWeekendDays(year = yearNow, month = monthNow) {
   // Определяем количество дней в месяце
   const daysInMonth = 32 - new Date(year, month, 32).getDate();

   for (let i = 1; i < daysInMonth + 1; i++) {
      let dayOfWeek = new Date(year, month, i).toDateString().slice(0, 3);

      if (dayOfWeek == "Sat" || dayOfWeek == "Sun") {
         dayNumArray.forEach((elem) => {
            if (i == elem.innerText) {
               elem.classList.add("cardInput-weekend");
            }
         });
      }
   }
}

//? Слушатель для изменения месяца
// в случае изменения месяца заново отрисовывает выходные (суббота и воскресенье) дни
dateMonth.addEventListener("change", (event) => {
   let inputMonth = event.target.value;
   inputMonth = inputMonth.charAt(0).toUpperCase() + inputMonth.slice(1);

   dateMonth.value = inputMonth;

   let index = monthsFull.indexOf(inputMonth);

   if (index >= 0) {
      dayNumArray.forEach((elem) => {
         elem.classList.toggle("cardInput-weekend", false);
      });

      drawWeekendDays(yearNow, index);
   } else {
      // modalMonth.style.display = "block";
      modalMonthIncorrect.style.display = "block";
   }
});

//? Функция добавления значений года и месяца по умолчанию
// Месяц добавляется предыдущий
dateMonth.setAttribute("value", monthsFull[monthNow]);
dateYear.setAttribute("value", yearNow);

drawWeekendDays();

//** Функция отрисовки и сохранения изображения
createBtn.addEventListener("click", function () {
   console.log(modalName);

   if (memberName.value == "") {
      modalName.style.display = "block";
   } else {
      html2canvas(container).then(function (canvas) {
         let dataUrl = canvas.toDataURL("image/png");

         const hrefElement = document.createElement("a");
         hrefElement.href = dataUrl;
         hrefElement.download = `ScreenShot$.png`;
         hrefElement.click();
         hrefElement.remove();
      });
   }
});

// Close modal window
function closeModal(event) {
   const modalArray = document.querySelectorAll(".modal");
   modalArray.forEach((elem) => {
      elem.style.display = "none";
   });

   if (event.target.id == "nameModal") {
      memberName.value = "";
      memberName.focus();
   } else {
      dateMonth.value = "";
      dateMonth.focus();
   }
   console.log(event.target.id);
}

document
   .querySelector(".modal--close-btn1")
   .addEventListener("click", closeModal);
document
   .querySelector(".modal--close-btn2")
   .addEventListener("click", closeModal);
document
   .querySelector(".modal--close-btn3")
   .addEventListener("click", closeModal);

// Очистка окна ввода месяца при клике на нем
dateMonth.addEventListener("click", (event) => {
   dateMonth.value = "";
});