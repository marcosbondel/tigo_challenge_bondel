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
const cors = require('cors')
const helmet = require('helmet')
const express = require('express')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')

const { mock_routes, resource_routes } = require('../routes')

// · Setup log directory
const log_directory = path.join(__dirname, 'logs/../')

// · Create log directory if not exists
if (!fs.existsSync(log_directory)) {
    fs.mkdirSync(log_directory)
}

// · Create a write stream (in append mode)
const access_log_stream = fs.createWriteStream(
    path.join(log_directory, '../logs/access.log'),
    { flags: 'a' } // 'a' means append
)


// · Setting up express app
const app = express()

// · Server security
app.use(cors({ origin: '*' }))
app.use(helmet())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: false }))

// · Setup morgan middleware
app.use(morgan('combined', { stream: access_log_stream })) // Logs to file
app.use(morgan('dev')) // Logs to console (colorful)

// · Define endpoints and nested
app.use('/', mock_routes)
app.use('/api', resource_routes)

module.exports = {
    app
}
