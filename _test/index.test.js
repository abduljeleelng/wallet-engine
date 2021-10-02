const chai = require('chai');
const request = require('supertest');
const app = require('../src');
const { expect } = chai;
const base = '/'

describe('Testing Base Endpoint', async () => {
  it('Endpoint Base', async () => {
    const {status } = await request(app).get(`${base}`);
    expect(status).to.equal(200);
  });

  it('version one endpoint', async () => {
    const { body, status } = await request(app).get(`${base}/api/v1`);
    expect(status).to.equal(200);
  });
});