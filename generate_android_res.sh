#!/bin/bash
set -e

LOGO="public/mastermind_logo.jpg"

if [ ! -f "$LOGO" ]; then
  echo "Error: $LOGO not found!"
  exit 1
fi

echo "Regenerating Android launcher icons from official logo..."

# Array of mipmap densities: density_name launcher_size fg_size
MIPMAPS=(
  "mdpi 48 108"
  "hdpi 72 162"
  "xhdpi 96 216"
  "xxhdpi 144 324"
  "xxxhdpi 192 432"
)

for item in "${MIPMAPS[@]}"; do
  read -r density l_size fg_size <<< "$item"
  dir="android/app/src/main/res/mipmap-${density}"
  mkdir -p "$dir"

  # ic_launcher.png (Square with rounded corners / standard)
  convert "$LOGO" -resize "${l_size}x${l_size}^" -gravity center -extent "${l_size}x${l_size}" "$dir/ic_launcher.png"

  # ic_launcher_round.png (Circular mask)
  half=$((l_size / 2))
  convert "$LOGO" -resize "${l_size}x${l_size}^" -gravity center -extent "${l_size}x${l_size}" \
    \( -size "${l_size}x${l_size}" xc:none -fill white -draw "circle ${half},${half} ${half},0" \) \
    -compose copy_opacity -composite "$dir/ic_launcher_round.png"

  # ic_launcher_foreground.png (Safe area centered on transparent canvas for adaptive icon)
  fg_logo_size=$((fg_size * 68 / 100))
  convert "$LOGO" -resize "${fg_logo_size}x${fg_logo_size}" \
    -background none -gravity center -extent "${fg_size}x${fg_size}" "$dir/ic_launcher_foreground.png"

  echo "Generated icons for mipmap-${density}"
done

echo "Regenerating web & PWA icon assets..."
mkdir -p assets
convert "$LOGO" -resize 192x192 assets/icon-192.png
convert "$LOGO" -resize 512x512 assets/icon-512.png 2>/dev/null || true

echo "Regenerating Android splash screens with official branding..."

# Generate 512x512 drawable/splash.png
mkdir -p android/app/src/main/res/drawable
convert -size 512x512 xc:"#020617" \
  \( "$LOGO" -resize 210x210 \) -gravity center -geometry +0-50 -composite \
  -gravity center -font "Liberation-Sans" -pointsize 20 -fill "#f59e0b" -annotate +0+80 "Welcome" \
  -gravity center -font "Liberation-Sans-Bold" -pointsize 24 -fill "#ffffff" -annotate +0+112 "Master Mind Qureshi Enterprise" \
  android/app/src/main/res/drawable/splash.png

# Portrait splash screens: path width height
PORTRAIT_SPLASHES=(
  "android/app/src/main/res/drawable-port-mdpi/splash.png 320 480 130 14 17 40"
  "android/app/src/main/res/drawable-port-hdpi/splash.png 480 800 200 20 25 60"
  "android/app/src/main/res/drawable-port-xhdpi/splash.png 720 1280 290 28 36 90"
  "android/app/src/main/res/drawable-port-xxhdpi/splash.png 960 1600 380 36 46 115"
  "android/app/src/main/res/drawable-port-xxxhdpi/splash.png 1280 1920 480 44 56 140"
)

for item in "${PORTRAIT_SPLASHES[@]}"; do
  read -r path width height logo_sz welcome_sz title_sz shift_y <<< "$item"
  dir=$(dirname "$path")
  mkdir -p "$dir"

  welcome_offset=$((logo_sz / 2 + 35))
  title_offset=$((logo_sz / 2 + 35 + title_sz + 12))

  convert -size "${width}x${height}" xc:"#020617" \
    \( "$LOGO" -resize "${logo_sz}x${logo_sz}" \) -gravity center -geometry "+0-${shift_y}" -composite \
    -gravity center -font "Liberation-Sans" -pointsize "${welcome_sz}" -fill "#f59e0b" -annotate "+0+$((welcome_offset - shift_y))" "Welcome" \
    -gravity center -font "Liberation-Sans-Bold" -pointsize "${title_sz}" -fill "#ffffff" -annotate "+0+$((title_offset - shift_y))" "Master Mind Qureshi Enterprise" \
    "$path"

  echo "Generated portrait splash $path ($width x $height)"
done

# Landscape splash screens: path width height
LANDSCAPE_SPLASHES=(
  "android/app/src/main/res/drawable-land-mdpi/splash.png 480 320 130 14 17 25"
  "android/app/src/main/res/drawable-land-hdpi/splash.png 800 480 190 18 22 40"
  "android/app/src/main/res/drawable-land-xhdpi/splash.png 1280 720 280 26 32 60"
  "android/app/src/main/res/drawable-land-xxhdpi/splash.png 1600 960 360 32 40 80"
  "android/app/src/main/res/drawable-land-xxxhdpi/splash.png 1920 1280 460 40 50 100"
)

for item in "${LANDSCAPE_SPLASHES[@]}"; do
  read -r path width height logo_sz welcome_sz title_sz shift_y <<< "$item"
  dir=$(dirname "$path")
  mkdir -p "$dir"

  welcome_offset=$((logo_sz / 2 + 25))
  title_offset=$((logo_sz / 2 + 25 + title_sz + 10))

  convert -size "${width}x${height}" xc:"#020617" \
    \( "$LOGO" -resize "${logo_sz}x${logo_sz}" \) -gravity center -geometry "+0-${shift_y}" -composite \
    -gravity center -font "Liberation-Sans" -pointsize "${welcome_sz}" -fill "#f59e0b" -annotate "+0+$((welcome_offset - shift_y))" "Welcome" \
    -gravity center -font "Liberation-Sans-Bold" -pointsize "${title_sz}" -fill "#ffffff" -annotate "+0+$((title_offset - shift_y))" "Master Mind Qureshi Enterprise" \
    "$path"

  echo "Generated landscape splash $path ($width x $height)"
done

echo "All Android resources successfully regenerated with Master Mind Qureshi Enterprise official branding!"
