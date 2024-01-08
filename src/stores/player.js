import { defineStore } from "pinia"

export const usePlayerStore = defineStore('player', {
    state: () => ({
        song: {}
    }),
    actions: {
        async updateSong(song) {
            this.song = song
        }
    }
})