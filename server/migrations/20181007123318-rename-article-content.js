'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.renameTable("article-contents", "article_contents");
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.renameTable("article_contents", "article-contents");
    }
};
