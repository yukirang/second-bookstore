<template>
  <div class="details container">
  <nav class="navbar navbar-default">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#"><strong>Second-Bookstore</strong></a>
          </div>
          <div id="navbar" class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
              <li><router-link to="/books">图书</router-link></li>
              <li><router-link to="/userpage">我的</router-link></li>
            </ul>

             <ul class="nav navbar-nav">
              <li><router-link to="/add">添加新书</router-link></li>
            </ul>
          </div><!--/.nav-collapse -->
        </div>
      </nav>  
  <h1 class="page-header">
    {{user.name}}
  </h1>

  <ul class="list-group">
    <li class="list-group-item"><span class="glyphicon glyphicon-asterisk">电话：{{user.phone}}</span></li>
    <li class="list-group-item"><span class="glyphicon glyphicon-asterisk">email：{{user.email}}</span></li>
  </ul>
  <h3>我发布的图书</h3>
  <ul class="list-group">
    <li class="list-group-item" v-for="idmine in user.booklist"> <router-link class="btn btn-sm btn-outline-secondary view" v-bind:to="'/books/' + idmine">{{book[idmine-1].name}}</router-link></li>
  </ul>
  <h3>我请求的图书</h3>
  <ul class="list-group">
    <li class="list-group-item" v-for="idreq in user.requestList"><router-link class="btn btn-sm btn-outline-secondary view" v-bind:to="'/books/' + idreq">{{book[idreq-1].name}}</router-link></li>
  </ul>
  </div>
</template>

<script>
export default {
  name: 'userPage',
  data () {
    return {
      user:{},
      book:""
    }
  },
  created(){
    //一开始就获取对应id的数据展示
    this.user = JSON.parse(localStorage.getItem('currentuser')) ;
    console.log(this.user);
    this.fetchBooks();
  },
  methods:{
    //获取对应id信息的数据
    fetchBooks(){
      //console.log(id);
　　　 //向本地接口中请求数据，然后赋值给book
      this.$http.get("http://localhost:3000/books/").then(function(response){
        this.book = response.body;
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#book-img{
  width:30%;
}


</style>