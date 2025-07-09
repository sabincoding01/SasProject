import {Sequelize} from 'sequelize-typescript'
import dotenv from 'dotenv';
dotenv.config();
const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME, // saddhai root nahi hbunxa
    password : process.env.DB_PASSWORD,
    host : process.env.DB_HOST ,
    dialect:"mysql" ,// k databaew use garna aateko vanne kura
    port : Number(process.env.DB_PORT),
    models : [__dirname + '/models']
})

sequelize.authenticate()
.then(()=>{
    console.log("Authenticated Successfully")
})

.catch ((error)=>{
    console.log(error);
})

sequelize.sync({force:false})
.then(()=>{
    console.log("migrated successfully new changes")
})

export default sequelize

