'use strict'
const {db, models: {User, Product} } = require('../server/db')
const clothingData = require('../clothing-data.json');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'jiefei', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ])

  // const productsDummyData = [
  //   Product.create({name: 'clothing1', bubble: 300, style: 'traditional', imageUrl: clothing1}),
  //   Product.create({name: 'clothing2', bubble: Math.floor(Math.random() * 1000), style: 'traditional', imageUrl: "clothing2.jpg"}),
  //   Product.create({name: 'clothing3', bubble: Math.floor(Math.random() * 1000), style: 'traditional', imageUrl: "clothing3.jpg"}),
  //   Product.create({name: 'clothing4', bubble: Math.floor(Math.random() * 1000), style: 'traditional', imageUrl: "clothing4.jpg"}),
  //   Product.create({name: 'clothing5', bubble: Math.floor(Math.random() * 1000), style: 'traditional', imageUrl: "clothing5.jpg"}),
  //   Product.create({name: 'clothing6', bubble: Math.floor(Math.random() * 1000), style: 'traditional', imageUrl: "clothing6.jpg"}),
  //   Product.create({name: 'clothing7', bubble: Math.floor(Math.random() * 1000), style: 'traditional', imageUrl: "clothing7.jpg"}),
  //   Product.create({name: 'clothing8', bubble: Math.floor(Math.random() * 1000), style: 'traditional', imageUrl: "clothing8.jpg"}),
  //   Product.create({name: 'clothing9', bubble: Math.floor(Math.random() * 1000), style: 'traditional', imageUrl: "clothing9.jpg"}),
  //   Product.create({name: 'clothing10', bubble: Math.floor(Math.random() * 1000), style: 'traditional', imageUrl: "clothing10.jpg"}),
  //   Product.create({name: 'clothing11', bubble: Math.floor(Math.random() * 1000), style: 'traditional', imageUrl: "clothing11.jpg"}),
  //   Product.create({name: 'clothing12', bubble: Math.floor(Math.random() * 1000), style: 'traditional', imageUrl: "clothing12.jpg"}),
  //   Product.create({name: 'clothing13', bubble: Math.floor(Math.random() * 1000), style: 'traditional', imageUrl: "clothing13.jpg"}),
  //   Product.create({name: 'clothing14', bubble: Math.floor(Math.random() * 1000), style: 'traditional', imageUrl: "clothing14.jpg"}),
  //   Product.create({name: 'clothing15', bubble: Math.floor(Math.random() * 1000), style: 'traditional', imageUrl: "clothing15.jpg"}),
  //   Product.create({name: 'clothing16', bubble: Math.floor(Math.random() * 1000), style: 'traditional', imageUrl: "clothing16.jpg"}),
  //   Product.create({name: 'clothing17', bubble: Math.floor(Math.random() * 1000), style: 'traditional', imageUrl: "clothing17.jpg"}),
  //   Product.create({name: 'clothing18', bubble: Math.floor(Math.random() * 1000), style: 'traditional', imageUrl: "clothing18.jpg"}),
  //   Product.create({name: 'clothing19', bubble: Math.floor(Math.random() * 1000), style: 'traditional', imageUrl: "clothing19.jpg"}),
  // ]

  const products = await Promise.all(clothingData.map(clothing => Product.create(clothing)))

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
