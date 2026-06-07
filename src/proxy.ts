import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { rateLimiter } from "@/lib/rate-limit";

// Simple in-memory Rate Limiter
const ipHits = new Map<string, { count: number, resetTime: number }>();

function rateLimit(ip: string, maxHits: number, windowMs: number): boolean {
  const now = Date.now();
  
  // Lazy cleanup to prevent memory leak
  if (ipHits.size > 1000) {
    for (const [key, record] of ipHits.entries()) {
      if (now > record.resetTime) ipHits.delete(key);
    }
  }

  const record = ipHits.get(ip);
  if (!record || now > record.resetTime) {
    ipHits.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  if (record.count >= maxHits) {
    return false;
  }
  record.count++;
  return true;
}

export default auth(async (req) => {
  const ip = req.headers.get("x-forwarded-for") || (req as any).ip || "127.0.0.1";
  const { pathname } = req.nextUrl;

  // Terapkan Rate Limiting jika konfigurasi Redis tersedia
  if (rateLimiter) {
    // Abaikan rate limit untuk file statis dan gambar agar performa tetap maksimal
    if (!pathname.startsWith("/_next") && !pathname.match(/\.(png|jpg|jpeg|gif|svg|ico)$/)) {
      const { success, limit, reset, remaining } = await rateLimiter.limit(ip);
      
      if (!success) {
        return new Response(
          JSON.stringify({ 
            error: "Too Many Requests (DDoS Protection Active)",
            message: "Sistem mendeteksi aktivitas tidak wajar dari IP Anda. Silakan coba lagi nanti."
          }),
          {
            status: 429,
            headers: {
              "Content-Type": "application/json",
              "X-RateLimit-Limit": limit.toString(),
              "X-RateLimit-Remaining": remaining.toString(),
              "X-RateLimit-Reset": reset.toString(),
            },
          }
        );
      }
    }
  } else {
    // FALLBACK: Simple in-memory rate limiter jika Upstash tidak dikonfigurasi
    
    // 1. Bruteforce protection: Max 5 requests per minute for login
    if (req.method === "POST" && pathname.includes("/api/auth/callback/credentials")) {
      const isAllowed = rateLimit(`login_${ip}`, 5, 60 * 1000); // 5 hits per 60s
      if (!isAllowed) {
        return new NextResponse("Terlalu banyak percobaan login. Silakan tunggu 1 menit.", { status: 429 });
      }
    }

    // 2. Global DDoS protection: Max 500 requests per 10 seconds per IP
    const isGlobalAllowed = rateLimit(`global_${ip}`, 500, 10 * 1000);
    if (!isGlobalAllowed) {
      return new NextResponse("Terlalu banyak permintaan (DDoS Protection).", { status: 429 });
    }
  }

  // @ts-ignore
  // In Middleware with JWT strategy, req.auth might be the raw token, not the session object
  const role = req.auth?.user?.role || (req.auth as any)?.role;

  // Smart Router: Arahkan ke dashboard yang tepat
  if (pathname === "/dashboard" && req.auth) {
    if (role === "admin") return Response.redirect(new URL("/admin/dashboard", req.url));
    if (role === "writer") return Response.redirect(new URL("/writer/dashboard", req.url));
    return Response.redirect(new URL("/", req.url));
  }

  // Jika sudah login dan mencoba masuk ke halaman login, redirect ke dashboard (Smart Router akan ambil alih)
  if (pathname === "/login" && req.auth) {
    return Response.redirect(new URL("/dashboard", req.url));
  }

  // Proteksi rute admin (semua di bawah /admin membutuhkan role admin)
  if (pathname.startsWith("/admin")) {
    if (!req.auth || role !== "admin") {
      return Response.redirect(new URL("/login", req.url));
    }
  }

  // Proteksi rute writer (semua di bawah /writer membutuhkan role writer atau admin)
  if (pathname.startsWith("/writer")) {
    if (!req.auth || (role !== "writer" && role !== "admin")) {
      return Response.redirect(new URL("/login", req.url));
    }
  }
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
