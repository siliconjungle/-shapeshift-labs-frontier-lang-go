# @shapeshift-labs/frontier-lang-go Agent Notes

This package is a source-language adapter for Frontier Lang. Keep it small: package-level metadata, typed helper APIs, tests, fuzz, and benchmarks belong here; AST normalization stays in `@shapeshift-labs/frontier-lang-compiler`.

Release credentials for npm publish work live in `/Users/james/Documents/json-diff/.env` as `NPM_TOKEN` / `NODE_AUTH_TOKEN`. Never print token values, commit them, or write them into this repo. Load that env file into a shell and use a temporary npm userconfig for publish checks, then delete it.

Use `main` as the default GitHub branch. This package should publish as `@shapeshift-labs/frontier-lang-go` and push to `git@github.com:siliconjungle/-shapeshift-labs-frontier-lang-go.git`.
