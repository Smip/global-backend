'use strict';
module.exports = (sequelize, DataTypes) => {
    const article_content = sequelize.define('article_content', {
        title: {
            type: DataTypes.STRING
        },
        body: {
            type: DataTypes.TEXT
        },
        lang: {
            type: DataTypes.STRING
        }
    }, {
        indexes: [
            {
                unique: true,
                fields: ['lang', 'article_content_id']
            }
        ]
    });
    article_content.associate = function (models) {
        // associations can be defined here
        article_content.belongsTo(models.article, {
            foreignKey: 'article_content_id',
            onDelete: 'CASCADE',
        });
    };
    return article_content;
};
