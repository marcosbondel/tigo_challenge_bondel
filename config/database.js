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
const { MongoClient, ObjectId } = require('mongodb')
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

    const db = mongo_client_instance.db(process.env.MONGODB_DB_NAME)
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

        const dbName = process.env.MONGODB_DB_NAME
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
            message: `Document inserted into ${collection_name} with id: ${result.insertedId}`,
            data: result
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

const update_collection_document = async (collection_name, documentId, updateParams) => {
    try {
        // Asegura que haya una conexión activa
        if (!mongo_client_instance) {
            mongo_client_instance = await mongodb_connection()
        }

        const dbName = process.env.MONGODB_DB_NAME
        const db = mongo_client_instance.db(dbName)
        const collection = db.collection(collection_name)

        // Validación: documentId debe ser ObjectId válido
        if (!ObjectId.isValid(documentId)) {
            return {
                success: false,
                message: `Invalid ObjectId: ${documentId}`
            }
        }

        const result = await collection.updateOne(
            { _id: new ObjectId(documentId) },
            { $set: updateParams }
        )

        if (result.matchedCount === 0) {
            return {
                success: false,
                message: `No document found in "${collection_name}" with id: ${documentId}`
            }
        }

        return {
            success: true,
            message: `Document in "${collection_name}" with id: ${documentId} updated successfully`
        }

    } catch (err) {
        console.error(`[update_collection_document] Error:`, err)
        return {
            success: false,
            message: `Error updating document: ${err.message}`,
            error: err
        }
    }
}

const find_document_by_params = async(collection_name, params) => {
    if (!mongo_client_instance) {
        mongo_client_instance = await mongodb_connection()
    }

    const db = mongo_client_instance.db(process.env.MONGODB_DB_NAME)
    let collection = db.collection(collection_name) // Replace with your collection name
    let document = await collection.findOne(params)
    
    if (!document) {
        console.log(`No document found in ${collection_name} with params:`, params)
        return { 
            success: false, 
            message: `No document found in ${collection_name} with params: ${JSON.stringify(params)}`,
        }
    } else {
        console.log(`Document(s) found in ${collection_name} with params:`, params)
        return { success: true, data: document }
    }

}


const list_collection_documents = async (collection_name, query = {}) => {
    if (!mongo_client_instance) {
        mongo_client_instance = await mongodb_connection()
    }

    try {
        const db = mongo_client_instance.db(process.env.MONGODB_DB_NAME)
        const collections = await db.listCollections({ name: collection_name }).toArray()
        
        if (collections.length === 0) {
            console.log(`Collection "${collection_name}" does not exist`)
            return { success: false, message: `Collection "${collection_name}" does not exist` }
        }

        const collection = db.collection(collection_name)

        const documents = await collection.find(query).toArray()

        return { success: true, data: documents }
    } catch (error) {
        console.error(`Error listing documents in "${collection_name}":`, error)
        return { success: false, error: error.message }
    }
}

const delete_collection_document = async (collection_name, documentId) => {
    if (!mongo_client_instance) {
        mongo_client_instance = await mongodb_connection()
    }

    const db = mongo_client_instance.db(process.env.MONGODB_DB_NAME)
    const collection = db.collection(collection_name)

    try {
        const result = await collection.deleteOne({ _id: new ObjectId(documentId) })

        if (result.deletedCount === 0) {
            return { success: false, message: `No document found with id: ${documentId}` }
        }

        return { success: true, message: `Document with id: ${documentId} deleted successfully` }
    } catch (error) {
        console.error(`Error deleting document from "${collection_name}":`, error)
        return { success: false, error: error.message }
    }
}

const delete_collection = async (collection_name) => {
    if (!mongo_client_instance) {
        mongo_client_instance = await mongodb_connection()
    }

    const db = mongo_client_instance.db(process.env.MONGODB_DB_NAME)
    const collections = await db.listCollections({ name: collection_name }).toArray()

    if (collections.length === 0) {
        console.log(`Collection ${collection_name} does not exist`)
        return { success: false, message: `Collection ${collection_name} does not exist` }
    } else {
        await db.dropCollection(collection_name)
        console.log(`Collection ${collection_name} deleted`)
        return { success: true, message: `Collection ${collection_name} deleted` }
    }
}

module.exports = {
    mongoose_connection,
    create_collection,
    create_collection_document,
    find_document_by_params,
    update_collection_document,
    list_collection_documents,
    delete_collection_document,
    delete_collection
}