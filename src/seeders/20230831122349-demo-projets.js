'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Projets', [{
      name: 'New Song JKT 48',
      start: '2023-04-03',
      end: '2023-04-03',
      description: 'Lagu terbaru JKT 48 dengan judul Ponytail and Shu Shu, yang dicenter rin oleh 2 member Gen-7 yaitu Zee dan Christy',
      technologies:["js", "boostrap", "golang", "react"],
      image: 'jkt48.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Projets', null, {})
  }
};
