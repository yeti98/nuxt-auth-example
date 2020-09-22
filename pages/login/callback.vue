<template>
  <div>
    <div v-if="!$auth.loggedIn && onetapCredential">
      <p>Chưa đăng nhập</p>
    </div>
    <div v-else>
      <p>Waiting 5s.... Register, call backend api etc</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "callback",
    data() {
      return {
        user: this.$auth.user,
        loggedIn: this.$auth.loggedIn,
        onetapCredential: this.$route.params.onetapCredential || undefined
      }
    },
    mounted() {
      if (this.onetapCredential) {
        this.fetchUser(this.onetapCredential.credential);
      } else {
        setTimeout(() => {
          this.$router.push("/")
        }, 5000)
      }
    },
    methods: {
      async fetchUser(token) {
        const userInfoEndpoint = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token="
        const data = await this.$axios.$get(userInfoEndpoint + token).catch(reason => {
          console.log("Đăng nhập không thành công", reason)
        });
        const authenticatedUser = {
          email: data.email,
          name: data.name,
          avatar: data.picture
        }
        console.log("Save to database: \t", authenticatedUser)
        this.$auth.setUser(authenticatedUser)
        this.onetapCredential = undefined
        setTimeout(() => {
          this.$router.push("/")
        }, 5000)
      }
    },
  }
</script>

<style scoped>

</style>
