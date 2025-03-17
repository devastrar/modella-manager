#!/bin/bash

pipx run --spec gitignore-parser==0.1.0 python << 'EOF'
import os
from pathlib import Path
from gitignore_parser import parse_gitignore  # Correct import

def get_file_type(filename):
    """Determine code block type based on file extension"""
    extension_map = {
        '.js': 'javascript',
        '.py': 'python',
        '.json': 'json',
        '.md': 'markdown',
        '.html': 'html',
        '.css': 'css',
        '.java': 'java',
        '.cpp': 'cpp',
        '.c': 'c',
        '.sh': 'bash',
        '.ts': 'typescript'
    }
    ext = Path(filename).suffix.lower()
    return extension_map.get(ext, '')

def process_directory(root_dir='.'):
    """Process directory and create markdown file"""
    # Check if .gitignore exists and parse it
    gitignore_path = os.path.join(root_dir, '.gitignore')
    ignore_matcher = None
    if os.path.exists(gitignore_path):
        try:
            ignore_matcher = parse_gitignore(gitignore_path)
        except Exception as e:
            print(f"Warning: Could not parse .gitignore: {e}")
    
    # Get current directory name for output file
    current_dir = os.path.basename(os.path.abspath(root_dir))
    output_file = f"{current_dir}.md"
    
    with open(output_file, 'w', encoding='utf-8') as md_file:
        md_file.write(f"# Project Files: {current_dir}\n\n")
        
        # Walk through directory tree
        for root, dirs, files in os.walk(root_dir):
            if '.git' in root:
                continue
                
            for filename in sorted(files):
                relative_path = os.path.relpath(
                    os.path.join(root, filename), 
                    root_dir
                )
                
                # Skip if file matches .gitignore pattern
                if ignore_matcher and ignore_matcher(relative_path):
                    continue
                    
                # Skip the output file itself
                if relative_path == output_file:
                    continue
                
                try:
                    with open(os.path.join(root, filename), 'r', encoding='utf-8') as f:
                        content = f.read()
                        
                    # Get code type based on file extension
                    code_type = get_file_type(filename)
                    
                    # Write file info to markdown
                    md_file.write(f"### `{relative_path}`\n\n")
                    md_file.write(f"```{code_type}\n")
                    md_file.write(content)
                    md_file.write("\n```\n\n")
                    
                except (IOError, UnicodeDecodeError) as e:
                    # Handle binary files or encoding errors
                    md_file.write(f"`{relative_path}`\n")
                    md_file.write("```\n")
                    md_file.write(f"[Binary file or encoding error: {str(e)}]")
                    md_file.write("\n```\n\n")

def main():
    try:
        process_directory()
        print(f"Successfully created markdown file in current directory")
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    main()
EOF
