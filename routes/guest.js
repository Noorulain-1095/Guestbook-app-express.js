const fs = require('fs');

module.exports = {
    addGuestPage: (req, res) => {
        res.render('add-guest.ejs', {
            title: "Welcome to Event | Add a new guest"
            ,message: ''
        });
    },
    addGuest: (req, res) => {
        let message = '';
        let username = req.body.username;
        let email = req.body.email;
        let comment = req.body.comment;

        let usernameQuery = "SELECT * FROM `guests` WHERE user_name = '" + username + "'";

        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = '0';
                res.render('add-guest.ejs', {
                    message,
                    title: "Welcome to Event | Add a new guest"
                });
            } else {

                        // send the guest's details to the database
                        let query = "INSERT INTO `guests` (user_name, email, comment) VALUES ('" +
                            username + "', '" + email + "', '" + comment + "')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            //res.redirect
							    message = '1';
								res.render('add-guest.ejs', {
									message,
									title: "Welcome to Event | Add a new guest"
								});
                        });
                } 
		});
    },
	editGuestPage: (req, res) => {
        let guestId = req.params.id;
        let query = "SELECT * FROM `guests` WHERE id = '" + guestId  + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-guest.ejs', {
                title: "Edit  Guest"
                ,guest: result[0]
                ,message: ''
            });
        });
    },
    editGuest: (req, res) => {
        let guestId = req.params.id;
        let username = req.body.username;
        let email = req.body.email;
        let comment = req.body.comment;

        let query = "UPDATE `guests` SET `user_name` = '" + username + "', `email` = '" + email + "', `comment` = '" + comment + "' WHERE `guests`.`id` = '" + guestId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deleteGuest: (req, res) => {
        let guestId = req.params.id;
        let deleteUserQuery = 'DELETE FROM guests WHERE id = "' + guestId + '"';

                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
    }
};
