import { ApolloServer, gql } from 'apollo-server';

const persons = [
    {
        name: "Leo",
        phone: "8332321226",
        city: "Altamira"
    },
    {
        name: "Leoziel",
        phone: "8332321233",
        city: "Guadalajara"
    },
    {
        name: "Elideth",
        phone: "8332321207",
        city: "Guadalajara"
    }
]

const typeDefs = gql`
    type Person {
        name: String!
        phone: String
        city: String
        address: String
    }

    type Query{
        personCount: Int!
        allPersons: [Person]!
        findPerson(name: String!) : Person
    }

`

const resolvers = {
    Query: {
        personCount: () => persons.length,
        allPersons: () => persons,
        findPerson: (root,args) => {
            const {name} = args
            return persons.find(person => person.name === name)
        }
    },

    Person:{
        address: (root) => `${root.city} + ahi vive`
    }
}

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers
})


server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });