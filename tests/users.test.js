const request = require('supertest')
const {server, mongoose} = require('../index')
const UserServices = require('../services/users.services')
let token,refresh_token, email, password, id;

beforeAll(async ()=> {
  // THIS IS HOW YOU CLOSE CONNECTION IN MONGOOSE (mongodb ORM)
  email = "test@test.fr";
  password = "Testtest1450?!";
  let user = await UserServices.getUser({email:email})
  if (!user)
    await UserServices.createUser({email,password});
});

describe('Users Init', () => {
  it('Login', async () => {
    const res = await request(server).post('/users/login')
    .send({email,password})
    token = res.body.data.token;
    refresh_token = res.body.data.refresh_token;
    id = res.body.data._id
    expect(res.statusCode).toEqual(200)
  })
})

describe('Users Routes test', () => {
  it('Get all users', async () => {
    const res = await request(server).get('/users').set({'authorization':token})
    expect(res.statusCode).toEqual(200)
  })

  it('Update user', async () => {
    const res = await request(server).put('/users').set({'authorization':token}).send({id,firstname: "Jest"})
    expect(res.statusCode).toEqual(200)
  })

  it('Get me and check update', async () => {
    const res = await request(server).get('/users/me').set({'authorization':token})
    expect(res.body.data.firstname).toEqual("Jest")
    expect(res.statusCode).toEqual(200)
  })

  it('Delete user', async () => {
    const res = await request(server).delete('/users').set({'authorization':token}).send({id})
    expect(res.statusCode).toEqual(200)
  })
})

afterAll(async ()=> {
  // THIS IS HOW YOU CLOSE CONNECTION IN MONGOOSE (mongodb ORM)
  await mongoose.connection.close();
  await server.close();
});