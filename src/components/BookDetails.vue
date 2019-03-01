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
              <li><router-link to="/books">Books</router-link></li>
              <li><router-link to="/userpage">Mine</router-link></li>
            </ul>

             <ul class="nav navbar-nav">
              <li><router-link to="/add">Add a Book</router-link></li>
            </ul>
          </div><!--/.nav-collapse -->
        </div>
  </nav>
  <div class="btn-gropp">
    <span class="btn btn-default" id="buy-request" v-on:click = "requestBook(book.id)">Request Purchase</span>
  </div>
	<h1 class="page-header">
		{{book.name}}
	</h1>
  <img id="book-img" v-bind:src = book.img>
  <hr>
	<ul class="list-group">
		<li class="list-group-item"><span class="glyphicon glyphicon-asterisk">Title：{{book.name}}</span></li>
		<li class="list-group-item"><span class="glyphicon glyphicon-plus">Author：{{book.author}}</span></li>
	</ul>

	<ul class="list-group">
		<li class="list-group-item"><span class="glyphicon glyphicon-asterisk">Description：{{book.description}}</span></li>
		<li class="list-group-item"><span class="glyphicon glyphicon-asterisk">Creator：{{book.creater}}</span></li>
  </ul>
  <ul class="list-group" id="req-user">
    <li class="list-group-item"><span class="glyphicon glyphicon-asterisk">Requester：</span></li>
    <li class="list-group-item" v-for = "req in book.requestList"><span>{{req.name + '  ' + req.email}} </span></li>
	</ul>
  <ul class="list-group">
    <li class="list-group-item">
      <span class="btn btn-default" v-on:click = "showCommentInput()">Comments</span>
    </li>
    <li class="list-group-item" id="comment">
      <input type="text" v-model="message" class="form-control" placeholder="Add some comments..." required autofocus>
      <span class="btn btn-default" v-on:click="addComment(book.id)">Submit</span>
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
    //Get the id and show at first
  	this.fetchBooks(this.$route.params.id);
    //console.log(user.name + this.book.creater);

  },
  methods:{
    //Get the info of a book with the id
  	fetchBooks(id){
      //console.log(id);
      var user = JSON.parse(localStorage.getItem('currentuser')) ;
      //Request data and set it to book
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
                alert("Request succeeded！")
              })
            })
         }else if(user.name == this.book.creater){
            alert("You can't purchase your own book！");
         }else{
            alert("You have requested to buy this book!");
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
