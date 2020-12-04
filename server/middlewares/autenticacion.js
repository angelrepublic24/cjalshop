const jwt = require('jsonwebtoken');

let verifyToken = (req, res, next)=>{
    let token = req.get('token')

    jwt.verify(token, process.env.SECRET, (err, decoded)=>{
        if(err) {
            return res.status(401).json({
            ok: false,
            err: {
                message: 'Token no valido'
                }
            })
        };
        req.user = decoded.user
        next()
    })
}

let verifyAdminRole = (req, res, next)=>{
    let user = req.user

    if(user.role === 'ADMIN_ROLE'){
        next();
        return
    }else{
        res.json({
            ok: false,
            message: 'El usuario no es administrador'
        })
    }
}

module.exports = {
    verifyToken,
    verifyAdminRole
}