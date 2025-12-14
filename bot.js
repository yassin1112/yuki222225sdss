// Discord Bot for Yuki Store
// يعمل هذا البوت على استقبال الطلبات من الموقع وإرسالها إلى Discord

const express = require('express');
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' })); // للصور الكبيرة

// إنشاء بوت Discord
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]
});

// Channel ID - ضع ID القناة التي تريد إرسال الطلبات إليها
const CHANNEL_ID = process.env.DISCORD_CHANNEL_ID || '1411063346345545879';

// عند اتصال البوت
client.once('ready', () => {
    console.log(`✅ البوت متصل: ${client.user.tag}`);
    console.log(`📡 جاهز لاستقبال الطلبات...`);
});

// API endpoint لاستقبال الطلبات
app.post('/api/order', async (req, res) => {
    try {
        const { product, package: packageName, price, robloxUsername, whatsapp, telegram, images } = req.body;

        // التحقق من البيانات
        if (!product || !robloxUsername || !whatsapp || !telegram) {
            return res.status(400).json({ 
                success: false, 
                error: 'بيانات ناقصة' 
            });
        }

        // الحصول على القناة
        const channel = client.channels.cache.get(CHANNEL_ID);
        if (!channel) {
            return res.status(500).json({ 
                success: false, 
                error: 'القناة غير موجودة' 
            });
        }

        // إنشاء embed
        const embed = new EmbedBuilder()
            .setTitle('🛒 طلب جديد - Yuki Store')
            .setColor(0x8B5CF6)
            .addFields(
                { name: '📦 المنتج', value: product || 'غير محدد', inline: true },
                { name: '📋 الحزمة', value: packageName || 'غير محدد', inline: true },
                { name: '💰 السعر', value: (price || '0') + ' دينار عراقي', inline: true },
                { name: '🎮 اسم روبلوكس', value: robloxUsername || 'غير محدد', inline: false },
                { name: '📸 صور كرت آسيا', value: Array.isArray(images) && images.length > 0 ? `${images.length} صورة` : 'لا توجد صور', inline: false },
                { name: '📱 رقم واتساب', value: whatsapp || 'غير محدد', inline: true },
                { name: '✈️ اسم تيليجرام', value: telegram || 'غير محدد', inline: true }
            )
            .setTimestamp()
            .setFooter({ text: 'Yuki Store' });

        // إضافة الصورة الأولى إذا كانت موجودة
        if (Array.isArray(images) && images.length > 0 && images[0]) {
            const imgUrl = String(images[0]).trim();
            if (imgUrl.length > 100 && imgUrl.startsWith('data:image/')) {
                embed.setImage(imgUrl);
            }
        }

        // إرسال الرسالة
        await channel.send({ embeds: [embed] });

        // إرسال الصور الإضافية
        if (Array.isArray(images) && images.length > 1) {
            for (let i = 1; i < images.length; i++) {
                if (images[i]) {
                    try {
                        const imgUrl = String(images[i]).trim();
                        if (imgUrl.length > 100 && imgUrl.startsWith('data:image/')) {
                            const imageEmbed = new EmbedBuilder()
                                .setTitle(`📸 صورة كرت آسيا ${i + 1}`)
                                .setImage(imgUrl);
                            await channel.send({ embeds: [imageEmbed] });
                        }
                    } catch (e) {
                        console.warn(`فشل إرسال الصورة ${i + 1}:`, e.message);
                    }
                }
            }
        }

        res.json({ 
            success: true, 
            message: 'تم إرسال الطلب بنجاح' 
        });

    } catch (error) {
        console.error('خطأ في معالجة الطلب:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        bot: client.user ? client.user.tag : 'غير متصل',
        channel: CHANNEL_ID !== 'YOUR_CHANNEL_ID_HERE' ? 'مضبوط' : 'غير مضبوط'
    });
});

// بدء السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 السيرفر يعمل على المنفذ ${PORT}`);
});

// تسجيل دخول البوت
const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
if (!BOT_TOKEN || BOT_TOKEN === 'YOUR_BOT_TOKEN_HERE') {
    console.error('❌ لم يتم إعداد BOT_TOKEN في ملف .env');
    console.log('يرجى إضافة DISCORD_BOT_TOKEN في ملف .env');
} else {
    client.login(BOT_TOKEN).catch(err => {
        console.error('❌ فشل تسجيل دخول البوت:', err.message);
    });
}

