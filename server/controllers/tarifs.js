const Tarifs = require('../models').Tarifs;

const path = require('path');
const fs = require("fs");
const Papa = require('papaparse');
const Op = require('sequelize').Op;

module.exports = {
    upload(req, res) {
        if (!req.files)
            return res.status(400).send('No files were uploaded.');

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        let file = req.files.file;
        // const c = fs.readFileSync('sample.csv');
        file.mv(path.join('./temp', file.name), function (err) {
            if (err)
                return res.status(500).send(err);

            const csv = fs.readFileSync(path.join('./temp', file.name), 'utf8');
            return Papa.parse(csv, {
                header: true,
                skipEmptyLines: true,
                complete: function (results) {
                    fs.unlink(path.join('./temp', file.name));
                    const fields = results.meta.fields;
                    if (fields.includes('code') && fields.includes('destination') && fields.includes('rate')) {
                        const csv_tarifs = results.data;
                        Tarifs.destroy({
                            where: {},
                            truncate: true
                        })
                            .then(() =>
                                Tarifs.bulkCreate(csv_tarifs)
                                    .then(() =>
                                        Tarifs.count()
                                            .then(rows => res.status(201).send({total: rows}))
                                            .catch(error => res.status(500).send(error))
                                    )
                                    .catch(error => res.status(500).send(error))
                            )
                            .catch(error => res.status(500).send(error));
                    } else {
                        res.status(400).send({message: 'Invalid file'});
                    }
                }
            });
        });
    },
    list(req, res) {
        const limit = 100;   // number of records per page
        // req.params.search
        return Tarifs
            .findAll({
                where: {
                    [Op.or]: [
                        {
                            code: {
                                [Op.like]: '%' + (req.params.search || "") + "%"
                            }
                        },
                        {
                            destination: {
                                [Op.like]: '%' + (req.params.search || "") + "%"
                            }
                        }
                    ]
                },
                limit: limit
            })
            .then(tarifs => {
                return res.status(200).send({
                    data: tarifs
                })
            })
            .catch(error => res.status(400).send(error));
    },
};
