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

const respond_with_success = (res, payload) => {
    res.status(200).json(payload)
}

const respond_with_pagination = (res, payload) => {
    res.status(200).json(payload)
}

const respond_with_error = (res, message = "Something went wrong :(", details = [], status = 400) => {
    res.status(status).json({ success: false, message, details })
}

const respond_with_not_found = (res, message = "Resource not found :(") => {
    res.status(404).json({ success: false, message })
}

const respond_with_unauthorized = (res, message = "Unauthorized! -_-") => {
    res.status(401).json({ success: false, message })
}

const respond_with_internal_server_error = (res, message = "Internal Server Error") => {
    res.status(500).json({ success: false, message })
}

module.exports = {
    respond_with_success,
    respond_with_pagination,
    respond_with_error,
    respond_with_not_found,
    respond_with_unauthorized,
    respond_with_internal_server_error
}