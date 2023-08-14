#!/bin/bash
set -e

# Use config distribution file to create new local configuration
cp ./docker/php/.env.local ./
