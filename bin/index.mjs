#!/usr/bin/env node

import fs from "fs";
import path from "path";
import sharp from "sharp";
import inquirer from "inquirer";
import chalk from "chalk";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const iosIconSpecs = [
  { size: "60x60", expectedSize: 180, scale: "3x", idiom: "iphone" },
  { size: "40x40", expectedSize: 80, scale: "2x", idiom: "iphone" },
  { size: "40x40", expectedSize: 120, scale: "3x", idiom: "iphone" },
  { size: "60x60", expectedSize: 120, scale: "2x", idiom: "iphone" },
  { size: "57x57", expectedSize: 57, scale: "1x", idiom: "iphone" },
  { size: "29x29", expectedSize: 58, scale: "2x", idiom: "iphone" },
  { size: "29x29", expectedSize: 29, scale: "1x", idiom: "iphone" },
  { size: "29x29", expectedSize: 87, scale: "3x", idiom: "iphone" },
  { size: "57x57", expectedSize: 114, scale: "2x", idiom: "iphone" },
  { size: "20x20", expectedSize: 40, scale: "2x", idiom: "iphone" },
  { size: "20x20", expectedSize: 60, scale: "3x", idiom: "iphone" },
  {
    size: "1024x1024",
    expectedSize: 1024,
    scale: "1x",
    idiom: "ios-marketing",
  },
  { size: "40x40", expectedSize: 80, scale: "2x", idiom: "ipad" },
  { size: "72x72", expectedSize: 72, scale: "1x", idiom: "ipad" },
  { size: "76x76", expectedSize: 152, scale: "2x", idiom: "ipad" },
  { size: "50x50", expectedSize: 100, scale: "2x", idiom: "ipad" },
  { size: "29x29", expectedSize: 58, scale: "2x", idiom: "ipad" },
  { size: "76x76", expectedSize: 76, scale: "1x", idiom: "ipad" },
  { size: "29x29", expectedSize: 29, scale: "1x", idiom: "ipad" },
  { size: "50x50", expectedSize: 50, scale: "1x", idiom: "ipad" },
  { size: "72x72", expectedSize: 144, scale: "2x", idiom: "ipad" },
  { size: "40x40", expectedSize: 40, scale: "1x", idiom: "ipad" },
  { size: "83.5x83.5", expectedSize: 167, scale: "2x", idiom: "ipad" },
  { size: "20x20", expectedSize: 20, scale: "1x", idiom: "ipad" },
  { size: "20x20", expectedSize: 40, scale: "2x", idiom: "ipad" },
];

const androidIconSpecs = [
  { name: "mipmap-mdpi/ic_launcher.png", size: 48 },
  { name: "mipmap-hdpi/ic_launcher.png", size: 72 },
  { name: "mipmap-xhdpi/ic_launcher.png", size: 96 },
  { name: "mipmap-xxhdpi/ic_launcher.png", size: 144 },
  { name: "mipmap-xxxhdpi/ic_launcher.png", size: 192 },
];

function getProjectName() {
  const iosDir = path.join(process.cwd(), "ios");
  const contents = fs.readdirSync(iosDir);
  const projectName = contents.find((name) => {
    const fullPath = path.join(iosDir, name);
    const xcodeprojPath = path.join(iosDir, `${name}.xcodeproj`);
    return fs.statSync(fullPath).isDirectory() && fs.existsSync(xcodeprojPath);
  });
  return projectName || "YourApp";
}

async function main() {
  console.log(chalk.cyan("\n🛠️ Gemini RN Icon Generator\n"));

  const { inputPath, autoApply } = await inquirer.prompt([
    {
      type: "input",
      name: "inputPath",
      message: "🖼️ Nhập đường dẫn đến file ảnh vuông (1:1):",
      validate: (value) =>
        fs.existsSync(value)
          ? true
          : "❌ File không tồn tại. Vui lòng nhập lại.",
    },
    {
      type: "confirm",
      name: "autoApply",
      message:
        "❓ Bạn có muốn tự động apply vào project React Native hiện tại không?",
      default: true,
    },
  ]);

  const iosOutputFolder = autoApply
    ? path.join(
        process.cwd(),
        `ios/${getProjectName()}/Images.xcassets/AppIcon.appiconset`
      )
    : path.resolve(
        process.cwd(),
        "app-icons/Assets.xcassets/AppIcon.appiconset"
      );
  const androidOutputFolder = autoApply
    ? path.join(process.cwd(), "android/app/src/main/res")
    : path.resolve(process.cwd(), "app-icons/android");

  fs.mkdirSync(iosOutputFolder, { recursive: true });
  fs.mkdirSync(androidOutputFolder, { recursive: true });

  const contentsJson = {
    images: iosIconSpecs.map((spec) => ({
      size: spec.size,
      idiom: spec.idiom,
      filename: `${spec.expectedSize}.png`,
      scale: spec.scale,
    })),
    info: { version: 1, author: "xcode" },
  };

  for (const spec of iosIconSpecs) {
    const filename = `${spec.expectedSize}.png`;
    const outputPath = path.join(iosOutputFolder, filename);
    try {
      await sharp(inputPath)
        .resize(spec.expectedSize, spec.expectedSize, { fit: "cover" })
        .toFile(outputPath);
      console.log(chalk.green(`✅ Created iOS: ${filename}`));
    } catch (err) {
      console.log(
        chalk.red(`❌ Failed to create iOS ${filename}: ${err.message}`)
      );
    }
  }

  for (const icon of androidIconSpecs) {
    const outputPath = path.join(androidOutputFolder, icon.name);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    try {
      await sharp(inputPath)
        .resize(icon.size, icon.size, { fit: "cover" })
        .toFile(outputPath);
      console.log(chalk.green(`✅ Created Android: ${icon.name}`));
    } catch (err) {
      console.log(
        chalk.red(`❌ Failed to create Android ${icon.name}: ${err.message}`)
      );
    }
  }

  fs.writeFileSync(
    path.join(iosOutputFolder, "Contents.json"),
    JSON.stringify(contentsJson, null, 2)
  );

  console.log(chalk.green("\n🧾 Contents.json generated"));

  if (autoApply) {
    console.log(
      chalk.green(
        "\n📦 Đã apply icon vào project React Native (iOS + Android)."
      )
    );
  } else {
    console.log(chalk.green("\n📁 Icon đã được tạo trong thư mục app-icons."));
  }

  console.log(chalk.cyan("\n🎉 Hoàn tất!"));
}

main();
