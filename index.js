const { MongoClient } = require('mongodb');
const http = require('http');
const url = require('url');

const uri = 'mongodb://192.168.1.69:7002/?directConnection=true';

const client = new MongoClient(uri);

const database = client.db("hificonsult");

async function main() {


    const server = http.createServer(async (req, res) => {

        res.statusCode = 200;

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

        const query = url.parse(req.url, true).query;
        const {type, category, subcategory, name, ref} = query;

        try {
            let response_value;
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            if(type === "read"){
                response_value = await GetBrands();
            }
            else if(type === "write"){
                response_value = await AddBrand(name);
            }

            console.log(response_value);
            res.end(JSON.stringify(response_value));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        }
    });

    const PORT = 7003;
    const HOST = '192.168.1.69';
    server.listen(PORT, () => {
        console.log(`Server running on ${HOST}:${PORT}`);
    });
}

/*async function GetCategory() {
    try{
        const collection = database.collection("category");

        await client.connect();

        const documents = await collection.find().toArray();
        console.log(documents);

        return documents;

    }catch (error){
        console.log(error);

    }
}*/

/*async function GetSubCategory(category) {
    try{
        const collection = database.collection("subcategory");

        await client.connect();

        return await collection.find({category: category}).toArray();

    }catch (error){
        console.log(error);

    }
}*/

async function GetBrands() {
    try{
        const collection = database.collection("brands");

        await client.connect();

        return await collection.find().toArray();

    }catch (error){
        console.log(error);

    }
}

/*async function AddCategory(name) {
    try{
        const collection = database.collection("category");

        await client.connect();

        const code_name_str = name.toLowerCase().replaceAll(" ", "_").replaceAll("å", "a").replaceAll("ä", "a").replaceAll("ö", "o");

        return await collection.insertOne({ code_name: code_name_str, public_name: name });

    }catch (error){
        console.log(error);

    }
}*/

/*async function AddSubCategory(name, category) {
    try{
        const collection = database.collection("subcategory");

        await client.connect();

        const code_name_str = name.toLowerCase().replaceAll(" ", "_").replaceAll("å", "a").replaceAll("ä", "a").replaceAll("ö", "o");

        return await collection.insertOne({ code_name: code_name_str, public_name: name, category: category });

    }catch (error){
        console.log(error);

    }
}*/

async function AddBrand(name) {
    try{
        const collection = database.collection("brands");

        await client.connect();

        const code_name_str = name.toLowerCase().replaceAll(" ", "_").replaceAll("å", "a").replaceAll("ä", "a").replaceAll("ö", "o");

        return await collection.insertOne({ code_name: code_name_str, public_name: name });

    }catch (error){
        console.log(error);

    }
}

main();