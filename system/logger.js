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
// logger.js
const { createLogger, format, transports } = require('winston')
const path = require('path')
const fs = require('fs')

// Crea logs/logs/ si no existe
const env = process.env.NODE_ENV || 'development'
const log_dir = path.join(__dirname, '../logs')
if (!fs.existsSync(log_dir)) fs.mkdirSync(log_dir)

const log_file = path.join(log_dir, `${env}.log`)

const log_format = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(info => `${info.timestamp} [${info.level.toUpperCase()}] ${info.message}\n`)
)

const logger = createLogger({
    level: 'info',
    format: log_format,
    transports: [
        new transports.File({ filename: log_file }),
        new transports.Console()
    ]
})

module.exports = {logger}
