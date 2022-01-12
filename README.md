# YASPM server

## usage

### setting up
open a terminal and run
```sh
$ npm i yaspm-server
```
this should install everything you need to run a yaspm server <br>
you could install this globally, but because it currently puts its files in your CWD its not recommended


### development
just run the following commands while being in your clone's root
```sh
$ npm i
$ npm run build
$ npm run start # this will generate a default config for you, you can customize it in config.json at the root
```

### publishing
comig son

### scopes
because i like npm, there's an option to publish packages under scopes (`@scope/package`) to avoid naming conflicts

## about
### versioning
versioning is pretty simple, a client will always work with server aslong the client has a equal or greater version

## todo before release
- [x] user accounts
- [ ] uploading packages
- [x] metadata and getting packages
- [ ] a [client](https://github.com/zTags/YASPM-Client)

# thanks for using yaspm