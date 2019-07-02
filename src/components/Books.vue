<template>
  <div class="books container">
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
    <h1 class="page-header"><strong>Book List</strong></h1>
     <div class="album py-5 bg-light">
        <div class="container">
          <div class="row">
            <div class="col-md-3" v-for="book in books" v-bind:key="book.id">
              <div class="box-shadow img-box">
                <img  v-bind:src = book.img>
                <div class="book-body">
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <router-link class="btn btn-sm btn-outline-secondary view" v-bind:to="'/books/' + book.id">Detail</router-link>
                        <span class="btn btn-sm btn-outline-secondary view"><strong>{{book.requestList.length}}</strong>interested</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
     </div>
  </div>
</template>

<script>
export default {
  name: 'books',
  data() {
    return {
      books: []
    };
  },
  methods: {
    fetchBooks() {
      this.$http
        .get('https://json-server-bookstore.herokuapp.com/books')
        .then(function(response) {
          this.books = response.body;
        });
    }
  },
  created() {
    this.fetchBooks();
  }
};
</script>

<style scoped>
.img-box {
  padding-top: 2%;
  margin-bottom: 25px;
}
img {
  height: 200px;
  width: 180px;
  display: block;
  margin: 2% auto;
}
.view {
  color: #666666;
}
.box-shadow {
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.05);
}
</style>
