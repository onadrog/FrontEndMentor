import "./custom/otheroption";

const Inputnames = {
  tip: "tip_selection",
  bill: "bill_input",
  ppl: "number_ppl",
};

const outputNames = {
  output_total: "total_amount",
  output_person: "total_person",
};

const form = document.querySelector("form");
const inputs = form!.querySelectorAll("input");
const output_person = document
  .querySelector("form")!
  .elements.namedItem(outputNames.output_person) as HTMLOutputElement;
const output_total = document
  .querySelector("form")!
  .elements.namedItem(outputNames.output_total) as HTMLInputElement;
const inputPpl = document
  .querySelector("form")!
  .elements.namedItem(Inputnames.ppl) as HTMLInputElement;

const Btn = document.querySelector('button[type="reset"') as HTMLButtonElement;

function totalTip(bill: string, tip: string): number {
  const calc = parseFloat(bill) * (parseFloat(tip) / 100);
  return +calc.toFixed(2);
}

function tipByPerson(tip: number, person: number) {
  const result = tip / person;
  output_total.textContent = `$${result.toFixed(2)}`;
}

function totalByPerson(bill: number, tip: number, person: number) {
  const result = (bill + tip) / person;
  output_person.textContent = `$${result.toFixed(2)}`;
}

function handleInputValue(e: Event) {
  const target = e.target as HTMLInputElement;
  const isInputValid = isOnErrorState(target);
  const hasFlashError = hasFlashMessage(target);
  const isInputEmpty = checkEmptyValue(target);
  const errorSpan = document.createElement("span");
  const bill = form!.elements.namedItem("bill_input") as HTMLInputElement;
  const tip = (form!.elements.namedItem(Inputnames.tip) as HTMLInputElement)
    .value;
  const inputPplValue = inputPpl.value;
  const tipValidity = tip !== "";
  const billValidity = bill.validity.valid && bill.value !== "";
  const inputPplValidity = inputPpl.validity.valid && inputPpl.value !== "";

  if ((!isInputValid && !hasFlashError) || (isInputEmpty && !hasFlashError)) {
    errorSpan.classList.add("flash_error");
    errorSpan.textContent = "Can't be zero";
    target.insertAdjacentElement("beforebegin", errorSpan);
    target.setAttribute("data-error", "true");
    Btn.disabled = true;
  }
  if (
    (isInputValid && hasFlashError) ||
    (!isInputEmpty && hasFlashError && isInputValid)
  ) {
    target.previousElementSibling?.remove();
    target.setAttribute("data-error", "false");
  }
  if (billValidity && tipValidity && inputPplValidity) {
    Btn.disabled = false;
    const calcTip = totalTip(bill.value, tip);
    tipByPerson(calcTip, +inputPplValue);
    totalByPerson(+bill.value, calcTip, +inputPplValue);
    target.setAttribute("data-error", "false");
  }
  if (target.type === "radio") {
    const custom = form?.querySelector('#custom[type="number"]');
    custom?.previousElementSibling?.className === "flash_error"
      ? (custom?.previousElementSibling?.remove(),
        custom.setAttribute("data-error", "false"),
        ((custom as HTMLInputElement).value = ""))
      : null;
  }
}

function checkEmptyValue(target: HTMLInputElement) {
  return target.value === "";
}

function isOnErrorState(target: HTMLInputElement) {
  return target.validity.valid;
}

function hasFlashMessage(target: HTMLInputElement) {
  return target.previousElementSibling?.className === "flash_error";
}

Btn.addEventListener("click", (e) => {
  (e.target as HTMLButtonElement).disabled = true;
});

inputs.forEach((input: HTMLInputElement) => {
  input.addEventListener("input", handleInputValue, true);
});

form!.addEventListener("reset", () => {
  output_person.textContent = "$0.00";
  output_total.textContent = "$0.00";
});
