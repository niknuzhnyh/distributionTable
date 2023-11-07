const URL = 'https://script.google.com/macros/s/AKfycbwh3J1CPRuTOvl0E11vev8q1IOTxMzW6CJcvyVvMXFfsDHjQGhpUB828xjbI_GicIvD/exec'
const getPersonsUrl = URL + '?action=getPersons'

let pass = localStorage.getItem('pass')

if (!pass) {
  let passPrompt = prompt('enter password');
  localStorage.setItem('pass', passPrompt);
  pass = passPrompt
}

let passStr = `&pass=${pass}`


fetch(`${getPersonsUrl+passStr}`, {
  redirect: "follow"
})
.then((response) => {
  if (response.status != 200) {
    let error = new Error(
      `Помилка '${response.statusText}' код відповіді '${response.status}' . Зверніться до адміністратора`
    );
    throw error;
  }
  console.log(response);
  return response.json();
})
.then((data) => {
  let personsArr = data.persons

  let dataOptions = {
    data: {},
  };
  personsArr.forEach((e) => {
    dataOptions.data[e] = null;
  });

  let personInptElem = document.querySelector(".personInpt");
  let instances = M.Autocomplete.init(personInptElem, dataOptions);
});

document.addEventListener("DOMContentLoaded", function () {

  let datepickerElem = document.querySelector('.dateInpt');
  let instanceDatePicker = M.Datepicker.init(datepickerElem, {
    format : 'dd.mm.yyyy',
    defaultDate: new Date ,
    setDefaultDate: true

  });
});

console.log("4.5.0");
