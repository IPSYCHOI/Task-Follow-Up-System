require('dotenv').config();
const {app} = require('./app');

const port = process.env.PORT || 3000;
const environment =process.env.NODE_ENV || 'development'
dbconnect()

.then(()=>{
    app.listen(port,() => console.log("🚀 Server running on port "+port))
    console.log("Environment: "+environment);
})
    

