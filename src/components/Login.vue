<template>
  <div class="login" id="login">
     <div class="container" id="login-cont">
      <form class="form-signin">
        <h2 class="form-signin-heading" align="center">Second Bookstore</h2>
        <label for="inputEmail" class="sr-only">Username</label>
        <input type="username" v-model="username" id="inputEmail" class="form-control" placeholder="Username" required autofocus>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" v-model="password" id="inputPassword" class="form-control" placeholder="Password" required>
       
        <span class="btn btn-lg " v-on:click="login">Login</span>
        <router-link class="btn btn-lg " to="/register">Register</router-link>
      </form>

    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      user: '',
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      this.$http
        .get(
          'https://json-server-bookstore.herokuapp.com/users/?t=' +
            new Date().getTime() +
            '&name=' +
            this.username
        )
        .then(function(response) {
          console.log(response);
          this.user = response.body[0];
          if (this.user) {
            if (this.user.password == this.password) {
              localStorage.setItem('currentuser', JSON.stringify(this.user));
              this.$router.push({
                path: '/books',
                query: { alert: 'You have logged in.' }
              });
            } else {
              alert('Sorry, wrong password！');
            }
          } else {
            alert('Username not exists!');
          }
        })
        .catch(function() {
          console.log('GET error!');
        });
    }
  }
};
</script>

<style scoped>
#login-cont {
  padding: 15% 30%;
}
</style>
