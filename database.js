
const { MongoClient, ConnectionClosedEvent } = require('mongodb');

const url = 'mongodb+srv://login_key:1234@eentai.ou01tyv.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);
const db_name = 'login_key'

const keys = 'admin_keys'

const add_key = async(key) => {
    await client.connect()
    try{
        const db = client.db(db_name)

        const collection = db.collection(keys)

        await collection.insertOne({key: key})
    }catch(e){
        console.log(`Error when adding key ${e}`)
    }
}
 
const check_key_valid = async(attempt) => {
    await client.connect()
    return new Promise(async(resolve, reject) => {
        try{
            const db = client.db(db_name)
            
            const collection = db.collection(keys)
    
            const result = await collection.findOne({key: attempt})
            
            resolve(result !== null)
        }catch(e){
            console.log(`error when checking valid ${e}`)
            reject(e)
        }
    })
    
}

module.exports = {
    add_key,
    check_key_valid
}