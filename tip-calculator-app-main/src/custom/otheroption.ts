class OtherOption extends HTMLInputElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.createHiddenRadioInput();
  }

  injectValue(e: Event, hiddenInput: HTMLInputElement) {
    const validity =
      (e.target as HTMLInputElement).checkValidity() && this.value !== "";
    if (validity) {
      hiddenInput.value = this.value;
    }
    hiddenInput.checked = validity;
  }

  createHiddenRadioInput() {
    const hiddenRadioInput = document.createElement("input");
    hiddenRadioInput.type = "radio";
    hiddenRadioInput.hidden = true;
    hiddenRadioInput.name = this.name;
    this.insertAdjacentElement("beforebegin", hiddenRadioInput);
    this.addEventListener(
      "input",
      (e) => this.injectValue(e, hiddenRadioInput),
      true
    );
    this.addEventListener(
      "focus",
      (e) => (hiddenRadioInput.checked = true),
      true
    );
  }
}

customElements.define("other-option", OtherOption, { extends: "input" });
