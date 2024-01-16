<script>
import { usePlayerStore } from '@/stores/player';
import { mapActions, mapState } from 'pinia'
export default {
    name: 'AppPlayer',
    methods: {
        ...mapActions(usePlayerStore, ['toggleAudio', 'updateSeek'])
    },
    computed: {
        ...mapState(usePlayerStore, [
            'isPlaying',
            'seek',
            'duration',
            'songProgress',
            'song'
        ])
    }
}
</script>
<template>
    <div class="fixed bottom-0 left-0 bg-white px-4 py-2 w-full">
        <!-- Track Info -->
        <div class="text-center" v-if="song.modifiedName">
            <span class="song-title font-bold">{{ song.modifiedName }}</span> by
            <span class="song-artist">{{ song.displayName }}</span>
        </div>
        <div class="text-center" v-else>
            <span class="song-title font-bold">Song Title</span> by
            <span class="song-artist">Artist</span>
        </div>
        <div class="flex flex-nowrap gap-4 items-center">
            <!-- Play/Pause Button -->
            <button type="button" @click.prevent="toggleAudio">
                <i class="fa text-gray-500 text-xl" :class="{ 'fa-play': !isPlaying, 'fa-pause': isPlaying }"></i>
            </button>
            <!-- Current Position -->
            <div class="player-currenttime">
                {{ seek }}
            </div>
            <!-- Scrub Container  -->
            <div class="w-full h-2 rounded bg-gray-200 relative cursor-pointer" @click.prevent="updateSeek">
                <!-- Player Ball -->
                <span class="absolute -top-2.5 -ml-2.5 text-gray-800 text-lg" :style="{ left: songProgress }">
                    <i class="fas fa-circle"></i>
                </span>
                <!-- Player Progress Bar-->
                <span class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
                    :style="{ width: songProgress }"></span>
            </div>
            <!-- Duration -->
            <div class="player-duration">
                {{ duration }}
            </div>
        </div>
    </div>
</template>