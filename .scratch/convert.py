import os
import mammoth

source_dir = r"c:\Projects\Orvyn\orvyn\.scratch\zip_contents\ORVYN Project"
dest_dir = r"c:\Projects\Orvyn\orvyn\docs"

if not os.path.exists(dest_dir):
    os.makedirs(dest_dir)

for filename in os.listdir(source_dir):
    if filename.endswith(".docx"):
        source_path = os.path.join(source_dir, filename)
        # make filename web safe (lowercase, replace spaces)
        dest_filename = filename.replace(".docx", ".md").replace(" ", "-").lower()
        # Clean up some weird chars in names if any
        dest_filename = dest_filename.replace("_", "").replace("--", "-")
        
        dest_path = os.path.join(dest_dir, dest_filename)
        
        with open(source_path, "rb") as docx_file:
            result = mammoth.convert_to_markdown(docx_file)
            markdown_content = result.value
            
        with open(dest_path, "w", encoding="utf-8") as md_file:
            md_file.write(markdown_content)
        print(f"Converted {filename} to {dest_filename}")
