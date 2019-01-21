build_dir = ./dist

### Build
all: clean esm cjs styles
	@sed 's/"dist\//"/g' package.json > $(build_dir)/package.json
	@sed -E 's/\[A quick look\]\(.+ "/[A quick look](https:\/\/raw.githubusercontent.com\/dfee\/rbx\/v2.0.0-beta.0\/src\/__docs__\/public\/demo.png "/' README.md > $(build_dir)/README.md
.PHONY: all

${build_dir}:
	@echo "Creating $(build_dir)"
	@mkdir -p $(build_dir)

esm: ${build_dir}
	@echo "Building ESM to $(build_dir)"
	@npx tsc --project ./tsconfig.build.json
.PHONY: esm

cjs: esm
	@echo "Building CJS to $(build_dir)"
	npx rollup -c rollup.config.js
.PHONY: cjs

styles: ${build_dir}
	@echo "Building styles to $(build_dir)"
	@cp src/*.sass $(build_dir)/
	@npx node-sass --importer=node_modules/node-sass-tilde-importer $(build_dir)/index.sass $(build_dir)/index.css
.PHONY: styles

clean:
	@echo "Deleting $(build_dir)"
	@rm -rf $(build_dir)
.PHONY: clean

### Publish
publish:
	@echo "Publishing to NPM"
	@cd $(build_dir) && npm publish
.PHONY: publish

### Test
test: lint test-unit
.PHONY: test

lint:
	@echo "Running linter"
	@npx tslint --project .
.PHONY: lint

test-unit:
	@echo "Running tests"
	@npx jest --coverage
.PHONY: test-unit

### CI
ci-coverage-publish:
	@echo "Publishing coverage"
	@cat ./.coverage/lcov.info | npx coveralls
.PHONY: ci-publish

### Docs
docs:
	@echo "Running docs build"
	@npx docz build
.PHONY: docs

docs-dev:
	@echo "Running docs dev"
	@npx docz dev
.PHONY: docs-dev

docs-publish:
	@echo "Publishing to GitHub pages"
	@npx gh-pages -d .docz/dist -m \"Deploy Docs [skip ci]\"
.PHONY: docs-publish

### Example
examples-test: \
	examples-test-with-create-react-app \
	examples-test-with-create-react-app-typescript \
	examples-test-with-customization \
	examples-test-with-script
.PHONY: examples-test

examples-test-with-create-react-app:
	@cd examples/with-create-react-app/ && npm i
	@cd examples/with-create-react-app/ && CI=true npm run test
.PHONY: examples-test-with-create-react-app

examples-test-with-create-react-app-typescript:
	@cd examples/with-create-react-app-typescript/ && npm i
	@cd examples/with-create-react-app-typescript/ && CI=true npm run test
.PHONY: examples-test-with-create-react-app-typescript

examples-test-with-customization:
	@cd examples/with-customization/ && npm i
	@cd examples/with-customization/ && CI=true npm run test
.PHONY: examples-test-with-customization

examples-test-with-script:
	@cd examples/with-script/ && npm i
	@cd examples/with-script/ && { npm run start & echo $$! > /tmp/example-with-script.pid; }
	@cd examples/with-script/ && CI=true npm run test
	@cat /tmp/example-with-script.pid | xargs kill
.PHONY: examples-test-with-script

help:
	@echo "Makefile usage:"
	@echo "\nBUILD"
	@echo "  \`make\`:                  build all"
	@echo "  \`make publish\`:          publish to npm"
	@echo "  \`make test\`:             test all (lint & unit)"

	@echo "\nDOCS"
	@echo "  \`make docs\`:             build docs"
	@echo "  \`make docs-dev\`:         run docs"
	@echo "  \`make docs-publish\`:     publish to GitHub Pages"

	@echo "\nEXAMPLES"
	@echo "  \`make examples-test\`:    run tests on examples"

	@echo "\nETC"
	@echo "  \`make ci-publish\`:       publish coverage"
	@echo "  \`make help\`:             show this message"
.PHONY: help

