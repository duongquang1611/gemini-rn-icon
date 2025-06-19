# gemini-rn-icon

[![npm version](https://badge.fury.io/js/gemini-rn-icon.svg)](https://badge.fury.io/js/gemini-rn-icon)
[![npm downloads](https://img.shields.io/npm/dm/gemini-rn-icon.svg)](https://www.npmjs.com/package/gemini-rn-icon)

🎯 A CLI tool to generate and apply React Native app icons automatically for both Android and iOS platforms.

🛠️ Công cụ CLI để tạo và áp dụng icon ứng dụng React Native tự động cho cả Android và iOS.

## 📦 Install / Cài đặt

```bash
npm install -g gemini-rn-icon
```

**📥 Download from npm:** [https://www.npmjs.com/package/gemini-rn-icon](https://www.npmjs.com/package/gemini-rn-icon)

## 📖 Usage / Cách sử dụng

### Basic Usage / Sử dụng cơ bản

```bash
gemini-rn-icon
```

### Step-by-step Guide / Hướng dẫn từng bước

1. **Prepare your icon image / Chuẩn bị ảnh icon**

   - Use a square image (1:1 ratio) / Sử dụng ảnh vuông (tỷ lệ 1:1)
   - Recommended size: 1024x1024 pixels / Kích thước khuyến nghị: 1024x1024 pixels
   - Supported formats: PNG, JPG, JPEG / Định dạng hỗ trợ: PNG, JPG, JPEG

2. **Run the command / Chạy lệnh**

   ```bash
   gemini-rn-icon
   ```

3. **Follow the prompts / Làm theo hướng dẫn**
   - Enter the path to your icon image / Nhập đường dẫn đến ảnh icon
   - Choose whether to auto-apply to your React Native project / Chọn có tự động áp dụng vào project React Native hay không

### Options / Tùy chọn

#### Auto-apply to React Native project / Tự động áp dụng vào project React Native

- **Yes**: Icons will be automatically placed in the correct directories for your React Native project
- **No**: Icons will be generated in a local `app-icons` folder

#### Manual placement / Đặt thủ công

If you choose not to auto-apply, icons will be generated in:

- `app-icons/Assets.xcassets/AppIcon.appiconset/` (iOS)
- `app-icons/android/` (Android)

## 📱 Generated Icons / Icon được tạo

### iOS Icons / Icon iOS

The tool generates all required iOS icon sizes:

- iPhone: 20x20, 29x29, 40x40, 60x60 (1x, 2x, 3x)
- iPad: 20x20, 29x29, 40x40, 50x50, 72x72, 76x76, 83.5x83.5 (1x, 2x)
- App Store: 1024x1024

### Android Icons / Icon Android

The tool generates all required Android icon sizes:

- mdpi: 48x48
- hdpi: 72x72
- xhdpi: 96x96
- xxhdpi: 144x144
- xxxhdpi: 192x192

## 🏗️ Project Structure / Cấu trúc dự án

```
your-react-native-project/
├── ios/
│   └── YourApp/
│       └── Images.xcassets/
│           └── AppIcon.appiconset/
│               ├── 20.png
│               ├── 29.png
│               ├── 40.png
│               ├── 60.png
│               ├── 76.png
│               ├── 83.5.png
│               ├── 1024.png
│               └── Contents.json
└── android/
    └── app/
        └── src/
            └── main/
                └── res/
                    ├── mipmap-mdpi/
                    │   └── ic_launcher.png
                    ├── mipmap-hdpi/
                    │   └── ic_launcher.png
                    ├── mipmap-xhdpi/
                    │   └── ic_launcher.png
                    ├── mipmap-xxhdpi/
                    │   └── ic_launcher.png
                    └── mipmap-xxxhdpi/
                        └── ic_launcher.png
```

## ⚠️ Requirements / Yêu cầu

- Node.js 14+ / Node.js 14 trở lên
- React Native project with iOS and Android folders / Project React Native có thư mục iOS và Android
- Square image file (PNG, JPG, JPEG) / File ảnh vuông (PNG, JPG, JPEG)

## 🔧 Troubleshooting / Xử lý sự cố

### Common Issues / Vấn đề thường gặp

1. **"File không tồn tại" / "File does not exist"**

   - Check the file path is correct / Kiểm tra đường dẫn file có đúng không
   - Use absolute path if needed / Sử dụng đường dẫn tuyệt đối nếu cần

2. **"Failed to create icon" / "Không thể tạo icon"**

   - Ensure the image is square (1:1 ratio) / Đảm bảo ảnh vuông (tỷ lệ 1:1)
   - Check image format is supported / Kiểm tra định dạng ảnh được hỗ trợ

3. **Auto-apply not working / Tự động áp dụng không hoạt động**
   - Ensure you're in a React Native project root / Đảm bảo bạn đang ở thư mục gốc project React Native
   - Check iOS and Android folders exist / Kiểm tra thư mục iOS và Android có tồn tại

## 📄 License / Giấy phép

MIT License

## 👨‍💻 Author / Tác giả

Quang Duong Dinh
