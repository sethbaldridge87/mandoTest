const express = require('express')
const app = express()
app.use(express.static(__dirname + '/public'));

app.listen(8100, () => {
    console.log('Server is running @ port 8100');
})