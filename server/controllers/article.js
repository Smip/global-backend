const Article = require('../models').article;
const Article_content = require('../models').article_content;
const Op = require('sequelize').Op;
const sequelize = require('sequelize');

const slugify = require('slugify');
const moment = require('moment');

module.exports = {
    create(req, res) {
        return Article
            .create({
                slug: slugify(req.body.title) + "-" + moment().unix(),
                category: req.params.category || ""
            })
            .then(article => res.status(201).send(article))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        let limit = 10;   // number of records per page
        let page = req.params.page || 1;      // page number
        let offset = limit * (page - 1);
        return Article
            .findAndCountAll({
                where: {
                    category: req.params.category || "",
                },
                include: [
                    {
                        model: Article_content,
                        as: 'contents',
                    },
                ],
                offset: offset,
                limit: limit,
                distinct: true,
                order: [
                    ['createdAt', 'DESC']
                ]
            })
            .then(article => {
                return res.status(200).send({
                    data: article.rows,
                    total: article.count
                })
            })
            .catch(error => res.status(400).send(error));
    },
    retrieve(req, res) {
        return Article
            .findOne({
                where: {
                    slug: req.params.slug
                },
                include: [
                    {
                        model: Article_content,
                        as: 'contents',
                        required: false
                    },
                ],
                order: [
                    [sequelize.fn('FIELD', sequelize.col('contents.lang'), req.params.lang, 'uk', 'ru', 'en'), 'ASC']
                ],
            })
            .then(article => {
                if (!article) {
                    return res.status(404).send({
                        message: 'Not Found',
                    });
                }
                return res.status(200).send(article);
            })
            .catch(error => res.status(400).send(error));
    },
    destroy(req, res) {
        return Article
            .findOne({
                where: {
                    slug: req.params.slug
                }
            })
            .then(article => {
                if (!article) {
                    return res.status(404).send({
                        message: 'Not Found',
                    });
                }

                return article
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
};
