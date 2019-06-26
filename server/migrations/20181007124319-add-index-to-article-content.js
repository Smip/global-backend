'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addIndex("article_contents", {
            unique: true,
            fields: ['lang', 'article_content_id']
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeIndex("article_contents", "article_contents_lang_article_content_id");
    }
};
