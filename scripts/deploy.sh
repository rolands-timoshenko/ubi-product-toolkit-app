#!/bin/bash

build_args=()
if [ -f .env ]; then
    while IFS='=' read -r key value; do
        if [[ -n "$key" && ! "$key" =~ ^# ]]; then
            export "$key=$value"

            if [[ "$key" == VITE_* ]]; then
                build_args+=(--build-arg "$key=$value")
            else
                fly secrets set "$key=$value"
            fi
        fi
    done < <(grep -v '^#' .env)
fi

fly deploy "${build_args[@]}"