#!/bin/bash

# ==========================================
# Security Pre-Deployment Checklist
# ==========================================
# Run this before every production deployment
# Usage: bash scripts/security-check.sh
# ==========================================

set -e

echo "🔒 Running Security Pre-Deployment Checklist..."
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

FAILED=0

# Function to check
check() {
  if [ $1 -eq 0 ]; then
    echo -e "${GREEN}✅ $2${NC}"
  else
    echo -e "${RED}❌ $2${NC}"
    FAILED=$((FAILED + 1))
  fi
}

# Function to warn
warn() {
  echo -e "${YELLOW}⚠️  $1${NC}"
}

echo "📋 Checking environment variables..."
echo "-----------------------------------"

# Check .env.local exists
if [ -f .env.local ]; then
  check 0 ".env.local file exists"

  # Check required variables
  grep -q "TWENTY_API_KEY=" .env.local && \
    [ "$(grep TWENTY_API_KEY .env.local | cut -d '=' -f2)" != "" ] && \
    [ "$(grep TWENTY_API_KEY .env.local | cut -d '=' -f2)" != "your_twenty_api_key_here" ]
  check $? "TWENTY_API_KEY is set and not default"

  grep -q "TWENTY_API_URL=" .env.local && \
    [ "$(grep TWENTY_API_URL .env.local | cut -d '=' -f2)" != "" ]
  check $? "TWENTY_API_URL is set"

  grep -q "NEXT_PUBLIC_SITE_URL=" .env.local && \
    [ "$(grep NEXT_PUBLIC_SITE_URL .env.local | cut -d '=' -f2)" != "" ]
  check $? "NEXT_PUBLIC_SITE_URL is set"
else
  check 1 ".env.local file exists"
  warn "Create .env.local from .env.example"
fi

echo ""
echo "🔐 Checking .gitignore protection..."
echo "-----------------------------------"

# Check .gitignore protects secrets
grep -q ".env*.local" .gitignore
check $? ".env*.local in .gitignore"

grep -q ".env$" .gitignore
check $? ".env in .gitignore"

echo ""
echo "📦 Checking dependencies..."
echo "-----------------------------------"

# Check for known vulnerabilities
if command -v npm &> /dev/null; then
  npm audit --production --audit-level=high > /dev/null 2>&1
  check $? "No high/critical npm vulnerabilities"
else
  warn "npm not found, skipping audit"
fi

echo ""
echo "🏗️  Checking build configuration..."
echo "-----------------------------------"

# Check next.config.ts has security headers
grep -q "X-Frame-Options" next.config.ts
check $? "X-Frame-Options header configured"

grep -q "Content-Security-Policy" next.config.ts
check $? "CSP header configured"

grep -q "Strict-Transport-Security" next.config.ts
check $? "HSTS header configured"

grep -q "poweredByHeader: false" next.config.ts
check $? "X-Powered-By header disabled"

echo ""
echo "🚀 Checking middleware..."
echo "-----------------------------------"

grep -q "x-forwarded-proto" middleware.ts
check $? "HTTPS enforcement in middleware"

echo ""
echo "📝 Checking git status..."
echo "-----------------------------------"

# Check no secrets in git
if git rev-parse --git-dir > /dev/null 2>&1; then
  git ls-files | grep -E "\.env\.local$|\.env$" > /dev/null 2>&1
  if [ $? -eq 0 ]; then
    check 1 "No .env files committed to git"
  else
    check 0 "No .env files committed to git"
  fi
else
  warn "Not a git repository"
fi

echo ""
echo "🔍 Checking for hardcoded secrets..."
echo "-----------------------------------"

# Search for potential API keys in code (basic check)
if git rev-parse --git-dir > /dev/null 2>&1; then
  # Exclude specific safe files and patterns
  HARDCODED=$(git grep -E "(api[_-]?key|secret|password|token)\s*=\s*['\"][^'\"]{20,}" -- \
    ':(exclude).env*' \
    ':(exclude)SECURITY.md' \
    ':(exclude)scripts/*' \
    ':(exclude)*.md' \
    ':(exclude)package*.json' || true)

  if [ -z "$HARDCODED" ]; then
    check 0 "No obvious hardcoded secrets found"
  else
    check 1 "Potential hardcoded secrets found"
    echo "$HARDCODED"
  fi
fi

echo ""
echo "=========================================="
if [ $FAILED -eq 0 ]; then
  echo -e "${GREEN}✅ All security checks passed!${NC}"
  echo "=========================================="
  echo ""
  echo "Ready for deployment 🚀"
  exit 0
else
  echo -e "${RED}❌ $FAILED security check(s) failed${NC}"
  echo "=========================================="
  echo ""
  echo "Please fix the issues above before deploying."
  exit 1
fi
