const input = document.querySelector("input");
const form = document.querySelector("form");

const handleInvalid = (e: Event) => {
  e.preventDefault();
  const target = <HTMLInputElement>e.target;
  let message: string;
  if (target.validity.valueMissing === true) {
    message = "Whoops! It looks like you forgot to add your email";
  }
  if (target.validity.typeMismatch === true) {
    message = "Please provide a valid email address";
  }
  form.querySelector("span.error")
    ? null
    : target.insertAdjacentHTML(
        "afterend",
        `<span class="error">${message}</span>`
      );
  target.classList.add("error");
};

const handleSubmit = (e: Event) => {
  e.preventDefault();
  form.reset();
  form.querySelector("span.error")?.remove();
  input.classList.remove("error");
};

form.addEventListener("submit", handleSubmit, true);
input.addEventListener("invalid", handleInvalid, true);
