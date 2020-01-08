#!/bin/bash

perl -i -pe's|cdn.samuraime.com/katana/index.html|samuraime.com/index.html|g' ./frontend/build/*.{js,json}
perl -i -pe's|cdn.samuraime.com/katana/service-worker.js|samuraime.com/service-worker.js|g' ./frontend/build/*.{js,json}

# remove registerNavigationRoute in service-worker.js
perl -i -0pe's|workbox.routing.registerNavigationRoute.+||gs' ./frontend/build/service-worker.js
