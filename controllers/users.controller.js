const Users = require("../models/users.model.js");
var path = require('path');
// Create and Save a new User

exports.create = (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]  

    if(token != "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611")
    {
        res.status(400).send({
            message: "UnAuthorized Access!"
          });
          return;
    }

    // Create a User
    const user = new Users({
        fullname : req.body.fullname,
        email : req.body.email,
        dateofbirth : req.body.dateofbirth,
        type : req.body.type,
        country : req.body.country,
        phone : req.body.phone,
        password : req.body.password,
        certificate : req.body.certificate,
        picture : req.body.picture,
        degree : req.body.degree,
        specialization_id : req.body.specialization_id,
        governorate_id : req.body.governorate_id,
        wilayat_id : req.body.wilayat_id,
        id_card : req.body.id_card,
        about : req.body.about,
        membership : 0,
        is_active : 1,
        created_by : req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        is_trash : 0
    });
    // Save User in the database
    Users.create(user, (err, data) => {
      if (err)
        res.status(200).send({
          code:err.code,
        });
      else res.send(data);
    });
  };

  //Look for user via email and login the user
  exports.loginUser  = (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]  

    if(token != "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611")
    {
        res.status(400).send({
            message: "UnAuthorized Access!"
          });
          return;
    }
    Users.authenticateUser(req.body.email, req.body.password, (err, data) => {
      if (err)
        res.status(200).send({
          code:err.code,
        });
      else res.send({
        response: data
      });
    });
  }
  //resend confirmation email back to user
  exports.resendConfirmaton = (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]  

    if(token != "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611")
    {
        res.status(400).send({
            message: "UnAuthorized Access!"
          });
          return;
    }
    Users.resendCode(req.body.email, (err, data) => {
      if (err)
        res.status(200).send({
          code:err.code,
        });
      else res.send({
        response: data
      });
    });
  }
  exports.confirmAccount = (req, res) => {

    Users.confirmCode(req.params.code, (err, data) => {
      if (err)
      {
        res.sendFile(path.join(__dirname, '../www', 'error.html'));
      }
      else {
        if(data.results === "confirmed")
        {
          res.sendFile(path.join(__dirname, '../www', 'confirmed.html'));
        }else if(data.results === "exist")
        {
          res.sendFile(path.join(__dirname, '../www', 'exist.html'));
        }else if (data === false)
        {
          res.sendFile(path.join(__dirname, '../www', 'code.html'));
        }
      }
    });
  }
  exports.getUserByEmail = (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]  

    if(token != "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611")
    {
        res.status(400).send({
            message: "UnAuthorized Access!"
          });
          return;
    }
    Users.getUserEmail(req.params.email, (err, data) => {
      if (err)
        res.status(200).send({
          code:err.code,
        });
      else res.send({
        response: data
      });
    });
  } 