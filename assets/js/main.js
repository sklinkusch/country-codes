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
        const {
          name,
          alpha2Code,
          languages,
          nativeName,
          subregion,
          capital,
          population,
          area,
          callingCodes,
          timezones,
          currencies,
          regionalBlocs,
          topLevelDomain,
          flag
        } = country;
        const html = `
        <h2>${name} (${alpha2Code})</h2>
        <p><b>${name}</b> (in ${languages[0].name}: <i>${nativeName}</i>) ${
          subregion != "" ? `is a country in ${subregion}` : ""
        }. ${
          capital != "" ? `Its capital is ${capital}.` : ""
        } There are ${population} inhabitants living on ${area} square kilometres. The country uses the following ${
          currencies.length == 1 ? "currency" : "currencies"
        }: ${currencies
          .map(currency => `${currency.name} (${currency.symbol})`)
          .join(", ")}. Its ${
          callingCodes.length == 1 ? "dialing code is" : "dialing codes are"
        } ${callingCodes.map(x => x).join(", ")}. It is located in the ${
          timezones.length == 1 ? "timezone" : "timezones"
        } 
          ${timezones
            .map(x => x)
            .join(", ")}. It is a member of the following ${
          regionalBlocs.length == 1 ? "organization" : "organizations"
        }: ${regionalBlocs
          .map(regionalBloc => regionalBloc.name)
          .join(", ")}. The top level domains used by this country ${
          topLevelDomain.length == 1 ? "is" : "are"
        }: ${topLevelDomain.map(domain => domain).join(", ")}.</p>
         ${
           flag != ""
             ? `<div><img src="${flag}" alt="flag of ${name}" title="flag of ${name}" width="200px"></div>`
             : ""
         }
        `;
        return html;
      })
      .join("");
    this.container.innerHTML = output;
  }
}

const myCode = new CountryCodes(49);
