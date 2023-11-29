#!/bin/bash

# Set your Azure Storage account name, container name, and SAS token
storage_account="staticstorageaccountcne"
container_name='$web'
sas_token="?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-02-02T20:27:52Z&st=2023-11-29T12:27:52Z&spr=https&sig=YoJywV8d4U1uNYYDqh%2FRvPCaGCSAnXm9s06HlcIighY%3D"

storage_account="$AZURE_STORAGE_ACCOUNT"
container_name="$AZURE_STORAGE_CONTAINER"
sas_token="$AZURE_STORAGE_SAS_TOKEN"


# Set the local folder path
local_folder="frontend/dist"

currentdir=$(pwd)
cd ./frontend
echo "Building frontend"
ng build frontend
cd ..
echo "Build complete"
echo $currentdir

# Iterate over each file in the local folder and its subfolders
find "$local_folder" -type f | while read -r file_path; do
    if [ -f "$file_path" ]; then
        # Extract the file name without the local folder structure
        file_name=$(basename "$file_path")
        
        # Construct the Blob Storage URL for the file
        blob_url="https://$storage_account.blob.core.windows.net/$container_name/$file_name$sas_token"

        # Set Content-Type based on file extension
        extension="${file_path##*.}"
        content_type=""
        if [ "$extension" == "css" ]; then
            content_type="text/css"
        else
            content_type=$(file --mime-type -b "$file_path")
        fi

        # Upload the file to Blob Storage using curl
        curl -X PUT -T "$file_path" -H "x-ms-blob-type: BlockBlob" -H "Content-Type: $content_type" "$blob_url"
    fi
done
