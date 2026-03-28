// NextAuth v5 with strategy:"database" cannot perform DB lookups in Edge middleware.
// Onboarding redirect is handled in individual server page components.
export const config = { matcher: [] };
