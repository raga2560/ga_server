var AuthenticationController = require('./controllers/authentication'),  
    TodoController = require('./controllers/todos'),  
    BookingController = require('./controllers/booking'),  
    PostController = require('./controllers/post'),  
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport');

var requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});

module.exports = function(app){

    var apiRoutes = express.Router(),
        authRoutes = express.Router(),
        todoRoutes = express.Router();
        BookingRoutes = express.Router();
        PostRoutes = express.Router();

    // Auth Routes
    apiRoutes.use('/auth', authRoutes);

    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login', requireLogin, AuthenticationController.login);

    authRoutes.get('/protected', requireAuth, function(req, res){
        res.send({ content: 'Success'});
    });

    // Todo Routes
    apiRoutes.use('/todos', todoRoutes);

    todoRoutes.get('/', requireAuth, AuthenticationController.roleAuthorization(['reader','creator','editor']), TodoController.getTodos);
    todoRoutes.post('/', requireAuth, AuthenticationController.roleAuthorization(['creator','editor']), TodoController.createTodo);
    todoRoutes.delete('/:todo_id', requireAuth, AuthenticationController.roleAuthorization(['editor']), TodoController.deleteTodo);


    apiRoutes.use('/booking', bookingRoutes);
    bookingRoutes.get('/getBookings',  BookingController.getBookings);
    bookingRoutes.post('/getRookBooking',  BookingController.getRookBookings);
    bookingRoutes.post('/createBooking',  BookingController.createBooking);
    bookingRoutes.get('/delete/:booking_id', requireAuth, AuthenticationController.roleAuthorization(['editor']), BookingController.deleteCoupon);

    bookingRoutes.get('/getBooking/:booking_id',  BookingController.getBooking);

    apiRoutes.use('/post', postRoutes);
    postRoutes.get('/getposts',  PostController.getPosts);
    postRoutes.get('/getComments/:post_id',  PpostController.getComments);
    postRoutes.post('/createPost',  PostController.createPost);
    postRoutes.post('/createComment',  PostController.createComment);
    app.use('/api', apiRoutes);

}
