const express = require("express")

const { graphqlHTTP } = require('express-graphql');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql')

const { sequelize, User, Post} = require('../models');

const UserType = new GraphQLObjectType({
  name: "User",
  description: "A User in our application",
  fields: () => ({
      id: { type: new GraphQLNonNull(GraphQLInt) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      posts: {
          type: new GraphQLList(PostType),
          resolve: (user) => Post.findAll({
              where: {
                  userId: user.id
              }
          })
      }
  })
})

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "A Post created by a user",
  fields: () => ({
      id: { type: new GraphQLNonNull(GraphQLInt) },
      title: { type: new GraphQLNonNull(GraphQLString) },
      userId: { type: new GraphQLNonNull(GraphQLInt) },
      user: {
          type: UserType,
          resolve: (post) => User.findOne({
              where: {
                  id: post.userId
              }
          })
      }
  })
})

// root query scope
const rootQuery = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
      posts: {
          type: new GraphQLList(PostType),
          description: 'List of posts',
          resolve: () => Post.findAll()
      },
      users: {
          type: new GraphQLList(UserType),
          description: 'List of users',
          resolve: () => User.findAll()
      },
      post: {
          type: PostType,
          description: 'A single post',
          args: {
              id: { type: GraphQLInt }
          },
          resolve: (parent, args) => Post.findOne({
              where: {
                  id: args.id
              }
          })
      },
      user: {
          type: UserType,
          description: 'A single user',
          args: {
              id: { type: GraphQLInt }
          },
          resolve: (parent, args) => User.findOne({
              where: {
                  id: args.id
              }
          })
      }
  })
})

const rootMutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
      addUser: {
          type: UserType,
          description: 'Add a user',
          args: {
              name: { type: new GraphQLNonNull(GraphQLString) }
          },
          resolve: (parent, args) => {
              const user = User.create({
                  name: args.name
              })
              return user
          } 
      },
      addPost: {
          type: PostType,
          description: 'Add a post',
          args: {
              title: { type: new GraphQLNonNull(GraphQLString) },
              userId: { type: new GraphQLNonNull(GraphQLInt) }
          },
          resolve: (parent, args) => {
              const post = Post.create({
                  title: args.title,
                  userId: args.userId
              })
              return post
          }
      }
  })
})

const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation
})

async function authDb() {
  await sequelize.authenticate();
}

authDb();

const router = express.Router()
router.all("/", graphqlHTTP({ schema: schema, graphiql: true }))

module.exports = router
