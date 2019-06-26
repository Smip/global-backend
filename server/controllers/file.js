const moment = require('moment');

const path = require('path');
const uuidv4 = require('uuid/v4');

const request = require("request");
const fs = require("fs");
const mime = require('mime-types')

module.exports = {
    upload(req, res) {
        if (!req.files)
            return res.status(400).send('No files were uploaded.');

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        let file = req.files.file;

        const ext = path.extname(file.name).toLowerCase();
        const newName = uuidv4() + ext;

        // Use the mv() method to place the file somewhere on your server
        file.mv(path.join('./user-files', newName), function (err) {
            if (err)
                return res.status(500).send(err);

            res.status(201).send({path: '/api/user-files/' + newName});
        });
    },
    getByLink(req, res) {
        if (!req.body.file)
            return res.status(400).send('No files were uploaded.');
        const tempName = uuidv4();
        request
            .get(req.body.file)
            .on('error', function (err) {
                console.log('err', err);
                fs.unlink(path.join('./temp', tempName));

                return res.status(500).send({message: err});
            })
            .on('response', function (response) {
                if (!~[200, 304].indexOf(res.statusCode)) {
                    fs.unlink(path.join('./temp', tempName));
                    return res.status(400).send('Received an invalid status code.');
                } else {
                    const ext = mime.extension(response.headers['content-type']);
                    const newName = tempName + "." + ext;
                    fs.rename(path.join('./temp', tempName), path.join('./user-files', newName), (err) => {
                        if (err) throw err;
                        fs.stat(path.join('./user-files', newName), (err, stats) => {
                            if (err) throw err;
                            res.status(201).send({path: '/api/user-files/' + newName});
                        });
                    });
                }
            })
            .pipe(fs.createWriteStream(path.join('./temp', tempName)));
    }
};
