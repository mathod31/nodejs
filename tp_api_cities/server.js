const fs = require('fs')

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const port = 3000;
const {v4: uuidv4 } = require('uuid');

app.set('view engine', 'pug');

app.get('/:fileName', (req, res) => {

    var fileNameLocation = './' + req.params.fileName + '.json';
    fs.readFile(fileNameLocation,'utf-8', function(err,data){
        if (err){
            res.status(400).send("file " + req.params.fileName + " doesn't exists");
            return 1;
        }
        res.send(data);
    })


    }) 

    app.post('/city', (req, res) =>{
        var fileNameLocation = './cities.json';
        fs.readFile(fileNameLocation, 'utf-8', function(err,data){

            if (err){
                var json = {
                    "cities": [
                        { "id": "042ffd34-d989-321c-ad06","name": "Toulouse" },
                        { "id": "823ffd34-e789-321c-gf88","name": "Albi" }
                    ]
                };


                fs.writeFile(fileNameLocation, data, function(err){
                    if (err){
                        res.status(500).send("impossible to create a new file");
                        return 2;
                    }
                })
            }

            content = JSON.parse(data);


            for(var i = 0 ; i < content.cities.length ; i++){
                if (content.cities[i].name == req.body.name) {
                    res.status(500).send("city exists");
                    return;
                }
            }

            uuid = uuidv4();
            city = req.body.name;
        
            var obj = JSON.parse(data);
			obj.cities.push({'id': uuidv4(), 'name': city})
			var json = JSON.stringify(obj);
            fs.writeFileSync(fileNameLocation, json);

            res.send("done");
            return;
            


        })
    })
        
    app.put('/city/:id', (req, res) =>{

            var fileNameLocation = './cities.json';
            fs.readFile(fileNameLocation, 'utf-8', function(err,data){
    
                if (err){
                    var json = {
                        "cities": [
                            { "id": "042ffd34-d989-321c-ad06","name": "Toulouse" },
                            { "id": "823ffd34-e789-321c-gf88","name": "Albi" }
                        ]
                    };
    
    
                    fs.writeFile(fileNameLocation, data, function(err){
                        if (err){
                            res.status(500).send("impossible to create a new file");
                            return 2;
                        }
                    })
                }
            
                content = JSON.parse(data);
                

    
                for(var i = 0 ; i < content.cities.length ; i++){
                    if (content.cities[i].id == req.params.id) {
                        content.cities[i].name = req.body.name;
                        fs.writeFileSync(fileNameLocation, JSON.stringify(content));
                        return res.send("done");
                    }
                }


            }
            
            )

    })


    app.delete('/city/:id', (req, res) =>{


        var fileNameLocation = './cities.json';
        fs.readFile(fileNameLocation, 'utf-8', function(err,data){

            if (err){
                var json = {
                    "cities": [
                        { "id": "042ffd34-d989-321c-ad06","name": "Toulouse" },
                        { "id": "823ffd34-e789-321c-gf88","name": "Albi" }
                    ]
                };


                fs.writeFile(fileNameLocation, data, function(err){
                    if (err){
                        res.status(500).send("impossible to create a new file");
                        return 2;
                    }
                })
            }
        
            content = JSON.parse(data);
            


            for(var i = 0 ; i < content.cities.length ; i++){
                if (content.cities[i].id == req.params.id) {
                    content.cities.splice(i,1); // using splice because of null element if we use delete 
                    fs.writeFileSync(fileNameLocation, JSON.stringify(content));
                    return res.send("done");
                }
            }


        }
        
        )


    })
    
    app.listen(port,() =>{
        console.log('running on port 3000')
})