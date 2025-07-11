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
const { Router } = require('express')
const { 
    find_resources,
    find_resource,
    create_resource,
    update_resource,
    delete_resource,
} = require('../controllers')
const { check } = require('express-validator')

const resource_routes = Router()

// · Info endpoint
resource_routes.get('/:version/:resource', 
    [
        check('version', 'version is required').not().isEmpty(),
        check('resource', 'resource is required').not().isEmpty(),
    ],
    find_resources
)
resource_routes.get('/:version/:resource/:id', 
    [
        check('version', 'version is required').not().isEmpty(),
        check('resource', 'resource is required').not().isEmpty(),
        check('id', 'id is required').not().isEmpty(),
        check('id', 'id must be a valid ObjectId').isMongoId(),
    ],
    find_resource
)
resource_routes.post('/:version/:resource', 
    [
        check('version', 'version is required').not().isEmpty(),
        check('resource', 'resource is required').not().isEmpty(),
    ],
    create_resource
)
resource_routes.put('/:version/:resource/:id', 
    [
        check('version', 'version is required').not().isEmpty(),
        check('resource', 'resource is required').not().isEmpty(),
        check('id', 'id is required').not().isEmpty(),
        check('id', 'id must be a valid ObjectId').isMongoId(),
    ],
    update_resource
)
resource_routes.patch('/:version/:resource/:id', 
    [
        check('version', 'version is required').not().isEmpty(),
        check('resource', 'resource is required').not().isEmpty(),
        check('id', 'id is required').not().isEmpty(),
        check('id', 'id must be a valid ObjectId').isMongoId(),
    ],
    update_resource
)
resource_routes.delete('/:version/:resource/:id', 
    [
        check('version', 'version is required').not().isEmpty(),
        check('resource', 'resource is required').not().isEmpty(),
        check('id', 'id is required').not().isEmpty(),
        check('id', 'id must be a valid ObjectId').isMongoId(),
    ],
    delete_resource
)

module.exports = {
    resource_routes
}