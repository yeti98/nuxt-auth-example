<template>
  <div>
    <div class="container">
      <div>
        <Logo/>
        <p class="title">
          Is authenticated: {{$auth.loggedIn}}
        </p>
        <span v-show="$auth.loggedIn">{{$auth.user}}</span>
        <div class="links">
          <a
            class="button--green"
            href="/login"
            rel="noopener noreferrer"
          >
            Login
          </a>
          <a @click="logout()"
             class="button--grey"
             href="#"
             rel="noopener noreferrer"
          >
            Logout
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      async logout() {
        await this.$auth.logout()
      },
      handleOneTapCredentialResponse(response) {
        this.$router.push({name: "login-callback", query: {strategy: 'onetap'}, params: {onetapCredential: response}})
      },
      showGoogleOneTapSignIn() {
        window.onload = () => {
          google.accounts.id.initialize({
            client_id: '588238297083-tsc60qokgf8lqo7jn1suvbgmou13h75i.apps.googleusercontent.com',
            callback: this.handleOneTapCredentialResponse
          });
          google.accounts.id.prompt();
        };
      }
    },
    mounted() {
      if (!this.$auth.loggedIn) {
        this.showGoogleOneTapSignIn()
      }
    },
    head() {
      return {
        script: [
          {src: "https://accounts.google.com/gsi/client", async: true, defer: true, ssr: false}
        ]
      }
    },
  }
</script>

<style>
  /* Sample `apply` at-rules with Tailwind CSS
  .container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
  }
  */
  .container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .title {
    font-family: 'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .links {
    padding-top: 15px;
  }
</style>
