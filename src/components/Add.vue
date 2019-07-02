<template>
  <div class="add container">
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
          </div>
        </div>
      </nav>
  <Alert v-if="alert" v-bind:message="alert"></Alert>
    <!--title-->
	<h1 class="page-header">Add a book</h1>
	<form v-on:submit="addBook">
		<div class="well">
			<h4>Info</h4>
			<div class="form-group">
				<label>Name</label>
				<input type="text" class="form-control" placeholder="name" v-model="book.name">
			</div>
			<div class="form-group">
				<label>Author</label>
				<input type="text" class="form-control" placeholder="author" v-model="book.author">
			</div>
			<div class="form-group">
				<label>Description</label>
				<input type="text" class="form-control" placeholder="description" v-model="book.description">
			</div>
			<div class="form-group">
				<label>Image</label>
				<input type="text" class="form-control" placeholder="img" v-model="book.img">
			</div>
			<button class="btn btn-primary" type="submit">Add</button>
		</div>
	</form>
  </div>
</template>

<script>
//import the Alert.vue component
import Alert from './Alert';
export default {
  name: 'add',
  data() {
    return {
      book: {},
      alert: ''
    };
  },
  methods: {
    //Add book info
    addBook(e) {
      if (!this.book.name || !this.book.author || !this.book.description) {
        this.alert = 'Please fill the information！';
      } else {
        //Create a new book record
        var user = JSON.parse(localStorage.getItem('currentuser'));
        let newBook = {
          name: this.book.name,
          author: this.book.author,
          description: this.book.description,
          img: '../static/images/' + this.book.img,
          creater: user.name,
          requestList: [],
          comments: []
        };
        console.log(user.name);
        //Request the data，post to the "json-server" interface
        this.$http
          .post('https://json-server-bookstore.herokuapp.com/books', newBook)
          .then(function(response) {
            console.log(response);
            user.booklist.push(response.body.id);
            this.$http
              .put(
                'https://json-server-bookstore.herokuapp.com/users/' + user.id,
                user
              )
              .then(function(response) {
                localStorage.setItem('currentuser', JSON.stringify(user));
                alert('request done！');
              });
            this.$router.push({
              path: '/books',
              query: { alert: 'Your book has been added！' }
            });
          });
        e.preventDefault();
      }
      e.preventDefault();
    }
  },
  components: {
    Alert
  }
};
</script>

<style scoped>
</style>
