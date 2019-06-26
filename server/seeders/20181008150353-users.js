'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
    up: (queryInterface, Sequelize) => {
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.
        */
        return queryInterface.bulkInsert('Users', [{
            firstName: "Admin",
            lastName: "",
            userName: "admin",
            password: bcrypt.hashSync("globaladmin", 8)
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.
        */
        return queryInterface.bulkDelete('Users', null, {});

    }
};
