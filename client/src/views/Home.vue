<template>
  <div class="bc">
      <v-row justify="center" style="height: 100vh;" no-gutters >
        <div class="text-center align-center my-auto">
          <h1 class="display-3 font-weight-thin">FLUTDUPY</h1>
          <v-spacer class="ma-3"></v-spacer>
          <h2 class="font-weight-light white--text">Mobile Application Builder & Duplicator</h2>
          <v-btn x-large rounded outlined color="white" class="mt-4 px-10" @click="goTo()">
            Get Started
          </v-btn>
        </div>
      </v-row>
  </div>
</template>

<script>

export default {
  methods: {
    goTo() {
      this.$router.replace({path: '/login'}).catch((err) => console.error(err));
    }
  }
}
</script>

<style scoped>
.bc {
  background: linear-gradient(123deg,rgba(3,217,225,1) 0,rgba(50,105,182,1) 100%)
}
.bottom {
  position: fixed;
  bottom: 0;
}
</style>
