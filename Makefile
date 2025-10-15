DEBUG=

# Tell make to ignore existing folders and allow overwriting existing files
.PHONY: modules literal

# Must format with tabs not spaces
literal:
	deno run --allow-read --allow-env --allow-net --allow-write --allow-run --unstable ../literal/deno/make-literal.js ./ debug

modules:
	@rm -f deno.lock
	rm -rf ./build

	deno run --allow-read --allow-write --allow-net --allow-env --allow-run --no-lock --reload --config ./deno.json https://cdn.jsdelivr.net/gh/stephband/fn@master/deno/make-modules.js ./build/ \
		module.js
	deno run --allow-read --allow-write --allow-net --allow-env --allow-run --no-lock --reload --config ./deno.json https://cdn.jsdelivr.net/gh/stephband/fn@master/deno/make-css.js ./build/ \
		module.css

	@rm -f deno.lock
