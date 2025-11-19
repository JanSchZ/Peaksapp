#!/bin/bash
set -euo pipefail

echo "🚀 Peaksapp - Installation Script"
echo "=================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

echo "📦 Step 1: Installing dependencies..."
npm install --legacy-peer-deps

echo ""
echo "🔧 Step 2: Fixing ajv version conflict for Expo..."
npm install ajv@^8.17.1 --save-dev --legacy-peer-deps

echo ""
echo "✅ Installation complete!"
echo ""
echo "Next steps:"
echo "  1. Configure Supabase (see ENV_EXAMPLE.md)"
echo "  2. Run the web app:    npm run dev --workspace=@peaks/web"
echo "  3. Run the mobile app: npm run start --workspace=@peaks/mobile"
echo ""
echo "For help, see:"
echo "  - README.md"
echo "  - TROUBLESHOOTING.md"
echo ""
