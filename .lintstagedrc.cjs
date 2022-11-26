module.exports = {
  "src/**/*.ts": [
    "prettier --write",
    "eslint",
    "git add"
  ],
}