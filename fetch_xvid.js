const https = require('https');

const url = 'https://xvidapi.com/api.php/provide/vod?ac=list&limit=10';
const options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
};

https.get(url, options, (res) => {
    console.log('Status:', res.statusCode);
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log('Body length:', data.length);
        console.log(data);
    });

}).on('error', (err) => {
    console.error("Error: " + err.message);
});
