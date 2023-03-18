const http = require('http');
const myApiKey = process.env.myApiKey;
let city = process.argv.slice(2)[0];
const url = `http://api.weatherstack.com/current?access_key=${myApiKey}&query=${city}`;

http.get(url, (res) => {
    const {statusCode} = res;
    if (statusCode !== 200){
        console.log(`statusCode: ${statusCode}`);
        return
    }

    res.setEncoding('utf-8');
    let rowData = '';
    res.on('data', (chunk) => rowData += chunk);
    res.on('end', () => {
        let parseDate = JSON.parse(rowData);
        console.log(parseDate);
    })
}).on('error', (err) => {
    console.error(err)
})
