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

const { 
    respond_with_success, 
    respond_with_error, 
    respond_with_internal_server_error,
    respond_with_not_found,
    logger,
    respond_with_unauthorized,
} = require('../system')
const { 
    find_document_by_params, 
    create_collection_document, 
    update_collection_document,
    list_collection_documents,
    delete_collection_document,
} = require('../config/database')
const { validate_jwt } = require('../utils')
const { arrays_equal_ignore_order } = require('../utils')
const { ObjectId } = require('mongodb')


const find_resources = async(request, response) => {
    let { version, resource } = request.params
    try {
        // First, we ensure the corresponding mock exists
        let mock = await find_document_by_params('mocks', { resource, version })
        if (!mock.success) {
            return respond_with_not_found(response, `Mock "${resource}"not found`)
        }
        
        if(mock.data?.headers?.includes('Authorization')) {
            // If the mock requires authentication, we check for the access token in the request headers
            let access_token = request.headers['authorization']?.split(' ')[1]
            if (!access_token) {
                return respond_with_unauthorized(response, 'Access token is required for this resource')
            }

            // Now, we verify the access token
            let validation = validate_jwt(`/api/${version}/${resource}`, request.method, access_token)
            
            if (!validation.success) {
                return respond_with_unauthorized(response, validation.message)
            }
        }

        let result = await list_collection_documents(resource)
        if (!result.success) {
            return respond_with_error(response, `Failed to list resources: ${result.message}`)
        }

        return respond_with_success(response, result.data)
    } catch (error) {
        console.log(error)
        
        logger.error(`Error creating resource: ${error.message}`)
        
        return respond_with_internal_server_error(response, 'An error occurred while processing your request', [error.message])
    }
}

const find_resource = async(request, response) => {
    let { version, resource, id } = request.params
    try {
        // First, we ensure the corresponding mock exists
        let mock = await find_document_by_params('mocks', { resource, version })
        if (!mock.success) {
            return respond_with_not_found(response, `Mock "${resource}"not found`)
        }

        if(mock.data?.headers?.includes('Authorization')) {
            // If the mock requires authentication, we check for the access token in the request headers
            let access_token = request.headers['authorization']?.split(' ')[1]
            if (!access_token) {
                return respond_with_unauthorized(response, 'Access token is required for this resource')
            }

            // Now, we verify the access token
            let validation = validate_jwt(`/api/${version}/${resource}`, request.method, access_token)
            
            if (!validation.success) {
                return respond_with_unauthorized(response, validation.message)
            }
        }
        
        let result = await find_document_by_params(resource, { _id: new ObjectId(id) })
        if (!result.success) {
            return respond_with_error(response, `Failed to find resource: ${result.message}`)
        }

        return respond_with_success(response, result.data)
    } catch (error) {
        console.log(error)
        
        logger.error(`Error creating resource: ${error.message}`)
        
        return respond_with_internal_server_error(response, 'An error occurred while processing your request', [error.message])
    }
}

const create_resource = async(request, response) => {
    let { version, resource } = request.params
    let body = request.body
    try {
        // First, we ensure the corresponding mock exists
        let mock = await find_document_by_params('mocks', { resource, version })
        if (!mock.success) {
            return respond_with_not_found(response, `Mock "${resource}"not found`)
        }
        
        if(mock.data?.headers?.includes('Authorization')) {
            // If the mock requires authentication, we check for the access token in the request headers
            let access_token = request.headers['authorization']?.split(' ')[1]
            if (!access_token) {
                return respond_with_unauthorized(response, 'Access token is required for this resource')
            }

            // Now, we verify the access token
            let validation = validate_jwt(`/api/${version}/${resource}`, request.method, access_token)
            
            if (!validation.success) {
                return respond_with_unauthorized(response, validation.message)
            }
        }

        if(!arrays_equal_ignore_order(mock.data.body_params, Object.keys(body))) {
            return respond_with_error(
                response, 
                `Body parameters do not match the mock definition. Expected: ${mock.data.body_params.join(', ')}, Received: ${Object.keys(body).join(', ')}`
            )
        }

        let result = await create_collection_document(resource, body)

        if (!result.success) {
            return respond_with_error(response, `Failed to create resource: ${result.message}`)
        }

        return respond_with_success(response, result.data)
    } catch (error) {
        console.log(error)
        
        logger.error(`Error creating resource: ${error.message}`)
        
        return respond_with_internal_server_error(response, 'An error occurred while processing your request', [error.message])
    }
}

const update_resource = async(request, response) => {
    let { version, resource, id } = request.params
    let body = request.body
    try {
        // First, we ensure the corresponding mock exists
        let mock = await find_document_by_params('mocks', { resource, version })
        if (!mock.success) {
            return respond_with_not_found(response, `Mock "${resource}"not found`)
        }

        if(mock.data?.headers?.includes('Authorization')) {
            // If the mock requires authentication, we check for the access token in the request headers
            let access_token = request.headers['authorization']?.split(' ')[1]
            if (!access_token) {
                return respond_with_unauthorized(response, 'Access token is required for this resource')
            }

            // Now, we verify the access token
            let validation = validate_jwt(`/api/${version}/${resource}`, request.method, access_token)
            
            if (!validation.success) {
                return respond_with_unauthorized(response, validation.message)
            }
        }

        if(!arrays_equal_ignore_order(mock.data.body_params, Object.keys(body))) {
            return respond_with_error(
                response, 
                `Body parameters do not match the mock definition. Expected: ${mock.data.body_params.join(', ')}, Received: ${Object.keys(body).join(', ')}`
            )
        }

        let result = await update_collection_document(resource, id, body)

        if (!result.success) {
            return respond_with_error(response, `Failed to update resource: ${result.message}`)
        }

        return respond_with_success(response, result.message)
    } catch (error) {
        console.log(error)
        
        logger.error(`Error updating resource: ${error.message}`)
        
        return respond_with_internal_server_error(response, 'An error occurred while processing your request', [error.message])
    }
}

const delete_resource = async(request, response) => {
    let { version, resource, id } = request.params
    try {
        // First, we ensure the corresponding mock exists
        let mock = await find_document_by_params('mocks', { resource, version })
        if (!mock.success) {
            return respond_with_not_found(response, `Mock "${resource}"not found`)
        }

        if(mock.data?.headers?.includes('Authorization')) {
            // If the mock requires authentication, we check for the access token in the request headers
            let access_token = request.headers['authorization']?.split(' ')[1]
            if (!access_token) {
                return respond_with_unauthorized(response, 'Access token is required for this resource')
            }

            // Now, we verify the access token
            let validation = validate_jwt(`/api/${version}/${resource}`, request.method, access_token)
            
            if (!validation.success) {
                return respond_with_unauthorized(response, validation.message)
            }
        }

        let result = await delete_collection_document(resource, id)

        if (!result.success) {
            return respond_with_error(response, `Failed to delete resource: ${result.message}`)
        }

        return respond_with_success(response, result.message)
    } catch (error) {
        console.log(error)
        
        logger.error(`Error deleting resource: ${error.message}`)
        
        return respond_with_internal_server_error(response, 'An error occurred while processing your request', [error.message])
    }
}

module.exports = {
    find_resources,
    find_resource,
    create_resource,
    update_resource,
    delete_resource
}