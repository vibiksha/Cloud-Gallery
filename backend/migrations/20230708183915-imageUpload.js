'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('imageUpload', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true, // Added auto-increment for the primary key
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'User', // Replace 'otherTable' with the actual table name
          key: 'id' // Replace 'uid' with the actual column name in 'otherTable'
        }
      },
      key: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('imageUpload');
  }
};
