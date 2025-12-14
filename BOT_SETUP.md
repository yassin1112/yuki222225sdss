# إعداد بوت Discord لـ Yuki Store

هذا الدليل يوضح كيفية إعداد بوت Discord لاستقبال الطلبات من الموقع وإرسالها إلى Discord.

## الخطوة 1: إنشاء بوت Discord

1. اذهب إلى [Discord Developer Portal](https://discord.com/developers/applications)
2. اضغط على **New Application**
3. أعط البوت اسماً (مثلاً: Yuki Store Bot)
4. اذهب إلى **Bot** في القائمة الجانبية
5. اضغط على **Add Bot**
6. في قسم **Token**، اضغط على **Reset Token** ثم انسخ الـ Token
7. فعّل الخيارات التالية:
   - ✅ **MESSAGE CONTENT INTENT** (مهم جداً)
   - ✅ **SERVER MEMBERS INTENT** (اختياري)

## الخطوة 2: إضافة البوت إلى السيرفر

1. اذهب إلى **OAuth2** > **URL Generator**
2. اختر الـ Scopes:
   - ✅ `bot`
   - ✅ `applications.commands`
3. اختر الـ Bot Permissions:
   - ✅ `Send Messages`
   - ✅ `Embed Links`
   - ✅ `Attach Files`
   - ✅ `Read Message History`
4. انسخ الرابط الذي يظهر في الأسفل
5. افتح الرابط في المتصفح واختر السيرفر الذي تريد إضافة البوت إليه
6. اضغط **Authorize**

## الخطوة 3: الحصول على Channel ID

1. في Discord، فعّل **Developer Mode**:
   - Settings > Advanced > Developer Mode
2. اضغط بزر الماوس الأيمن على القناة التي تريد إرسال الطلبات إليها
3. اختر **Copy ID**
4. احفظ الـ ID

## الخطوة 4: تثبيت المتطلبات

افتح Terminal في مجلد المشروع وقم بتشغيل:

```bash
npm install
```

## الخطوة 5: إعداد ملف .env

1. انسخ ملف `.env.example` إلى `.env`:
   ```bash
   cp .env.example .env
   ```

2. افتح ملف `.env` واملأ البيانات:
   ```
   DISCORD_BOT_TOKEN=YOUR_BOT_TOKEN_HERE
   DISCORD_CHANNEL_ID=YOUR_CHANNEL_ID_HERE
   PORT=3000
   ```

## الخطوة 6: تشغيل البوت

```bash
npm start
```

أو للتطوير (يعيد التشغيل تلقائياً عند التعديل):
```bash
npm run dev
```

يجب أن ترى رسالة: `✅ البوت متصل: Yuki Store Bot#1234`

## الخطوة 7: تحديث الموقع

الآن يجب تحديث `script.js` لإرسال الطلبات إلى السيرفر بدلاً من webhook مباشرة.

## ملاحظات

- تأكد من أن البوت موجود في السيرفر
- تأكد من أن البوت لديه صلاحيات الكتابة في القناة
- السيرفر يعمل على `http://localhost:3000` (يمكن تغييره في `.env`)

## استكشاف الأخطاء

- **البوت لا يتصل**: تحقق من BOT_TOKEN
- **لا يمكن إرسال الرسائل**: تحقق من Channel ID وصلاحيات البوت
- **خطأ 401**: Token غير صحيح
- **خطأ 403**: البوت لا يملك الصلاحيات المطلوبة

