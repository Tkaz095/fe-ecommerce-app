# 🛍️ E-Commerce App

Ứng dụng thương mại điện tử xây dựng bằng **React Native + Expo SDK 51**, tổ chức theo mô hình **Modular / Feature-based**.

---

## 🚀 Khởi động nhanh

```bash
# 1. Cài dependencies
npm install

# 2. Chạy app (chọn 1 trong các lệnh)
npm start              # Mở menu chọn platform
npm run android        # Chạy trực tiếp Android
npm run ios            # Chạy trực tiếp iOS
npm run web            # Chạy trên trình duyệt

# 3. Quét QR bằng Expo Go trên điện thoại
#    ⚠️ Yêu cầu Expo Go hỗ trợ SDK 51
```

> **Lưu ý:** PC và điện thoại phải kết nối **cùng mạng WiFi**.  
> Nếu không quét được, dùng tunnel mode: `npx expo start --tunnel`

---

## 📦 Phiên bản quan trọng

| Package | Version |
|---|---|
| Expo SDK | **~51.0.0** |
| React Native | **0.74.5** |
| React | **18.2.0** |
| @react-navigation | **v6** |
| Zustand | **v4** |
| Axios | **^1.7.2** |
| TypeScript | **~5.3.3** |

---

## 🗂️ Cấu trúc thư mục `src/`

```
src/
│
├── constants/                  ← Token thiết kế dùng chung toàn app
│   ├── theme.ts                ★ Bảng màu, typography, spacing, shadows
│   ├── Colors.ts               Màu legacy (tham chiếu cũ)
│   └── index.ts                Re-export tất cả constants
│
├── types/                      ← Định nghĩa kiểu TypeScript
│   ├── product.types.ts        Product, Category, ProductFilter
│   ├── user.types.ts           User, Address, AuthCredentials
│   ├── order.types.ts          Order, OrderItem, OrderStatus
│   └── navigation.types.ts     Param list của từng Stack / Tab
│
├── navigation/                 ← Toàn bộ cấu hình điều hướng
│   ├── index.tsx               RootNavigator — phân nhánh Auth / App
│   ├── AuthNavigator.tsx       Stack: Login → Register → ForgotPassword
│   ├── AppTabNavigator.tsx     Bottom Tab: Shop / Cart / Profile
│   ├── ShopNavigator.tsx       Stack: Home → ProductDetail → Search → Category
│   ├── CartNavigator.tsx       Stack: Cart → Checkout → Payment → OrderSummary
│   └── ProfileNavigator.tsx    Stack: Profile → OrderHistory → Settings
│
├── screens/                    ← Màn hình, chia theo luồng người dùng
│   ├── auth/
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   └── ForgotPasswordScreen.tsx
│   ├── main/
│   │   ├── HomeScreen.tsx
│   │   ├── ProductDetailScreen.tsx
│   │   ├── SearchScreen.tsx
│   │   └── CategoryScreen.tsx
│   ├── checkout/
│   │   ├── CartScreen.tsx
│   │   ├── CheckoutScreen.tsx
│   │   ├── PaymentScreen.tsx
│   │   └── OrderSummaryScreen.tsx
│   └── profile/
│       ├── ProfileScreen.tsx
│       ├── OrderHistoryScreen.tsx
│       └── SettingsScreen.tsx
│
├── components/
│   ├── common/                 ← UI nguyên tử, tái sử dụng mọi nơi
│   │   ├── Button.tsx          Hỗ trợ variant: primary/secondary/outline/ghost/danger
│   │   ├── Input.tsx           Input có label, error, focus state
│   │   ├── Badge.tsx           Badge màu theo variant
│   │   ├── Loader.tsx          Spinner, hỗ trợ fullScreen overlay
│   │   └── index.ts
│   └── features/               ← Component gắn với nghiệp vụ
│       ├── product/
│       │   ├── ProductCard.tsx  Card hiển thị sản phẩm + nút Add to Cart
│       │   ├── ProductList.tsx  FlatList 2 cột dùng ProductCard
│       │   └── index.ts
│       └── cart/
│           ├── CartItem.tsx     Hàng trong giỏ: ảnh, số lượng, xóa
│           ├── CartSummary.tsx  Tổng tiền, shipping, nút Checkout
│           └── index.ts
│
├── store/                      ← Zustand — trạng thái toàn cục
│   ├── useCartStore.ts         Giỏ hàng: items, add/remove/qty/clear/totalPrice
│   ├── useUserStore.ts         Auth: user, token, isAuthenticated
│   └── index.ts
│
├── services/                   ← Tất cả lời gọi API (Axios)
│   ├── api.ts                  Axios instance + interceptor (token tự động / xử lý 401)
│   ├── productService.ts       getAll, getById, search, getFeatured, getCategories
│   ├── orderService.ts         create, getAll, getById, cancel
│   └── userService.ts          login, register, logout, getProfile, addAddress
│
├── hooks/                      ← Custom hooks
│   ├── useAuth.ts              login / register / signOut (hiện dùng mock)
│   ├── useProducts.ts          Fetch + filter sản phẩm, trả isLoading / error / refetch
│   └── useDebounce.ts          Trì hoãn giá trị (dùng cho ô tìm kiếm)
│
└── utils/                      ← Hàm thuần (pure functions)
    ├── formatCurrency.ts       formatCurrency(amount), formatDiscount(original, sale)
    ├── validators.ts           email, password, required, phone, minLength
    └── storage.ts              Wrapper AsyncStorage: get / set / remove / clear
```

---

## 🎨 Bảng màu chủ đạo

Tất cả màu được định nghĩa trong `src/constants/theme.ts`, import bằng:

```ts
import { Colors } from '../constants/theme';
```

### Màu thương hiệu

| Token | Hex | Mô tả |
|---|---|---|
| `Colors.primary` | `#4F46E5` | **Indigo** — màu chính, trustworthy, tech |
| `Colors.primaryLight` | `#E0E7FF` | Nền nhạt của primary |
| `Colors.primaryDark` | `#4338CA` | Hover / pressed state |
| `Colors.secondary` | `#F43F5E` | **Coral Rose** — CTA, nút nổi bật, khuyến mãi |
| `Colors.secondaryLight` | `#FFE4E6` | Nền nhạt của secondary |

### Màu ngữ nghĩa

| Token | Hex | Dùng cho |
|---|---|---|
| `Colors.success` | `#14B8A6` | Đặt hàng thành công, còn hàng |
| `Colors.danger` | `#F56565` | Lỗi, hết hàng, xóa |
| `Colors.warning` | `#F59E0B` | Tồn kho thấp, cảnh báo |

### Màu nền & văn bản

| Token | Hex | Dùng cho |
|---|---|---|
| `Colors.background` | `#F9FAFB` | Nền màn hình |
| `Colors.surface` | `#FFFFFF` | Nền card, modal |
| `Colors.surfaceAlt` | `#F3F4F6` | Nền input, skeleton |
| `Colors.textPrimary` | `#111827` | Tiêu đề, nội dung chính |
| `Colors.textSecondary` | `#6B7280` | Mô tả, placeholder |
| `Colors.textDisabled` | `#9CA3AF` | Trạng thái disabled |
| `Colors.textInverse` | `#FFFFFF` | Chữ trên nền tối |
| `Colors.border` | `#E5E7EB` | Viền input, divider |

---

## 🔐 Đăng nhập (Mock Mode)

Hiện tại chưa có API, login chạy local validation:

| Trường | Điều kiện hợp lệ |
|---|---|
| Email | Đúng định dạng `xxx@xxx.xxx` |
| Password | Tối thiểu **8 ký tự** |

**Ví dụ hợp lệ:** `test@gmail.com` / `12345678`

> Để kết nối API thật: thay mock block trong `src/hooks/useAuth.ts` bằng lời gọi `userService.login()`.

---

## 🔧 Xử lý sự cố thường gặp

| Lỗi | Nguyên nhân | Fix |
|---|---|---|
| *"Project incompatible with Expo Go"* | SDK không khớp | Dùng Expo Go hỗ trợ SDK 51, hoặc `--tunnel` |
| *"Something went wrong"* (mobile) | Package thiếu hoặc lỗi import | Xem log bằng cách lắc điện thoại → View Error |
| Không quét được QR | PC và điện thoại khác mạng | Kết nối cùng WiFi, hoặc dùng `npx expo start --tunnel` |
| Port 8081 bị chiếm | Tiến trình cũ chưa tắt | `Stop-Process -Name "node" -Force` |
| 281 lỗi TypeScript đỏ | `tsconfig.json` thiếu flag | Đảm bảo có `jsx`, `esModuleInterop` trong `compilerOptions` |

---

## 🛠️ Thêm tính năng mới

**Quy tắc:**
1. Type mới → `src/types/`
2. API mới → `src/services/`
3. State mới → `src/store/`
4. Component tái sử dụng → `src/components/common/` hoặc `features/`
5. Màn hình mới → `src/screens/<luồng>/` + đăng ký route trong `src/navigation/`

---

*Cập nhật lần cuối: 12/03/2026*
