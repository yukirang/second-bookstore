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
          </div>
        </div>
      </nav>
  <h1 class="page-header">
    {{user.name}}
  </h1>

  <ul class="list-group">
    <li class="list-group-item"><span class="glyphicon glyphicon-asterisk">Phone：{{user.phone}}</span></li>
    <li class="list-group-item"><span class="glyphicon glyphicon-asterisk">Email：{{user.email}}</span></li>
  </ul>
  <h3>My Books</h3>
  <ul class="list-group">
    <li class="list-group-item" v-for="id_mine in user.booklist"> <router-link class="btn btn-sm btn-outline-secondary view" v-bind:to="'/books/' + id_mine">{{book[id_mine-1].name}}</router-link></li>
  </ul>
  <h3>My Requests</h3>
  <ul class="list-group">
    <li class="list-group-item" v-for="id_req in user.requestList"><router-link class="btn btn-sm btn-outline-secondary view" v-bind:to="'/books/' + id_req">{{book[id_req-1].name}}</router-link></li>
  </ul>
  </div>
</template>

<script>
export default {
  name: 'userPage',
  data() {
    return {
      user: {},
      book: ''
    };
  },
  created() {
    //Get the id and show at first
    this.user = JSON.parse(localStorage.getItem('currentuser'));
    console.log(this.user);
    this.fetchBooks();
  },
  methods: {
    //Get the info of a book with the id
    fetchBooks() {
      //Request data and set it to book
      this.$http.get('http://localhost:3000/books/').then(function(response) {
        this.book = response.body;
      });
    }
  }
};
</script>
<style scoped>
#book-img {
  width: 30%;
}
</style>
