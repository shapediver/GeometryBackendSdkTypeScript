set shell := ["bash", "-uc"]

remote_url := "https://raw.githubusercontent.com/shapediver/OpenApiSpecifications"
remote_tag_prefix := "gb_v2"
remote_file_name := "geometry_backend_v2.yaml"

spec_file := "oas_spec.yaml"
target_dir := "./out"
sdk_client_dir := "./packages/sdk.geometry-api-sdk-v2/src/client/"

# Path of the local OAS repository.
oas_repo := "../OpenApiSpecifications/"

# Generate the TypeScript client from the OpenAPI specification.
generate version:
    # Ensure that the generator is installed.
    command -v openapi-generator-cli

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
    openapi-generator-cli generate \
        --generate-alias-as-model \
        --additional-properties=\
          disallowAdditionalPropertiesIfNotPresent=false,\
          enumPropertyNaming=UPPERCASE,\
          paramNaming=camelCase,\
          supportsES6=false \
        -i "{{spec_file}}" \
        -g typescript-axios \
        -o "{{target_dir}}" || { \
            rm -rf "{{target_dir}}"; \
            exit 1; \
        }

    # Replace old client with new one.
    rm -rf "{{sdk_client_dir}}" || :
    mkdir -p "{{sdk_client_dir}}"
    mv "{{target_dir}}/api.ts" "{{sdk_client_dir}}"
    mv "{{target_dir}}/base.ts" "{{sdk_client_dir}}"
    mv "{{target_dir}}/common.ts" "{{sdk_client_dir}}"
    mv "{{target_dir}}/configuration.ts" "{{sdk_client_dir}}"
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
    openapi-generator-cli generate \
        --generate-alias-as-model \
        --additional-properties=\
          disallowAdditionalPropertiesIfNotPresent=false,\
          enumPropertyNaming=UPPERCASE,\
          paramNaming=camelCase,\
          supportsES6=false \
        --dry-run \
        -i "{{oas_repo}}/geometry_backend_v2.yaml" \
        -g typescript-axios

# Steps to be executed after the generation of the TypeScript client.
_post-generation:
    #!/usr/bin/env bash
    # Replace client BaseAPI import in api.ts with custom BaseAPI implementation.
    pattern="^import \{(.*)BaseAPI,?\s?(.*)\} from '.\/base';$"
    replacement="import \{\1\2\} from '.\/base';"
    added_line="import \{ BaseAPI \} from '..\/base';"
    case $(uname -s) in
    Linux) 
        sed -ri "s/${pattern}/${replacement}\n${added_line}/g" \
            "packages/sdk.geometry-api-sdk-v2/src/client/api.ts"
        ;;
    Darwin)
        sed -ri '' "s/${pattern}/${replacement}\n${added_line}/g" \
            "packages/sdk.geometry-api-sdk-v2/src/client/api.ts"
        ;;
    *) exit 1 ;;
    esac
