<template>
  <div class="add container">
　　 <!--弹框,alert有内容进行提示，绑定message的信息为alert内容-->
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
  <Alert v-if="alert" v-bind:message="alert"></Alert>
    <!--标题-->
	<h1 class="page-header">添加新书</h1>
	<form v-on:submit="addBook">
		<div class="well">
			<h4>图书信息</h4>
			<div class="form-group">
				<label>书名</label>
				<input type="text" class="form-control" placeholder="name" v-model="book.name">
			</div>
			<div class="form-group">
				<label>作者</label>
				<input type="text" class="form-control" placeholder="author" v-model="book.author">
			</div>
			<div class="form-group">
				<label>描述</label>
				<input type="text" class="form-control" placeholder="description" v-model="book.description">
			</div>
			<div class="form-group">
				<label>图片</label>
				<input type="text" class="form-control" placeholder="img" v-model="book.img">
			</div>
			<button class="btn btn-primary" type="submit">添加</button>
		</div>
	</form>
  </div>
</template>

<script>
//引入Alert.vue组件
import Alert from './Alert'
export default {
  name: 'add',
  data () {
    return {
      book:{},
      alert:""
    }
  },
  methods:{
    //添加图书信息方法
  	addBook(e){
  		if(!this.book.name || !this.book.author || !this.book.description){
  			
  			this.alert = "请添加对应的信息！";
  		}else{
        //创建新的图书信息，
        var user = JSON.parse(localStorage.getItem('currentuser'))    
  			let newBook = {
  			  name:this.book.name,
          author:this.book.author,
          description:this.book.description,
          img:"../static/images/"+this.book.img,
          creater: user.name,
          requestList:[],
          comments:[]
  			}
        console.log(user.name);
            //数据请求，post到json-server接口
  			this.$http.post("http://localhost:3000/books",newBook).then(function(response){
          console.log(response);
          user.booklist.push(response.body.id);
  				//console.log(response);
          this.$http.put("http://localhost:3000/users/"+user.id, user).then(function(response){
                localStorage.setItem('currentuser', JSON.stringify(user));
                alert("请求成功！")
              })
  				this.$router.push({path:'/books',query:{alert:'新书添加成功！'}});
  			})
        e.preventDefault();
  		}
  		e.preventDefault();
  	}
  },
  components:{
  	Alert
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>