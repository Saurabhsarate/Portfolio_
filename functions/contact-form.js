// /.netlify/functions/contact-form
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  try {
    const { name, email, message } = JSON.parse(event.body || '{}');
    if (!name || !email || !message) {
      return { statusCode: 400, body: 'Missing fields' };
    }
    // Example: Email via EmailJS/SendGrid/SMTP — keep simple: forward to mailto webhook or log
    // In production, integrate your provider here using env