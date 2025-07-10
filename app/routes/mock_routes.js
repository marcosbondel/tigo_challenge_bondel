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

// · Imports
const package_info = require('../../package.json');
const { Router } = require('express')
const { 
    find_mocks, 
    find_mock_by_id, 
    create_mock, 
    update_mock, 
    remove_mock 
} = require('../controllers')

const mock_routes = Router()

// · Info endpoint
mock_routes.get('', (request, response) => {
    response.json({
        status: 'ok',
        name: package_info.name,
        version: package_info.version,
        description: package_info.description,
    })
})

// · Mock endpoints
mock_routes.get('/configure-mock', find_mocks)
mock_routes.get('/configure-mock/:id', find_mock_by_id)
mock_routes.post('/configure-mock', create_mock)
mock_routes.put('/configure-mock/:id', update_mock)
mock_routes.patch('/configure-mock/:id', update_mock)
mock_routes.delete('/configure-mock/:id', remove_mock)

module.exports = {
    mock_routes
}