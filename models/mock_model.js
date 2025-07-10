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
const mongoose = require('mongoose')

const mockSchema = new mongoose.Schema({
    nam: { 
        type: String, 
        required: true,
        trim: true,
        minlength: 4,
        unique: true // Ensure that each mock has a unique name
    },
    version: {
        type: String,
        required: true,
        trim: true,
        // Starts with 'v' followed by digits and dots, e.g., 'v1.0.0'
        match: /^v\d+(\.\d+)*$/ // Regular expression to validate version
    },
    method: { 
        type: String, 
        required: true,
        enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Restrict to valid HTTP methods
        uppercase: true, // Store method in uppercase for consistency
    },
    query_params: { 
        type: Object ,
        default: {}, // Default to an empty object if no query params are provided
        // Validate that query_params is an object
        validate: {
            validator: function(v) {
                return typeof v === 'object' && !Array.isArray(v);
            }
        }
    },
    body_params: { 
        type: Object,
        default: {}, // Default to an empty object if no body params are provided
        // Validate that body_params is an object
        validate: {
            validator: function(v) {
                return typeof v === 'object' && !Array.isArray(v);
            }
        }
    },
    allowed_headers: {
        type: Object,
        default: {}, // Default to an empty object if no headers are provided
        // Validate that allowed_headers is an object
        validate: {
            validator: function(v) {
                return typeof v === 'object' && !Array.isArray(v);
            }
        }
    },
    // responseBody: { type: Object },
    // status: { type: Number, default: 200 },
    content_type: { 
        type: String, 
        default: 'application/json',
        enum: ['application/json', 'text/plain', 'application/xml', 'text/html'], // Restrict to common content types
        required: true // Ensure content_type is always provided
    },
    status: { 
        type: String, 
        default: 'enabled', // In case we want to enable or disable certain endpoints
        enum: ['enabled', 'disabled'], // Restrict to valid status values
        required: true,
    },
    access_token: {
        type: String,
        default: null, // Default to null if no access token is provided
        trim: true, // Trim whitespace from the access token
        validate: {
            validator: function(v) {
                return v === null || (typeof v === 'string' && v.length > 0);
            },
            message: 'Access token must be a non-empty string or null'
        }
    }
}, {
    timestamps: true
})

exports.mock_model = mongoose.model('mock', mockSchema)