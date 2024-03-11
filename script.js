const inputName = document.querySelector("#name");
const inputSurname = document.querySelector("#surname");
const inputCpf = document.querySelector("#cpf");
const inputData = document.querySelector("#date");
const inputCep = document.querySelector("#cep");
const inputAddress = document.querySelector("#address");
const inputNumber = document.querySelector("#number");
const inputComplement = document.querySelector("#complement");
const inputCity = document.querySelector("#city");
const inputState = document.querySelector("#state");
const form = document.querySelector("#form");
const messengerError = document.querySelectorAll(".field-checked");

form.addEventListener("submit", (ev) => {
  ev.preventDefault();

  dataLocalStorage();
  form.reset();

  setTimeout(function() {
    location.reload();
  }, 2000);

});

function setError(input) {
  const classCamp = input.parentElement;
  const messengerError = classCamp.querySelector(".field-checked");
  messengerError.classList.add("span-error");
  input.classList.remove("validate");
  return false;
}

function removeError(input) {
  const classCamp = input.parentElement;
  const messengerError = classCamp.querySelector(".field-checked");
  messengerError.classList.remove("span-error");
  input.classList.add("validate");
  return true;
}



function validateName(input) {
  if (inputName.value.length < 3) {
    setError(input);
  } else {
    removeError(input);
  }
}

function validateSurname(input) {
  if (inputSurname.value.length < 2) {
    setError(input);
  } else {
    removeError(input);
  }
}

////////////////

const validarCPF = (cpf) => {

  cpf = cpf.replace(/\D/g,'')

  if(cpf.length !==11){

    console.error('CPF inválido, documento nao possui 11 caracteres')

    return
    }

    const proximoDigitoVerificador = (cpfIncompleto) => {
      let soamtoria = 0

     for (let i = 0; i < cpfIncompleto.length; i++) {
      const digitoAtual = cpfIncompleto.charAt(i);

      let constante = (cpfIncompleto.length + 1 - i)
      
      soamtoria += Number(digitoAtual) * constante

     }

     const resto = soamtoria % 11

     return resto < 2 ?  "0" : (11 - resto).toString()

    } 

    let primeiroDigitoVerificador = proximoDigitoVerificador(cpf.substring(0,9))    
    let segundoDigitoVerificador  = proximoDigitoVerificador(cpf.substring(0,9) + primeiroDigitoVerificador)

    let cpfCorreto = cpf.substring(0,9) + primeiroDigitoVerificador + segundoDigitoVerificador


      if(cpf != cpfCorreto){
        console.error('CPF Invalido. Digitos verificadores nao conferem')

        return 
      }

      console.log("CPF valido")

      return true
}

validarCPF("121.987.777.-89")

////////////



function validadateCpf(cpf) {
  cpf = cpf.replace(/\D/g, "");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return cpf;

}
function formattingCpf() {
  let input = document.querySelector("#cpf");
  let newValue = input.value;
  newValue = validadateCpf(newValue);
  input.value = newValue;
}
document.querySelector("#cpf").addEventListener("input", formattingCpf);

function maskCep(cep) {
  cep = cep.replace(/\D/g, "");
  cep = cep.replace(/(\d{5})(\d)/, "$1-$2");
  return cep;
}

function formattingCep() {
  let input = document.querySelector("#cep");
  let selectedValue = input.value;
  selectedValue = maskCep(selectedValue);
  input.value = selectedValue;
}
document.querySelector("#cep").addEventListener("input", formattingCep);

function validateCep(input){
  
  if (inputCep.value.length < 8) {
    setError(input);
  } else {
    removeError(input);
  }
}


const apiCep = (cep) => {
  let endpoint = "https://viacep.com.br/ws/" + cep + "/json/";

  fetch(endpoint, {
    method: "GET",
    headers: { "content-type": "application/json" },
  })
    .then((response) => response.json())
    .then((result) => {
      inputAddress.value = result.logradouro;
      inputCity.value = result.localidade;
      inputState.value = result.uf;
    })
    .catch((erro) => console.log(erro));
};

inputCep.addEventListener("input", () => {
  if (inputCep.value.length > 7) {
    apiCep(inputCep.value);
  }
});


function desativeButton() {
  const inputName = document.querySelector("#name").value;
  const inputSurname = document.querySelector("#surname").value;
  const inputCpf = document.querySelector("#cpf").value;
  const inputData = document.querySelector("#date").value;
  const inputCep = document.querySelector("#cep").value;
  const inputAddress = document.querySelector("#address").value;
  const inputNumber = document.querySelector("#number").value;
  const inputComplement = document.querySelector("#complement").value;
  const inputCity = document.querySelector("#city").value;
  const inputState = document.querySelector("#state").value;

  if (
    inputName &&
    inputSurname &&
    inputCpf &&
    inputData &&
    inputCep &&
    inputAddress &&
    inputNumber &&
    inputComplement &&
    inputCity &&
    inputState
  ) {
    document.querySelector("#login").disabled = false;
  } else {
    document.querySelector("#login").disabled = true;
  }
}

function dataLocalStorage() {
  const dataInput = {
    name: inputName.value,
    Surname: inputSurname.value,
    birth: inputData.value,
    CPF: inputCpf.value,
    cep: inputCep.value,
    Address: inputAddress.value,
    Number: inputNumber.value,
    Complement: inputComplement.value,
    city: inputCity.value,
    state: inputState.value,
  };

  localStorage.setItem("dataInput", JSON.stringify(dataInput));
}

function alert() {
  Swal.fire({
    title: "Seu formulário foi enviado!",
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const getIdDiv = document.querySelector("#itensLocalStorage");

  const dataInputJSON = localStorage.getItem("dataInput");

  if (dataInputJSON) {
    const dataInput = JSON.parse(dataInputJSON);

    const heading = document.createElement("h3");
    heading.textContent = "Tabela de Consulta";
    heading.style.marginBottom = "9px";
    getIdDiv.appendChild(heading);

    const dataList = document.createElement("ul");

    const nameDataTable = {
      name: "Nome",
      surname: "Sobrenome",
      birth: "Data de Nascimento",
      CPF: "CPF",
      cep: "Cep",
      address: "Endereço",
      number: "Numero",
      complement: "Complemento",
      city: "Cidade",
      state: "Estado",
    };

    for (const field in dataInput) {
      const label = nameDataTable[field] || field;
      const fieldText = `${dataInput[field]}`;
      const listItem = document.createElement("p");
      listItem.textContent = fieldText;

      if (nameDataTable[field]) {
        const labelSpan = document.createElement("span");
        labelSpan.textContent = `${label}: `;
        labelSpan.style.fontWeight = "bold";
        listItem.insertBefore(labelSpan, listItem.firstChild);
      }

      dataList.appendChild(listItem);
    }

    getIdDiv.appendChild(dataList);
  } else {
    const noDataMessage = document.createElement("p");
    
    getIdDiv.appendChild(noDataMessage);
  }
});
