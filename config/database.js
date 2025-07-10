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
const { MongoClient } = require('mongodb')
let mongo_client_instance = null
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/bondel_challenge'

const mongoose_connection = async() => {

    try {
        await mongoose.connect(uri, {
            family: 4
        })

        console.log(`Mongoose online`)

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

const mongodb_connection = async () => {
    if (mongo_client_instance) {
        return mongo_client_instance
    }

    try {
        const client = new MongoClient(uri)
        console.log('Connecting to MongoDB...')
        await client.connect()
        console.log('Connected to MongoDB!')

        mongo_client_instance = client
        return mongo_client_instance
    } catch (error) {
        console.error('MongoDB connection failed:', error)
        process.exit(1)
    }
}

const create_collection = async (collection_name) => {
    if (!mongo_client_instance) {
        await mongodb_connection()
    }

    const db = mongo_client_instance.db(process.env.MONGODB_DB_NAME || 'bondel_challenge_development')
    const collections = await db.listCollections({ name: collection_name }).toArray()

    if (collections.length === 0) {
        await db.createCollection(collection_name)
        console.log(`Collection ${collection_name} created`)
        return { success: true, message: `Collection ${collection_name} created` }
    } else {
        console.log(`Collection ${collection_name} already exists`)
        return { success: false, message: `Collection ${collection_name} already exists` }
    }
}

const create_collection_document = async (collection_name, document) => {
    try {
        if (!mongo_client_instance) {
            mongo_client_instance = await mongodb_connection()
        }

        const dbName = process.env.MONGODB_DB_NAME || 'bondel_challenge_development'
        const db = mongo_client_instance.db(dbName)

        if (!collection_name || typeof collection_name !== 'string') {
            throw new Error('Invalid collection name')
        }

        if (!document || typeof document !== 'object') {
            throw new Error('Invalid document')
        }

        const collection = db.collection(collection_name)
        const result = await collection.insertOne(document)

        console.log(`Document inserted into ${collection_name} (id: ${result.insertedId})`)
        // return result
        return {
            success: true,
            message: `Document inserted into ${collection_name}`,
            insertedId: result.insertedId
        }
    } catch (error) {
        console.error(`Error inserting document into "${collection_name}":`, error.message)
        // throw error
        return {
            success: false,
            error: error.message
        }
    }
}

module.exports = {
    mongoose_connection,
    create_collection
}