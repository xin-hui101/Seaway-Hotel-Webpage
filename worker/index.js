// Password-protects the whole site with HTTP Basic Auth.
// Username/password come from the Worker's runtime secrets DEMO_USERNAME / DEMO_PASSWORD
// (Cloudflare dashboard > Worker > Settings > Variables and Secrets).

const REALM = 'Seaway Hotel (demo)';

function unauthorized(message = 'Login required') {
  return new Response(message, {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="${REALM}", charset="UTF-8"`,
      'Cache-Control': 'no-store',
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}

// Constant-time string compare to avoid timing leaks.
function safeEqual(a, b) {
  const enc = new TextEncoder();
  const x = enc.encode(a);
  const y = enc.encode(b);
  let diff = x.length ^ y.length;
  const len = Math.max(x.length, y.length);
  for (let i = 0; i < len; i++) diff |= (x[i] ?? 0) ^ (y[i] ?? 0);
  return diff === 0;
}

function decodeBase64Utf8(b64) {
  const bin = atob(b64);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export default {
  async fetch(request, env) {
    const user = env.DEMO_USERNAME;
    const pass = env.DEMO_PASSWORD;

    // Fail closed: if the secrets are missing, nobody gets in.
    if (!user || !pass) {
      return new Response('Site locked: DEMO_USERNAME / DEMO_PASSWORD are not configured on the Worker.', {
        status: 503,
        headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
      });
    }

    const header = request.headers.get('Authorization') || '';
    const [scheme, encoded] = header.split(' ');
    if (scheme !== 'Basic' || !encoded) return unauthorized();

    let decoded;
    try {
      decoded = decodeBase64Utf8(encoded);
    } catch {
      return unauthorized();
    }
    const idx = decoded.indexOf(':');
    if (idx < 0) return unauthorized();
    const okUser = safeEqual(decoded.slice(0, idx), user);
    const okPass = safeEqual(decoded.slice(idx + 1), pass);
    if (!(okUser && okPass)) return unauthorized('Wrong username or password');

    // Authorized: serve the built static site.
    const res = await env.ASSETS.fetch(request);
    const out = new Response(res.body, res);
    out.headers.set('Cache-Control', 'private, no-store');
    out.headers.set('X-Robots-Tag', 'noindex');
    return out;
  },
};
