// Imports
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

// Inits
const app = express();
const port = 3000;

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// Data store
let posts = [];

// Post Constructor
function Post(title, content) {
    this.title = title;
    this.content = content;
    this.rawDate = new Date();
    this.date = this.rawDate.toDateString();
}

// Add a post
function addPost(title, content) {
    let post = new Post(title, content);
    posts.push(post);
}

// Delete a post
function deletePost(index) {
    posts.splice(index, 1);
}

// Edit a post
function editPost(index, title, content) {
    posts[index] = new Post(title, content);
}

// Index
app.get('/', (req, res) => {
    res.render('home.ejs', { posts: posts });
});

// View a post
app.get('/view/:id', (req, res) => {
    let index = req.params.id;
    let post = posts[index];
    res.render('view.ejs', {postID: index, title: post.title, content: post.content});
});

// Delete a post
app.post('/delete', (req, res) => {
    let index = req.body['postID'];
    deletePost(index);
    res.redirect('/');
});

// Create a post
app.get('/create', (req, res) => {
    res.render('create.ejs');
});

// Save a post
app.post('/save', (req, res) => {
    let title = req.body['title'];
    let content = req.body['content'];
    
    addPost(title, content);
    res.redirect('/');
});

// Edit a post
app.get('/edit/:id', (req, res) => {
    let index = req.params.id;
    let post = posts[index];
    res.render('create.ejs', {postID: index, title: post.title, content: post.content});
});

// Update a post
app.post('/update', (req, res) => {
    let title = req.body['title'];
    let content = req.body['content'];
    let index = req.body['index'];
    editPost(index, title, content);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Blog App is running on http://localhost:${port}`);
});