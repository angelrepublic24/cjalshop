"use strict";

var express = require('express');

var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken'); // const { OAuth2Client } = require('google-auth-library');
// const client = new OAuth2Client(process.env.CLIENT_ID);


var User = require('../models/user');

var app = express();

function verify(token) {
  var ticket, payload;
  return regeneratorRuntime.async(function verify$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]

          }));

        case 2:
          ticket = _context.sent;
          payload = ticket.getPayload();
          return _context.abrupt("return", {
            name: payload.name,
            email: payload.email,
            img: payload.picture,
            google: true
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}

var controllers = {
  loginUser: function loginUser(req, res) {
    var body = req.body;
    User.findOne({
      email: body.email
    }, function (err, userDB) {
      if (err) return res.status(400).json({
        ok: false,
        err: err
      });
      if (!userDB) return res.status(404).json({
        ok: false,
        err: {
          message: '(Email) o contraseña incorrectos'
        }
      });

      if (!bcrypt.compareSync(body.password, userDB.password)) {
        return res.status(404).json({
          ok: false,
          err: {
            message: 'Email o (contraseña) incorrectos'
          }
        });
      }

      var token = jwt.sign({
        user: userDB
      }, process.env.SECRET, {
        expiresIn: process.env.LIMIT_TOKEN
      });
      res.json({
        ok: true,
        user: userDB,
        token: token
      });
    });
  },
  googleLogin: function googleLogin(req, res) {
    var token, googleUser;
    return regeneratorRuntime.async(function googleLogin$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            token = req.params.idToken;
            _context2.next = 3;
            return regeneratorRuntime.awrap(jwt.verify(token)["catch"](function (e) {
              return res.status(500).json({
                ok: false.e
              });
            }));

          case 3:
            googleUser = _context2.sent;
            User.findOne({
              email: googleUser.email
            }, function (err, userDB) {
              if (err) res.status(500).json({
                ok: false,
                err: err
              });

              if (userDB) {
                if (googleUser == false) {
                  return res.status(400).json({
                    ok: false,
                    err: {
                      message: "Debe ser autenticado de forma normal"
                    }
                  });
                } else {
                  var _token = jwt.sign({
                    user: userDB
                  }, process.env.SECRET, {
                    expiresIn: process.env.LIMIT_TOKEN
                  });
                }

                res.json({
                  ok: true,
                  user: userDB,
                  token: token
                });
              } else {
                var user = new User();
                user.name = googleUser.name;
                user.email = googleUser.email;
                user.password = ':)';
                user.img = googleUser.picture;
                user.google = true;
                user.save(function (err, userDB) {
                  if (err) return res.status(500).json({
                    ok: false,
                    err: err
                  });
                  var token = jwt.sign({
                    user: userDB
                  }, process.env.SECRET, {
                    expiresIn: process.env.LIMIT_TOKEN
                  });
                  res.json({
                    ok: true,
                    user: userDB,
                    token: token
                  });
                });
              }
            });

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  logOutUser: function logOutUser(req, res) {}
};
module.exports = controllers;