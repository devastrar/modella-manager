#!/usr/bin/env python3

import argparse
import os
import glob
import re

def get_unique_filename(target_dir, relative_path):
    """
    Generate a unique filename by appending a number if the file exists.

    Args:
        target_dir (str): The target directory where the file will be saved.
        relative_path (str): The intended relative path of the file (e.g., "example.py").

    Returns:
        str: A unique relative path (e.g., "example-1.py" if "example.py" exists).
    """
    full_path = os.path.join(target_dir, relative_path)
    if not os.path.exists(full_path):
        return relative_path

    directory, filename = os.path.split(relative_path)
    name, extension = os.path.splitext(filename)
    i = 1
    while True:
        new_filename = f"{name}-{i}{extension}"
        new_relative_path = os.path.join(directory, new_filename)
        new_full_path = os.path.join(target_dir, new_relative_path)
        if not os.path.exists(new_full_path):
            return new_relative_path
        i += 1

def parse_markdown_file(md_file, target_dir):
    """
    Parse a Markdown file and extract code blocks into separate files with progress output.

    Args:
        md_file (str): Path to the Markdown file.
        target_dir (str): Directory where extracted files will be saved.
    """
    with open(md_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    current_filename = None
    in_code_block = False
    code_block_lines = []

    for line in lines:
        if not in_code_block:
            # Look for lines starting with # and containing a filename in backticks
            match = re.search(r'^#+\s*.*`([^`]+)`', line.strip())
            if match:
                current_filename = match.group(1).strip()
            elif line.strip().startswith('```'):
                if current_filename is None:
                    current_filename = "not-found.txt"
                in_code_block = True
                code_block_lines = []
                print(f"Identified code block in {md_file} with filename: {current_filename}")
        else:
            if line.strip().startswith('```'):
                in_code_block = False
                # Remove <DOCUMENT> tags if present
                if len(code_block_lines) >= 2 and \
                   code_block_lines[0].strip() == '<DOCUMENT>' and \
                   code_block_lines[-1].strip() == '</DOCUMENT>':
                    content_lines = code_block_lines[1:-1]
                else:
                    content_lines = code_block_lines
                content = '\n'.join(content_lines)
                unique_relative_path = get_unique_filename(target_dir, current_filename)
                file_path = os.path.join(target_dir, unique_relative_path)
                file_dir = os.path.dirname(file_path)
                os.makedirs(file_dir, exist_ok=True)
                print(f"Writing file: {unique_relative_path}")
                with open(file_path, 'w', newline='\n', encoding='utf-8') as f:
                    f.write(content)
                current_filename = None
            else:
                code_block_lines.append(line.rstrip())

def main():
    """
    Process Markdown files and save extracted code blocks with progress output.
    """
    parser = argparse.ArgumentParser(description='Extract code blocks from Markdown files.')
    parser.add_argument('-s', '--source', default='.',
                        help='Source directory with Markdown files (default: current directory)')
    parser.add_argument('-t', '--target', default=None,
                        help='Target directory for extracted files (default: source directory)')
    args = parser.parse_args()

    if args.target is None:
        args.target = args.source

    md_files = glob.glob(os.path.join(args.source, '**', '*.md'), recursive=True)
    if not md_files:
        print(f"No Markdown files found in {args.source}")
        return

    for md_file in md_files:
        print(f"Found Markdown file: {md_file}")
        parse_markdown_file(md_file, args.target)

    print(f"Processed {len(md_files)} Markdown file(s). Extracted files saved to {args.target}")

if __name__ == '__main__':
    main()
