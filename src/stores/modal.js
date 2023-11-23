import { defineStore } from "pinia"

export const useModalStore = defineStore("modal", {
  state: () => ({
    isOpen: false
  }),
  getters: {
    hiddenClass(currentState) {
      return !currentState.isOpen ? "hidden" : ""
    }
  }
})
