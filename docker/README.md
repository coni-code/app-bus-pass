# Using Docker

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes.
Use https://127.0.0.1/ to access the application.

## Requirements

 - Docker Desktop App to run containers

## Docker setup

 - Initiate the Docker environment by running:

```
$ cd <project-dir>   # Make sure we're in project's root folder
$ . docker/.profile  # Load helper 'd*' shell commands
$ dstart --detach    # Start container (simplest way)
$ ...
$ dstop              # At the end of the task/day
```

Alternatively one can test/use a bit more low level helper:
```
$ dcompose up [<service>] --build  # Add "--detach" option to run the process in the background
                                   # Add "--force-recreate" option to force rebuild
                                   # Optionally use <service> to initiate only single service; e.g. "php" (not a container name)
```

### Reloading the database

1. Stop all containers with `dstop`.
2. Drop the Volume for the project.
3. Start all containers with `dstart`.

## Helper bash functions

Other bash helpers will look like `d<binary>`;
e.g. dphp, dmysql, dnode, dyarn, dcomposer, etc.
\
The `<binary>` is the name of original binary running inside the Docker container to which we're simply proxying the request.

## XDebug

To enable it one must:

1. Uncomment the `zend_extension=xdebug.so` in ./docker/php/conf.d/xdebug.ini.
2. Make sure `Preferences > PHP > Debug > XDebug > Debug port` is set to 9003 (9000 is interfering with PHP-FPM default listening port).
3. Restart the "php" service with `dcompose restart php`.
4. Start debugging session by clicking `headset` icon ("Start Listening for PHP Debug Connections") at the top.

[Go back](../README.md)
