'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addConstraint('Users', ['userName'], {
            type: 'unique',
            name: 'userName_unique'
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeConstraint('Users', 'userName_unique');
    }
};
