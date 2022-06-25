const Session = require("../models/session.model.js");

var path = require('path');

exports.getSessionById = (req, res) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]  

  if(token != "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611")
  {
      res.status(400).send({
          message: "UnAuthorized Access!"
        });
        return;
  }
  Session.fetchSessionById(req.params.id,(err, data) => {
    if (err)
      res.status(200).send({
        code:err.code,
      });
    else res.send({
      response: data
    });
  });
}

exports.getPaidStatus = (req, res) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]  

  if(token != "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611")
  {
      res.status(400).send({
          message: "UnAuthorized Access!"
        });
        return;
  }
  Session.fetchSessionOrderByUser(req.params.id,req.params.user,(err, data) => {
    if (err)
      res.status(200).send({
        code:err.code,
      });
    else res.send({
      response: data
    });
  });
}