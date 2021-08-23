const PostmanCollectionsApi = require("postman-api-client").CollectionsApi;

const postmanCollectionsApi = new PostmanCollectionsApi();

module.exports = {
  create(apiKey, collection, opts, cb) {
    return postmanCollectionsApi.createCollection(
      apiKey,
      { collection },
      opts,
      cb
    );
  },
  update(apiKey, uid, collection, cb) {
    return postmanCollectionsApi.updateCollection(
      apiKey,
      uid,
      { collection },
      cb
    );
  },
};
