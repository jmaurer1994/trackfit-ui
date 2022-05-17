export class Database {
    constructor(gapi, dbName) {
        console.log("Creating database")
        this.data = {};
        this.gapi = gapi;
        this.drive = gapi.client.drive;
        this.fileName = "trackfit-"+dbName+"_db.json"
        this.drive.files.list({
            spaces: 'appDataFolder',
            fields: 'files(id, name)',
            pageSize: 3
        }).then((res) => {
            this.fileId = null
            console.log("attempting to open db", this.fileName)
            res.result.files.forEach((item) => {
                if (item.name === this.fileName) {
                    this.fileId = item.id

                    console.log("db file found", this.fileId)

                    this.drive.files.get({
                        fileId: this.fileId,
                        alt: 'media'
                    }).then((res) => {
                        if (res.body !== "") {
                            this.data = JSON.parse(res.body)
                        }
                        this.ready = true;
                    })
                }
            })

            if (this.fileId === null) {
                console.log("did not find a "+ dbName +" database file")

                var fileMetadata = {
                    'name': this.fileName,
                    'parents': ['appDataFolder']
                };

                gapi.client.drive.files.create({
                    resource: fileMetadata,
                    fields: 'id'
                }).then((res) => {
                    this.fileId = res.result.id
                    console.log("db file created", this.fileId)
                    this.ready = true;
                });

            }

        })
    }

    getData() {
        console.log("returning data", this.data)
        
        if(!this.data?.map){
            this.data = []
        }

        return this.data
    }

    setData(newData) {
        console.log("returning data", newData)
        this.data = newData;
    }

    saveData(callback) {
        const contentType = 'application/json';
        var request = this.gapi.client.request({
            'path': '/upload/drive/v3/files/' + this.fileId,
            'method': 'PATCH',
            'params': { 'uploadType': 'media' },
            'headers': {
                'Content-Type': 'application/json;'
            },
            'body': JSON.stringify(this.data)
        });

        request.execute(callback);
    }

}

