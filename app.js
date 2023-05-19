const sinInput = document.getElementById("sin-input");
const validationText = document.getElementById("validation-text");

function validate(e) {
  e.preventDefault();
  const cleanInput = trim(sinInput.value);
  const isValidSin =
    hasValidLength(cleanInput) &&
    hasOnlyNumbers(cleanInput) &&
    hasSinPattern(cleanInput);

  setValidity(isValidSin);
}

// Valdiators
function hasValidLength(sin) {
  if (sin.length !== 9) {
    return false;
  }
  return true;
}

function hasOnlyNumbers(sin) {
  const containsNaN = sin.split("").some((char) => isNaN(char));
  if (containsNaN) {
    return false;
  }
  return true;
}

/**
 * For lack of a better name, this validator satisfies
 * the requirement that the sum of all digits (with every
 * 2nd number doubled) is divisible by 10.
 */
function hasSinPattern(sin) {
  const everySecondNumDoubled = sin
    .split("")
    .map((char, i) => {
      if ((i + 1) % 2 === 0) {
        return (char * 2).toString();
      }
      return char;
    })
    .join("");

  const sum = everySecondNumDoubled
    .split("")
    .reduce((acc, curr) => (acc += parseInt(curr)), 0);

  return sum % 10 === 0;
}

// Helpers
/** Removes any whitespace from input. */
function trim(input) {
  return input
    .split("")
    .map((char) => (char === " " ? "" : char))
    .join("");
}

function setValidity(isValid) {
  sinInput.classList = [];

  if (isValid) {
    sinInput.classList.add("valid");
    validationText.style.color = "lightgreen";
    validationText.innerHTML = `<span style="color: lightgrey; text-decoration: underline;">${sinInput.value}</span> is a valid SIN!`;
    return;
  }
  sinInput.classList.add("invalid");
  validationText.style.color = "red";
  validationText.innerHTML = `<span style="color: lightgrey; text-decoration: underline;">${sinInput.value}</span> is not a valid SIN!`;
  return;
}

// live feedback
sinInput.addEventListener("input", (e) => {
  // clear validation feedback when input is empty
  if (e.currentTarget.value === "") {
    sinInput.classList = [];
    validationText.innerText = "";
    return;
  }
  validate(e);
});
