import store from "../data";

class Cocktails {
  constructor(holder) {
    this.holder = holder;
    this.gridHolder = null;
    this.init();
    store.subscribe(this.render.bind(this));
    //this.events();
  }
  init() {
    this.holder.insertAdjacentHTML(
      "beforeend",
      `
      <div class="columns is-multiline is-mobile">
      </div>
    `
    );
    this.gridHolder = this.holder.querySelector(".columns");
  }
  events() {}
  render() {
    const {
      cocktailsState: { cocktails }
    } = store.getState();
    if (cocktails.length > 0) {
      this.gridHolder.innerHTML = cocktails
        .map(
          (c) => `
      <div class="column is-one-quarter">
        <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="${c.strDrinkThumb}" alt="Placeholder image">
          </figure>
        </div>
        <div class="card-content">     
          <div class="content">
            ${c.strDrink}
          </div>
        </div>
      </div>
      </div>
    `
        )
        .join("");
    }
  }
}

export default (holder) => new Cocktails(holder);
