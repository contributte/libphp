FROM amazonlinux:2.0.20240916.0

ENV PHP=php82

RUN amazon-linux-extras install epel -y

RUN yum install -y \
        http://rpms.remirepo.net/enterprise/remi-release-7.rpm \
        yum-utils \
        curl

RUN yum-config-manager --enable remi-${PHP}
RUN yum update -y && yum upgrade -y
RUN yum -y install patchelf
RUN yum install -y amazon-linux-extras

RUN yum install -y \
        ${PHP}-php-apcu \
        ${PHP}-php-bcmath \
        ${PHP}-php-brotli \
        ${PHP}-php-cli \
        ${PHP}-php-cgi \
        ${PHP}-php-ds \
        ${PHP}-php-fpm \
        ${PHP}-php-ffi \
        ${PHP}-php-grpc \
        ${PHP}-php-imap \
        ${PHP}-php-igbinary \
        ${PHP}-php-intl \
        ${PHP}-php-json \
        # ${PHP}-php-lua \
        ${PHP}-php-mbstring \
        ${PHP}-php-msgpack \
        ${PHP}-php-mysqli \
        ${PHP}-php-mysqlnd \
        ${PHP}-php-opcache \
        ${PHP}-php-pdo \
        ${PHP}-php-pecl-geoip \
        ${PHP}-php-pecl-mongodb \
        # ${PHP}-php-phalcon \
        ${PHP}-php-pgsql \
        # ${PHP}-php-protobuf \
        # ${PHP}-php-psr \
        ${PHP}-php-redis \
        ${PHP}-php-runkit7 \
        ${PHP}-php-soap \
        ${PHP}-php-sodium \
        ${PHP}-php-swoole \
        # ${PHP}-php-timecop \
        ${PHP}-php-tokenizer \
        ${PHP}-php-uuid \
        ${PHP}-php-xml \
        ${PHP}-php-xmlrpc \
        ${PHP}-php-zip

RUN amazon-linux-extras install postgresql14

RUN curl -sS https://getcomposer.org/installer | ${PHP} -- --install-dir=/usr/bin --filename=composer

# $ORIGIN refers to the current directory, don't evaluate it, use the single quotes
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/bin/php
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/bin/php-cgi
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/sbin/php-fpm
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/apcu.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/bcmath.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/brotli.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/bz2.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/calendar.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/ctype.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/curl.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/dom.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/ds.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/exif.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/fileinfo.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/ftp.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/ffi.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/geoip.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/gettext.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/grpc.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/iconv.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/imap.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/igbinary.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/intl.so
# RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/lua.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/mbstring.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/mongodb.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/msgpack.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/mysqli.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/mysqlnd.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/pdo.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/pdo_mysql.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/pdo_pgsql.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/pdo_sqlite.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/pgsql.so
# RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/protobuf.so
# RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/phalcon.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/phar.so
# RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/psr.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/redis.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/runkit7.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/simplexml.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/soap.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/sockets.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/sodium.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/sqlite3.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/swoole.so
# RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/timecop.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/tokenizer.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/uuid.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/xml.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/xmlreader.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/xmlrpc.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/xmlwriter.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/xsl.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/lib64/php/modules/zip.so

WORKDIR /var/task

ADD ./conf /var/task/php
