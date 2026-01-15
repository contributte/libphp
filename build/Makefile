.PHONY: test-82 test-83 test-84 test-85

# Test PHP 8.2 (Amazon Linux 2)
test-82:
	docker run \
		-it \
		--rm \
		--platform linux/amd64 \
		-v $(CURDIR)/../libs/amazon-linux-2-v82/native/php:/var/task/php \
		-v $(CURDIR)/../libs/amazon-linux-2-v82/native/lib:/var/task/lib/ \
		-v $(CURDIR)/entrypoint.sh:/entrypoint.sh:ro \
		-w /var/task \
		--entrypoint /bin/bash \
		-p 8000:8000 \
		public.ecr.aws/lambda/nodejs:18 \
		/entrypoint.sh

# Test PHP 8.3 (Amazon Linux 2)
test-83:
	docker run \
		-it \
		--rm \
		--platform linux/amd64 \
		-v $(CURDIR)/../libs/amazon-linux-2-v83/native/php:/var/task/php \
		-v $(CURDIR)/../libs/amazon-linux-2-v83/native/lib:/var/task/lib/ \
		-v $(CURDIR)/entrypoint.sh:/entrypoint.sh:ro \
		-w /var/task \
		--entrypoint /bin/bash \
		-p 8000:8000 \
		public.ecr.aws/lambda/nodejs:18 \
		/entrypoint.sh

# Test PHP 8.4 (Amazon Linux 2023)
test-84:
	docker run \
		-it \
		--rm \
		--platform linux/amd64 \
		-v $(CURDIR)/../libs/amazon-linux-2023-v84/native/php:/var/task/php \
		-v $(CURDIR)/../libs/amazon-linux-2023-v84/native/lib:/var/task/lib/ \
		-v $(CURDIR)/entrypoint.sh:/entrypoint.sh:ro \
		-w /var/task \
		--entrypoint /bin/bash \
		-p 8000:8000 \
		public.ecr.aws/lambda/nodejs:22 \
		/entrypoint.sh

# Test PHP 8.5 (AlmaLinux 9)
test-85:
	docker run \
		-it \
		--rm \
		--platform linux/amd64 \
		-v $(CURDIR)/../libs/almalinux-9-v85/native/php:/var/task/php \
		-v $(CURDIR)/../libs/almalinux-9-v85/native/lib:/var/task/lib/ \
		-v $(CURDIR)/entrypoint.sh:/entrypoint.sh:ro \
		-w /var/task \
		--entrypoint /bin/bash \
		-p 8000:8000 \
		public.ecr.aws/lambda/nodejs:22 \
		/entrypoint.sh
