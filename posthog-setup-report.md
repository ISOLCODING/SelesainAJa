<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into SelesainAja — an Indonesian academic task-completion service platform. The integration follows the Next.js 15.3+ best practices using `instrumentation-client.ts` for initialization, a reverse proxy via Next.js rewrites, and targeted event capture across all key user conversion touchpoints.

## Changes made

### New files
- **`instrumentation-client.ts`** — Client-side PostHog initialization with `capture_exceptions`, debug mode, and reverse proxy host (`/ingest`)
- **`src/lib/posthog-server.ts`** — Server-side PostHog client (requires `npm install posthog-node` to activate)

### Modified files
- **`next.config.ts`** — Added `/ingest` reverse proxy rewrites and `skipTrailingSlashRedirect: true`
- **`src/components/providers/PostHogProvider.tsx`** — Removed duplicate `posthog.init()` (now handled by `instrumentation-client.ts`)
- **`.env.local`** — Added `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST`

### Event instrumentation
| Event | Description | File |
|---|---|---|
| `user_registered` | User successfully creates a new account | `src/components/auth/RegisterForm.tsx` |
| `user_logged_in` | User successfully logs in with credentials | `src/components/auth/LoginForm.tsx` |
| `login_failed` | Login attempt fails with error message | `src/components/auth/LoginForm.tsx` |
| `service_detail_viewed` | User views a service detail page (top of funnel) | `src/components/frontend/services/ServiceDetailClient.tsx` |
| `service_order_clicked` | User clicks "Pesan Sekarang" on the pricing card | `src/components/frontend/services/ServiceDetailClient.tsx` |
| `service_consultation_clicked` | User clicks "Konsultasi Gratis" WhatsApp link | `src/components/frontend/services/ServiceDetailClient.tsx` |
| `faq_expanded` | User expands an FAQ item on a service detail page | `src/components/frontend/services/ServiceDetailClient.tsx` |
| `whatsapp_cta_clicked` | User clicks the floating WhatsApp button | `src/components/shared/FloatingWhatsApp.tsx` |
| `hero_order_clicked` | User clicks the main hero "Pesan Sekarang" CTA | `src/components/frontend/home/sections/HeroSection.tsx` |
| `contact_form_submitted` | User submits the contact form | `src/app/(frontend)/contact/page.tsx` |

### User identification
`posthog.identify()` is called on successful login and registration, linking anonymous browsing sessions to named users with their email address.

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **[Analytics basics (wizard) — Dashboard](https://us.posthog.com/project/465212/dashboard/1697625)**
- [New User Registrations](https://us.posthog.com/project/465212/insights/KnpWZrIe) — Daily trend of new signups
- [Service Detail Views by Slug](https://us.posthog.com/project/465212/insights/lgDQTvyt) — Which services get the most attention
- [Service Conversion Funnel](https://us.posthog.com/project/465212/insights/kqU1XvZ7) — Drop-off from service view to order/consultation click
- [Lead Generation Clicks](https://us.posthog.com/project/465212/insights/NlnPW0mF) — WhatsApp, order, and consultation button clicks over time
- [Hero CTA & Contact Form Engagement](https://us.posthog.com/project/465212/insights/aFONo7Lp) — Top-of-funnel homepage engagement

### Activating server-side events
`src/lib/posthog-server.ts` is ready. To enable server-side tracking, run:
```bash
npm install posthog-node
```
Then import `getPostHogClient` from `@/lib/posthog-server` in your Server Actions to capture events with full server context.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
