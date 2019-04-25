# UADE - Aplicaciones Distribuídas - BackEnd

*`This is the BackEnd of the application apdMovie10, where you can make comments about different movies and rank them.`*

You have to register to make a comment and rank a movie, but you can list others reviews without registering (even though, if you do it, you´ll see your comments first).

When you register, you provide a valid email and basic data, that will be completed with `FullContact`. 

Your password is always `hashed` and stored that way in the database, so it can´t be decrypted. 

To manage your account, you have a `token` given at your login that will only let you change your data, but not others, using *JWT* (JSON web token). 

Valid `comments` actions: 

- *list* every comment about a particular movie (yours first),
- *list* every own comment,
- *create* a new comment,
- *update* a particular own comment,
- *delete* a particular own comment.

Valid `users` actions: 

- *list* all the users (password neither will be shown, nor stored plain),
- *create* a new user (with basic data that will automatically be completed),
- *change* your own password,
- *delete* your own user.


## Install

```sh
npm install
npm start
```

## Db

 ```sh
 docker compose -up
 docker exec -it mongodb bin/bash
 /usr/bin/mongo
 > show dbs
 > use uade_app_distribuidas;
 > db.stats()
 > db.getCollectionNames()
 > db.users.insert({  user_name: 'admin', pass_digest: 'd033e22ae348aeb5660fc2140aec35850c4da997', mail: 'admin@app_distrib.com' })
 ```

## Architecture

This app use a *MVC* pattern.

├── Procfile (Heroku run entry point)  
├── app.js (main app)  
├── bin  
├── controllers 
- auth.js (login manager) 
- movie_comments.js (movie manager) 
- users.js (users manager)  

├── data  
├── docker-compose.yml (MongoDB docker def)  
├── helpers 
- array.js (organize users) 
- fullContact.js (bring extra data) 
- hash.js (encrypt the password) 
- log.js (console log)

├── key.js (system keys only dev. prod use env *variables*)  
├── models
- movie_comments.js (movie model) 
- users.js (users model)

├── node_modules  
├── package-lock.json  
├── package.json  
├── public  
├── readme.md (*you are here*)  
├── routes  
└── views