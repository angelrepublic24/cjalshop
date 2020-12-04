"use strict";

var jwt = require('jsonwebtoken');

var verifyToken = function verifyToken(req, res, next) {
  var token = req.get('token');
  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) {
      return res.status(401).json({
        ok: false
      });
    }

    req.user = decoded.user;
    next();
  });
};

var verifyAdminRole = function verifyAdminRole(req, res, next) {
  var user = req.user;

  if (user.role === 'ADMIN_ROLE') {
    next();
    return;
  } else {
    res.json({
      ok: false,
      message: 'El usuario no es administrador'
    });
  }
};

module.exports = {
  verifyToken: verifyToken,
  verifyAdminRole: verifyAdminRole
};