import store from "../data";
import { getCocktails, setSearchValue } from "../data/cocktails";
import { toast } from "bulma-toast";
class Form {
  constructor(holder) {
    this.holder = holder;
    this.buttonRef = null;
    this.inputRef = null;
    this.formRef = null;
    this.init();
    store.subscribe(this.render.bind(this));
    this.events();
  }
  init() {
    this.holder.insertAdjacentHTML(
      "beforeend",
      `
      <form action="">
        <div class="field has-addons has-addons-fullwidth">
          <div class="control">
            <input class="input" type="text" placeholder="Normal input" />
          </div>
          <div class="control">
            <button class="button is-primary is-fullwidth">
              Search
            </button>
          </div>
        </div>
      </form>
    `
    );
    this.inputRef = this.holder.querySelector(".input");
    this.buttonRef = this.holder.querySelector(".button");
    this.formRef = this.holder.querySelector("form");
  }
  events() {
    this.formRef.onsubmit = (e) => {
      e.preventDefault();
      store.dispatch(getCocktails());
    };
    this.inputRef.oninput = (e) => {
      store.dispatch(setSearchValue(e.target.value));
    };
  }
  render() {
    const {
      cocktailsState: { loading, error, cocktails }
    } = store.getState();
    if (loading) {
      this.buttonRef.classList.add("is-loading");
    } else {
      this.buttonRef.classList.remove("is-loading");
    }
    if (error.status) {
      toast({
        message: error.message,
        type: "is-danger",
        dismissible: true,
        position: "bottom-center",
        animate: { in: "fadeIn", out: "fadeOut" }
      });
    }
  }
  styling() {}
}

export default (holder) => new Form(holder);
