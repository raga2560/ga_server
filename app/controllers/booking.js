var Booking = require('../models/booking');

exports.getBookings = function(req, res, next){

    Booking.find({},
        function(err, bookings) {

        if (err){
        	res.send(err);
        }

        res.json(bookings);

    });

}

exports.getRoomBookings = function(req, res, next){
    var room = req.body.room;

    Booking.find({"room": room},
        function(err, bookings) {

        if (err){
        	res.send(err);
        }

        res.json(bookings);

    });

}
function checkbooking(room, S, E, cb)
{
   Booking.find({"room": room, "startdate": {"$lt": new Date(E)}, "enddate": {"$gt": new Date(S)}},  function(err, bookings) {

            if (err){
                cb(err, null);
            }
            else {
                cb(null, bookings);
            }

});
}

exports.createBooking = function(req, res ){
    var bookingdata = req.body;


    var S = bookingdata.startdate;
    var E = bookingdata.enddate;
    var room = bookingdata.room;

    checkbooking(room, S, E, function(err, data) {

    if(err){
      res.json(err);
    }

    
    Booking.create({
        enddate : E,
        startdate : S,
        owner : bookingdata.owner,
        room : bookingdata.room,
        done : false
    }, function(err, booking) {

        console.log("err="+err);
        if (err){
        	res.send(err);
        }
        else { 
        Booking.find( {_id: booking._id}, function(err, bookings) {

            if (err){
            	res.send(err);
            }
            else {
            res.json(bookings);
            }
            

        });
       }

    });
   });

}

exports.deleteBooking = function(req, res, next){

    Booking.remove({
        _id : req.params.booking_id
    }, function(err, booking) {
        res.json(booking);
    });

}


exports.getBooking = function(req, res, next){

    Booking.find({
        _id : req.params.booking_id}, 
     function(err, booking) {
        if (err){
                res.send(err);
        }
        else {
        req.booking = booking[0]; // useful when we need to process booking in next call
        res.json(booking[0]);
        }
    });
}

