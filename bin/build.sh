#!/bin/bash

# This build script was created in order to avoid having to declare npm deps required to build source as dev dependencies
npm install rollup@2.22.1 @rollup/plugin-commonjs@14.0.0 @rollup/plugin-node-resolve@8.4.0 rollup-plugin-peer-deps-external@2.2.3 rollup-plugin-postcss@3.1.3 rollup-plugin-typescript2@0.27.1
./node_modules/rollup/dist/bin/rollup -c
./node_modules/rollup/dist/bin/rollup -c rollup.config.demo.js && cp demo/index.html docs/demo