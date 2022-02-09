const express = require("express");
const app = express();
const bodyParser = require('body-parser');
var multer  = require('multer')();
const FormData = require('form-data');
const axios = require('axios');
const fs = require('fs');

app.use(bodyParser.json());

app.post('/fileUpload' , multer.single('fileFieldName'), (req , res) => {
    const fileRecievedFromClient = req.file; //File Object sent in 'fileFieldName' field in multipart/form-data
    console.log(req.file)

    let form = new FormData();
    form.append('fileFieldName', fileRecievedFromClient.buffer, fileRecievedFromClient.originalname);

    axios.post('http://localhost:3000/fileUpload', form, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${form._boundary}`
            }
        }).then((responseFromServer2) => {
            res.send("SUCCESS")
        }).catch((err) => {
            res.send("ERROR", error)
        })
})

const server = app.listen(4000, function () {
    console.log('Server listening on port 3000');
});