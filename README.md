# Firebase HTTPS receiver for Lightbug API quickstart

## Introduction

The function `lbListener` is created to receive HTTP POST messages from LB API.

The URL of this function would be something like `https://us-central1-AAAA-BBBBB.cloudfunctions.net/lbListener`

This URL should be used as the endpoint for an API Push in the Lightbug Cloud.

**Further reading**

 - [Lightbug Cloud API Push (HTTP Webhooks) documentation](https://docs.lightbug.io/apps/cloud/account/notifications#api-push)
 - [Firebase SDK for Cloud Functions](https://firebase.google.com/docs/functions)


## Initial setup, build tools and dependencies

### 1. Clone this repo

Clone or download this repo and navigate into the directory

### 2. Install the Firebase CLI and enable Functions on your Firebase CLI

You need to have installed the Firebase CLI. If you haven't run:

```bash
npm install -g firebase-tools
```

Login to firebase (if not already done) using
```bash
firebase login
```

### 3. Create a Firebase project and configure the quickstart

Create a Firebase Project on the [Firebase Console](https://console.firebase.google.com).

Set up your Firebase project by running `firebase use --add`, select your Project ID and follow the instructions.

## Deploy the app

First you need to install the `npm` dependencies of the functions:

```bash
cd functions
npm install
cd ..
```

And deploy to Firebase using the following command:

```bash
firebase deploy
```

This deploys and activates the `lbListener` Function.

**Note**: The first time you call `firebase deploy` on a new project with functions, it will take longer than usual


## View results

The example will create collections under `/incoming` - view data there

## License

© Lightbug Ltd, 2020. Licensed under an [Apache-2](./LICENSE) license.
