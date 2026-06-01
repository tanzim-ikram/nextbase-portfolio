import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        fetch: async (input, init) => {
          try {
            return await fetch(input, init)
          } catch (e) {
            return new Response(
              JSON.stringify({
                error: 'network_error',
                message: 'Database is offline or host is unreachable',
              }),
              {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
              }
            )
          }
        },
      },
    }
  )
}
