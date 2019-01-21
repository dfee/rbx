build_dir = dist

.PHONY: all build_pre build_esm build_cjs build_styles clean publish test test_lint test_unit ci_publish help

help:
	@echo "Makefile usage (<BUILD_DIR>: $(BUILD_DIR)):"
	@echo "\nBUILD"
	@echo "  \`make build\`:            build all"
	@echo "  \`make clean\`:            delete <BUILD_DIR>"
	@echo "  \`make build_esm\`:        package for ESM"
	@echo "  \`make build_cjs\`:        package for CJS"
	@echo "  \`make build_styles\`:     copy and compile sass"
	@echo "  \`make build_pre\`:        create <BUILD_DIR>"

	@echo "\nTEST"
	@echo "  \`make test\`:             test all (lint & unit)"
	@echo "  \`make lint\`:             run tslint"
	@echo "  \`make test_unit\`:        run jest unit tests"

	@echo "\nDOCS"
	@echo "  \`make docs_dev\`:         run docz"
	@echo "  \`make docs_build\`:       build docz"
	@echo "  \`make docs_publish\`:     publish to GitHub Pages"

	@echo "\nETC"
	@echo "  \`make help\`:             show this message"
	@echo "  \`make publish\`:          publish to npm"
	@echo "  \`make ci_publish\`:       publish coverage"


### Build
build: clean build_esm build_cjs build_styles
	@sed 's/"dist\//"/g' package.json > $(BUILD_DIR)/package.json
	@sed -E 's/\[A quick look\]\(.+ "/[A quick look](https:\/\/raw.githubusercontent.com\/dfee\/rbx\/v2.0.0-beta.0\/src\/__docs__\/public\/demo.png "/' README.md > $(BUILD_DIR)/README.md

build_pre:
	@echo "Creating $(BUILD_DIR)"
	@mkdir -p $(BUILD_DIR)

build_esm: build_pre
	@echo "Building ESM to $(BUILD_DIR)"
	@npx tsc --project ./tsconfig.build.json

build_cjs: build_esm
	@echo "Building CJS to $(BUILD_DIR)"
	npx rollup -c rollup.config.js

build_styles: build_pre
	@echo "Building styles to $(BUILD_DIR)"
	@cp src/*.sass $(BUILD_DIR)/
	@npx node-sass --importer=node_modules/node-sass-tilde-importer $(BUILD_DIR)/index.sass $(BUILD_DIR)/index.css

clean:
	@echo "Deleting $(BUILD_DIR)"
	@rm -rf $(BUILD_DIR)

### Publish
publish:
	@echo "Publishing to NPM"
	@cd $(BUILD_DIR) && npm publish

### Test
test: lint test_unit

lint:
	@echo "Running linter"
	@npx tslint --project .

test_unit:
	@echo "Running tests"
	@npx jest --coverage

### CI
ci_publish:
	@echo "Publishing coverage"
	@cat ./.coverage/lcov.info | npx coveralls


### Docs
docs_dev:
	@echo "Running docs dev"
	@npx docz dev

docs_build:
	@echo "Running docs build"
	@npx docz build

docs_publish:
	@echo "Publishing to GitHub pages"
	@npx gh-pages -d .docz/dist -m \"Deploy Docs [skip ci]\"

### Example
examples_test: examples_test_with_create_react_app \
	examples_test_with_create_react_app_typescript \
	examples_test_with_customization \
	examples_test_with_script

examples_test_with_create_react_app:
	@cd examples/with-create-react-app/ && npm i
	@cd examples/with-create-react-app/ && CI=true npm run test

examples_test_with_create_react_app_typescript:
	@cd examples/with-create-react-app-typescript/ && npm i
	@cd examples/with-create-react-app-typescript/ && CI=true npm run test

examples_test_with_customization:
	@cd examples/with-customization/ && npm i
	@cd examples/with-customization/ && CI=true npm run test

examples_test_with_script:
	@cd examples/with-script/ && npm i
	@cd examples/with-script/ && { npm run start & echo $$! > /tmp/example-with-script.pid; }
	@cd examples/with-script/ && CI=true npm run test
	@cat /tmp/example-with-script.pid | xargs kill
