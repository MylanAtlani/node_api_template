const request = require('supertest')
const {server, mongoose} = require('../index')
const AdminUserServices = require('../services/admin_users.services')
const RoleServices = require('../services/roles.services')
let token,refresh_token, email, password, id;

beforeAll(async ()=> {
  // THIS IS HOW YOU CLOSE CONNECTION IN MONGOOSE (mongodb ORM)
  email = "test@test.fr";
  password = "Testtest1450?!";
  let user = await AdminUserServices.getAdminUser({email:email})
  if (!user) {
    let role = await RoleServices.getRole({name: "Master"})
    await AdminUserServices.createAdminUser({email, password, role_id: role._id, phone: "0658068199"});
  }
});

describe('Admin Users Init', () => {
  it('Login', async () => {
    const res = await request(server).post('/admin_users/login')
    .send({email,password})
    expect(res.statusCode).toEqual(200)
    token = res.body.data.token;
    refresh_token = res.body.data.refresh_token;
    id = res.body.data._id
  })
})

describe('Users Routes test', () => {
  it('Get all users', async () => {
    const res = await request(server).get('/admin_users').set({'authorization':token})
    expect(res.statusCode).toEqual(200)
  })

  it('Update user', async () => {
    const res = await request(server).put('/admin_users').set({'authorization':token}).send({id,firstname: "Jest"})
    expect(res.statusCode).toEqual(200)
  })

  it('Get me and check update', async () => {
    const res = await request(server).get('/admin_users/me').set({'authorization':token})
    console.log(res.body.data)
    expect(res.body.data.firstname).toEqual("Jest")
    expect(res.statusCode).toEqual(200)
  })

  it('Delete user', async () => {
    const res = await request(server).delete('/admin_users').set({'authorization':token}).send({id})
    expect(res.statusCode).toEqual(200)
  })
})

afterAll(async ()=> {
  // THIS IS HOW YOU CLOSE CONNECTION IN MONGOOSE (mongodb ORM)
  await mongoose.connection.close();
  await server.close();
});