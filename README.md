# Node.js-Express.js-MongoDB

Using npm pakages

    "bcryptjs": "^2.4.3",
    "body-parser": "^1.19.0",
    "dotenv": "^8.2.0",
    "env-cmd": "^10.0.1",
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^5.7.5",
    "validator": "^11.1.0"

Avalable API's
  using MongoDB
    get : contact.index,
    post : contact.create,
    get : contact.show,
    patch : contact.edit,
    put : contact.update,
    delete : contact.delete
  using Authentication JWT token
    post : user.register
    post : user.login //and return token
    get : user:show 
    post : user.logout
    
