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
} = require('../system')
const { mock_model } = require('../models')
const { create_collection } = require('../config')


const create_mock = async(request, response) => {
    const { 
        resource, 
        method, 
        url_params,
        headers,
        version,
        body_params,
        content_type
    } = request.body

    try {
        let new_mock = new mock_model({
            resource,
            method,
            url_params,
            version: `v${version}`,
            headers,
            body_params,
            content_type,
            access_token: generate_token({ url: `/api/v${version}/${resource}`, method})
        })

        let result = await new_mock.save()

        if(!result) return respond_with_error(response)

        // Create a collection for the mock if it doesn't exist
        let result_collection = await create_collection(result.resource, result.version)

        if(!result_collection.success) 
            return respond_with_error(response, 'Could not create collection for the mock', [result_collection.error])

        return respond_with_success(response, result)
    } catch (error) {
        console.log(error.name)
        console.log(error)
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
        return respond_with_internal_server_error(response)
    }
}

const find_mock_by_id = async(request, response) => {
    const { id } = request.params
    try {
        let result = await mock_model.findById(id)

        if(!result) return respond_with_error(response, `Could not find the given id: ${id}`)

        return respond_with_success(response, result )
    } catch (error) {
        console.log(error)
        return respond_with_internal_server_error(response)
    }
}

const update_mock = async(request, response) => {
    const { id } = request.params
    const update_params = request.body

    try {
        let result = await mock_model.findByIdAndUpdate(id, update_params)

        if( !result ) return respond_with_error(response, 'Could not update')

        return respond_with_success(response, result)
        
    } catch (error) {
        console.log(error)
        return respond_with_internal_server_error(response)
    }
}

const remove_mock = async(request, response) => {
    const { id } = request.params
    try {
        let result = await mock_model.findByIdAndDelete(id)

        if( !result ) return respond_with_error(response, 'Could not delete')

        return respond_with_success(response, result)
        
    } catch (error) {
        console.log(error)
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