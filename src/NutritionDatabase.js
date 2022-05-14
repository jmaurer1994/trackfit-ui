

export class NutritionDatabase{
    constructor(gapi) {
        this.meal_table = [];
        this.gapi = gapi;
        this.drive = gapi.client.drive;

        this.drive.files.list({
            spaces: 'appDataFolder',
            fields: 'files(id, name)',
            pageSize: 3
        }).then((res) => {
            this.fileId = null
            console.log("attempting to open db")
            res.result.files.forEach((item) =>{
                if(item.name === "trackfit-nutrition_db.json"){
                    this.fileId = item.id

                    console.log("db file opened", this.fileId)
                }
            })

            if(this.fileId === null){
                console.log("did not find a nutrition database file")

                var fileMetadata = {
                    'name': 'trackfit-nutrition_db.json',
                    'parents': ['appDataFolder']
                };

                gapi.client.drive.files.create({
                    resource: fileMetadata,
                    fields: 'id'
                }).then((res) => {
                    this.fileId = res.result.id
                    console.log("db file opened", this.fileId)
                });

            }

        })
    }

    createFileWithJSONContent(fileId, data, callback){
        const contentType = 'application/json';
        var request = this.gapi.client.request({
            'path': '/upload/drive/v3/files/' + fileId,
            'method': 'PATCH',
            'params': { 'uploadType': 'media' },
            'headers': {
                'Content-Type': 'application/json;'
            },
            'body': JSON.stringify(data)
        });
        if (!callback) {
            callback = function (file) {
                console.log(file)
            };
        }
        request.execute(callback);
    }

    addMealToTable(meal){
        this.meal_table.push(meal)
    }

    saveData(){

    }

}


export class Meal {
    constructor(data){
        this.food_arr = [];
        this.time_logged = null;

        console.log("meal data", data)
    }


    addFoodToMeal(food){
        this.food_arr.push(food)
    }
}

export class Food{
    constructor(id, qty){
        this.id = id;
        this.qty = qty

        return this;
    }
}