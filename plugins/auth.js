export default function ({ $auth, redirect }) {
  if (!$auth.loggedIn) {
    return
  }

  const auth = $auth;

  const authStrategy = auth.strategy.name;
  if(authStrategy === 'facebook' || authStrategy === 'google'){
    const token = auth.getToken(authStrategy).substr(7);
    // console.log(token)
    // const authStrategyConverted = authStrategy === 'facebook' ? 'fb' : 'google';
    // const url = `/user/signup/${authStrategyConverted}?token=${token}`;
    //
    // try {
    //   const {data} = await $axios.$post(url, null);
    //   auth.setToken('local', "Bearer "+ data.access_token);
    //   setTimeout( async () => {
    //     auth.setStrategy('local');
    //     setTimeout( async () => {
    //       await auth.fetchUser();
    //     })
    //   });
    // } catch (e) {
    //   console.log(e);
    // }
  }
}
