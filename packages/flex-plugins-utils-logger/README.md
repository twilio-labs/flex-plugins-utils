![npm](https://img.shields.io/npm/v/flex-plugins-utils-logger.svg?style=flat-square)
![npm](https://img.shields.io/npm/dt/flex-plugins-utils-logger.svg?style=flat-square)
[![NpmLicense](https://img.shields.io/npm/l/flex-plugins-utils-logger.svg?style=flat-square)](../../LICENSE)

# Flex Plugin Utils Logger

General logger methods used by various Flex Plugins repos

## Modules

This library provides the following modules

### logger

The `logger` provides the following methods:

* `debug`           Only logs if `DEBUG=true` or `TRACE=true` is set
* `info`            Logs the text as info level
* `warning`         Logs the text as warning level in yellow
* `error`           Logs the text as error level in red
* `trace`           Only logs if `TRACE=true` is set; this is the most verbose mode
* `success`         Logs the text in info level in green
* `newline`         Adds a new line
* `notice`          Logs the text as info level in cyan
* `clearTerminal`   Clears the terminal window if `PERSIST_TERMINAL=true` is not set

All of these log commands support some basic formatting:

**bold**

Texts can be bolded using `**the text to bold**`.

**italic**

Texts can be italicized using `*the text to italicize*`.

**success**

Texts can be shown in green using `++the text in green++`.

**warning**

Texts can be shown in yellow using `!!the text in yellow!!`.

**error**

Texts can be shown in red using `--the text in red--`.

**link**

Texts can be shown in blue using `[[the text in blue]]`.

**code**

Texts can be shown in magenta using `{{the text in blue}}`.
