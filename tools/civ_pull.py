import requests
import json
import os
import sys
import logging
from configparser import ConfigParser
from requests.exceptions import RequestException
import time

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def read_api_key():
    """Read API key from ~/.api config file."""
    sys.stdout.write("Step 1/4: Loading API key... ")
    sys.stdout.flush()
    
    home_dir = os.path.expanduser("~")
    file_path = os.path.join(home_dir, ".api")
    
    if not os.path.exists(file_path):
        sys.stdout.write("Failed\n")
        raise FileNotFoundError(f"API config file not found at {file_path}")
    
    config = ConfigParser()
    config.read(file_path)
    if "keys" not in config or "CIVITAI_API_KEY" not in config["keys"]:
        sys.stdout.write("Failed\n")
        raise ValueError("CIVITAI_API_KEY not found in .api file")
    
    api_key = config["keys"]["CIVITAI_API_KEY"].strip()
    if not api_key:
        sys.stdout.write("Failed\n")
        raise ValueError("CIVITAI_API_KEY is empty")
    
    sys.stdout.write("Done\n")
    logger.info("API key successfully loaded")
    return api_key

def fetch_models_metadata(api_key, retries=3, timeout=30):
    """Fetch one page of model metadata from CivitAI API with retries.
    Note: This fetches only metadata, not the actual model files."""
    sys.stdout.write("Step 2/4: Fetching model metadata... ")
    sys.stdout.flush()
    
    url = "https://civitai.com/api/v1/models?limit=100&nsfw=true"
    headers = {"Authorization": f"Bearer {api_key}"}
    
    for attempt in range(retries):
        try:
            response = requests.get(url, headers=headers, timeout=timeout)
            response.raise_for_status()
            sys.stdout.write("Done\n")
            break
        except RequestException as e:
            if attempt < retries - 1:
                sys.stdout.write(f"Retrying ({attempt + 1}/{retries})... ")
                sys.stdout.flush()
                time.sleep(2)  # Wait before retrying
                continue
            sys.stdout.write("Failed\n")
            raise Exception(f"API request failed after {retries} attempts: {str(e)}") from e
    
    sys.stdout.write("Step 3/4: Parsing JSON response... ")
    sys.stdout.flush()
    
    try:
        data = response.json()
    except json.JSONDecodeError as e:
        sys.stdout.write("Failed\n")
        raise Exception(f"Invalid JSON response from API: {str(e)}") from e
    
    models = data["items"]
    sys.stdout.write(f"Done (Fetched {len(models)} models)\n")
    logger.info(f"Fetched 1 page with {len(models)} models")
    
    if data["metadata"].get("nextPage"):
        logger.info("More metadata available but not fetched (limited to 1 page)")
    
    return models

def save_metadata_to_file(model_data):
    """Save metadata to JSON file."""
    sys.stdout.write("Step 4/4: Saving metadata to file... ")
    sys.stdout.flush()
    
    output_file = "model_metadata.json"
    json_str = json.dumps(model_data, indent=4)
    
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(json_str)
    
    sys.stdout.write("Done\n")
    logger.info(f"Metadata saved to {output_file}")

def main():
    """Main function to fetch and save one page of model metadata with progress."""
    try:
        api_key = read_api_key()
        model_data = fetch_models_metadata(api_key, retries=3, timeout=30)
        save_metadata_to_file(model_data)
        sys.stdout.write("All steps completed successfully!\n")
        
    except Exception as e:
        sys.stdout.write("\n")
        logger.error(f"Error occurred: {str(e)}")
        exit(1)

if __name__ == "__main__":
    main()
