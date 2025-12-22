FROM almalinux:9

ENV PHP=php85

# Install EPEL and Remi repository
RUN dnf install -y \
        https://dl.fedoraproject.org/pub/epel/epel-release-latest-9.noarch.rpm \
        https://rpms.remirepo.net/enterprise/remi-release-9.rpm \
        dnf-utils

# Install basic tools
RUN dnf install -y --allowerasing \
        curl \
        tar \
        wget \
        make \
        gcc \
        patchelf

# Install PHP 8.5 as Software Collection from Remi
RUN dnf install -y \
        ${PHP} \
        ${PHP}-php-cli \
        ${PHP}-php-fpm \
        ${PHP}-php-common \
        ${PHP}-php-bcmath \
        ${PHP}-php-dba \
        ${PHP}-php-ffi \
        ${PHP}-php-gd \
        ${PHP}-php-gmp \
        ${PHP}-php-intl \
        ${PHP}-php-ldap \
        ${PHP}-php-mbstring \
        ${PHP}-php-mysqlnd \
        ${PHP}-php-opcache \
        ${PHP}-php-pdo \
        ${PHP}-php-pgsql \
        ${PHP}-php-process \
        ${PHP}-php-soap \
        ${PHP}-php-sodium \
        ${PHP}-php-xml \
        ${PHP}-php-zip

# Install additional PECL extensions
RUN dnf install -y \
        ${PHP}-php-pecl-apcu \
        ${PHP}-php-pecl-igbinary \
        ${PHP}-php-pecl-msgpack \
        ${PHP}-php-pecl-redis6 \
    || true

# Install PostgreSQL client library
RUN dnf install -y postgresql

# Install composer
RUN curl -sS https://getcomposer.org/installer | /opt/remi/${PHP}/root/usr/bin/php -- --install-dir=/usr/bin --filename=composer

# Patch binaries with $ORIGIN rpath for portability
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/bin/php || true
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/bin/php-cgi || true
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/${PHP}/root/usr/sbin/php-fpm || true

# Patch extension modules
RUN for so in /opt/remi/${PHP}/root/usr/lib64/php/modules/*.so; do \
        patchelf --set-rpath '$ORIGIN' "$so" || true; \
    done

WORKDIR /var/task

ADD ./conf /var/task/php
