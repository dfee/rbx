const tasks = arr => arr.join(" && ");
module.exports = {
  hooks: {
    "pre-commit": tasks(["make test", "lint-staged"])
  }
};
