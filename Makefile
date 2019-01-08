BUILD_DIR=dist/

.PHONY: all

all: clean build_esm build_cjs build_styles
	@sed 's/"dist\//"/g' package.json > dist/package.json

build_pre:
	@echo "Creating $(BUILD_DIR)"
	@mkdir -p $(BUILD_DIR)

build_esm: build_pre
	@echo "Building ESM to $(BUILD_DIR)"
	@npx tsc --project ./tsconfig.build.json

# build_cjs: build_esm
build_cjs:
	@echo "Building CJS to $(BUILD_DIR)"
	npx rollup -c rollup.config.js

build_styles: build_pre
	@echo "Building styles to $(BUILD_DIR)"
	@cp src/*.sass dist/
	@npx node-sass --importer=node_modules/node-sass-tilde-importer dist/index.sass dist/index.css

clean:
	@echo "Deleting $(BUILD_DIR)"
	@rm -rf dist/

publish:
	@cd $(BUILD_DIR) && npm publish

help:
	@echo "Makefile usage (<BUILD_DIR>: $(BUILD_DIR)):"
	@echo "\nBUILD"
	@echo "  \`make\`:                  build all"
	@echo "  \`make build_esm\`:        package for ESM"
	@echo "  \`make build_cjs\`:        package for CJS"
	@echo "  \`make build_styles\`:     copy and compile sass"
	@echo "  \`make build_pre\`:        create <BUILD_DIR>"

	@echo "\nCLEAN"
	@echo "  \`make clean\`:            delete <BUILD_DIR>"

	@echo "\nETC"
	@echo "  \`make help\`:             show this message"
	@echo "  \`make publish\`:          publish to npm"
