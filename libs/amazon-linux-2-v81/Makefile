.PHONY: build dist

DIST_PHP=81
DIST_PATH=./native
DIST_PHP_PATH=${DIST_PATH}/php
DIST_PHP_MODULES_PATH=${DIST_PHP_PATH}/modules
DIST_LIB_PATH=${DIST_PATH}/lib

DOCKER_IMAGE=libphp/amazon-linux-2-v81
DOCKER_CONTAINER=libphp-amazon-linux-2-v81
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
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/brotli.so > ${DIST_PHP_MODULES_PATH}/brotli.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/bz2.so > ${DIST_PHP_MODULES_PATH}/bz2.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/calendar.so > ${DIST_PHP_MODULES_PATH}/calendar.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/ctype.so > ${DIST_PHP_MODULES_PATH}/ctype.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/curl.so > ${DIST_PHP_MODULES_PATH}/curl.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/dom.so > ${DIST_PHP_MODULES_PATH}/dom.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/ds.so > ${DIST_PHP_MODULES_PATH}/ds.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/exif.so > ${DIST_PHP_MODULES_PATH}/exif.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/ffi.so > ${DIST_PHP_MODULES_PATH}/ffi.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/fileinfo.so > ${DIST_PHP_MODULES_PATH}/fileinfo.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/ftp.so > ${DIST_PHP_MODULES_PATH}/ftp.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/geoip.so > ${DIST_PHP_MODULES_PATH}/geoip.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/gettext.so > ${DIST_PHP_MODULES_PATH}/gettext.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/grpc.so > ${DIST_PHP_MODULES_PATH}/grpc.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/iconv.so > ${DIST_PHP_MODULES_PATH}/iconv.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/igbinary.so > ${DIST_PHP_MODULES_PATH}/igbinary.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/imap.so > ${DIST_PHP_MODULES_PATH}/imap.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/intl.so > ${DIST_PHP_MODULES_PATH}/intl.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/mbstring.so > ${DIST_PHP_MODULES_PATH}/mbstring.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/mongodb.so > ${DIST_PHP_MODULES_PATH}/mongodb.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/msgpack.so > ${DIST_PHP_MODULES_PATH}/msgpack.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/mysqli.so > ${DIST_PHP_MODULES_PATH}/mysqli.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/mysqlnd.so > ${DIST_PHP_MODULES_PATH}/mysqlnd.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/opcache.so > ${DIST_PHP_MODULES_PATH}/opcache.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/pdo_mysql.so > ${DIST_PHP_MODULES_PATH}/pdo_mysql.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/pdo_pgsql.so > ${DIST_PHP_MODULES_PATH}/pdo_pgsql.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/pdo_sqlite.so > ${DIST_PHP_MODULES_PATH}/pdo_sqlite.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/pdo.so > ${DIST_PHP_MODULES_PATH}/pdo.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/pgsql.so > ${DIST_PHP_MODULES_PATH}/pgsql.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/phar.so > ${DIST_PHP_MODULES_PATH}/phar.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/redis.so > ${DIST_PHP_MODULES_PATH}/redis.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/simplexml.so > ${DIST_PHP_MODULES_PATH}/simplexml.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/soap.so > ${DIST_PHP_MODULES_PATH}/soap.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/sodium.so > ${DIST_PHP_MODULES_PATH}/sodium.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/sqlite3.so > ${DIST_PHP_MODULES_PATH}/sqlite3.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/tokenizer.so > ${DIST_PHP_MODULES_PATH}/tokenizer.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/uuid.so > ${DIST_PHP_MODULES_PATH}/uuid.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/xml.so > ${DIST_PHP_MODULES_PATH}/xml.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/xmlreader.so > ${DIST_PHP_MODULES_PATH}/xmlreader.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/xmlrpc.so > ${DIST_PHP_MODULES_PATH}/xmlrpc.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/xmlwriter.so > ${DIST_PHP_MODULES_PATH}/xmlwriter.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/xsl.so > ${DIST_PHP_MODULES_PATH}/xsl.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/zip.so > ${DIST_PHP_MODULES_PATH}/zip.so

	# Copy static libraries. Needed by the extensions above.
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libaudit.so.1 > ${DIST_LIB_PATH}/libaudit.so.1
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libbrotlicommon.so.1 > ${DIST_LIB_PATH}/libbrotlicommon.so.1
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libbrotlidec.so.1 > ${DIST_LIB_PATH}/libbrotlidec.so.1
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libbrotlienc.so.1 > ${DIST_LIB_PATH}/libbrotlienc.so.1
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libbz2.so.1 > ${DIST_LIB_PATH}/libbz2.so.1
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libc-client.so.2007 > ${DIST_LIB_PATH}/libc-client.so.2007
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libcap-ng.so.0 > ${DIST_LIB_PATH}/libcap-ng.so.0
	# docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libcapstone.so.4 > ${DIST_LIB_PATH}/libcapstone.so.4
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libcrypt.so.1 > ${DIST_LIB_PATH}/libcrypt.so.1
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libcrypto.so.10 > ${DIST_LIB_PATH}/libcrypto.so.10
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libcurl.so.4 > ${DIST_LIB_PATH}/libcurl.so.4
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libedit.so.0 > ${DIST_LIB_PATH}/libedit.so.0
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libexpat.so.1 > ${DIST_LIB_PATH}/libexpat.so.1
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libexslt.so.0 > ${DIST_LIB_PATH}/libexslt.so.0
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libffi.so.6 > ${DIST_LIB_PATH}/libffi.so.6
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libgcrypt.so.11 > ${DIST_LIB_PATH}/libgcrypt.so.11
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libGeoIP.so.1 > ${DIST_LIB_PATH}/libGeoIP.so.1
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libgpg-error.so.0 > ${DIST_LIB_PATH}/libgpg-error.so.0
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libicudata.so.73 > ${DIST_LIB_PATH}/libicudata.so.73
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libicui18n.so.73 > ${DIST_LIB_PATH}/libicui18n.so.73
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libicuio.so.73 > ${DIST_LIB_PATH}/libicuio.so.73
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libicuuc.so.73 > ${DIST_LIB_PATH}/libicuuc.so.73
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libidn2.so.0 > ${DIST_LIB_PATH}/libidn2.so.0
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/liblber-2.4.so.2 > ${DIST_LIB_PATH}/liblber-2.4.so.2
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libldap_r-2.4.so.2 > ${DIST_LIB_PATH}/libldap_r-2.4.so.2
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libldap-2.4.so.2 > ${DIST_LIB_PATH}/libldap-2.4.so.2
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/liblua-5.1.so > ${DIST_LIB_PATH}/liblua-5.1.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/liblz4.so.1 > ${DIST_LIB_PATH}/liblz4.so.1
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/liblzf.so.1 > ${DIST_LIB_PATH}/liblzf.so.1
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/liblzma.so.5 > ${DIST_LIB_PATH}/liblzma.so.5
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libncurses.so.5 > ${DIST_LIB_PATH}/libncurses.so.5
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libnghttp2.so.14 > ${DIST_LIB_PATH}/libnghttp2.so.14
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libnspr4.so > ${DIST_LIB_PATH}/libnspr4.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libnss3.so > ${DIST_LIB_PATH}/libnss3.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libnssutil3.so > ${DIST_LIB_PATH}/libnssutil3.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libonig.so.105 > ${DIST_LIB_PATH}/libonig.so.105
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libpam.so.0 > ${DIST_LIB_PATH}/libpam.so.0
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libplc4.so > ${DIST_LIB_PATH}/libplc4.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libplds4.so > ${DIST_LIB_PATH}/libplds4.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libpq.so.5 > ${DIST_LIB_PATH}/libpq.so.5
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libpsl.so.5 > ${DIST_LIB_PATH}/libpsl.so.5
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libsasl2.so.3 > ${DIST_LIB_PATH}/libsasl2.so.3
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libsmime3.so > ${DIST_LIB_PATH}/libsmime3.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libsnappy.so.1 > ${DIST_LIB_PATH}/libsnappy.so.1
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libsodium.so.23 > ${DIST_LIB_PATH}/libsodium.so.23
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libsqlite3.so.0 > ${DIST_LIB_PATH}/libsqlite3.so.0
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libssh2.so.1 > ${DIST_LIB_PATH}/libssh2.so.1
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libssl.so.10 > ${DIST_LIB_PATH}/libssl.so.10
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libssl3.so > ${DIST_LIB_PATH}/libssl3.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libtinfo.so.5 > ${DIST_LIB_PATH}/libtinfo.so.5
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libtinfo.so.6 > ${DIST_LIB_PATH}/libtinfo.so.6
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libunistring.so.0 > ${DIST_LIB_PATH}/libunistring.so.0
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libutf8proc.so.1 > ${DIST_LIB_PATH}/libutf8proc.so.1
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libuuid.so.1 > ${DIST_LIB_PATH}/libuuid.so.1
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libX11.so.6 > ${DIST_LIB_PATH}/libX11.so.6
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libXau.so.6 > ${DIST_LIB_PATH}/libXau.so.6
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libxcb.so.1 > ${DIST_LIB_PATH}/libxcb.so.1
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libxml2.so.2 > ${DIST_LIB_PATH}/libxml2.so.2
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libxslt.so.1 > ${DIST_LIB_PATH}/libxslt.so.1
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libzip.so.5 > ${DIST_LIB_PATH}/libzip.so.5
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libzstd.so.1 > ${DIST_LIB_PATH}/libzstd.so.1

	# Remove temporary PHP container
	docker rm --force ${DOCKER_CONTAINER} || true

# ##############
# Publishing PKG
# ##############

publish:
	rm -rf ./dist
	npm publish --access public --tag latest -timeout=9999999

publish-canary:
	rm -rf ./dist
	npm version --no-git-tag-version prerelease -timeout=9999999
	npm publish --access public --tag canary
