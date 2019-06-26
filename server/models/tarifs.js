'use strict';
module.exports = (sequelize, DataTypes) => {
    const Tarifs = sequelize.define('Tarifs', {
        code: {
            type: DataTypes.INTEGER,
        },
        destination: {
            type: DataTypes.STRING,
        },
        rate: {
            type: DataTypes.DECIMAL(9, 2)
        }
    }, {
        indexes: [
            {
                fields: ['code']
            },
            {
                fields: ['destination']
            },
        ]
    });
    Tarifs.associate = function (models) {
        // associations can be defined here
    };
    return Tarifs;
};
