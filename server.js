const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
// console.log(app.get("env"));
// console.log(process.env);

const app = require('./app');

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD,
);

// option:  has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
// mongoose.connect(DB, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
// })

mongoose
    // .connect(process.env.DATABASE_LOCAL, {
    .connect(DB)
    .then(() => {
        // console.log(con.connections);
        console.log('DB connection successful!');
    })
    .catch((err) => {
        console.error('DB connection error:', err);
    });

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
