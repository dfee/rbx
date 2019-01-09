BUILD_DIR=dist

.PHONY: all build_pre build_esm build_cjs build_styles clean publish test test_lint test_unit ci_publish help

all: clean build_esm build_cjs build_styles
	@sed 's/"dist\//"/g' package.json > $(BUILD_DIR)/package.json

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

publish:
	@echo "Publishing to NPM"
	@cd $(BUILD_DIR) && npm publish

test: lint test_unit

lint:
	@echo "Running linter"
	@npx tslint --project .

test_unit:
	@echo "Running tests"
	@npx jest --coverage

ci_publish:
	@echo "Publishing coverage"
	@cat ./.coverage/lcov.info | npx coveralls

help:
	@echo "Makefile usage (<BUILD_DIR>: $(BUILD_DIR)):"
	@echo "\nBUILD"
	@echo "  \`make\`:                  build all"
	@echo "  \`make clean\`:            delete <BUILD_DIR>"
	@echo "  \`make build_esm\`:        package for ESM"
	@echo "  \`make build_cjs\`:        package for CJS"
	@echo "  \`make build_styles\`:     copy and compile sass"
	@echo "  \`make build_pre\`:        create <BUILD_DIR>"

	@echo "\nTEST"
	@echo "  \`make test\`:             test all (lint & unit)"
	@echo "  \`make lint\`:             run tslint"
	@echo "  \`make test_unit\`:        run jest unit tests"

	@echo "\nETC"
	@echo "  \`make help\`:             show this message"
	@echo "  \`make publish\`:          publish to npm"
	@echo "  \`make ci_publish\`:       publish coverage"
