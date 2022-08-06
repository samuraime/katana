#!/bin/bash

perl -i -pe's|id="preloadState"|src="/preloadState.js"|g' dist/index.html
