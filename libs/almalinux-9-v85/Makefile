.PHONY: build dist

DIST_PHP=85
DIST_PATH=./native
DIST_PHP_PATH=${DIST_PATH}/php
DIST_PHP_MODULES_PATH=${DIST_PHP_PATH}/modules
DIST_LIB_PATH=${DIST_PATH}/lib

DOCKER_IMAGE=libphp/almalinux-9-v85
DOCKER_CONTAINER=libphp-almalinux-9-v85
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
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/apcu.so > ${DIST_PHP_MODULES_PATH}/apcu.so || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/bcmath.so > ${DIST_PHP_MODULES_PATH}/bcmath.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/bz2.so > ${DIST_PHP_MODULES_PATH}/bz2.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/calendar.so > ${DIST_PHP_MODULES_PATH}/calendar.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/ctype.so > ${DIST_PHP_MODULES_PATH}/ctype.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/curl.so > ${DIST_PHP_MODULES_PATH}/curl.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/dba.so > ${DIST_PHP_MODULES_PATH}/dba.so || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/dom.so > ${DIST_PHP_MODULES_PATH}/dom.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/exif.so > ${DIST_PHP_MODULES_PATH}/exif.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/ffi.so > ${DIST_PHP_MODULES_PATH}/ffi.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/fileinfo.so > ${DIST_PHP_MODULES_PATH}/fileinfo.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/ftp.so > ${DIST_PHP_MODULES_PATH}/ftp.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/gd.so > ${DIST_PHP_MODULES_PATH}/gd.so || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/gettext.so > ${DIST_PHP_MODULES_PATH}/gettext.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/gmp.so > ${DIST_PHP_MODULES_PATH}/gmp.so || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/iconv.so > ${DIST_PHP_MODULES_PATH}/iconv.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/igbinary.so > ${DIST_PHP_MODULES_PATH}/igbinary.so || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/intl.so > ${DIST_PHP_MODULES_PATH}/intl.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/ldap.so > ${DIST_PHP_MODULES_PATH}/ldap.so || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/mbstring.so > ${DIST_PHP_MODULES_PATH}/mbstring.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/msgpack.so > ${DIST_PHP_MODULES_PATH}/msgpack.so || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/mysqli.so > ${DIST_PHP_MODULES_PATH}/mysqli.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/mysqlnd.so > ${DIST_PHP_MODULES_PATH}/mysqlnd.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/pdo.so > ${DIST_PHP_MODULES_PATH}/pdo.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/pdo_mysql.so > ${DIST_PHP_MODULES_PATH}/pdo_mysql.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/pdo_pgsql.so > ${DIST_PHP_MODULES_PATH}/pdo_pgsql.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/pdo_sqlite.so > ${DIST_PHP_MODULES_PATH}/pdo_sqlite.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/pgsql.so > ${DIST_PHP_MODULES_PATH}/pgsql.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/phar.so > ${DIST_PHP_MODULES_PATH}/phar.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/posix.so > ${DIST_PHP_MODULES_PATH}/posix.so || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/redis.so > ${DIST_PHP_MODULES_PATH}/redis.so || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/shmop.so > ${DIST_PHP_MODULES_PATH}/shmop.so || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/simplexml.so > ${DIST_PHP_MODULES_PATH}/simplexml.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/soap.so > ${DIST_PHP_MODULES_PATH}/soap.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/sodium.so > ${DIST_PHP_MODULES_PATH}/sodium.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/sqlite3.so > ${DIST_PHP_MODULES_PATH}/sqlite3.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/sysvmsg.so > ${DIST_PHP_MODULES_PATH}/sysvmsg.so || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/sysvsem.so > ${DIST_PHP_MODULES_PATH}/sysvsem.so || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/sysvshm.so > ${DIST_PHP_MODULES_PATH}/sysvshm.so || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/tokenizer.so > ${DIST_PHP_MODULES_PATH}/tokenizer.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/xml.so > ${DIST_PHP_MODULES_PATH}/xml.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/xmlreader.so > ${DIST_PHP_MODULES_PATH}/xmlreader.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/xmlwriter.so > ${DIST_PHP_MODULES_PATH}/xmlwriter.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/xsl.so > ${DIST_PHP_MODULES_PATH}/xsl.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/zip.so > ${DIST_PHP_MODULES_PATH}/zip.so

	# Copy static libraries. Needed by the extensions above.
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libaom.so.3 > ${DIST_LIB_PATH}/libaom.so.3 || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libavif.so.15 > ${DIST_LIB_PATH}/libavif.so.15 || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libbz2.so.1 > ${DIST_LIB_PATH}/libbz2.so.1
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libbrotlicommon.so.1 > ${DIST_LIB_PATH}/libbrotlicommon.so.1 || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libbrotlidec.so.1 > ${DIST_LIB_PATH}/libbrotlidec.so.1 || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libbrotlienc.so.1 > ${DIST_LIB_PATH}/libbrotlienc.so.1 || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libcapstone.so.4 > ${DIST_LIB_PATH}/libcapstone.so.4 || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libcrypt.so.2 > ${DIST_LIB_PATH}/libcrypt.so.2
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libcrypto.so.3 > ${DIST_LIB_PATH}/libcrypto.so.3
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libcurl.so.4 > ${DIST_LIB_PATH}/libcurl.so.4
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libdav1d.so.7 > ${DIST_LIB_PATH}/libdav1d.so.7 || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libdb-5.3.so > ${DIST_LIB_PATH}/libdb-5.3.so || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libedit.so.0 > ${DIST_LIB_PATH}/libedit.so.0
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libevent-2.1.so.7 > ${DIST_LIB_PATH}/libevent-2.1.so.7 || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libexslt.so.0 > ${DIST_LIB_PATH}/libexslt.so.0
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libffi.so.8 > ${DIST_LIB_PATH}/libffi.so.8
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libfontconfig.so.1 > ${DIST_LIB_PATH}/libfontconfig.so.1 || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libfreetype.so.6 > ${DIST_LIB_PATH}/libfreetype.so.6 || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libfribidi.so.0 > ${DIST_LIB_PATH}/libfribidi.so.0 || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libgd.so.103 > ${DIST_LIB_PATH}/libgd.so.103
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libgomp.so.1 > ${DIST_LIB_PATH}/libgomp.so.1 || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libgraphite2.so.3 > ${DIST_LIB_PATH}/libgraphite2.so.3 || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libgmp.so.10 > ${DIST_LIB_PATH}/libgmp.so.10
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libharfbuzz.so.0 > ${DIST_LIB_PATH}/libharfbuzz.so.0 || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libhwy.so.1 > ${DIST_LIB_PATH}/libhwy.so.1 || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libimagequant.so.0 > ${DIST_LIB_PATH}/libimagequant.so.0 || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libjbig.so.2.1 > ${DIST_LIB_PATH}/libjbig.so.2.1 || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libjpeg.so.62 > ${DIST_LIB_PATH}/libjpeg.so.62 || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libjxl.so.0.7 > ${DIST_LIB_PATH}/libjxl.so.0.7 || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/liblzo2.so.2 > ${DIST_LIB_PATH}/liblzo2.so.2 || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libicudata.so.74 > ${DIST_LIB_PATH}/libicudata.so.74
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libicui18n.so.74 > ${DIST_LIB_PATH}/libicui18n.so.74
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libicuio.so.74 > ${DIST_LIB_PATH}/libicuio.so.74
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libicuuc.so.74 > ${DIST_LIB_PATH}/libicuuc.so.74
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libldap.so.2 > ${DIST_LIB_PATH}/libldap.so.2
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/liblber.so.2 > ${DIST_LIB_PATH}/liblber.so.2
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/liblmdb.so.0.0.0 > ${DIST_LIB_PATH}/liblmdb.so.0.0.0
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/liblzf.so.1 > ${DIST_LIB_PATH}/liblzf.so.1 || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/liblzma.so.5 > ${DIST_LIB_PATH}/liblzma.so.5
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libncurses.so.6 > ${DIST_LIB_PATH}/libncurses.so.6
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/libzip/lib64/libzip.so.5 > ${DIST_LIB_PATH}/libzip.so.5 || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libnghttp2.so.14 > ${DIST_LIB_PATH}/libnghttp2.so.14
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libonig.so.105 > ${DIST_LIB_PATH}/libonig.so.105
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libpng16.so.16 > ${DIST_LIB_PATH}/libpng16.so.16 || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libpq.so.5 > ${DIST_LIB_PATH}/libpq.so.5
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libqdbm.so.14 > ${DIST_LIB_PATH}/libqdbm.so.14 || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libraqm.so.0 > ${DIST_LIB_PATH}/libraqm.so.0 || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/librav1e.so.0 > ${DIST_LIB_PATH}/librav1e.so.0 || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libsasl2.so.3 > ${DIST_LIB_PATH}/libsasl2.so.3
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libSvtAv1Enc.so.0 > ${DIST_LIB_PATH}/libSvtAv1Enc.so.0 || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libsodium.so.23 > ${DIST_LIB_PATH}/libsodium.so.23
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libsqlite3.so.0 > ${DIST_LIB_PATH}/libsqlite3.so.0
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libssl.so.3 > ${DIST_LIB_PATH}/libssl.so.3
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libtiff.so.5 > ${DIST_LIB_PATH}/libtiff.so.5 || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libtinfo.so.6 > ${DIST_LIB_PATH}/libtinfo.so.6
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libtokyocabinet.so.9 > ${DIST_LIB_PATH}/libtokyocabinet.so.9 || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libwebp.so.7 > ${DIST_LIB_PATH}/libwebp.so.7 || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libvmaf.so.1 > ${DIST_LIB_PATH}/libvmaf.so.1 || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libX11.so.6 > ${DIST_LIB_PATH}/libX11.so.6 || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libXau.so.6 > ${DIST_LIB_PATH}/libXau.so.6 || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libxcb.so.1 > ${DIST_LIB_PATH}/libxcb.so.1 || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libXpm.so.4 > ${DIST_LIB_PATH}/libXpm.so.4 || true
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libxml2.so.2 > ${DIST_LIB_PATH}/libxml2.so.2
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libxslt.so.1 > ${DIST_LIB_PATH}/libxslt.so.1
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libzstd.so.1 > ${DIST_LIB_PATH}/libzstd.so.1

	# Remove temporary PHP container
	docker rm --force ${DOCKER_CONTAINER} || true

# ##############
# Publishing PKG
# ##############

publish:
	rm -rf ./dist
	npm publish --access public --tag latest

publish-canary:
	rm -rf ./dist
	npm version --no-git-tag-version prerelease -timeout=9999999
	npm publish --access public --tag canary
