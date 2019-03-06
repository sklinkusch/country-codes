class CountryCodes {
  constructor(code) {
    this._number = code;
    this.container = document.querySelector("#container");
    this.getData();
    this.addEventListeners();
  }
  addEventListeners() {
    const button = document.querySelector("#find");
    const field = document.querySelector("#calling");
    button.addEventListener("click", () => {
      const value = field.value;
      this.number = value;
      this.getData();
    });
  }
  getData() {
    const url = `https://restcountries.eu/rest/v2/callingcode/${this.number}`;
    fetch(url)
      .then(response => response.json())
      .then(data => this.viewData(data))
      .catch(error => console.log(error));
  }
  get number() {
    return this._number;
  }
  set number(newValue) {
    this._number = newValue;
  }
  viewData(array) {
    const output = array
      .map(country => {
        return `${this.number}: ${country.name}`;
      })
      .join("<br>");
    this.container.innerHTML = output;
  }
}

const myCode = new CountryCodes(49);
