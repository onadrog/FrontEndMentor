const inputs = <NodeListOf<HTMLInputElement>>document.querySelectorAll("input");
const form = document.querySelector("form");

const handleInvalid = (e: Event) => {
  e.preventDefault();

  const target = <HTMLInputElement>e.target;
  const name = (e.target as HTMLInputElement).name;
  const label = target.labels[0].innerHTML;
  let message = `${label} cannot be empty`;
  target.classList.add("error");
  const span = target.nextElementSibling;

  if (name === "email" && target.validity.typeMismatch === true) {
    message = "Looks like this is not an email";
  }
  span.setAttribute("aria-hidden", "false");
  span.innerHTML = message;
};

const handleSubmit = (e: Event) => {
  e.preventDefault();
  form.reset();
  inputs.forEach((e) => {
    e.classList.remove("error");
  });

  document.querySelectorAll(".grid__form__text").forEach((e) => {
    e.setAttribute("aria-hidden", "true");
    e.classList.remove("error");
  });
};
form.addEventListener("submit", handleSubmit, true);

inputs.forEach((element) => {
  element.addEventListener("invalid", handleInvalid, true);
});
