const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookie = require('js-cookie').noConflict

// const { OAuth2Client } = require('google-auth-library');
// const client = new OAuth2Client(process.env.CLIENT_ID);

const User = require('../models/user');

const app = express();



// async function verify(token) {
//     const ticket = await client.verifyIdToken({
//         idToken: token,
//         audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
//         // Or, if multiple clients access the backend:
//         //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
//     });
//     const payload = ticket.getPayload();
//     return {
//         name: payload.name,
//         email: payload.email,
//         img: payload.picture,
//         google: true
//     }
// }
var controllers = {


    loginUser: function(req, res){
        var body = req.body

        User.findOne({email: body.email}, (err, userDB)=>{
            if (err) return res.status(400).json({
                ok: false,
                err
            })
    
            if (!userDB) return res.status(404).json({
                ok: false,
                err: {
                    message: '(Email) o contraseña incorrectos'
                }
            })
            
            if(!bcrypt.compareSync(body.password, userDB.password)){
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: 'Email o (contraseña) incorrectos'
                    }
                })
            }

            let token = jwt.sign({
                user: userDB
            }, process.env.SECRET, {expiresIn: process.env.LIMIT_TOKEN})
            res.json({
                ok: true,
                user: userDB,
                token
            })
                .render()

        })
    }
   

    // googleLogin: async function(req, res){
    //     let token = req.params.idToken

    //     let googleUser = await jwt.verify(token)
    //                 .catch(e =>{
    //                     return res.status(500).json({
    //                         ok: false.
    //                         e
    //                     })
    //                 })
    //     User.findOne({email: googleUser.email}, (err, userDB)=>{
    //         if(err) res.status(500).json({
    //             ok: false,
    //             err
    //         })  
    //         if(userDB){
    //             if(googleUser == false){
    //                 return res.status(400).json({
    //                     ok: false,
    //                     err: {
    //                         message: "Debe ser autenticado de forma normal"
    //                     }
    //                 })
    //             }else{
    //                 let token = jwt.sign({
    //                     user: userDB
    //                 }, process.env.SECRET, {expiresIn: process.env.LIMIT_TOKEN})
    //             }

    //             res.json({
    //                 ok: true,
    //                 user: userDB,
    //                 token
    //             })
    //         }else{
    //             var user = new User();
    //             user.name = googleUser.name;
    //             user.email = googleUser.email;
    //             user.password = ':)';
    //             user.img = googleUser.picture;
    //             user.google = true;

    //             user.save((err, userDB)=>{
    //                 if(err) return res.status(500).json({
    //                     ok: false,
    //                     err
    //                 })
    //                 let token = jwt.sign({
    //                     user: userDB
    //                 }, process.env.SECRET, {expiresIn: process.env.LIMIT_TOKEN})
    //                 res.json({
    //                     ok:true,
    //                     user: userDB,
    //                     token
    //                 })
    //             })
    //         }
    //     })
    // },
    // // logOutUser: function(req, res){
        
    // // }

}
    



module. exports = controllers