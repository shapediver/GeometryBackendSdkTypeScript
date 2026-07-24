set shell := ["bash", "-uc"]

remote_url := "https://raw.githubusercontent.com/shapediver/OpenApiSpecifications"
remote_tag_prefix := "gb_v2"
remote_file_name := "geometry_backend_v2.yaml"

spec_file := "oas_spec.yaml"
target_dir := "./out"
sdk_client_dir := "./packages/sdk.geometry-api-sdk-v2/src/client/"

# Path of the local OAS repository.
oas_repo := "../OpenApiSpecifications/"

# Resolve the installed OpenAPI generator command at runtime.
_openapi-generator-command:
    #!/usr/bin/env bash
    if command -v openapi-generator-cli >/dev/null 2>&1; then
        echo openapi-generator-cli
    elif command -v openapi-generator >/dev/null 2>&1; then
        echo openapi-generator
    else
        echo "Neither openapi-generator-cli (npm) nor openapi-generator (brew) is installed." >&2
        exit 1
    fi

# Generate the TypeScript client from the OpenAPI specification.
generate version:
    # Ensure that the generator is installed.
    just --quiet _openapi-generator-command >/dev/null

    # Stop when repo is dirty
    test -z "$(git diff --shortstat)"

    # Either link local file or fetch the requested version of the specification.
    if [ "{{version}}" == "local" ]; then \
        \cp "{{oas_repo}}/geometry_backend_v2.yaml" "{{spec_file}}" ; \
    else \
        curl -f \
          "{{remote_url}}/{{remote_tag_prefix}}%40{{version}}/{{remote_file_name}}" \
          -o "{{spec_file}}" ; \
    fi

    # Generate the TypeScript client.
    mkdir -p "{{target_dir}}"
    "$(just --quiet _openapi-generator-command)" generate \
        --generate-alias-as-model \
        --additional-properties=\
          disallowAdditionalPropertiesIfNotPresent=false,\
          enumPropertyNaming=UPPERCASE,\
          modelPropertyNaming=original,\
          paramNaming=camelCase,\
          supportsES6=false,\
          useSingleRequestParameter=false,\
          withoutRuntimeChecks=true \
        --reserved-words-mappings export=export \
        -i "{{spec_file}}" \
        -g typescript-fetch \
        -o "{{target_dir}}" || { \
            rm -rf "{{target_dir}}"; \
            exit 1; \
        }

    # Replace old client with new one.
    rm -rf "{{sdk_client_dir}}" || :
    mkdir -p "{{sdk_client_dir}}"
    mv "{{target_dir}}/apis/" "{{sdk_client_dir}}"
    mv "{{target_dir}}/models/" "{{sdk_client_dir}}"
    mv "{{target_dir}}/runtime.ts" "{{sdk_client_dir}}"
    mv "{{target_dir}}/index.ts" "{{sdk_client_dir}}"

    # Apply manual modifications to the generated DTO files.
    just _post-generation

    # Clean up.
    rm -rf "{{target_dir}}"

    # Commit changes.
    if [ "{{version}}" != "local" ]; then \
        git add -A . ; \
        git commit -m "Generate spec version {{version}}" ; \
    fi

# Tests the TypeScript client generation with the current version of the checked out OAS repo.
test-generator:
    "$(just --quiet _openapi-generator-command)" generate \
        --generate-alias-as-model \
        --additional-properties=\
          disallowAdditionalPropertiesIfNotPresent=false,\
          enumPropertyNaming=UPPERCASE,\
          modelPropertyNaming=original,\
          paramNaming=camelCase,\
          supportsES6=false,\
          useSingleRequestParameter=false,\
          withoutRuntimeChecks=true \
        --reserved-words-mappings export=export \
        --dry-run \
        -i "{{oas_repo}}/geometry_backend_v2.yaml" \
        -g typescript-fetch

# Steps to be executed after the generation of the TypeScript client.
_post-generation:
    #!/usr/bin/env bash
    # Make generated APIs use the SDK's custom BaseAPI implementation.
    api_dir="packages/sdk.geometry-api-sdk-v2/src/client/apis"
    find "$api_dir" -type f -name '*.ts' -exec perl -0pi -e "
        s{import \* as runtime from '../runtime';(?!\nimport \{ BaseAPI \} from '../../base';)}{import * as runtime from '../runtime';\nimport { BaseAPI } from '../../base';}g;
        s{extends runtime\\.BaseAPI}{extends BaseAPI}g;
    " {} +

    # Allow the custom BaseAPI to wrap the generated fetch pipeline.
    perl -0pi -e 's/private fetchApi =/protected fetchApi =/' \
        "packages/sdk.geometry-api-sdk-v2/src/client/runtime.ts"

