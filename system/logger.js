// logger.js
const { createLogger, format, transports } = require('winston')
const path = require('path')
const fs = require('fs')

// Detecta entorno actual
const env = process.env.NODE_ENV || 'development'

// Crea directorio si no existe
const log_dir = path.join(__dirname, 'logs../')
if (!fs.existsSync(log_dir)) {
    fs.mkdirSync(log_dir)
}

// Archivo de log por entorno
const log_file = path.join(log_dir, `../logs/${env}.log`)

// Formato personalizado
const log_format = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(info => `${info.timestamp} [${info.level.toUpperCase()}] ${info.message}`)
)

// Crea logger
const logger = createLogger({
    level: 'info',
    format: log_format,
    transports: [
        new transports.File({ filename: log_file }),
        new transports.Console()
    ]
})

module.exports = logger
