const display = document.querySelector('.display');

const appendToDisplay = (input) => {
  display.value += input;
};

const clearDisplay = (input) => {
  display.value = "";
};

const calculate = (input) => {
  try {
    display.value = eval(display.value);
  }
  catch(error) {
    display.value = "Error";
  }
};