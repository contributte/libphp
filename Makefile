# Static list of all lib directories
LIBS = \
	libs/amazon-linux-2-v74 \
	libs/amazon-linux-2-v80 \
	libs/amazon-linux-2-v81 \
	libs/amazon-linux-2-v82 \
	libs/amazon-linux-2-v83 \
	libs/amazon-linux-2023-v84 \
	libs/almalinux-9-v85

# Rebuild all libs by running make build dist in each directory
.PHONY: rebuild
rebuild:
	@for dir in $(LIBS); do \
		echo "Rebuilding $$(basename $$dir)..."; \
		(cd $$dir && $(MAKE) build dist) || echo "Failed to rebuild $$(basename $$dir)"; \
	done

# Force add and commit all libs with pattern "[vXX] rebuild php"
.PHONY: rebuild-track
rebuild-track:
	@for dir in $(LIBS); do \
		dir_name=$$(basename $$dir); \
		version=$$(echo "$$dir_name" | sed -E 's/.*-v([0-9]+)$$/v\1/'); \
		if [ -n "$$version" ]; then \
			echo "Processing $$dir_name ($$version)..."; \
			git add -f $$dir/native; \
			git commit -m "[$$version] rebuild php" || true; \
		fi; \
	done
