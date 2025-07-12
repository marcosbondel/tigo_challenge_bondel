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
    respond_with_internal_server_error, 
    respond_with_error,
    generate_token,
    respond_with_not_found,
    logger,
} = require('../system')
const { mock_model } = require('../models')
const { create_collection, delete_collection } = require('../config')

const create_mock = async(request, response) => {
    const { 
        resource, 
        version,
        method, 
        headers,
        query_params,
        body_params,
        content_type
    } = request.body

    try {
        let new_mock = new mock_model({
            resource,
            version: `v${version}`,
            method,
            headers,
            query_params,
            body_params,
            content_type,
            access_token: null // This will be set later if the mock requires authentication
        })

        if(new_mock.headers.includes('Authorization')) {
            // If the mock has an Authorization header, generate a token
            new_mock.access_token = generate_token({ url: `/api/v${version}/${resource}`, method})
        }

        if(new_mock.method === 'POST' || new_mock.method === 'PUT' || new_mock.method === 'PATCH') {
            // If the method is POST, PUT, or PATCH, ensure that body_params is an array
            if(!Array.isArray(new_mock.body_params)) {
                return respond_with_error(response, 'Body parameters must be an array for POST, PUT, or PATCH methods')
            }
        }

        if(new_mock.method === 'GET') {
            // If the method is GET, ensure that query_params is an array
            if(!Array.isArray(new_mock.query_params)) {
                return respond_with_error(response, 'Query parameters must be an array for GET method')
            }
        }

        let result = await new_mock.save()

        if(!result) return respond_with_error(response)

        // Create a collection for the mock if it doesn't exist
        let result_collection = await create_collection(result.resource, result.version)

        if(!result_collection.success) 
            return respond_with_error(response, 'Could not create collection for the mock', [result_collection.error])

        return respond_with_success(response, result)
    } catch (error) {
        console.log(error)
        
        logger.error(`Error creating mock: ${error.message}`)
        
        if (error.name === 'ValidationError' || error.name === 'MongoServerError') {
            return respond_with_error(response, 'Validation failed', error.errors)
        }
        return respond_with_internal_server_error(response)
    }
}

const find_mocks = async(request, response) => {
    try {
        let result = await mock_model.find({})

        if(!result) return respond_with_error(response)

        return respond_with_success(response, result )
    } catch (error) {
        console.log(error)
        
        logger.error(`Error finding mocks: ${error.message}`)
        
        return respond_with_internal_server_error(response)
    }
}

const find_mock_by_id = async(request, response) => {
    const { id } = request.params
    try {
        let result = await mock_model.findById(id)

        if(!result) return respond_with_not_found(response, `Could not find the given id: ${id}`)

        delete result.access_token

        return respond_with_success(response, result )
    } catch (error) {
        console.log(error)
        
        logger.error(`Error finding mock by ID: ${error.message}`)
        
        return respond_with_internal_server_error(response)
    }
}

const update_mock = async(request, response) => {
    const { id } = request.params
    const update_params = request.body
    delete update_params._id // Remove _id from the update params if it exists, as it cannot be changed

    try {
        let result = await mock_model.findByIdAndUpdate(id, update_params)

        if( !result ) return respond_with_error(response, 'Could not update')

        return respond_with_success(response, 'Mock updated successfully')
        
    } catch (error) {
        console.log(error)
        
        logger.error(`Error updating mock: ${error.message}`)
        
        return respond_with_internal_server_error(response)
    }
}

const remove_mock = async(request, response) => {
    const { id } = request.params
    try {
        let result = await mock_model.findByIdAndDelete(id)

        if( !result ) return respond_with_error(response, 'Could not delete mock')

        // Now, we remove all references to this mock in the collections
        let delete_result = await delete_collection(result.resource)
        
        if(!delete_result) {
            return respond_with_error(response, 'Could not delete collection references')
        }

        return respond_with_success(response, 'Mock deleted successfully')
        
    } catch (error) {
        console.log(error)
        
        logger.error(`Error deleting mock: ${error.message}`)
        
        return respond_with_internal_server_error(response)
    }
}

module.exports = {
    find_mocks,
    find_mock_by_id,
    create_mock,
    remove_mock,
    update_mock,
}