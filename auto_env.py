import json
import subprocess

print("Firebase CLI سے Keys حاصل کی جا رہی ہیں...")
try:
    # Firebase Web App Config JSON فارمیٹ میں لینا
    output = subprocess.check_output(["firebase", "apps:sdkconfig", "web", "--json"], text=True)
    data = json.loads(output)
    config = data["result"]["sdkConfig"]

    env_content = f"""VITE_FIREBASE_API_KEY={config.get('apiKey', '')}
VITE_FIREBASE_AUTH_DOMAIN={config.get('authDomain', '')}
VITE_FIREBASE_PROJECT_ID={config.get('projectId', '')}
VITE_FIREBASE_STORAGE_BUCKET={config.get('storageBucket', '')}
VITE_FIREBASE_MESSAGING_SENDER_ID={config.get('messagingSenderId', '')}
VITE_FIREBASE_APP_ID={config.get('appId', '')}
"""

    with open(".env", "w") as f:
        f.write(env_content)

    print("✓ اصل Keys کے ساتھ .env فائل کامیابی سے بن گئی ہے!")
except Exception as e:
    print("ایرر: پہلے 'firebase login --no-localhost' کریں اور یقینی بنائیں کہ Firebase میں Web App موجود ہے۔")
    print(e)
