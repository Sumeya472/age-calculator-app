const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");

const dayLabel = document.getElementById("day-label");
const monthLabel = document.getElementById("month-label");
const yearLabel = document.getElementById("year-label");

const dayError = document.getElementById("day-error");
const monthError = document.getElementById("month-error");
const yearError = document.getElementById("year-error");

const calculateBtn = document.getElementById("calculate");

const yearResult = document.getElementById("yy");
const monthResult = document.getElementById("mm");
const dayResult = document.getElementById("dd");

function showError(input, label, error, message) {
  dayInput.classList.add("border-red-500");
  monthInput.classList.add("border-red-500");
  yearInput.classList.add("border-red-500");

  dayLabel.classList.add("text-red-500");
  monthLabel.classList.add("text-red-500");
  yearLabel.classList.add("text-red-500");

  error.textContent = message;
}

function clearError(input, label, error) {
  input.classList.remove("border-red-500");
  label.classList.remove("text-red-500");
  error.textContent = "";
}

calculateBtn.addEventListener("click", function () {
  clearError(dayInput, dayLabel, dayError);
  clearError(monthInput, monthLabel, monthError);
  clearError(yearInput, yearLabel, yearError);

  const day = Number(dayInput.value);
  const month = Number(monthInput.value);
  const year = Number(yearInput.value);

  if (dayInput.value === "") {
    showError(dayInput, dayLabel, dayError, "This field is required");
  }

  if (monthInput.value === "") {
    showError(monthInput, monthLabel, monthError, "This field is required");
  }

  if (yearInput.value === "") {
    showError(yearInput, yearLabel, yearError, "This field is required");
  }

  if (
    dayInput.value === "" ||
    monthInput.value === "" ||
    yearInput.value === ""
  ) {
    return;
  }

  const today = new Date();

  const currentDay = today.getDate();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  let hasError = false;

  if (day < 1 || day > 31) {
    showError(dayInput, dayLabel, dayError, "Must be a valid day");
    hasError = true;
  }

  if (month < 1 || month > 12) {
    showError(monthInput, monthLabel, monthError, "Must be a valid month");
    hasError = true;
  }

  if (year < 1 || year > currentYear) {
    showError(yearInput, yearLabel, yearError, "Must be in the past");
    hasError = true;
  }

  if (hasError) {
    return;
  }

  const lastDay = new Date(year, month, 0).getDate();

  if (day > lastDay) {
    showError(dayInput, dayLabel, dayError, "Must be a valid day");
    return;
  }

  const birthDate = new Date(year, month - 1, day);

  const todayDate = new Date(currentYear, currentMonth - 1, currentDay);

  if (birthDate > todayDate) {
    showError(dayInput, dayLabel, dayError, "Must be in the past");
    return;
  }

  let years = currentYear - year;
  let months = currentMonth - month;
  let days = currentDay - day;

  if (days < 0) {
    months--;

    const previousMonth = new Date(currentYear, currentMonth - 1, 0);

    days += previousMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  yearResult.textContent = years;
  monthResult.textContent = months;
  dayResult.textContent = days;
});
