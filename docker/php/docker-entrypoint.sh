#!/bin/bash
set -e

sh docker/php/copy-configs.sh
sh docker/php/setup-composer.sh

composer install

if [ "$( find ./migrations -iname '*.php' -print -quit )" ]; then
    bin/console doctrine:migrations:migrate --no-interaction
fi

php-fpm
