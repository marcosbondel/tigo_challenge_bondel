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

const chai = require('chai');
const expect = require('chai').expect;
const chai_http = require('chai-http');
const { faker } = require('@faker-js/faker');

// · Assign http plugin to Chain Framework
chai.use(chai_http);

// · Import app
const { app } = require('../config/app')


// · 
exports.app = app
exports.expect = expect
exports.request = chai.request
exports.faker = faker
exports.result = { response: undefined }

exports.expect_response_with_successful = () => {
    it('is expected to respond with a success status code (2xx)', function() {
        expect(this.response).to.have.status(200)
    })

    it('is expected to respond with application/json', function () {
        expect(this.response).to.have.header('content-type', 'application/json; charset=utf-8')
    })

} 