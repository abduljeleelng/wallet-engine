const chai = require('chai');
const request = require('supertest');
const app = require('../src');
const { expect } = chai;
const base = '/api/v1/user'

describe('User Authentication services endpoint', async () => {
  it('Signup', async ()=> {
    const {status, body } = await request(app).post(`${base}/auth/signup`).send({
      "email":"abduljeleelng@gmail.com",
      "password":"123456",
      "phone":"08037358707"
    });
    // console.log({status, body})
    expect(status).to.equal(200);
  }).timeout(10000);

  it('Activate', async () => {
    const { body, status } = await request(app).get(`${base}/auth/activate`).send({
      "token": "327",
    });
    // console.log({status, body})
    expect(status).to.equal(200);
  });

  it('SignIn', async () => {
    const { body, status } = await request(app).get(`${base}/auth/signin`).send({
        "password":"123456",
        "login":"08037358707"
    });
    // console.log({status, body})
    expect(status).to.equal(200);
  });

  it('Forget Password', async () => {
    const { body, status } = await request(app).get(`${base}/auth/forgetPassword`).send({
        "login":"08037358707"
    });
    // console.log({status, body})
    expect(status).to.equal(200);
  });

  it('Reset Password', async () => {
    const { body, status } = await request(app).get(`${base}/auth/resetPassword`).send({
        "password":"123456",
        "token": "327",
    });
    // console.log({status, body})
    expect(status).to.equal(200);
  });
});