const form = document.querySelector("form");
const resultCard = document.querySelector(".result");
const FormCard = document.querySelector(".front");
const span = document.querySelector(".card__result");

const handleSubmit = (e: SubmitEvent) => {
  e.preventDefault();
  const target = <HTMLFormElement>e.target;
  const choice = target.elements["rate"].value;
  span.textContent = choice;
  FormCard.classList.add("submit");
  resultCard.classList.remove("result");
};

form.addEventListener("submit", handleSubmit, true);
