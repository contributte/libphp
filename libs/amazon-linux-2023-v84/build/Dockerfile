FROM amazonlinux:2023

ENV PHP=php8.4

# Update system and install basic tools
RUN dnf upgrade -y --releasever=latest && \
    dnf install -y --allowerasing \
        curl \
        tar \
        wget \
        make \
        gcc \
        patchelf

# Install PHP 8.4 and extensions (native AL2023 packages)
# Note: Many modules (ctype, dom, fileinfo, ftp, gettext, iconv, phar,
# simplexml, tokenizer, xmlreader, xmlwriter, xsl, calendar, exif, bz2)
# are bundled in php8.4-common
RUN dnf install -y \
        ${PHP} \
        ${PHP}-cli \
        ${PHP}-fpm \
        ${PHP}-common \
        ${PHP}-bcmath \
        ${PHP}-dba \
        ${PHP}-ffi \
        ${PHP}-gd \
        ${PHP}-gmp \
        ${PHP}-intl \
        ${PHP}-ldap \
        ${PHP}-mbstring \
        ${PHP}-mysqlnd \
        ${PHP}-opcache \
        ${PHP}-pdo \
        ${PHP}-pgsql \
        ${PHP}-process \
        ${PHP}-soap \
        ${PHP}-sodium \
        ${PHP}-xml \
        ${PHP}-zip

# Install additional PECL extensions
RUN dnf install -y \
        ${PHP}-pecl-apcu \
        ${PHP}-pecl-igbinary \
        ${PHP}-pecl-msgpack \
        ${PHP}-pecl-redis6

# Install PostgreSQL client library
RUN dnf install -y postgresql15

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin --filename=composer

# Patch binaries with $ORIGIN rpath for portability
# $ORIGIN refers to the current directory, don't evaluate it, use the single quotes
RUN patchelf --set-rpath '$ORIGIN' /usr/bin/php || true
RUN patchelf --set-rpath '$ORIGIN' /usr/bin/php-cgi || true
RUN patchelf --set-rpath '$ORIGIN' /usr/sbin/php-fpm || true

# Patch extension modules
RUN for so in /usr/lib64/php8.4/modules/*.so; do \
        patchelf --set-rpath '$ORIGIN' "$so" || true; \
    done

WORKDIR /var/task

ADD ./conf /var/task/php
