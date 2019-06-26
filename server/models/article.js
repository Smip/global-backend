'use strict';
module.exports = (sequelize, DataTypes) => {
    const article = sequelize.define('article', {
        slug: {
            type: DataTypes.STRING,
            unique: true
        },
        category: {
            type: DataTypes.STRING
        }
    }, {});
    article.associate = function (models) {
        // associations can be defined here
        article.hasMany(models.article_content, {
            foreignKey: 'article_content_id',
            as: 'contents',
        });
    };
    return article;
};
