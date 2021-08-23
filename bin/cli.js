#!/usr/bin/env node

const { readFileSync } = require("fs");

const program = require("commander");
const collection = require("../lib/collection");
const environment = require("../lib/environment");

function fileToJSON(value) {
  return JSON.parse(readFileSync(value).toString());
}

program
  .version(require("../package.json").version, "-v, --version")
  .option(
    "-c, --collection <collection>",
    "The Postman v2 collection (JSON format) to be created/updated. If --collection-uid option is omitted, it will attempt to create the collection",
    fileToJSON
  )
  .option(
    "-e, --environment <environment>",
    "The Postman Environment (JSON format) to be created/updated. If --environment-uid option is omitted, it will attempt to create the environment",
    fileToJSON
  )
  .option("--collection-uid <collectionUid>", "The Postman Collection uid")
  .option("--environment-uid <environmentUid>", "The Postman Environment uid")
  .option("-k, --api-key <apiKey>", "The Postman Team API Key")
  .option(
    "-w, --workspace <workspace>",
    "Postman Workspace to be used. Defaults to Personal Workspace"
  );

program.parse(process.argv);

if (!program.apiKey) {
  if (!process.env.POSTMAN_API_KEY) {
    throw new Error(
      "API Key is mandatory! -k <value> or POSTMAN_API_KEY env var"
    );
  } else {
    program.apiKey = process.env.POSTMAN_API_KEY;
  }
}

if (!program.collection && !program.environment) {
  throw new Error(
    "You didn't provide a collection nor an environment! What are you trying to do exactly?"
  );
}

if (program.collection) {
  if (program.collectionUid) {
    collection.update(
      program.apiKey,
      program.collectionUid,
      program.collection,
      (error, data, response) => {
        if (error) {
          throw error;
        }

        if (response.statusCode === 200) {
          // eslint-disable-next-line no-console
          console.log(
            `Collection ${data.collection.uid} was successfully updated!`
          );
        }
      }
    );
  } else {
    collection.create(
      program.apiKey,
      program.collection,
      { workspace: program.workspace },
      (error, data, response) => {
        if (error) {
          throw error;
        }

        if (response.statusCode === 200) {
          // eslint-disable-next-line no-console
          console.log(
            `Collection ${data.collection.uid} was successfully created!`
          );
        }
      }
    );
  }
}

if (program.environment) {
  if (program.environmentUid) {
    environment.update(
      program.apiKey,
      program.environmentUid,
      program.environment,
      (error, data, response) => {
        if (error) {
          throw error;
        }

        if (response.statusCode === 200) {
          // eslint-disable-next-line no-console
          console.log(
            `Environment ${data.environment.uid} was successfully updated!`
          );
        }
      }
    );
  } else {
    environment.create(
      program.apiKey,
      program.environment,
      { workspace: program.workspace },
      (error, data, response) => {
        if (error) {
          throw error;
        }

        if (response.statusCode === 200) {
          // eslint-disable-next-line no-console
          console.log(
            `Environment ${data.environment.uid} was successfully created!`
          );
        }
      }
    );
  }
}
