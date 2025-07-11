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
const { 
    find_mocks, 
    find_mock_by_id, 
    create_mock, 
    update_mock, 
    remove_mock 
} = require('../controllers')
const package_info = require('../package.json');
const { Router } = require('express')
const { check } = require('express-validator')
const { validateFields } = require('../middlewares')

const mock_routes = Router()

// · Info endpoint
mock_routes.get('', (request, response) => {
    response.json({
        status: 'ok',
        name: package_info.name,
        version: package_info.version,
        description: package_info.description,
        keywords: package_info.keywords
    })
})

// · Mock endpoints
mock_routes.get('/configure-mock', find_mocks)
mock_routes.get('/configure-mock/:id', 
    [
        check('id', 'id is required').not().isEmpty(),
        check('id', 'id must be a valid ObjectId').isMongoId(),
        validateFields
    ],
    find_mock_by_id
)
mock_routes.post('/configure-mock', 
    [
        check('resource', 'resource is required').not().isEmpty(),
        check('version', 'version is required').not().isEmpty(),
        check('method', 'method is required').not().isEmpty(),
        check('method', 'method must be a valid HTTP method').isIn(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']),
        check('query_params', 'query_params must be an array').optional().isArray(),
        check('body_params', 'body_params must be an array').optional().isArray(),
        check('content_type', 'content_type is required').not().isEmpty(),
        check('content_type', 'content_type must be a valid content type').isIn(['application/json', 'application/xml', 'text/plain']),
        check('headers', 'headers must be an array').optional().isArray(),
        validateFields
    ],
    create_mock
)
mock_routes.put('/configure-mock/:id',
    [
        check('id', 'id is required').not().isEmpty(),
        check('id', 'id must be a valid ObjectId').isMongoId(),
        validateFields
    ],
    update_mock
)
mock_routes.patch('/configure-mock/:id', 
    [
        check('id', 'id is required').not().isEmpty(),
        check('id', 'id must be a valid ObjectId').isMongoId(),
        validateFields
    ],
    update_mock
)
mock_routes.delete('/configure-mock/:id', 
    [
        check('id', 'id is required').not().isEmpty(),
        check('id', 'id must be a valid ObjectId').isMongoId(),
        validateFields
    ],
    remove_mock
)

module.exports = {
    mock_routes
}