# vibe-coding-pweb

**Nama:** Revalina Erica Permatasari

**NRP:** 5027241007

# 🪙 BudgetBites - Smart Budget Tracker for Students

> Aplikasi web budget tracking yang membantu mahasiswa mengelola keuangan dengan mudah dan visual


---

## 📋 Deskripsi Singkat

**BudgetBites** adalah aplikasi web budget tracking yang dirancang khusus untuk membantu mahasiswa mengelola pengeluaran mereka secara efektif. Dengan interface yang intuitif, fitur dark/light mode, dan visualisasi data yang jelas, aplikasi ini membuat tracking expense menjadi mudah dan menyenangkan.

Aplikasi ini dibangun menggunakan **MERN Stack** (MongoDB, Express.js, React.js, Node.js) dengan fitur authentication, CRUD operations, file upload, dan real-time analytics.

**🎯 Target User:** Mahasiswa, fresh graduates, dan young professionals yang ingin lebih aware terhadap spending habits mereka.

---

## 🎯 Problem Statement - Masalah yang Diselesaikan

### Masalah Utama

Mahasiswa sering mengalami kesulitan dalam mengelola keuangan mereka, yang menyebabkan:

1. **💸 Pengeluaran Tidak Terkontrol**
   - Tidak ada sistem tracking yang sistematis untuk setiap pengeluaran
   - Sulit mengidentifikasi ke mana uang saku/allowance bulanan habis
   - Sering mengalami "tiba-tiba uang habis" tanpa tahu penyebabnya

2. **📊 Sulit Menganalisis Pola Belanja**
   - Tidak tahu kategori pengeluaran mana yang paling boros (makanan, transport, entertainment)
   - Tidak bisa membuat keputusan finansial yang informed
   - Sulit membuat budget planning untuk bulan berikutnya

3. **🔍 Lupa Pengeluaran Kecil**
   - Jajan kecil-kecil (kopi, snack, parkir) yang sering terlupakan
   - Pengeluaran kecil yang terakumulasi jadi nominal besar
   - Tidak ada dokumentasi untuk expenses yang sudah terjadi

4. **📝 Tidak Ada Bukti Transaksi**
   - Struk/nota sering hilang atau tercecer
   - Lupa berapa harga barang yang dibeli
   - Sulit untuk laporan keuangan ke orang tua atau untuk pribadi

5. **😓 Ribet dengan Manual Tracking**
   - Pencatatan di buku/notes manual memakan waktu dan tidak efisien
   - Tidak ada visualisasi atau summary otomatis
   - Rawan human error dalam perhitungan

### Dampak Masalah

- **Finansial stress** yang mengganggu fokus kuliah
- **Ketergantungan** pada orang tua karena sering kehabisan uang
- **Tidak berkembangnya** financial literacy di usia muda
- **Susah menabung** untuk kebutuhan mendadak atau goals tertentu

---

## 💡 Solution Overview - Solusi yang Dibuat

### Solusi BudgetBites

**BudgetBites** memberikan solusi komprehensif melalui:

#### 1. **📱 Interface yang Simple & Intuitive**
   - Dashboard yang bersih dan mudah dipahami
   - One-click untuk menambah expense
   - Dark mode untuk kenyamanan mata saat tracking malam hari
   - Mobile responsive - bisa tracking dari HP kapan saja

#### 2. **📊 Visual Analytics yang Jelas**
   - Breakdown pengeluaran per kategori dengan percentage
   - Visual progress bars untuk melihat proporsi spending
   - Total expenses dan transaction count di satu layar
   - Real-time updates setiap ada perubahan data

#### 3. **🖼️ Receipt Upload & Documentation**
   - Upload foto struk/nota sebagai bukti transaksi
   - Storage untuk semua dokumentasi pengeluaran
   - Preview image sebelum submit
   - Riwayat lengkap dengan bukti visual

#### 4. **🗂️ Category-based Organization**
   - Pengeluaran otomatis terkelompok (Food, Transport, Entertainment, Bills, Shopping, Other)
   - Emoji icons untuk setiap kategori
   - Mudah filter dan analisis per kategori
   - Identify pola spending dengan cepat

#### 5. **🔐 Secure & Personal**
   - Authentication system dengan JWT
   - Password encryption
   - Data tersimpan aman di database
   - Setiap user punya data expense masing-masing

#### 6. **⚡ Real-time & Efficient**
   - Instant add, edit, delete expense
   - No lag - built with modern tech stack
   - Automatic calculation dan statistics
   - Fast search dan filter

### Value Proposition

✅ **10 detik** untuk record expense (vs. 5 menit manual tracking)  
✅ **100% accuracy** - no calculation errors  
✅ **Visual insights** yang impossible dengan manual tracking  
✅ **Always accessible** - data tersimpan cloud (MongoDB)  
✅ **Free to use** - no subscription needed  

---

## 🛠️ Tech Stack & Fitur Utama

### Tech Stack

#### **Frontend**
```
React.js 18.2        - UI Framework & Component-based architecture
Lucide React         - Modern icon library (200+ icons)
Axios                - HTTP client untuk API calls
Context API          - Global state management (Theme, Auth)
React Hooks          - useState, useEffect, useContext, custom hooks
```

#### **Backend**
```
Node.js              - JavaScript runtime environment
Express.js 4.18      - Web framework & RESTful API
MongoDB              - NoSQL database untuk flexibility
Mongoose             - ODM (Object Data Modeling) untuk MongoDB
JWT (jsonwebtoken)   - Token-based authentication
Bcrypt.js            - Password hashing & encryption
Multer               - Middleware untuk file upload
CORS                 - Cross-Origin Resource Sharing
Dotenv               - Environment variable management
```

#### **Development Tools**
```
Nodemon              - Auto-restart server saat development
ESLint               - Code linting & quality
Git & GitHub         - Version control
```

### Fitur Utama

#### ✅ **1. Authentication System**
- **Register** dengan validasi email & password
- **Login** dengan JWT token authentication
- **Password hashing** menggunakan bcrypt (salt rounds 12)
- **Token verification** untuk protected routes
- **Session management** dengan localStorage
- **Logout** functionality

#### ✅ **2. Expense Management (Full CRUD)**
- **CREATE** - Tambah expense baru dengan:
  - Title (deskripsi pengeluaran)
  - Amount (nominal dalam Rupiah)
  - Category (6 kategori tersedia)
  - Date (tanggal transaksi)
  - Receipt (optional - upload foto struk)
  
- **READ** - View semua expenses dengan:
  - Sorting otomatis by date (newest first)
  - Display semua informasi expense
  - Icon indicator untuk expense dengan receipt
  
- **UPDATE** - Edit expense yang sudah ada:
  - Update semua field kecuali user ID
  - Replace receipt image jika upload baru
  - Real-time update di UI
  
- **DELETE** - Hapus expense dengan:
  - Confirmation dialog untuk prevent accidental delete
  - Automatic file cleanup (hapus receipt dari server)
  - Instant UI update

#### ✅ **3. Receipt Upload & Management**
- Upload image file (JPG, PNG, GIF, WEBP)
- Maximum file size: **5MB**
- Image preview sebelum submit
- Storage di server: `/uploads/receipts/`
- Unique filename: `userId_timestamp_original.ext`
- Delete old receipt saat update atau delete expense

#### ✅ **4. Dashboard & Analytics**
- **Stats Cards:**
  - Total Expenses (Rupiah)
  - Total Transactions (count)
  - Icon visual untuk setiap stat
  
- **Category Breakdown:**
  - Percentage calculation per kategori
  - Visual progress bars
  - Sorted by amount (terbesar ke terkecil)
  - Color-coded untuk easy identification

#### ✅ **5. Dark & Light Mode**
- Toggle switch di header
- Custom color palette untuk setiap mode:
  - **Light Mode**: Eggshell background, Sunflower Gold accent
  - **Dark Mode**: Mine Shaft background, Smoky Rose accent
- Smooth transition animation
- Preferences saved in localStorage
- Persistent across sessions

#### ✅ **6. Responsive Design**
- **Mobile First Approach**
- Breakpoints:
  - Mobile: < 768px (1 column layout)
  - Tablet: 768px - 1024px (2 columns)
  - Desktop: > 1024px (full layout)
- Hamburger menu untuk mobile
- Touch-friendly buttons (min 44x44px)
- Adaptive font sizes
- Flexible grid system

#### ✅ **7. Form Validation**
- Client-side validation:
  - Required fields
  - Email format validation
  - Password min 6 characters
  - Amount must be positive number
  
- Server-side validation:
  - Mongoose schema validation
  - Unique email check
  - File type & size validation
  - Input sanitization

#### ✅ **8. Error Handling**
- User-friendly error messages
- Global error handler di backend
- Network error handling
- File upload error handling
- 404 & 401 error handling
- Try-catch blocks di semua async operations

#### ✅ **9. Security Features**
- Password hashing dengan bcrypt (12 salt rounds)
- JWT token authentication
- Protected API routes
- HTTP-only considerations
- CORS configuration
- Environment variables untuk secrets
- Input sanitization

---

## 🚀 Cara Menjalankan Project (Setup Instructions)

### Prerequisites

Sebelum menjalankan project, pastikan sudah install:

- ✅ **Node.js** (v16 atau lebih baru) - [Download](https://nodejs.org/)
- ✅ **MongoDB** (v5 atau lebih baru) - [Download](https://www.mongodb.com/try/download/community)
- ✅ **npm** (biasanya sudah include dengan Node.js)
- ✅ **Git** (optional, untuk clone repository)

### Installation Steps

#### **1. Clone Repository**

```bash
git clone https://github.com/revaerica/vibe-coding-pweb
cd vibe-coding-pweb
```

#### **2. Setup Backend**

```bash
# Masuk ke folder backend
cd Backend

# Install dependencies
npm install

# Buat file .env
cat > .env << EOF
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/budgetbites
JWT_SECRET=budgetbitesTest
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:3000
EOF

# Buat folder uploads
mkdir -p uploads/receipts
touch uploads/receipts/.gitkeep
```

**Dependencies yang terinstall:**
- express
- mongoose
- bcryptjs
- jsonwebtoken
- cors
- dotenv
- multer
- nodemon (dev dependency)

#### **3. Setup Frontend**

```bash
# Kembali ke root folder
cd ..

# Masuk ke folder frontend
cd Frontend

# Install dependencies
npm install

# Buat file .env
cat > .env << EOF
REACT_APP_API_URL=http://localhost:5000/api
EOF
```

**Dependencies yang terinstall:**
- react
- react-dom
- react-scripts
- axios
- lucide-react

#### **4. Start MongoDB**

**Windows:**
```bash
net start MongoDB
```

**macOS:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
sudo systemctl enable mongod
```

**Verify MongoDB berjalan:**
```bash
mongosh
# Harusnya connect tanpa error
# Ketik: exit
```

#### **5. Run Backend Server**

```bash
# Di folder backend
cd backend
npm run dev
```

**Expected output:**
```
╔════════════════════════════════════╗
║   🪙 BudgetBites Server Running   ║
║   Port: 5000                       ║
║   Environment: development         ║
╚════════════════════════════════════╝
MongoDB Connected: 127.0.0.1
```

✅ **Backend berjalan di:** `http://localhost:5000`

#### **6. Run Frontend Application**

```bash
# Di terminal baru, masuk ke folder frontend
cd Frontend
npm start
```

**Browser akan otomatis terbuka di:** `http://localhost:3000`

---

### Quick Test

#### **Test Backend API:**
```bash
# Health check
curl http://localhost:5000/health

# Expected response:
# {"success":true,"message":"Server is running","timestamp":"..."}
```

#### **Test Register User:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'

# Expected: Response dengan token & user data
```

#### **Test Frontend:**
1. Buka `http://localhost:3000`
2. Klik "Register"
3. Isi form dan submit
4. Login dengan credentials yang sama
5. Tambah expense pertama
6. Verify data muncul di dashboard

---

### Verify Database

```bash
# Connect ke MongoDB
mongosh

# Switch ke database budgetbites
use budgetbites

# Check collections
show collections
# Output: users, expenses

# View data users
db.users.find().pretty()

# View data expenses
db.expenses.find().pretty()

# Exit
exit
```

---

### Troubleshooting

#### **Issue 1: MongoDB Connection Error**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
```bash
# Start MongoDB
# Windows:
net start MongoDB

# macOS:
brew services start mongodb-community

# Linux:
sudo systemctl start mongod
```

#### **Issue 2: Port Already in Use**
```
Error: listen EADDRINUSE :::5000
```

**Solution:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or change port in backend/.env
PORT=5001
```

#### **Issue 3: CORS Error**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
- Check `backend/.env`: `CLIENT_URL=http://localhost:3000`
- Restart backend server
- Clear browser cache

#### **Issue 4: Module Not Found**
```
Cannot find module 'express'
```

**Solution:**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

---

### Project Structure

```
budgetbites/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   └── multer.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── expenseController.js
│   │   ├── middlewares/
│   │   │   ├── authMiddleware.js
│   │   │   ├── errorHandler.js
│   │   │   └── uploadMiddleware.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Expense.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── expenseRoutes.js
│   │   └── server.js
│   ├── uploads/receipts/
│   ├── .env
│   ├── .gitignore
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── auth/
    │   │   │   └── AuthScreen.jsx
    │   │   ├── dashboard/
    │   │   │   ├── StatsCard.jsx
    │   │   │   ├── ExpenseList.jsx
    │   │   │   ├── ExpenseItem.jsx
    │   │   │   ├── ExpenseForm.jsx
    │   │   │   └── CategoryBreakdown.jsx
    │   │   └── layout/
    │   │       └── Header.jsx
    │   ├── contexts/
    │   │   ├── ThemeContext.jsx
    │   │   └── AuthContext.jsx
    │   ├── hooks/
    │   │   ├── useTheme.js
    │   │   ├── useAuth.js
    │   │   ├── useExpenses.js
    │   │   └── useLocalStorage.js
    │   ├── pages/
    │   │   └── Dashboard.jsx
    │   ├── services/
    │   │   ├── api.js
    │   │   ├── authService.js
    │   │   └── expenseService.js
    │   ├── utils/
    │   │   ├── constants.js
    │   │   ├── formatters.js
    │   │   └── validators.js
    │   ├── App.jsx
    │   ├── index.js
    │   └── index.css
    ├── .env
    ├── .gitignore
    └── package.json
```

---

### Environment Variables

#### **Backend (.env)**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/budgetbites
JWT_SECRET=budgetbitesTest
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:3000
```

#### **Frontend (.env)**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 📸 Screenshots

### Light Mode

<img width="1919" height="1041" alt="image" src="https://github.com/user-attachments/assets/bc7b6e7c-7105-4ccc-a1b8-4e2be19912bb" />

<img width="1919" height="965" alt="image" src="https://github.com/user-attachments/assets/79bfda84-3843-4078-9b54-3aeac804672d" />

<img width="1844" height="488" alt="image" src="https://github.com/user-attachments/assets/fb0e98ab-e540-4304-b6e1-b56037dc6d94" />

### Dark Mode

<img width="1919" height="1008" alt="image" src="https://github.com/user-attachments/assets/d7224f8d-8c03-4ad6-a962-f62ac0b202bf" />

<img width="1897" height="924" alt="image" src="https://github.com/user-attachments/assets/c9b95bd1-5514-46b4-88c5-b537260397c6" />

<img width="1901" height="471" alt="image" src="https://github.com/user-attachments/assets/1a417d27-0d78-4e8a-a594-aa264c303c38" />

### Mobile Responsive

<img width="332" height="720" alt="image" src="https://github.com/user-attachments/assets/dc9d2fbd-f083-4ca9-9f7b-5be7ded2af4e" />

<img width="1044" height="1012" alt="image" src="https://github.com/user-attachments/assets/ba5b9cc3-d5fd-482f-b0ea-8b759c6367a7" />

