#!/bin/bash
set -e

# Set library path
export LD_LIBRARY_PATH=/var/task/lib:${LD_LIBRARY_PATH}

# Show PHP modules
echo '=== PHP Modules ==='
/var/task/php/php -m

echo ''
echo '=== PHP .so Files ==='
# Use ls if find is not available, otherwise use find
if command -v find >/dev/null 2>&1; then
    find /var/task/php/modules -name '*.so' | sort
else
    ls -1 /var/task/php/modules/*.so 2>/dev/null | sort || true
fi

echo ''
echo '=== Checking Dependencies with ldd ==='
for so in /var/task/php/modules/*.so; do
    if [ -f "$so" ]; then
        echo ''
        echo "Checking: $(basename $so)"
        ldd "$so" 2>&1 | grep -E '(not found|=>)' || true
    fi
done

echo ''
echo '=== Summary: Missing Dependencies ==='
missing=""
for so in /var/task/php/modules/*.so; do
    if [ -f "$so" ]; then
        result=$(ldd "$so" 2>&1 | grep 'not found' || true)
        if [ -n "$result" ]; then
            missing="${missing}${result}"
        fi
    fi
done

if [ -z "$missing" ]; then
    echo 'No missing dependencies found!'
else
    echo "$missing" | sort -u
fi

echo ''
echo '=== Starting interactive shell ==='
exec /bin/bash
