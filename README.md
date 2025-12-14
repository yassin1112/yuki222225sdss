# Yuki Store - متجر روبلوكس

موقع بيع منتجات روبلوكس بتصميم جميل بألوان أرجواني وأسود.

## المميزات

- ✅ تصميم جميل ومتجاوب
- ✅ صفحات منفصلة لكل منتج
- ✅ نظام دفع مع modal جميل
- ✅ إرسال تلقائي للطلبات إلى Discord
- ✅ إدارة المنتجات من ملفات منفصلة

## إعداد Discord Webhook

1. افتح Discord واذهب إلى Server Settings
2. اختر Integrations > Webhooks
3. اضغط على New Webhook
4. انسخ رابط Webhook URL
5. افتح ملف `config.js`
6. استبدل `YOUR_DISCORD_WEBHOOK_URL_HERE` برابط webhook الخاص بك

```javascript
window.DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/YOUR_WEBHOOK_URL';
```

## هيكل الملفات

```
├── index.html              # الصفحة الرئيسية
├── blox-fruits.html       # صفحة Blox Fruits
├── steal-brainrot.html    # صفحة Steal a Brainrot
├── robux.html             # صفحة Robux
├── checkout-success.html  # صفحة إتمام الدفع
├── styles.css             # ملف التصميم
├── script.js              # JavaScript الرئيسي
├── config.js              # إعدادات Discord webhook
├── load-products.js       # تحميل المنتجات ديناميكياً
└── products/
    ├── blox-fruits.js     # منتجات Blox Fruits
    ├── steal-brainrot.js  # منتجات Steal a Brainrot
    └── robux.js           # منتجات Robux
```

## إضافة منتجات جديدة

لإضافة منتج جديد، افتح الملف المناسب في مجلد `products/` وأضف كائن جديد:

```javascript
{
    id: 'unique-id',
    name: 'اسم المنتج',
    price: 15000,
    featured: true, // اختياري - للحزم المميزة
    features: [
        '✅ ميزة 1',
        '✅ ميزة 2'
    ]
}
```

## طريقة الاستخدام

1. افتح `index.html` في المتصفح
2. تصفح المنتجات
3. اضغط على "اشتري الآن"
4. املأ البيانات في modal الدفع
5. سيتم إرسال الطلب تلقائياً إلى Discord

## ملاحظات

- تأكد من إعداد Discord webhook قبل الاستخدام
- جميع الأسعار بالدينار العراقي
- البيانات تُحفظ في sessionStorage للعرض في صفحة النجاح

