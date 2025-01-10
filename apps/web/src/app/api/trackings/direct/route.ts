export async function GET(req: Request) {
  // TODO: Use zod typechecking for 3rd part APIs
  const res = await fetch(
    'https://ust-testing.beautitag.com/tch/api/v1/trackings',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'tracking-api-key': process.env.TRACKING_API_KEY,
      } as HeadersInit,
    },
  )
  const data = await res.json()

  return Response.json({ data })
}
