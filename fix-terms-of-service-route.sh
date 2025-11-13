#!/bin/bash

# Shake Defi - Terms of Service Route Fix Script
# This script diagnoses and fixes the missing /terms-of-service route in the build

set -e  # Exit on error

echo "=================================="
echo "Terms of Service Route Fix Script"
echo "=================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Check current directory
echo "Step 1: Verifying project structure..."
if [ ! -f "package.json" ]; then
    echo -e "${RED}ERROR: package.json not found. Please run this script from your project root.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Found package.json${NC}"

# Step 2: Check for source files
echo ""
echo "Step 2: Checking for required source files..."

if [ -f "src/pages/terms-of-service.tsx" ]; then
    echo -e "${GREEN}✓ Found src/pages/terms-of-service.tsx${NC}"
else
    echo -e "${RED}✗ Missing src/pages/terms-of-service.tsx${NC}"
    echo "  This file is required for the Terms of Service route."
fi

if [ -f "src/content/tos.json" ]; then
    echo -e "${GREEN}✓ Found src/content/tos.json${NC}"
else
    echo -e "${RED}✗ Missing src/content/tos.json${NC}"
    echo -e "${YELLOW}  This file is likely the cause of the build issue!${NC}"
    echo ""
    echo "Would you like to create a template tos.json file? (y/n)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        mkdir -p src/content
        cat > src/content/tos.json << 'EOF'
{
  "title": "Terms of Service",
  "company": "Shake Defi, Inc.",
  "lastUpdated": "November 8, 2025",
  "introduction": "Welcome to Shake Defi. By accessing or using our services, you agree to be bound by these Terms of Service.",
  "sections": [
    {
      "id": "acceptance",
      "title": "Acceptance of Terms",
      "content": "By accessing and using the Shake Defi application, you accept and agree to be bound by the terms and provision of this agreement."
    },
    {
      "id": "definitions",
      "title": "Definitions",
      "subsections": [
        {
          "id": "service-definitions",
          "title": "Service Definitions",
          "definitions": [
            {
              "term": "Service",
              "definition": "refers to the Shake Defi mobile application and all related services."
            },
            {
              "term": "User",
              "definition": "refers to any individual who accesses or uses the Service."
            }
          ]
        }
      ]
    },
    {
      "id": "user-obligations",
      "title": "User Obligations",
      "content": "Users must comply with all applicable laws and regulations when using the Service.",
      "subsections": [
        {
          "id": "account-responsibility",
          "title": "Account Responsibility",
          "content": "You are responsible for maintaining the confidentiality of your account credentials.",
          "list": [
            "Keep your password secure",
            "Notify us immediately of unauthorized access",
            "Accept responsibility for all activities under your account"
          ]
        }
      ]
    },
    {
      "id": "contact",
      "title": "Contact Information",
      "contact": {
        "company": "Shake Defi, Inc.",
        "email": "matt@shakedefi.com",
        "address": "280 N. Market St, Unit 321, Brookfield, Wisconsin 53045"
      }
    }
  ],
  "acknowledgment": "By using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service."
}
EOF
        echo -e "${GREEN}✓ Created src/content/tos.json${NC}"
    fi
fi

# Step 3: Verify app.tsx has the route
echo ""
echo "Step 3: Checking app.tsx for Terms of Service route..."
if grep -q "terms-of-service" src/app.tsx; then
    echo -e "${GREEN}✓ Route definition found in app.tsx${NC}"
else
    echo -e "${RED}✗ Route definition NOT found in app.tsx${NC}"
    echo "  You may need to add this route to your app.tsx file."
fi

# Step 4: Clean build
echo ""
echo "Step 4: Cleaning previous build artifacts..."
rm -rf dist node_modules/.vite
echo -e "${GREEN}✓ Cleaned dist and Vite cache${NC}"

# Step 5: Install dependencies
echo ""
echo "Step 5: Installing dependencies..."
npm install
echo -e "${GREEN}✓ Dependencies installed${NC}"

# Step 6: Run build
echo ""
echo "Step 6: Running build..."
if npm run build; then
    echo -e "${GREEN}✓ Build completed successfully${NC}"
else
    echo -e "${RED}✗ Build failed${NC}"
    echo "  Check the error messages above for details."
    exit 1
fi

# Step 7: Verify route in compiled output
echo ""
echo "Step 7: Verifying route in compiled output..."
if grep -r "terms-of-service" dist/assets/*.js > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Terms of Service route found in compiled output!${NC}"
    echo ""
    echo -e "${GREEN}SUCCESS! The Terms of Service route is now included in the build.${NC}"
else
    echo -e "${RED}✗ Terms of Service route still NOT found in compiled output${NC}"
    echo ""
    echo "Additional troubleshooting needed. Possible causes:"
    echo "  1. The component has a runtime error"
    echo "  2. There's a circular dependency"
    echo "  3. The import path is incorrect"
    echo ""
    echo "Check build warnings above for clues."
fi

# Step 8: Offer to run preview
echo ""
echo "Would you like to preview the site locally? (y/n)"
read -r response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    echo ""
    echo "Starting preview server..."
    echo "Navigate to http://localhost:4173/terms-of-service to test"
    echo ""
    npm run preview
fi

echo ""
echo "=================================="
echo "Fix script complete!"
echo "=================================="