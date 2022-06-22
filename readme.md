# Documentación GraphQL
![GraphQL](Documentation/img/graphql.png)

## SETUP 
1. Crear Una Carpeta del proyecto
2. Inicializar el proyecto con **npm init -y**
3. Instalar GraphQL y Apollo con **npm install graphql apollo-server**

<!-- * Código -->
``` 
npm init -y
npm install graphql apollo-server

```
  
---

### DOCUMENTACION [GRAPHQL.COM](https://graphql.org/ "Documentacion") 

> GraphQL es un lenguaje de consulta y manipulación de datos para APIs, y un entorno de ejecución para realizar consultas con datos existentes.​ GraphQL fue desarrollado internamente por Facebook en 2012

___

<!-- 
|Encabezado1    |Encabezado2    |
|---------------|---------------|
|Row            |Row            | -->

**En package.json** agregar los valores
`"type":"module"`

## DESCRIBIR LOS DATOS
```Javascript
import { ApolloServer, gql } from 'apollo-server';
```
```Javascript
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
```


```Javascript
//String! -> No Null
//String -> Puede ser Null

const typeDefs = gql`
    type Person {
        name: String!
        phone: String
        city: String
    }

    type Query{
        personCount: Int!
        allPersons: [Person]!
    }

`
```

___
## Resolvers
```Javascript
const resolvers = {
    Query: {
        personCount: () => persons.length,
        allPersons: () => persons
    }
}
```
___
## Server GraphQL Apollo
```Javascript
const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers
})

//Inicio del servidor
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
```
```Javascript
//Levantar el servidor desde terminal
node index.js
```

---
## DESDE EL LOCALHOST DEL SERVIDOR
Se pueden realizar peticiones en el sandbox cargado:

```Javascript
query {
  allPersons {
    name
  }
  personCount
}
```

El resultado sería:

```Javascript
{
  "data": {
    "allPersons": [
      {
        "name": "Leo"
      },
      {
        "name": "Leoziel"
      },
      {
        "name": "Elideth"
      }
    ],
    "personCount": 3
  }
}
```

___
## QUERY MAS COMPLEJA
**metodo(parametro: tipo) : devuelve...**

```javascript
const typeDefs = gql`
    type Person {
        name: String!
        phone: String
        city: String
    }

    type Query{
        findPerson(name: String!) : Person
    }
`


const resolvers = {
    Query: {
        findPerson: (root,args) => {
            const {name} = args
            return persons.find(person => person.name === name)
        }
    }
}
```

**Desde el sandbox para probar el metodo**
```javascript
query{
  findPerson(name: "Leoziel") {
    phone
  }
}
```
**Resultado**
```javascript
{
  "data": {
    "findPerson": {
      "phone": "8332321233"
    }
  }
}
```

___
## Operaciones con la data (Nuevo campo)
```Javascript

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
```
**Consulta**
```javascript
query{
  allPersons {
    address
  }
}
```

**Resultado**
```javascript
{
  "data": {
    "allPersons": [
      {
        "address": "Altamira + ahi vive"
      },
      {
        "address": "Guadalajara + ahi vive"
      },
      {
        "address": "Guadalajara + ahi vive"
      }
    ]
  }
}
```