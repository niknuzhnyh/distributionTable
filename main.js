const URL = 'https://script.google.com/macros/s/AKfycbwLWPko-FGx3tqKHQrAOCsO7brXTlrlaNoi53BXnE4H8jHqf-pGRce5k3bhZXJnrG3s/exec'
const getPersonsUrl = URL + '?action=getPersons'


fetch(getPersonsUrl, {
  redirect: "follow",
  // method: "POST",
  // body: JSON.stringify(DATA),
  headers: {
    "Content-Type": "text/plain;charset=utf-8",
  }
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
  console.log(data);
});

let personsArr = [

];

let dataOptions = {
  data: {},
};
personsArr.forEach((e) => {
  dataOptions.data[e] = null;
});

console.log(dataOptions);

document.addEventListener("DOMContentLoaded", function () {
  let personInptElem = document.querySelector(".personInpt");
  let instances = M.Autocomplete.init(personInptElem, dataOptions);

  let datepickerElem = document.querySelector('.dateInpt');
  let instanceDatePicker = M.Datepicker.init(datepickerElem, {
    format : 'dd.mm.yyyy',
    defaultDate: new Date ,
    setDefaultDate: true

  });
});

console.log("4.5.0");
