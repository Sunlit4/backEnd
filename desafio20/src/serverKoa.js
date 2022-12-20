import dotenv from 'dotenv'
import Koa from 'koa';
import mount from 'koa-mount';
import logger from './utils/loggers/logger.js'
//import koaBody from 'koa-body'

import {graphqlHTTP} from "koa-graphql";
import {schema, productSchema } from './graphql/Schema.js'

const app = new Koa();
const GRAPHQL_ENDPOINT = '/graphql';


//app.use(koaBody());
dotenv.config();


app.use(mount(GRAPHQL_ENDPOINT, graphqlHTTP({
    schema, rootValue: {
        productSchema
    }, graphiql: true
})));

const PORT = 6965; 
const server = app.listen(PORT, ()=>{
    logger.info(`🚀 Server started at http://localhost:${PORT}`)
    logger.info(`🕸️  GraphQL Playground: http://localhost:${PORT}${GRAPHQL_ENDPOINT}`)
})

server.on('error', (err) => loggs.error(err));