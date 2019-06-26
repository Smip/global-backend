'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Tarifs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            code: {
                type: Sequelize.INTEGER
            },
            destination: {
                type: Sequelize.STRING
            },
            rate: {
                type: Sequelize.DECIMAL(9, 2)
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
            .then(() => queryInterface.addIndex('Tarifs', ['code']))
            .then(() => queryInterface.addIndex('Tarifs', ['destination']));
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Tarifs');
    }
};
