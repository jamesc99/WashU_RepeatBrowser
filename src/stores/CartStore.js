  import { writable } from 'svelte/store';
  // import _data from "../json/main.json";

  function createStore() {
    const {subscribe, set, update} = writable({
      data: [],
      repeats: [],
      // files: _data.files // list of all files
    });

    return {
      subscribe,
      addDataItems: (newVal) => update(n => {
        n.data = newVal;
        return n;
      }),
      addRepeats: (newVal) => update(n => {
        n.repeats = newVal;
        return n;
      })
    }
  }
  export const Cart = createStore();

