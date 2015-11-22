#!/usr/bin/env sh
npm run build
build_num=$(cd build && git log --oneline | wc -l)
build_num=$(( $build_num + 1 ))

cd build && \
    git add . && \
    git commit -m "build #$build_num" && \
    git push origin gh-pages
