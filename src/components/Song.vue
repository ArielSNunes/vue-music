<script>
import { auth, db } from "@/includes/firebase"
import { Database } from "@/services/Database"
import { mapState } from "pinia"
import { useUserStore } from "@/stores/users"

export default {
  name: "Song",
  data() {
    return {
      song: {},
      database: new Database(db),
      schema: {
        comment: "required|min:3"
      },
      commentInSubmission: false,
      commentShowAlert: false,
      commentAlertVariant: "bg-blue-500",
      commentAlertMessage: "Please wait! Yout comment is being submitted.",
      comments: [],
      ordering: 1
    }
  },
  computed: {
    ...mapState(useUserStore, ["userLoggedIn"]),
    sortedComments() {
      const comments = this.comments.map(c => {
        const date = new Date(c.createdAt.seconds * 1000)
        const dateFormat = new Intl.DateTimeFormat("pt-BR", {
          dateStyle: "short",
          timeStyle: "short",
        })
        c.commentDate = dateFormat.format(date)
        return c
      })
      return comments.sort((a, b) => {
        if (this.ordering === 1) {
          return new Date(b.createdAt.seconds * 1000) - new Date(a.createdAt.seconds * 1000)
        }
        return new Date(a.createdAt.seconds * 1000) - new Date(b.createdAt.seconds * 1000)
      })
    }
  },
  watch: {
    ordering(newVal) {
      if (newVal == this.$route.query.ordering) {
        return
      }
      this.$router.push({
        query: {
          ordering: newVal
        }
      })
      return
    }
  },
  async created() {
    const song = await this.database.getDocById(this.$route.params.id)
    if (!song.exists) {
      this.$router.push({ name: "home" })
      return
    }
    const { ordering } = this.$route.query
    this.ordering = ['1', '2'].includes(ordering) ? +ordering : 1
    this.song = song.data()
    console.log(this.song)
    await this.getComments()
  },
  methods: {
    async getComments() {
      this.comments = await this.database.getComments(this.$route.params.id)
      this.song.commentCount = this.comments.length
    },
    async addComment({ comment, ...values }, { resetForm, ...context }) {
      this.commentInSubmission = true
      this.commentShowAlert = true
      this.commentAlertVariant = "bg-blue-500"
      this.commentAlertMessage = "Please wait! Yout comment is being submitted."
      try {
        const commentObj = {
          comment,
          songID: this.$route.params.id,
          name: auth.currentUser.displayName,
          uid: auth.currentUser.uid
        }
        const createdComment = await this.database.createComment(commentObj)
        this.commentInSubmission = false
        this.commentShowAlert = true
        this.commentAlertVariant = "bg-green-500"
        this.commentAlertMessage = "Comment added!"
        this.song.commentCount++
        await this.database.updateSong(this.$route.params.id, {
          commentCount: this.song.commentCount
        })
        setTimeout(() => {
          this.commentShowAlert = false
        }, 1000)
        await this.getComments()
        resetForm()
      } catch (e) {
        this.commentInSubmission = false
        this.commentShowAlert = true
        this.commentAlertVariant = "bg-red-500"
        this.commentAlertMessage = "Error to add comment!"
      }
    }
  }
}
</script>

<template>
  <!-- Music Header -->
  <section class="w-full mb-8 py-14 text-center text-white relative">
    <div class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
      style="background-image: url(/assets/img/song-header.png)"></div>
    <div class="container mx-auto flex items-center">
      <!-- Play/Pause Button -->
      <button type="button" class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none">
        <i class="fas fa-play"></i>
      </button>
      <div class="z-50 text-left ml-8">
        <!-- Song Info -->
        <div class="text-3xl font-bold">{{ song.modifiedName }}</div>
        <div>{{ song.genre }}</div>
      </div>
    </div>
  </section>
  <!-- Form -->
  <section class="container mx-auto mt-6">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <!-- Comment Count -->
        <span class="card-title">Comments ({{ song.commentCount }})</span>
        <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
      </div>
      <div class="p-6">
        <div class="text-white text-center font-bold p-4 mb-4" v-if="commentShowAlert" :class="commentAlertVariant">
          {{ commentAlertMessage }}
        </div>
        <vee-form :validation-schema="schema" @submit="addComment" v-if="userLoggedIn">
          <vee-field as="textarea" name="comment"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
            placeholder="Your comment here..."></vee-field>
          <error-message class="text-red-600" name="comment" />
          <button type="submit" :disabled="commentInSubmission" class="py-1.5 px-3 rounded text-white bg-green-600 block">
            Submit
          </button>
        </vee-form>
        <!-- Sort Comments -->
        <select
          class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          v-model="ordering">
          <option value="1">Latest</option>
          <option value="2">Oldest</option>
        </select>
      </div>
    </div>
  </section>
  <!-- Comments -->
  <ul class="container mx-auto">
    <li class="p-6 bg-gray-50 border border-gray-200" v-for="comment in sortedComments" :key="comment.docID"
      :comment="comment">
      <!-- Comment Author -->
      <div class="mb-5">
        <div class="font-bold">{{ comment.name }}</div>
        <time>{{ comment.commentDate }}</time>
      </div>

      <p>
        {{ comment.comment }}
      </p>
    </li>
  </ul>
</template>

<style scoped></style>
