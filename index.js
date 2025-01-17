const { MongoClient } = require('mongodb');

const uri = 'mongodb://192.168.1.69:7002/?directConnection=true';

const client = new MongoClient(uri);

const database = client.db("wishlist");
const collection = database.collection("users");

//TODO: HTTP INPUT Required: USERID, Optionals: Collection id

/*async function main() {



    try {
        await client.connect();

        console.log("Connected successfully to server");

        const database = client.db("wishlist");
        const collection = database.collection("users");





        await collection.insertOne({
            name: "John",
            age: 30,
            address: "Highway 37"
        })

        //await collection.deleteOne({ name: "John"});

        //await collection.updateOne({ name: "Luna Nordbergh"}, { $set: { age: 52 }});


        const documents = await collection.findOne();
        console.log(documents);

        //await client.close();


    } catch (e) {
        console.error(e);
        console.log("Connection failed");
    }
}*/


//TODO: User Search Function
async function GetUsers() {
    try{

        //const collection = ;

        await client.connect();

        const documents = await collection.find().toArray();
        console.log(documents);

        return documents;

    }catch (error){
        console.log(error);
        return null;
    }
}

//User Page
async function addUser(name, phone, email, password_hash) {
    try{

        //const collection = ;

        await client.connect();

        const documents = await database.collection("users").insertOne({
            uid: ,
            name: name,
            email: email,
            isEmailVerified: false,
            password_hash: password_hash,
            categories: []
        });
        console.log(documents);

        return documents;

    }catch (error){
        console.log(error);
        return null;
    }
}
async function update() {

}

//TODO: Implement Safe Delete User
async function removeUser(uid) {
    await client.connect();
    collection.deleteOne({ name: uid});
}

//Categories
async function GetItem(collection_id, uid) {

}




//add();
GetUsers();

