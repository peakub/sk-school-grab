const mongoose = require('mongoose');
//mongodb+srv://sk_admin:1234@cluster0.3xbgrlv.mongodb.net/skcafeteriamern?retryWrites=true&w=majority
const mongoURI = 'mongodb://sk_admin:1234@ac-jxhws4y-shard-00-00.3xbgrlv.mongodb.net:27017,ac-jxhws4y-shard-00-01.3xbgrlv.mongodb.net:27017,ac-jxhws4y-shard-00-02.3xbgrlv.mongodb.net:27017/skcafeteriamern?ssl=true&replicaSet=atlas-u1qeu3-shard-0&authSource=admin&retryWrites=true&w=majority'
mongoose.set('strictQuery', true);
const mongoDB = async() =>{
    await mongoose.connect(process.env.MONGODB_CONNECT_URI, { useNewUrlParser: true}, async(err, result)=>{
        if(err) console.log("---", err)
        else{
            console.log("Connedted !");
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(async function(err, data){
                const foodCategory = await mongoose.connection.db.collection("foodCategory");
                foodCategory.find({}).toArray(function (err, catData){
                    if(err) console.log(err);
                    else {
                        global.food_items = data;
                        global.foodCategory = catData;
                    }
                })
                // if(err) console.log(err);
                // else {
                //     global.food_items = data;
                // }
            })
        }

    });

}

module.exports = mongoDB();