#!/bin/bash

perl -i -pe's|cdn.samuraime.com/katana/index.html|samuraime.com/index.html|g' ./packages/client/build/*.{js,json}
perl -i -pe's|cdn.samuraime.com/katana/service-worker.js|samuraime.com/service-worker.js|g' ./packages/client/build/*.{js,json}

# remove registerNavigationRoute in service-worker.js
perl -i -0pe's|workbox.routing.registerNavigationRoute.+||gs' ./packages/client/build/service-worker.js
