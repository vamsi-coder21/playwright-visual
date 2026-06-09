FROM node:20-bookworm

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install npm dependencies
RUN npm ci

# Install Playwright browsers (will use version from package.json)
RUN npx playwright install --with-deps

# Copy application code
COPY . .

# Run tests
CMD ["npx", "playwright", "test", "tests/LoginTest.spec.js"]