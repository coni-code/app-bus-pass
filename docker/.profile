dcompose() {
    source "$(cd -- "$(dirname -- "$BASH_SOURCE")" && pwd)/.env"

    DB_ROOT_PASSWORD=root docker compose --env-file="$(cd -- "$(dirname -- "$BASH_SOURCE")" && pwd)/.env" "$@"
}

dstart() {
    dcompose up --build "$@"
}

dstop() {
    dcompose down --remove-orphans "$@"
}

dexec() {
    source "$(cd -- "$(dirname -- "$BASH_SOURCE")" && pwd)/.env"

    docker exec --env-file="$(cd -- "$(dirname -- "$BASH_SOURCE")" && pwd)/.env" -it "$@"
}

dphp() {
    dexec -uwww-data "$(_find-cid php)" php "$@"
}

dconsole() {
    dphp bin/console "$@"
}

dcomposer() {
    dphp /usr/bin/composer "$@"
}

dmysql() {
    source "$(cd -- "$(dirname -- "$BASH_SOURCE")" && pwd)/.env"

    dexec "$(_find-cid mysql)" mysql -h$DB_HOST -P$DB_PORT -u$DB_USERNAME -p$DB_PASSWORD $DB_NAME "$@"
}

dnode() {
    dexec "$(_find-cid node)" node "$@"
}

dyarn() {
    dexec "$(_find-cid node)" yarn "$@"
}

_find-cid() {
    source "$(cd -- "$(dirname -- "$BASH_SOURCE")" && pwd)/.env"

    service="$1"
    name=$(docker ps -f name="$service" --format={{.Names}})
    if [ "$name" == "" ]; then
        echo ""
        echo "Expected to find running '${APP_NAME}_$service' container for '$service' service"
        echo "Seems like you forgot to start containers using 'dstart'"
        exit 1
    elif [[ "$name" != "${APP_NAME}_"* ]]; then
        echo ""
        echo "You wanted to access '${APP_NAME}_$service' container, but actually accessing the '$name'";
        echo "To fix this, first you need to stop all '${name%$service}*' containers, then start '${APP_NAME}_*' ones with 'dstart'"
        exit 1
    fi

    docker ps -f name="$service" --quiet
}
