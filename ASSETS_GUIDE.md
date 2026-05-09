# 🎨 Assets Guide

Complete guide for adding images, music, and icons to your Second Monthsary website.

## 📁 Folder Structure

```
assets/
├── images/           # Your couple photos and memories
├── music/            # Background music files
└── icons/            # Custom icons (optional)
```

## 🖼️ Images

### Where to Add Images

**For Hero Section** - `assets/images/`
- File name: `couple-photo.jpg`
- Recommended size: 300x300px (circular)
- Format: JPG, PNG, or WebP
- Max size: 200KB

**For Memory Gallery** - `assets/images/`
- File names: `memory1.jpg`, `memory2.jpg`, etc.
- Recommended size: 800x800px or 1024x1024px
- Format: JPG or PNG
- Max size: 300KB each

### How to Use Images in HTML

#### Hero Image
Edit `index.html`:
```html
<div class="hero-image">
  <img src="assets/images/couple-photo.jpg" alt="Our Love">
</div>
```

#### Memory Gallery Cards
Update data-image attribute:
```html
<div class="memory-card" data-image="assets/images/memory1.jpg">
  <!-- Content -->
</div>
```

### Image Optimization

**Using TinyPNG (Free)**
1. Go to https://tinypng.com/
2. Upload your images
3. Download compressed versions
4. Place in `assets/images/`

**Using Online Tools**
- ImageCompressor.com
- Compressor.io
- Optimizilla.com

### Image Tips

✅ **Do**
- Use high-quality source images
- Compress before uploading
- Use consistent dimensions
- Keep aspect ratios
- Use descriptive file names

❌ **Don't**
- Use huge files (>1MB)
- Mix different formats unnecessarily
- Use very small images (< 200px)
- Forget to compress

## 🎵 Music

### Where to Add Music

**Background Music** - `assets/music/`
- File name: `romantic.mp3`
- Format: MP3 (best for compatibility)
- Recommended: 2-4 minutes
- Max size: 5MB

### Music Selection Tips

**Best Genres for Background**
- Lo-fi hip hop
- Ambient/Chill
- Piano instrumental
- Soft acoustic
- Electronic ambient

**Free Music Resources**
- YouTube Audio Library (Free)
- Pixabay Music (Free)
- Bensound.com (Free)
- Freepik.com/music (Free)
- Incompetech.com (Free)

**Recommended Artists/Styles**
- Ambient/Chill compilations
- Lo-fi beats
- Piano covers of romantic songs
- String quartet arrangements

### How to Use Music in Code

Enable in `script.js`:
```javascript
function playBackgroundMusic() {
  if (!backgroundMusic) {
    backgroundMusic = DOM.create('audio');
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.3;
    backgroundMusic.src = 'assets/music/romantic.mp3'; // Add this
    document.body.appendChild(backgroundMusic);
  }
  // ... rest of code
}
```

### Audio Compression

**Using FFmpeg (Advanced)**
```bash
ffmpeg -i input.mp3 -q:a 5 output.mp3
```

**Using Online Tools**
- Freeconvert.com
- Cloudconvert.com
- Online-convert.com

**Quick Tips**
- MP3 at 192kbps = good quality & small file
- MP3 at 128kbps = acceptable quality & very small
- Always test audio quality before finalizing

## 🎨 Icons

### Icon Options

**Option 1: Emoji (Recommended)**
- Already included in the code
- No files needed
- Works everywhere
- Customizable via text

**Option 2: SVG Icons**
- Scalable vector format
- Small file size
- Can be colored
- Location: `assets/icons/`

**Option 3: Icon Libraries**
- Font Awesome (Free)
- Feather Icons (Free)
- Material Icons (Free)

### Using Emoji

Already implemented throughout the site:
- ❤️ ❤️ = Heart
- 💜 = Purple Heart
- 💖 = Sparkling Heart
- 💕 = Two Hearts
- ✨ = Sparkles
- 🌹 = Rose
- 💘 = Cupid Arrow

### Adding Custom SVG Icons

**Location**: `assets/icons/`

**Example**: Create `heart.svg`
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <path fill="#ff1493" d="M50,90 C50,90 20,70 20,50 C20,35 32,25 42,25 C50,25 50,35 50,35 C50,35 50,25 58,25 C68,25 80,35 80,50 C80,70 50,90 50,90 Z"/>
</svg>
```

**Use in HTML**:
```html
<img src="assets/icons/heart.svg" alt="Heart" width="30">
```

## 📸 Sample Image Sizes

### Recommended Dimensions

**Hero Section**
- Size: 300x300px
- Format: JPG
- Best: Circular photo

**Memory Gallery**
- Size: 800x800px or 1024x1024px
- Format: JPG or PNG
- Best: Square photos

**Timeline Icons**
- Can use emoji (no file needed)
- Or: 50x50px SVG/PNG

**General Guidelines**
- Hero: 300x300px
- Cards: 400x400px - 800x800px
- Thumbnails: 200x200px
- Icons: 48x48px - 100x100px

## 📤 File Naming Convention

### Best Practices

**Good Names**
- `memory1.jpg`
- `couple-photo.jpg`
- `first-date.jpg`
- `romantic.mp3`
- `heart-icon.svg`

**Bad Names**
- `IMG_12345.jpg` (unclear)
- `photo (1).jpg` (avoid spaces)
- `file.jpg` (not descriptive)
- `áéíóú.jpg` (avoid special characters)

**Convention**
- Use lowercase
- Use hyphens, not spaces
- Be descriptive
- Add numbers if multiple similar files

## 🔍 File Size Checklist

| File Type | Recommended Size | Max Size | Quality |
|-----------|-----------------|----------|---------|
| Hero Image | 50-150KB | 200KB | High |
| Gallery Image | 100-250KB | 300KB | High |
| Background Music | 500KB-2MB | 5MB | Good |
| SVG Icon | <10KB | 50KB | Varies |

## ✅ Pre-Upload Checklist

Before using your files:

- [ ] Images are optimized/compressed
- [ ] File names are descriptive
- [ ] File paths are correct
- [ ] Images are right dimensions
- [ ] Music volume is appropriate
- [ ] All files are in correct folders
- [ ] HTML src attributes are updated
- [ ] No broken links

## 🚀 Quick Setup Steps

1. **Add Images**
   ```
   Copy your couple photos to: assets/images/
   ```

2. **Add Music** (Optional)
   ```
   Copy music file to: assets/music/romantic.mp3
   ```

3. **Update HTML**
   ```
   Edit image src paths in index.html
   ```

4. **Test**
   ```
   Open website in browser
   Verify all images load
   Test music toggle button
   ```

## 💡 Pro Tips

### Image Tips
- Use professional photos or high-quality personal photos
- Ensure good lighting in photos
- Crop photos to focus on both of you
- Use consistent editing style (filters/saturation)
- Test images on mobile before finalizing

### Music Tips
- Choose instrumental for background (less distracting)
- Test volume on different devices
- Pick music that reflects your relationship
- Consider loop points (music shouldn't fade abruptly)
- Have a backup music file if primary fails

### General Tips
- Backup original files
- Keep website version organized
- Test across browsers
- Check mobile experience
- Get feedback before sharing

## 🎁 Where to Get Media

### Free Images
- Unsplash (https://unsplash.com/)
- Pexels (https://www.pexels.com/)
- Pixabay (https://pixabay.com/)
- Freepik (https://www.freepik.com/)

### Free Music
- YouTube Audio Library
- Pixabay Music
- Bensound
- Incompetech
- Free Music Archive

### Editing Tools
- Canva (design)
- Photopea (photo editing)
- Pixlr (photo editing)
- Audacity (audio editing)

## 🔧 Troubleshooting

### Images Not Showing
- Check file path is correct
- Verify file name capitalization (case-sensitive on some servers)
- Ensure images are in `assets/images/` folder
- Try different image format
- Clear browser cache

### Music Not Playing
- Verify file is in `assets/music/`
- Check file format is MP3
- Ensure music file is not corrupted
- Try on different browser
- Check browser console for errors

### Files Too Large
- Compress images using TinyPNG
- Compress music to 128kbps MP3
- Remove unnecessary metadata
- Use WebP format for images

## 📊 Performance Impact

### Image Impact
- 1 hero image: ~100KB
- 6 memory images: ~600KB
- Total images: ~700KB (acceptable)

### Music Impact
- 3-minute MP3 at 192kbps: ~4.5MB
- 3-minute MP3 at 128kbps: ~3MB
- Auto-plays softly (better UX)

### Optimization Tips
- Lazy load images (scroll-based)
- Compress all media before uploading
- Use CDN for large files (optional)
- Enable browser caching

## 🎯 Final Checklist

Before sharing your website:

- [ ] All images are added and optimized
- [ ] Hero photo is eye-catching
- [ ] Memory gallery has 6+ photos
- [ ] Background music is set up (optional)
- [ ] All file paths are correct
- [ ] Website loads quickly
- [ ] Images are high quality
- [ ] No broken links
- [ ] Tested on mobile and desktop
- [ ] Ready to share with your love! 💜

---

**Everything is set up! Now customize with your personal photos and memories to make it truly special!**

🌹✨💜 Happy creating! 💜✨🌹
