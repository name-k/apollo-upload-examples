const apolloServerKoa = require('apollo-server-koa')
const Koa = require('koa')
const resolvers = require('./resolvers')
const typeDefs = require('./types')

const app = new Koa()
const server = new apolloServerKoa.ApolloServer({
  typeDefs,
  resolvers,
  uploads: {
    // Limits here should be stricter than config for surrounding
    // infrastructure such as Nginx so errors can be handled elegantly by
    // graphql-upload:
    // https://github.com/jaydenseric/graphql-upload#type-uploadoptions
    maxFileSize: 10000000, // 10 MB
    maxFiles: 20
  }
})

app.use(async (ctx, next) => {
  console.log(ctx.request.body);
  next();
  console.log(ctx.request.body);
})

server.applyMiddleware({ app });

// app.use(async (ctx, next) => {
//   console.log('Middleware 2');
//   next();
// })

app.listen(process.env.PORT, error => {
  if (error) throw error

  // eslint-disable-next-line no-console
  console.info(
    `Serving http://localhost:${process.env.PORT} for ${process.env.NODE_ENV}.`
  )
})
