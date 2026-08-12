import json, os

config_path = "capacitor.config.json"
if os.path.exists(config_path):
    with open(config_path, "r") as f:
        data = json.load(f)
    data["webDir"] = "dist"
    with open(config_path, "w") as f:
        json.dump(data, f, indent=2)
    print("✓ capacitor.config.json فکس ہو گیا ہے (webDir: dist)!")
