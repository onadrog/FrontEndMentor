import * as data from "../data.json";
import { HTMLInputElementInterface } from "./types/interfaces";

class DashboardCard extends HTMLElement {
  inputs: NodeListOf<HTMLInputElement>;
  checked: "daily" | "monthly" | "weekly";

  constructor() {
    super();
    this.inputs = this.querySelectorAll("input");
    this.checked = (
      Array.from(this.inputs).find(
        (e) => e.checked
      ) as HTMLInputElementInterface
    ).id;
  }

  connectedCallback() {
    this.createSection();
  }

  handleInputValue = (e: Event) => {
    this.checked = (e.target as HTMLInputElementInterface)!.id;
    this.changeValues();
  };

  trimSpace(value: string) {
    return value.replace(" ", "-").toLocaleLowerCase();
  }

  reformatString(key: string) {
    switch (key) {
      case "weekly":
        return "week";
      case "monthly":
        return "month";
      default:
        return "day";
    }
  }

  changeValues() {
    const timeCurrent = this.querySelectorAll(".card__current");
    const timePrev = this.querySelectorAll(".card__prev");
    for (let index = 0; index < timeCurrent.length; index++) {
      const element = timeCurrent[index];
      element.textContent =
        data[index].timeframes[this.checked].current.toString() + "hrs ";
      timePrev[index].textContent = `Last ${this.reformatString(
        this.checked
      )} - ${data[index].timeframes[this.checked].previous.toString()}hrs`;
    }
  }

  htmlElementFactory(element: string, className: string[]) {
    const htmlElement = document.createElement(element);
    for (let index = 0; index < className.length; index++) {
      htmlElement.classList.add(className[index]);
    }
    return htmlElement;
  }

  createSection() {
    this.inputs.forEach((element) => {
      element.addEventListener("change", this.handleInputValue, true);
    });
    data.forEach(({ title, timeframes }) => {
      const cleanTitle = this.trimSpace(title);
      const article = this.htmlElementFactory("article", ["card", cleanTitle]);
      const header = document.createElement("header");
      const titleEl = this.htmlElementFactory("h2", ["card__title"]);
      const menuBtn = this.htmlElementFactory("button", ["card__menu"]);
      menuBtn.setAttribute("role", "menu");
      menuBtn.textContent = "...";
      const section = this.htmlElementFactory("section", ["card__content"]);
      const image = this.htmlElementFactory("div", ["card__bg"]);
      image.setAttribute("aria-hidden", "true");
      const paragraph = this.htmlElementFactory("p", ["card__times"]);
      const timeCurrent = this.htmlElementFactory("span", ["card__current"]);
      const timePrev = this.htmlElementFactory("span", ["card__prev"]);
      timeCurrent.textContent =
        timeframes[this.checked].current.toString() + "hrs ";
      timePrev.textContent = `Last ${this.reformatString(
        this.checked
      )} - ${timeframes[this.checked].previous.toString()}hrs`;
      titleEl.textContent = title;
      header.append(titleEl);
      header.append(menuBtn);
      paragraph.append(timeCurrent);
      paragraph.append(timePrev);
      section.append(header);
      section.append(paragraph);
      article.append(image);
      article.append(section);
      this.append(article);
    });
  }
}

customElements.define("dashboard-card", DashboardCard, { extends: "main" });
