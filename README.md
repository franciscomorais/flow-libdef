# flow-libdef

[![CircleCI](https://circleci.com/gh/franciscomorais/flow-libdef.svg?style=svg)](https://circleci.com/gh/franciscomorais/flow-libdef)

Utility to install a flow dependency. It tries to install the lib dependency but if it doen't find it, will be creates a stub.

## Dependencies

- node 6.x
- yarn
- flow-typed

## Installation guide

```
npm i -g flow-libdef
```

## How to use

Imagine that you have a `lodash` dependency on your project you never installed the libdef flow of this dependency. To install these libdef dependency, before, you needed to know what version that you have installed on your project, after that you will be try to install the libdef running the `flow-typed install lodash @ 4.0.0` command as an example, and if the library don 't have a compatible libdef, you need to create the library stub.

This utility helps to make this work. You just need run this command:

```
flow-libdef install lodash
```

and, voilá, the libdef dependecy will be installed or the stub will be created.

I hope this helps you in this process.

### Thanks

- [bsontag](https://github.com/bsonntag) - Benjamim Sonntag

## Contributing

Please feel free to submit any issues or pull requests.

## License

MIT
