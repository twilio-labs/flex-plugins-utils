![npm](https://img.shields.io/npm/v/flex-plugins-utils-env.svg?style=flat-square)
![npm](https://img.shields.io/npm/dt/flex-plugins-utils-env.svg?style=flat-square)
[![NpmLicense](https://img.shields.io/npm/l/flex-plugins-utils-env.svg?style=flat-square)](../../LICENSE)

# Flex Plugin Utils env

Utility for returning environment variables. It is an isomorphic JavaScript module. 

## Methods

### isWin32

Returns `true` if OS is Windows. It will return false if script is running on the browser.

### persistTerminal

If the module is used on a server, it will set the environment variable to persist the terminal logs.

### isTerminalPersisted

Whether the terminal should be persisted or not. Only works on a server.

### isQuiet

Whether the scripts should be quiet (no logs). Only works on a server.

### isDebug

Returns true if the log level is debug. Works on both the browser and the server.

### isTrace

Returns true if the log level is trace. Works on both the browser and the server.
