const calculator = {
  displayResult: "0",
  displayExpression: "",
};

function updateDisplay() {
  const result = document.querySelector("#result");
  const expression = document.querySelector("#expression");

  result.textContent = calculator.displayResult;
  expression.textContent = calculator.displayExpression;
}

function clearDisplay() {
  calculator.displayResult = "0";
  calculator.displayExpression = "";
}

function appendToDisplay(value) {
  if (calculator.displayResult === "0") {
    calculator.displayResult = value;
  } else {
    calculator.displayResult += value;
  }
  calculator.displayExpression += value;
  updateDisplay();
}

const knobs = document.querySelectorAll(".knob");
for (let knob of knobs) {
  knob.addEventListener("click", function () {
    const target = event.target;

    if (target.classList.contains("clear")) {
      clearDisplay();
      updateDisplay();
      return;
    }

    if (target.classList.contains("backspace")) {
      if (calculator.displayExpression === "") return;
      calculator.displayExpression = calculator.displayExpression.slice(0, -1);
      calculator.displayResult = calculator.displayResult.slice(0, -1);
      if (calculator.displayResult === "") clearDisplay();
      updateDisplay();
      return;
    }

    if (target.classList.contains("equal")) {
      if (calculator.displayExpression === "") return;
      try {
        calculator.displayResult = eval(calculator.displayExpression);
        updateDisplay();
        clearDisplay();
        return;
      } catch (error) {
        calculator.displayResult = "Error";
        updateDisplay();
        return;
      }
    }

    if (target.classList.contains("operator")) {
      calculator.displayExpression += target.textContent.trim();
      calculator.displayResult = "0";
      updateDisplay();
      return;
    }

    appendToDisplay(target.textContent.trim());
  });
}
