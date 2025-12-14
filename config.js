// Discord Configuration
// خيار 1: استخدام Webhook (الأسهل لكن قد يواجه مشاكل)
window.DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1449402202140578036/L8u74NLRe3oQWNIub5iwcQAgcWEMVWXM0Jz88VPvGSDVwtBWX_c3hd2xFRjINw5eOO1w';

// خيار 2: استخدام البوت (معطل - نستخدم webhook فقط)
// ضع رابط السيرفر هنا (مثلاً: http://localhost:3000 أو https://your-server.com)
window.BOT_API_URL = 'http://localhost:3000/api/order';
// إذا كنت تستخدم البوت، فعّل هذا:
window.USE_BOT = false; // معطل - نستخدم webhook فقط

// Product Configuration
const PRODUCT_CONFIG = {
    'blox-fruits': {
        name: 'Blox Fruits',
        products: bloxFruitsProducts
    },
    'steal-brainrot': {
        name: 'Steal a Brainrot',
        products: stealBrainrotProducts
    },
    'robux': {
        name: 'Robux',
        products: robuxProducts
    }
};

