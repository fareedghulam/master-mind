import os

# 1. AndroidManifest.xml میں انٹرنیٹ کی اجازت شامل کرنا
manifest_path = "android/app/src/main/AndroidManifest.xml"
if os.path.exists(manifest_path):
    with open(manifest_path, "r", encoding="utf-8") as f:
        content = f.read()
    if "android.permission.INTERNET" not in content:
        content = content.replace("<application", '<uses-permission android:name="android.permission.INTERNET" />\n    <application')
        with open(manifest_path, "w", encoding="utf-8") as f:
            f.write(content)
        print("✓ AndroidManifest.xml میں انٹرنیٹ کی اجازت کامیابی سے لگ گئی ہے!")
    else:
        print("✓ انٹرنیٹ کی اجازت پہلے سے موجود ہے۔")

# 2. firebaseConfig.js کو Capacitor کے لیے مضبوط بنانا
config_path = "src/firebaseConfig.js"
if os.path.exists(config_path):
    with open(config_path, "r", encoding="utf-8") as f:
        fc = f.read()
    print("✓ Firebase Config فائل موجود ہے۔")
