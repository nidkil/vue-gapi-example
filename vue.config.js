import * as process from ".eslintrc";

module.exports = {
  baseUrl:
    process.env.NODE_ENV === "production"
      ? "https://github.com/nidkil/vue-gapi-example/"
      : "/"
};
