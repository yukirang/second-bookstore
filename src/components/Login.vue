<template>
  <div class="login" id="login">
     <div class="container" id="login-cont">
      <form class="form-signin">
        <h2 class="form-signin-heading" align="center">二手书交易市场</h2>
        <label for="inputEmail" class="sr-only">用户名</label>
        <input type="username" v-model="username" id="inputEmail" class="form-control" placeholder="用户名" required autofocus>
        <label for="inputPassword" class="sr-only">密码</label>
        <input type="password" v-model="password" id="inputPassword" class="form-control" placeholder="密码" required>
        <!--div class="checkbox">
          <label>
            <input type="checkbox" value="remember-me"> Remember me
          </label>
        </div-->
        <span class="btn btn-lg " v-on:click="Login">登陆</span>
        <router-link class="btn btn-lg " to="/register">注册</router-link>
      </form>
      
    </div> 
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      user:"",
      username: "",
      password: ""
    }
  },
  methods:{
    Login(){
      this.$http.get("http://localhost:3000/users/?t=" +new Date().getTime()+ "&name=" + this.username).then(function(response){
        console.log(response)
        this.user = response.body[0];
        if(this.user)
        {

          if(this.user.password == this.password){
           localStorage.setItem('currentuser', JSON.stringify(this.user));
           this.$router.push({path:'/books',query:{alert:'登陆成功！'}});
          }else{
            alert("密码错误！");
          }
        }else{
          alert("用户名不存在！");
        }
      }).catch(function(){
        console.log("GET error!")
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#login-cont{
  padding: 15% 30%;
}
</style>
