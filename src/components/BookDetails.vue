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
  <div class="btn-gropp">
    <span class="btn btn-default" id="buy-request" v-on:click = "requestBook(book.id)">请求购买</span>
  </div>
	<h1 class="page-header">
		{{book.name}}
	</h1>
  <img id="book-img" v-bind:src = book.img>
  <hr>
	<ul class="list-group">
		<li class="list-group-item"><span class="glyphicon glyphicon-asterisk">书名：{{book.name}}</span></li>
		<li class="list-group-item"><span class="glyphicon glyphicon-plus">作者：{{book.author}}</span></li>
	</ul>

	<ul class="list-group">
		<li class="list-group-item"><span class="glyphicon glyphicon-asterisk">描述：{{book.description}}</span></li>
		<li class="list-group-item"><span class="glyphicon glyphicon-asterisk">创建者：{{book.creater}}</span></li>
  </ul>
  <ul class="list-group" id="req-user">
    <li class="list-group-item"><span class="glyphicon glyphicon-asterisk">请求者：</span></li>
    <li class="list-group-item" v-for = "req in book.requestList"><span>{{req.name + '  ' + req.email}} </span></li>
	</ul>
  <ul class="list-group">
    <li class="list-group-item">
      <span class="btn btn-default" v-on:click = "showCommentInput()">评论</span>
    </li>
    <li class="list-group-item" id="comment">
      <input type="text" v-model="message" class="form-control" placeholder="添加评论..." required autofocus>
      <span class="btn btn-default" v-on:click="addComment(book.id)">提交</span>
    </li>
    <li class="list-group-item" v-for = "comments in book.comments">
      <span>{{comments}}</span>
    </li>
  </ul>
  </div>
</template>

<script>
export default {
  name: 'bookDetails',
  data () {
    return {
      book:{},
      message:""
    }
  },
  created(){
    //一开始就获取对应id的数据展示
  	this.fetchBooks(this.$route.params.id);
    //console.log(user.name + this.book.creater);

  },
  methods:{
    //获取对应id信息的数据
  	fetchBooks(id){
      //console.log(id);
      var user = JSON.parse(localStorage.getItem('currentuser')) ;
　　　 //向本地接口中请求数据，然后赋值给book
      this.$http.get("http://localhost:3000/books/" + id).then(function(response){
        console.log(response);
        this.book = response.body;
        if(user.name == this.book.creater){
        document.getElementById("req-user").style.display = "block";
        }
      })
    },
    requestBook(id){
      var user = JSON.parse(localStorage.getItem('currentuser')) ;
      this.$http.get("http://localhost:3000/books/" + id).then(function(response){
         this.book = response.body;
         var reqList = this.book.requestList;
         if(reqList.some(function(item){


            if(item.name == user.name){
              return true;
            }
         }) == false && user.name != this.book.creater){
            var requestUser = {
              name: user.name,
              email: user.email
            }
            reqList.push(requestUser);

            this.$http.put("http://localhost:3000/books/"+id, this.book).then(function(response){
               user.requestList.push(this.book.id);
              this.$http.put("http://localhost:3000/users/"+user.id, user).then(function(response){
                localStorage.setItem('currentuser', JSON.stringify(user));
                alert("请求成功！")
              })
            })
         }else if(user.name == this.book.creater){
            alert("不能购买自己添加的图书！");
         }else{
            alert("你已经请求过了！");
         }
      })
    },
    showCommentInput(){
        document.getElementById("comment").style.display = "block";
    },
    addComment(id){
      this.book.comments.push(this.message.trim());
      this.$http.put("http://localhost:3000/books/"+id, this.book).then(function(response){
         document.getElementById("comment").style.display = "none";
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
#comment{
  display: none;
}
#req-user{
  display: none;
}



</style>
