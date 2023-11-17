const URL =
  "https://script.google.com/macros/s/AKfycbwlHLl9LYs56-9uxWGhFyhs5SmNp8-vva_EMXhPrFWe9zwgcO_iT10PCdO1IAYGRkQv/exec";
const getAutoCompliteUrl = URL + "?action=getAutoComplite";

let pass = localStorage.getItem("pass");

let autocompleteData;

if (!pass) {
  let passPrompt = prompt("enter password");
  localStorage.setItem("pass", passPrompt);
  pass = passPrompt;
}

let passStr = `&pass=${pass}`;

let LogOutBtn = document.getElementById("LogOut");
LogOutBtn.addEventListener("click", () => {
  pass = "";
  localStorage.removeItem("pass");
  location.reload();
});

fetch(`${getAutoCompliteUrl + passStr}`, {
  redirect: "follow",
})
  .then((response) => {
    if (response.status != 200) {
      let error = new Error(
        `Помилка '${response.statusText}' код відповіді '${response.status}' . Зверніться до адміністратора`
      );
      throw error;
    }
    return response.json();
  })
  .then((data) => {
    autocompleteData = data;

    let personsArr = data.persons;
    let itemsArr = data.items;

    let personInptDataOptions = {
      data: {},
    };
    personsArr.forEach((e) => {
      personInptDataOptions.data[e] = null;
    });

    let itemInptDataOptions = {
      data: {},
    };
    itemsArr.forEach((e) => {
      itemInptDataOptions.data[e] = null;
    });

    autocompleteData = {
      itemInptDataOptions,
      personInptDataOptions
    }

    let personInptElem = document.querySelector(".personInpt");
    let personInptInstances = M.Autocomplete.init(personInptElem, personInptDataOptions);

    let itemsInptElem = document.querySelector(".itemInpt");
    let itemsInptInstances = M.Autocomplete.init(itemsInptElem, itemInptDataOptions);
  });

document.addEventListener("DOMContentLoaded", function () {
  let datepickerElem = document.querySelector(".dateInpt");
  let instanceDatePicker = M.Datepicker.init(datepickerElem, {
    format: "dd.mm.yyyy",
    defaultDate: new Date(),
    setDefaultDate: true,
  });
});

function addItemInpt(e) {
  const row = document.createElement("div");
  row.classList.add("row");

  const inputWrap = document.createElement("div");
  inputWrap.classList.add("input-field", "col", "s12");

  const inpt = document.createElement("input");
  inpt.type = "text";
  inpt.classList.add("autocomplete", "itemInpt");
  inpt.placeholder = "Препарат";

  const numInpt = document.createElement("input");
  numInpt.type = "number";
  numInpt.placeholder = "№";
  numInpt.classList.add("itemNumInpt");
  numInpt.value = 1

  inputWrap.appendChild(inpt);
  inputWrap.appendChild(numInpt);
  row.appendChild(inputWrap);

  const itemsDiv = document.getElementById("items");
  itemsDiv.appendChild(row);
}

document.getElementById("addItemBtn").addEventListener("click", (e) => {
  addItemInpt();

  let itemInptDataOptions = autocompleteData.itemInptDataOptions

  let itemsInptElem = document.querySelectorAll(".itemInpt");
  let itemsInptInstances = M.Autocomplete.init(itemsInptElem, itemInptDataOptions);

  console.log(itemsInptElem);
});

console.log("4.5.0");
