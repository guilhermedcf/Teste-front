
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

form.addEventListener("submit", (event) => {
    event.preventDefault();
    
   

    dataLocalStorage()
    

   });

  function validadateCpf(cpf) {
    cpf = cpf.replace(/\D/g, ''); 
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); 
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); 
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); 
    return cpf;
}
function formattingCpf() {
    let input = document.querySelector('#cpf');
    let newValue = input.value;
    newValue = validadateCpf(newValue);
    input.value = newValue;
}
document.querySelector('#cpf').addEventListener('input', formattingCpf);


function ValidateCep(cep) {
    cep = cep.replace(/\D/g, ''); 
    cep = cep.replace(/(\d{5})(\d)/, '$1-$2'); 
    return cep;
}

function formattingCep() {
    let input = document.querySelector('#cep');
    let selectedValue = input.value;
    selectedValue = ValidateCep(selectedValue);
    input.value = selectedValue;
}
document.querySelector('#cep').addEventListener('input', formattingCep);

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

    if (inputName && inputSurname && inputCpf && inputData && inputCep && inputAddress && 
        inputNumber && inputComplement && inputCity && inputState) {
    document.querySelector("#login").disabled = false;
  } else {
    document.querySelector("#login").disabled = true;
  }
}

function dataLocalStorage() {
const dataInput = {
      name: inputName.value,
      Surname: inputSurname.value,
      CPF: inputCpf.value,
      cep: inputCep.value,
      Address: inputAddress.value,
      Number: inputNumber.value,
      Complement: inputComplement.value,
      city: inputCity.value,
      state: inputState.value,
    };

    

    localStorage.setItem("dataInput", JSON.stringify(dataInput));
    setTimeout(function (){
      location.reload
    },3000)
  }

 
  function alert(){
    Swal.fire({
      title: "Seu formulário foi enviado!",
      icon: "success",
      showConfirmButton: false,
      timer: 1500
    });
  }
  

  