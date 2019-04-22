# Uade app distribuidas backend


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
