const supertest = require('supertest')
const { test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const app = require('../app')
const userInDb = require('./test_helper')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

test('invalid user is not added', async () => {
  const user = {
    username: 'ultrauttu',
    name: 'arya',
    password: 'arya@458',
  }

  const userAtStart = await userInDb

  await api.post('/api/users').send(user).expect(400)

  const userAtEnd = await userInDb
  assert.strictEqual(userAtStart.length, userAtEnd.length)
})

after(async () => {
  await mongoose.connection.close()
})
