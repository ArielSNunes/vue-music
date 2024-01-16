import { defineStore } from "pinia"
import { Howl } from "howler"
import { TimeFormatter } from "@/services/TimeFormatter"

export const usePlayerStore = defineStore('player', {
    state: () => ({
        song: {},
        sound: null,
        seek: "00:00",
        duration: "00:00",
        timeFormatter: new TimeFormatter(),
        songProgress: '0%'
    }),
    getters: {
        hasPlayingSong: ({ sound }) => !!sound,
        isPlaying: ({ sound }) => sound?.playing() ?? false
    },
    actions: {
        async updateSong(song) {
            // Descarrega a música
            if (this.sound instanceof Howl) {
                this.sound.unload()
            }

            // Aplica as informações do áudio
            this.song = song

            // Carrega a música
            this.sound = new Howl({
                src: [song.url],
                html5: true
            })

            // Adiciona evento de play
            this.sound.on('play', () => requestAnimationFrame(this.progress))

            // Toca o áudio
            this.playSong()
        },
        progress() {
            // Captura quanto já foi, e o tempo total
            const seek = this.sound.seek()
            const duration = this.sound.duration()

            // Formata os tempos
            this.seek = this.timeFormatter.formatTime(seek)
            this.duration = this.timeFormatter.formatTime(duration)

            // Monta o progresso
            this.songProgress = `${(seek / duration) * 100}%`

            // Caso ainda esteja tocando, chama a função novamente
            if (this.isPlaying) {
                requestAnimationFrame(this.progress)
            }
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
        },
        removeSong() {
            if (!this.hasPlayingSong) {
                return
            }
            this.sound.unload()
        },
        updateSeek(event) {
            if (!this.isPlaying) {
                return
            }
            const { x, width } = event.currentTarget.getBoundingClientRect()
            const clickX = event.clientX - x
            const percentage = clickX / width
            const seconds = this.sound.duration() * percentage
            this.sound.seek(seconds)
            this.sound.once('seek', () => requestAnimationFrame(this.progress))
        }
    }
})