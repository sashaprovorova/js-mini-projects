let nameError = document.querySelector(".name-error");
let numberError = document.querySelector(".number-error");
let emailError = document.querySelector(".email-error");
let messageError = document.querySelector(".message-error");
let submitError = document.querySelector(".submit-error");

const validateName = () => {
  let name = document.querySelector(".contact-name").value;

  // remove any existing icons or child elements from nameError, so they don't pile up
  while (nameError.firstChild) {
    nameError.removeChild(nameError.firstChild);
  }

  if (name.length == 0) {
    nameError.textContent = "Name is required";
    return false;
  }
  if (!name.match(/^[A-Za-z]+(?:\s[A-Za-z]+)+$/)) {
    nameError.textContent = "Write full name";
    return false;
  }
  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-circle-check");
  nameError.appendChild(icon);
  return true;
};

const validatePhone = () => {
  let phone = document.querySelector(".contact-phone").value;

  // remove any existing icons or child elements from nameError, so they don't pile up
  while (numberError.firstChild) {
    numberError.removeChild(numberError.firstChild);
  }

  if (phone.length == 0) {
    numberError.textContent = "Number is required";
    return false;
  }

  if (phone.length !== 12) {
    numberError.textContent = "Phone number should be 11 digits";
    return false;
  }

  if (!phone.match(/^\+[0-9]{11}$/)) {
    numberError.textContent = "Only digits and +";
    return false;
  }

  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-circle-check");
  numberError.appendChild(icon);
  return true;
};

const validateEmail = () => {
  let email = document.querySelector(".contact-email").value;

  // remove any existing icons or child elements from nameError, so they don't pile up
  while (emailError.firstChild) {
    emailError.removeChild(emailError.firstChild);
  }

  if (email.length == 0) {
    emailError.textContent = "Email is required";
    return false;
  }

  if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
    emailError.textContent = "Email invalid";
    return false;
  }

  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-circle-check");
  emailError.appendChild(icon);
  return true;
};

const validateMessage = () => {
  let message = document.querySelector(".contact-message").value;
  const required = 30;
  let left = required - message.length;

  if (left > 0) {
    messageError.textContent = `${left} more characters required`;
    return false;
  }
  // remove any existing icons or child elements from nameError, so they don't pile up
  while (messageError.firstChild) {
    messageError.removeChild(messageError.firstChild);
  }

  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-circle-check");
  messageError.appendChild(icon);
  return true;
};

const validateForm = () => {
  if (
    !validateName() ||
    !validatePhone() ||
    !validateEmail() ||
    !validateMessage()
  ) {
    submitError.style.display = "block";
    submitError.textContent = `Please fix error to submit`;
    setTimeout(() => {
      submitError.style.display = "none";
    }, 3000);
    return false;
  }
};
