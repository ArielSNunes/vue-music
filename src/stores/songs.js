import { defineStore } from "pinia"

export const useSongsStore = defineStore("songs", {
  state: () => ({
    songs: []
  }),
  actions: {
    addSong(song) {
      this.songs.push(song)
    },
    clearSongs() {
      this.songs = []
    },
    updateSong(songId, songData) {
      this.songs = this.songs.map(song => {
        if (song.docId !== songId) return song
        return { ...song, ...songData }
      })
    },
    removeSong(songId) {
      this.songs = this.songs.filter(song => song.docId !== songId)
    },
    getLastSong() {
      return this.songs[this.songs.length - 1]
    },
    getIds() {
      return this.songs.map(song => {
        if (song.docId) return song.docId
        if (song.docID) return song.docID
        return null
      }).filter(id => !!id)
    }
  }
})
