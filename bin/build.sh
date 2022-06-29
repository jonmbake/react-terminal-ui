#!/bin/bash

# This build script was created in order to avoid having to declare npm deps required to build source as dev dependencies
npm install --no-save rollup@2.75.7 @rollup/plugin-commonjs@22.0.1 @rollup/plugin-node-resolve@13.3.0  rollup-plugin-peer-deps-external@2.2.4 rollup-plugin-postcss@4.0.2 rollup-plugin-typescript2@0.27.1
./node_modules/rollup/dist/bin/rollup -c
./node_modules/rollup/dist/bin/rollup -c rollup.config.demo.js && cp demo/index.html docs/demo