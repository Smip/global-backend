const Article_content = require('../models').article_content;
const Article = require('../models').article;

module.exports = {
    create(req, res) {
        return Article
            .findOne({where: {slug: req.params.slug}})
            .then(article => {
                if (!article) {
                    return res.status(404).send({
                        message: 'Not Found',
                    });
                }
                return article;
            })
            .then(article => {
                return Article_content.create({
                    article_content_id: article.id,
                    title: req.body.title,
                    body: req.body.body,
                    lang: req.body.lang || 'ru'
                });
            })
            .then(article_content => res.status(201).send(article_content))
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return Article_content
            .findById(req.params.id)
            .then(article_content => {
                if (!article_content) {
                    return res.status(404).send({
                        message: 'Not Found',
                    });
                }
                return article_content.update(req.body, {fields: Object.keys(req.body)});
            })
            .then(article_content => res.status(200).send(article_content))
            .catch(error => res.status(400).send(error));
    }
};
