const { MongoClient } = require('mongodb');
const http = require('http');
const url = require('url');

const uri = 'mongodb://192.168.1.69:7002/?directConnection=true';

const client = new MongoClient(uri);

const database = client.db("hificonsult");

async function main() {


    const server = http.createServer(async (req, res) => {

        res.statusCode = 200;

        // Setting CORS headers to allow requests from your front-end
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

        const query = url.parse(req.url, true).query;
        const {type, category, subcategory} = query;

        try {
            let response_value;
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            if(type == "read"){
                if(!category){
                    response_value = await GetCategory();
                }
                else if(!subcategory){
                    response_value = await GetSubCategory(category);
                }
            }

            console.log(response_value);
            res.end(JSON.stringify(response_value));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        }
    });

    const PORT = 7069;
    const HOST = '127.0.0.1';
    server.listen(PORT, () => {
        console.log(`Server running on ${HOST}:${PORT}`);
    });
}

async function GetCategory() {
    try{
        const collection = database.collection("category");

        await client.connect();

        const documents = await collection.find().toArray();
        console.log(documents);

        return documents;

    }catch (error){
        console.log(error);
        return null;
    }
}

async function GetSubCategory(category) {
    try{
        const collection = database.collection("subcategory");

        await client.connect();

        const documents = await collection.find({category: category}).toArray();

        return documents;

    }catch (error){
        console.log(error);
        return null;
    }
}




main();