const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//Show input error message
function showError(input, message) {
  //select the input's parent element
  const formControl = input.parentElement;
  //Overrides class of the parent element & throws error style
  formControl.className = "form-control error";
  //Select small element
  const small = formControl.querySelector("small");
  // set small's inner text to equal message
  small.innerText = message;
}

// Show input success message
function showSuccess(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

//validate email
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email.value.trim())) {
    showSuccess(email);
  } else {
    showError(email, "Email is not valid.");
  }
}

function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${filterName(input)} is required.`);
    } else {
      showSuccess(input);
    }
  });
}

//Filter out first letter to capitalize it.
function filterName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Check character length of input
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${filterName(input)} must be at least ${min} characters.`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${filterName(input)} must be less than ${max} characters.`
    );
  } else {
    showSuccess(input);
  }
}

function passwordMatch(input1, input2) {
  if(input1.value !== input2.value) {
    showError(password, "Your passwords do not match.")
    showError(password2, "Your passwords do not match.")
  }

}
//Event Listeners
form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 12);
  validateEmail(email);
  passwordMatch(password, password2)
});
