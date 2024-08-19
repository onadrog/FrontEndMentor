#!/usr/bin/env bash

case "$2" in
	--scss)
		mkdir $1/fonts && \
			cp lazy/style.scss $1/
		;;
    --css)
        cp lazy/style.css $1/
        ;;
    --css-ts)
        mkdir $1/src && \
            touch $1/src/app.ts && \
            cp lazy/tsconfig.json $1 && \
            cp lazy/style.css $1
        ;;
	*)
		mkdir $1/fonts && \
			cp lazy/style.scss $1/ && \
			cp lazy/tsconfig.json $1/ && \
			mkdir $1/src && \
			touch $1/src/app.ts
			;;
esac

echo 'Boilerplate done in '$1
exit 0
