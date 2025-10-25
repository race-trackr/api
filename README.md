# ===================================
# BACKEND SETUP COMMANDS
# ===================================

cd api

# 1. Install dependencies
npm install

# 2. Setup environment
cp .env.example .env
# Edit .env with your database credentials

# 3. Generate app key
node ace generate:key

# 4. Setup Husky
npm run prepare
chmod +x .husky/commit-msg
chmod +x .husky/pre-commit

# 5. Run migrations
npm run migrate

# 6. Seed database
npm run db:seed

# 7. Start development server
npm start
