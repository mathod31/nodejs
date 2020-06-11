const pug = require("pug");
const fs = require('fs')

const express = require("express");
const app = express();
const port = 3000;

app.set('view engine', 'pug');

app.get('/', (req, res) => {


    if (req.url != '/favicon.ico'){

        if (req.url.length > 1){
            var fileName = req.url.substring(1)
        }
        else{
            var fileName = "data.csv"
        }   
    }
        content = []
        if (fileName){
            fs.readFile(fileName,'utf8', (err, data) => {
                if (err){
                    console.error(err)
                    return
                }
                var row = data.split('\n')
                
                row.forEach(function(line){
                    var user = {}  
                    var cells = line.split(";")
                    user.user = cells[0]
                    user.city = cells[1]
                    content.push(user)
                })

        const compiledFunction = pug.compileFile('template.pug')
        const generatedTemplate = compiledFunction({
            fileName : fileName,
            content : content
        })
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            res.end(generatedTemplate);

        })
        }}
        ) 
        
    
    app.listen(port,() =>{
        console.log('running on port 3000')
})