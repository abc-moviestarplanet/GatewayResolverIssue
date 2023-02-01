const Fastify = require('fastify')
const { mercuriusFederationPlugin } = require('@mercuriusjs/federation')

const users = [
  {
    id: '0',
    name: 'John',
  },
  {
    id: '1',
    name: 'Jane',
  }
]

const app = Fastify()
const schema = `
  extend type Query {
    users: PageOfUser
  }

  type PageOfUser {
    nodes: [User]
  }

  type User @key(fields: "id") {
    id: ID!
    name: String
  }
`

const resolvers = {
  Query: {
    users: () => ({ nodes: users })
  },
  User: {
    __resolveReference: (source, args, context, info) => {
      return users[source.id]
    }
  }
}

app.register(mercuriusFederationPlugin, {
  ide: true,
  schema,
  resolvers
})

app.get('/', async function (req, reply) {
  const query = '{ _service { sdl } }'
  return app.graphql(query)
})

app.listen({ port: 3001 })