vorpal-as-default
====

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Code Climate](https://codeclimate.com/github/ialpert/vorpal-as-default/badges/gpa.svg)](https://codeclimate.com/github/ialpert/vorpal-as-default)
[![Test Coverage](https://codeclimate.com/github/ialpert/vorpal-as-default/badges/coverage.svg)](https://codeclimate.com/github/ialpert/vorpal-as-default/coverage)
[![Issue Count](https://codeclimate.com/github/ialpert/vorpal-as-default/badges/issue_count.svg)](https://codeclimate.com/github/ialpert/vorpal-as-default)

## Proposal

This plugin is useful to trigger Vorpal task in case it runs without any specificly defined task. For instance you can use it to bootstrap your application or do initial setup. 

## Installation

```sh
$ npm install vorpal-as-default --save
```

## Usage

```javascript
import Vorpal from 'vorpal';
import asDefault from 'vorpal-as-default'

const vorpal = Vorpal();

vorpal
    .command('setup')
    .action(function (args, next) {
      this.log('setup task');
      next();
    });


vorpal
  .show()
  .parse(process.argv)
  .use(asDefault, 'setup');

```
