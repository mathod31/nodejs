const fs = require('fs')

console.log("data : ");

var fileName = process.argv[2];


if (!fileName){
    console.error('missing argument! filename missing')
    process.exit(1)
}

fs.readFile(fileName,'utf8', (err, data) => {
    if (err){
        console.error(err)
        return
    }
    console.log(data)
})

