BUILD_DIR=dist/

all: clean build_core build_storybook

build_pre:
	@echo "Creating $(BUILD_DIR)"
	@mkdir -p $(BUILD_DIR)

build_core: build_pre
	@echo "Building core"
	@npx webpack --config core/webpack.config.js --mode production

build_storybook: build_pre
	@echo "Building storybook"
	@npx build-storybook -c stories/.config -o $(BUILD_DIR)/stories

clean:
	@echo "Deleting $(BUILD_DIR)"
	@rm -rf $(BUILD_DIR)

publish:
	@echo "Publishing to GitHub pages"
	@npx gh-pages -d dist -m \"Deploy Docs [skip ci]\"

test: lint

lint:
	@echo "Running linter"
	@npx tslint --project .

run_core:
	@echo "Running core"
	@npx webpack-dev-server --config core/webpack.config.js --mode development --open

run_storybook:
	@echo "Running storybook"
	@npx start-storybook -p 9001 -c stories/.config

help:
	@echo "Makefile usage (<BUILD_DIR>: $(BUILD_DIR)):"
	@echo "\nBUILD"
	@echo "  \`make\`:                  build all"
	@echo "  \`make clean\`:            delete <BUILD_DIR>"
	@echo "  \`make build_core\`:       package core (homepage)"
	@echo "  \`make build_storybook\`:  package storybook"
	@echo "  \`make build_pre\`:        create <BUILD_DIR>"

	@echo "\nTEST"
	@echo "  \`make test\`:             test all (only lint for now)"
	@echo "  \`make lint\`:             run tslint"

	@echo "\nRUN"
	@echo "  \`make run_core\`:         run core (homepage)"
	@echo "  \`make run_storybook\`:    run storybook"

	@echo "\nETC"
	@echo "  \`make help\`:             show this message"
	@echo "  \`make publish\`:          publish to GitHub Pages"

