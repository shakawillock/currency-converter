const inputCurrency = document.querySelector(".input-currency");
const outputCurrency = document.querySelector(".output-currency");
const selectInput = document.querySelector(".currency__input");
const selectOutput = document.querySelector(".currency__output");
const userCurrencyInput = document.querySelector(".currency__source-input");
const outputAmount = document.querySelector(".currency__source-output");

const url =
  "https://free.currconv.com/api/v7/currencies?apiKey=de0896d5bba938480800";

function getCurrency() {
  let convertFromCurrency;
  let convertToCurrency;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let currencyId = Object.keys(data.results);
      currencyId.sort();

      for (let i = 0; i < currencyId.length; i++) {
        let option = createOption();
        option.value = currencyId[i];
        option.textContent = currencyId[i];
        selectInput.appendChild(option);
      }

      for (let i = 0; i < currencyId.length; i++) {
        let option = createOption();
        option.value = currencyId[i];
        option.textContent = currencyId[i];
        selectOutput.appendChild(option);
      }

      selectInput.addEventListener("click", (e) => {
        convertFromCurrency = e.target.value;
        const currencyName = data.results[convertFromCurrency].currencyName;
        inputCurrency.textContent = currencyName;
        calculateAmount(changeCurrency(convertFromCurrency, convertToCurrency));
      });

      selectOutput.addEventListener("click", (e) => {
        convertToCurrency = e.target.value;
        const currencyName = data.results[convertToCurrency].currencyName;
        outputCurrency.textContent = currencyName;
        calculateAmount(changeCurrency(convertFromCurrency, convertToCurrency));
      });

      calculateAmount(changeCurrency(convertFromCurrency, convertToCurrency));
    })
    .catch((error) => {
      console.error(error);
    });
}

getCurrency();

function changeCurrency(
  convertFromCurrency = "AED",
  convertToCurrency = "AED"
) {
  return {
    convertFromCurrency,
    convertToCurrency,
  };
}

function calculateAmount({ convertFromCurrency, convertToCurrency }) {
  fetch(
    `https://free.currconv.com/api/v7/convert?q=${convertFromCurrency}_${convertToCurrency},${convertToCurrency}_${convertFromCurrency}&compact=ultra&apiKey=de0896d5bba938480800`
  )
    .then((response) => response.json())
    .then((data) => {
      let [convertFrom] = Object.keys(data);

      if (userCurrencyInput.value !== "") {
        outputAmount.value = (
          data[convertFrom] * Number(userCurrencyInput.value)
        ).toFixed(2);
      }

      userCurrencyInput.addEventListener("input", () => {
        outputAmount.value = (
          data[convertFrom] * Number(userCurrencyInput.value)
        ).toFixed(2);
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

function createOption() {
  let option = document.createElement("option");
  return option;
}

window.addEventListener("DOMContentLoaded", () => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const currencyName = data.results.AED.currencyName;
      inputCurrency.textContent = currencyName;
      outputCurrency.textContent = currencyName;
    })
    .catch((error) => {
      console.error(error);
    });
});
