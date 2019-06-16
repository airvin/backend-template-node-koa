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

describe("GET at /register", () => {
    it("should return 200", async () => {
        const response = await axios.get(`${URL}/register`)
        expect(response.status).to.be.equal(200)
    })
})

describe("POST at /register", () => {
    it("should return 200 when unique email used", async () => {
        const response = await axios.post(`${URL}/register`, {
            "firstname": "John",
            "lastname": "Smith",
            "email": "john9@example.com",
            "hash": "fdafdafda"
        })
        expect(response.status).to.be.equal(200)
    })

    describe("GET at /login", () => {
        it("should return 200", async () => {
            const response = await axios.get(`${URL}/login`)
            expect(response.status).to.be.equal(200)
        })
    })

    describe("POST at /login", () => {
        it("should return 200 with correct username and password", async () => {
            try {
                const response = await axios.post(`${URL}/login`, {
                    "email": "john@example.com",
                    "hash": "fdafdafda"
                })
                expect(response.status).to.be.equal(200)
            } catch (err) {
                expect(err).to.be.equal(false)
            }
        })
    })

    describe("POST at /login", () => {
        it("should return 200 with correct username and password", async () => {
            try {
                const response = await axios.post(`${URL}/login`, {
                    "email": "john@example.com",
                    "hash": "wrong password"
                })
                expect(response.status).to.be.equal("Should have thrown error")
            } catch (err) {
                expect(err.response.status).to.be.equal(401)
            }
        })
    })

    describe("GET at /confidential", () => {
        it("should return 401 when not logged in", async () => {
            try {
                const response = await axios.get(`${URL}/confidential`)
                expect(response.status).to.be.equal("Should have thrown error")
            } catch (err) {
                expect(err.response.status).to.be.equal(401)
            }
        })
    })

    describe("POST at /confidential", () => {
        it("should return 401 when not logged in", async () => {
            try {
                const response = await axios.post(`${URL}/confidential`, {})
                expect(response.status).to.be.equal("Should have thrown error")
            } catch (err) {
                expect(err.response.status).to.be.equal(401)
            }
        })
    })
})