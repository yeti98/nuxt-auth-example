<template>
  <div>
    <div v-show="isError">
      <h2>Đăng nhập không thành công</h2>
    </div>
    <input @click="loginLocal()" type="button" value="Đăng nhập bằng Email"/>
    <input @click="loginFacebook()" type="button" value="Đăng nhập Facebook"/>
    <input @click="loginGoogle()" type="button" value="Đăng nhập Google"/>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        strategy: this.$auth.strategy,
        isError: false,
      }
    },
    mounted() {
      const strategy = this.$store.state.auth.strategy;
      if (strategy === 'facebook') {
        this.handleFacebookCallback();
      } else if (strategy === 'google') {
        this.handleGoogleCallback();
      }
    },
    methods: {
      async loginFacebook() {
        await this.$auth.loginWith("facebook").catch(reason => {
          console.log(reason);
        })
      },
      async loginGoogle() {
        await this.$auth.loginWith("google").catch(reason => {
          console.log(reason);
        })
      },
      async loginLocal() {
        await this.$auth.loginWith("local").catch(reason => {
          console.log(reason);
        })
      },
      handleFacebookCallback() {
        if (this.$route.query["error"]) {
          this.isError = true;
          setTimeout(() => {
            this.isError = false
          }, 2000);
        } else {
          if (window.location.hash.indexOf("access_token") > 0) {
            window.location.replace("/login/callback?strategy=facebook");
          }
        }
      },
      handleGoogleCallback() {
        if (window.location.hash.indexOf("access_token") > 0) {
          window.location.replace("/login/callback?strategy=google");
        }
      }
    }
  }
</script>

<style scoped>

</style>
