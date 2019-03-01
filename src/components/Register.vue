<template>
  <div class="login" id="login">
  <h1 class="page-header">Register</h1>
  <form v-on:submit="register">
    <div class="well">
      <h4>User Info</h4>
      <div class="form-group">
        <label>Username</label>
        <input type="text" class="form-control" placeholder="name" v-model="user.name">
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="text" class="form-control" placeholder="author" v-model="user.password">
      </div>
      <div class="form-group">
        <label>Phone</label>
        <input type="text" class="form-control" placeholder="description" v-model="user.phone">
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="text" class="form-control" placeholder="email" v-model="user.email">
      </div>
      <button class="btn btn-primary" type="submit">Register</button>
    </div>
  </form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      user:{},
      alert:""
    }
  },
  methods:{
    register(){
      if(!this.user.name || !this.user.password || !this.user.phone ||!this.user.email){
        alert("Please fill the information!");
      }else{
        let newUser = {
        "name": this.user.name,
        "password":this.user.password,
        "phone": this.user.phone,
        "email": this.user.email,
        "type": "user",
        "booklist": [],
        "requestList": []
        }
            //data request，post到json-server接口，第二个参数就是创建的新的用户信息，成功后跳转到主页并传递alert内容进行提示,添加成功后，db.json中也会添加上相应的内容
        this.$http.post("http://localhost:3000/users",newUser).then(function(response){
          // console.log(response);
          alert('You have registered a new account！')
          this.$router.push({path:'/'});
        })
        e.preventDefault();
      }
      e.preventDefault();
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
