#!/bin/bash

perl -i -pe's|id="preloadState"|src="/preloadState.js"|g' build/index.html
