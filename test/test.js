import { expect } from 'chai'
import axios from 'axios'

const URL = "http://localhost:3000"
axios.defaults.headers.post['Content-Type'] = 'application/json';


describe("GET at /", () => {
    it("should return 200", async () => {
        const response = await axios.get(`${URL}/`)
        expect(response.status).to.be.equal(200)
    })
})

describe("GET at /login", () => {
    it("should return 200", async () => {
        const response = await axios.get(`${URL}/login`)
        expect(response.status).to.be.equal(200)
    })
})

describe("POST at /login", () => {
    it("should return 200 with correct username and password", async () => {
        const response = await axios.post(`${URL}/login`, {
            "username": "user",
            "password": "pwd"
        },
        )
        expect(response.status).to.be.equal(200)
    })
})