import { defineStore } from "pinia"
import { Howl } from "howler"

export const usePlayerStore = defineStore('player', {
    state: () => ({
        song: {},
        sound: null
    }),
    getters: {
        hasPlayingSong: ({ sound }) => !!sound,
        isPlaying: ({ sound }) => sound?.playing() ?? false
    },
    actions: {
        async updateSong(song) {
            this.song = song
            this.sound = new Howl({
                src: [song.url],
                html5: true
            })

            this.playSong()
        },
        playSong() {
            if (!this.hasPlayingSong) {
                return
            }
            this.sound.play()
        },
        stopSong() {
            if (!this.hasPlayingSong) {
                return
            }
            this.sound.pause()
        },
        toggleAudio() {
            if (!this.hasPlayingSong) {
                return
            }
            if (this.isPlaying) {
                return this.stopSong()
            }
            return this.playSong()
        }
    }
})