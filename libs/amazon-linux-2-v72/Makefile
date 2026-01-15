.PHONY: build dist

DIST_PHP=72
DIST_PATH=./native
DIST_PHP_PATH=${DIST_PATH}/php
DIST_PHP_MODULES_PATH=${DIST_PHP_PATH}/modules
DIST_LIB_PATH=${DIST_PATH}/lib

DOCKER_IMAGE=libphp/amazon-linux-2-v72
DOCKER_CONTAINER=libphp-amazon-linux-2-v72
DOCKER_PLATFORM=linux/amd64

# ######################
# Building Docker images
# ######################

build:
	docker buildx build --platform ${DOCKER_PLATFORM} -t ${DOCKER_IMAGE} -f ./build/Dockerfile ./build

# #################################################
# Separate PHP bins + shared libs from Docker image
# #################################################

dist: build
	# Cleanup distribution folder
	rm -rf ${DIST_PHP_PATH}
	rm -rf ${DIST_LIB_PATH}
	mkdir -p ${DIST_PHP_PATH}
	mkdir -p ${DIST_LIB_PATH}
	mkdir -p ${DIST_PHP_MODULES_PATH}

	# Remove old PHP container
	docker rm --force ${DOCKER_CONTAINER} || true
	# Run new one PHP container
	docker run -it -d --platform ${DOCKER_PLATFORM} --name ${DOCKER_CONTAINER} ${DOCKER_IMAGE} /bin/bash

	# Copy composer, php, php-cgi, php-fpm binaries
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/bin/composer > ${DIST_PHP_PATH}/composer
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/bin/php > ${DIST_PHP_PATH}/php
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/bin/php-cgi > ${DIST_PHP_PATH}/php-cgi
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/sbin/php-fpm > ${DIST_PHP_PATH}/php-fpm

	# Make these binaries executable
	chmod +x ${DIST_PHP_PATH}/composer
	chmod +x ${DIST_PHP_PATH}/php
	chmod +x ${DIST_PHP_PATH}/php-cgi
	chmod +x ${DIST_PHP_PATH}/php-fpm

	# Copy php.ini & php-fpm.ini
	docker exec ${DOCKER_CONTAINER} /bin/cat /var/task/php/php.ini > ${DIST_PHP_PATH}/php.ini
	docker exec ${DOCKER_CONTAINER} /bin/cat /var/task/php/php-fpm.ini > ${DIST_PHP_PATH}/php-fpm.ini

	# Copy all compiled extensions
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/apcu.so > ${DIST_PHP_MODULES_PATH}/apcu.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/bcmath.so > ${DIST_PHP_MODULES_PATH}/bcmath.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/bz2.so > ${DIST_PHP_MODULES_PATH}/bz2.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/calendar.so > ${DIST_PHP_MODULES_PATH}/calendar.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/ctype.so > ${DIST_PHP_MODULES_PATH}/ctype.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/curl.so > ${DIST_PHP_MODULES_PATH}/curl.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/dom.so > ${DIST_PHP_MODULES_PATH}/dom.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/ds.so > ${DIST_PHP_MODULES_PATH}/ds.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/exif.so > ${DIST_PHP_MODULES_PATH}/exif.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/fileinfo.so > ${DIST_PHP_MODULES_PATH}/fileinfo.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/ftp.so > ${DIST_PHP_MODULES_PATH}/ftp.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/gd.so > ${DIST_PHP_MODULES_PATH}/gd.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/gettext.so > ${DIST_PHP_MODULES_PATH}/gettext.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/iconv.so > ${DIST_PHP_MODULES_PATH}/iconv.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/imap.so > ${DIST_PHP_MODULES_PATH}/imap.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/intl.so > ${DIST_PHP_MODULES_PATH}/intl.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/json.so > ${DIST_PHP_MODULES_PATH}/json.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/mbstring.so > ${DIST_PHP_MODULES_PATH}/mbstring.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/mysqli.so > ${DIST_PHP_MODULES_PATH}/mysqli.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/mysqlnd.so > ${DIST_PHP_MODULES_PATH}/mysqlnd.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/opcache.so > ${DIST_PHP_MODULES_PATH}/opcache.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/pdo.so > ${DIST_PHP_MODULES_PATH}/pdo.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/pdo_mysql.so > ${DIST_PHP_MODULES_PATH}/pdo_mysql.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/pdo_pgsql.so > ${DIST_PHP_MODULES_PATH}/pdo_pgsql.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/pdo_sqlite.so > ${DIST_PHP_MODULES_PATH}/pdo_sqlite.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/pgsql.so > ${DIST_PHP_MODULES_PATH}/pgsql.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/phar.so > ${DIST_PHP_MODULES_PATH}/phar.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/simplexml.so > ${DIST_PHP_MODULES_PATH}/simplexml.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/soap.so > ${DIST_PHP_MODULES_PATH}/soap.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/sockets.so > ${DIST_PHP_MODULES_PATH}/sockets.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/sodium.so > ${DIST_PHP_MODULES_PATH}/sodium.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/sqlite3.so > ${DIST_PHP_MODULES_PATH}/sqlite3.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/ssh2.so > ${DIST_PHP_MODULES_PATH}/ssh2.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/swoole.so > ${DIST_PHP_MODULES_PATH}/swoole.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/tokenizer.so > ${DIST_PHP_MODULES_PATH}/tokenizer.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/xml.so > ${DIST_PHP_MODULES_PATH}/xml.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/xmlreader.so > ${DIST_PHP_MODULES_PATH}/xmlreader.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/xmlrpc.so > ${DIST_PHP_MODULES_PATH}/xmlrpc.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/xmlwriter.so > ${DIST_PHP_MODULES_PATH}/xmlwriter.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/xsl.so > ${DIST_PHP_MODULES_PATH}/xsl.so

	# Copy static libraries. Needed by the extensions above.
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libXpm.so.4 > ${DIST_LIB_PATH}/libXpm.so.4
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libargon2.so.0 > ${DIST_LIB_PATH}/libargon2.so.0
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libc-client.so.2007 > ${DIST_LIB_PATH}/libc-client.so.2007
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libedit.so.0 > ${DIST_LIB_PATH}/libedit.so.0
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libgd.so.3 > ${DIST_LIB_PATH}/libgd.so.3
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libonig.so.5 > ${DIST_LIB_PATH}/libonig.so.5
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libpq.so.5 > ${DIST_LIB_PATH}/libpq.so.5
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libsodium.so.23 > ${DIST_LIB_PATH}/libsodium.so.23
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libtiff.so.3 > ${DIST_LIB_PATH}/libtiff.so.3
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libwebp.so.5 > ${DIST_LIB_PATH}/libwebp.so.5

	# Remove temporary PHP container
	docker rm --force ${DOCKER_CONTAINER} || true
