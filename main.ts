import {Server} from './server/server'
import {usersRouter} from './users/users.router'
import {restaurantsRouter} from './restaurants/restaurants.router'
import {reviewsRouter} from './reviews/reviews.router'
import {mainRouter} from './main.router'

const server = new Server()
server.bootstrap([
    usersRouter,
    restaurantsRouter,
    reviewsRouter,
    mainRouter
]).then(server=>{
    console.log('Server is listening on:', server.application.address())
}).catch(error=>{
    console.log('Server failed to start')
    console.error(error)
    process.exit(1)
})

//tsc -w
//nodemon dist/main.js


//shell cd 'C:\Program Files\MongoDB\Server\4.2\bin'
//./mongod -dbpath=C:\Users\pe-ri\WebstormProjects\meat-api\tools