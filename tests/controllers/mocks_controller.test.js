'use strict'
/*
MIT License

Copyright (c) 2025 Marcos Bonifasi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

· ~·~     ~·~     ~·~     ~·~     ~·~     ~·~     ~·~     ~·~     ~·~     ~·~     ~·~     ~·~
·
*/

// · 
const { app, expect, request, expect_response_with_successful } = require("../helper")
const package_info = require('../../package.json');

// Tests for the root endpoint
describe("GET:/", function () {

    beforeEach(async function(){
        this.response = await request(app).get("/")
    })

    expect_response_with_successful(this.response)

    it('is expected to respond with status "ok"', function(){
        expect(this.response.body).to.have.property("status")
        expect(this.response.body.status).to.equal("ok")
    })

    it('is expected to respond with app name "tigo_challenge_bondel"', function(){
        expect(this.response.body).to.have.property("name")
        expect(this.response.body.name).to.equal(package_info.name)
    })
    
    it('is expected to respond with the latest version of the app', function(){
        expect(this.response.body).to.have.property("version")
        expect(this.response.body.version).to.equal(package_info.version)
    })
    
    it('is expected to match with the right app description', function(){
        expect(this.response.body).to.have.property("description")
        expect(this.response.body.description).to.equal(package_info.description)
    })
    
    it('is expected to match with the keywords', function(){
        expect(this.response.body).to.have.property("keywords")
        expect(this.response.body.keywords).to.deep.equal(package_info.keywords)
    })
    
})