[![Test CI](https://github.com/neko1101/adasms-sdk/workflows/Test%20CI/badge.svg)](https://github.com/neko1101/adasms-sdk/actions?query=workflow:"Test+CI")
[![GitHub release](https://img.shields.io/github/release/neko1101/adasms-sdk?include_prereleases=&sort=semver&color=blue)](https://github.com/neko1101/adasms-sdk/releases/)
[![License](https://img.shields.io/badge/License-MIT-blue)](#license)
[![issues - adasms-sdk](https://img.shields.io/github/issues/neko1101/adasms-sdk)](https://github.com/neko1101/adasms-sdk/issues)

# adasms-sdk
This is Non-Official a [AdaSMS](https://adasms.com/register) SDK.
 
[![https://nodei.co/npm/adasms-sdk.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/adasms-sdk.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/adasms-sdk)

| Statements                  | Branches                | Functions                 | Lines             |
| --------------------------- | ----------------------- | ------------------------- | ----------------- |
| ![Statements](https://img.shields.io/badge/statements-83.17%25-yellow.svg?style=flat&logo=jest) | ![Branches](https://img.shields.io/badge/branches-66.66%25-red.svg?style=flat&logo=jest) | ![Functions](https://img.shields.io/badge/functions-100%25-brightgreen.svg?style=flat&logo=jest) | ![Lines](https://img.shields.io/badge/lines-83.17%25-yellow.svg?style=flat&logo=jest) |


## AdaSMS
 The Best SMS Provider for Business
 Adasms gives you the best for business experience with all the features you need. The days of overpriced SMS is over, our price is as low as MYR 0.08/SMS to all networks. Free to register and no account fees.

 Sign-up at [https://terminal.adasms.com/register](https://terminal.adasms.com/register) and get started as low as  MYR 10.00!

 MYR 10 = 10,000 Credits

 MYR 50 = 50,000 Credits

## Features/Functions
- Rate: MYR 0.08/SMS to all networks
- Core Functions: 
    - `sendSMS()`
    - `getCreditBalance()`
    - `listScheduledMessage()`
    - `deleteScheduledMessage()`
- Phonebook Features:
    - `createLead()`
    - `getLeads()`
    - `deleteLead()`
    - `createContact()`
    - `getContactList()`
    - `deleteContact()`

## Installing

### Environment Variable
`.env`
```
ADASMS_APPLICATION_SECRET=<your-adasms-application-secret>
```

### Package Manager

Using npm:

```bash
$ npm install adasms-sdk
```

Using bower:

```bash
$ bower install adasms-sdk
```

Using yarn:

```bash
$ yarn add adasms-sdk
```

Using pnpm:

```bash
$ pnpm add adasms-sdk
```

Once the package is installed, you can import the library using `import` or `require` approach:

```js
import { Client } from 'adasms-sdk'
```

You can also use the default export, since the named export is just a re-export from the adasms-sdk factory:

```js
import Client from 'adasms-sdk'
````

If you use `require` for importing, **only default export is available**:

```js
const Client = require('adasms-sdk')
```

## Example
`es6`
```js
import { Client } from 'adasms-sdk'

const client = new Client()
/**
 *  If you prefer to hardcode token (not secure)
 *  const client = new Client({ token: <your-adasms-application-secret> })
 */

const response = await client.getCreditBalance()
console.log(response.balance)
// output: { balance: 10000 }
```

`Typescript`
```js
import Client, { ClientOption, SendSMSObject } from 'adasms-sdk'

const option: ClientOption = {
    token: process.env.ADASMS_APPLICATION_SECRET
}
const client = new Client(option)

const params: SendSMSObject = {
    phone: "60199126212",
    message: "Hello from adasms-sdk",
    previewMode: true, // dry-run
}
const response = await client.sendSMS()
console.log(response)
/**
 * { "success": true, 
 *      "message": {
 *          "message": "Hello from @adasms\/client",
 *          "price": 80,
 *          "length": 25,
 *          "total_sent": 1,
 *          "recipients": 1,
 *          "phones": ["+60199126212"],
 *          "message_per_recipient": 1,
 *          "send_at": null,
 *          "lead_id": null,
 *          "preview": true
 *      }
 *  }
 */ 
```

# Contributing

I am open to, and grateful for, any contributions made by the community. By contributing to this repo, you agree to abide by the [code of conduct](https://github.com/neko1101/adasms-sdk/blob/main/CODE_OF_CONDUCT.md).
