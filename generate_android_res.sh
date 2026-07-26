#!/bin/bash
set -e

LOGO="public/mastermind_logo.jpg"

if [ ! -f "$LOGO" ]; then
  echo "Error: $LOGO not found!"
  exit 1
fi

echo "Regenerating Android launcher icons..."

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

  # ic_launcher.png
  convert "$LOGO" -resize "${l_size}x${l_size}" "$dir/ic_launcher.png"

  # ic_launcher_round.png
  half=$((l_size / 2))
  convert "$LOGO" -resize "${l_size}x${l_size}" \
    \( -size "${l_size}x${l_size}" xc:none -fill white -draw "circle ${half},${half} ${half},0" \) \
    -compose copy_opacity -composite "$dir/ic_launcher_round.png"

  # ic_launcher_foreground.png
  fg_logo_size=$((fg_size * 2 / 3))
  convert "$LOGO" -resize "${fg_logo_size}x${fg_logo_size}" \
    -background none -gravity center -extent "${fg_size}x${fg_size}" "$dir/ic_launcher_foreground.png"

  echo "Generated icons for mipmap-${density}"
done

echo "Regenerating Android splash screens..."

# Array of splash screens: path width height
SPLASHES=(
  "android/app/src/main/res/drawable/splash.png 512 512"
  "android/app/src/main/res/drawable-port-mdpi/splash.png 320 480"
  "android/app/src/main/res/drawable-port-hdpi/splash.png 480 800"
  "android/app/src/main/res/drawable-port-xhdpi/splash.png 720 1280"
  "android/app/src/main/res/drawable-port-xxhdpi/splash.png 960 1600"
  "android/app/src/main/res/drawable-port-xxxhdpi/splash.png 1280 1920"
  "android/app/src/main/res/drawable-land-mdpi/splash.png 480 320"
  "android/app/src/main/res/drawable-land-hdpi/splash.png 800 480"
  "android/app/src/main/res/drawable-land-xhdpi/splash.png 1280 720"
  "android/app/src/main/res/drawable-land-xxhdpi/splash.png 1600 960"
  "android/app/src/main/res/drawable-land-xxxhdpi/splash.png 1920 1280"
)

for item in "${SPLASHES[@]}"; do
  read -r path width height <<< "$item"
  dir=$(dirname "$path")
  mkdir -p "$dir"

  # Calculate centered logo size (approx 45% of min dimension)
  if [ "$width" -lt "$height" ]; then
    min_dim=$width
  else
    min_dim=$height
  fi
  logo_sz=$((min_dim * 45 / 100))

  convert "$LOGO" -resize "${logo_sz}x${logo_sz}" \
    -background "#000000" -gravity center -extent "${width}x${height}" "$path"

  echo "Generated splash $path ($width x $height)"
done

echo "All Android resources successfully regenerated!"
