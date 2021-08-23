const PostmanEnvironmentsApi = require("postman-api-client").EnvironmentsApi;

const postmanEnvironmentsApi = new PostmanEnvironmentsApi();

module.exports = {
  create(apiKey, environment, opts, cb) {
    return postmanEnvironmentsApi.createEnvironment(
      apiKey,
      { environment },
      opts,
      cb
    );
  },
  update(apiKey, uid, environment, cb) {
    return postmanEnvironmentsApi.updateEnvironment(
      apiKey,
      uid,
      { environment },
      cb
    );
  },
};
