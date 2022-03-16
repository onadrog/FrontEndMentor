const form = document.querySelector("form");
const input: HTMLInputElement = document.querySelector('input[type="email"');

const handleSubmit = (e: Event) => {
  e.preventDefault();
  document.querySelector(".form__error")?.remove();
  form.reset();
  input.classList.remove("error");
};
const handleInvalid = (e: Event) => {
  e.preventDefault();
  const target = <HTMLElement>e.target;
  document.querySelector(".form__error")
    ? null
    : form.insertAdjacentHTML(
        "beforeend",
        '<span class="form__error">Please provide a valid email</span>'
      );
  target.classList.add("error");
};

form.addEventListener("submit", handleSubmit);

input.addEventListener("invalid", handleInvalid);
