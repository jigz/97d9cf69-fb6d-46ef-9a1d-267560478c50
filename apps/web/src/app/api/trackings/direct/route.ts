export async function GET(req: Request) {
  const res = await fetch(
    "https://ust-testing.beautitag.com/tch/api/v1/trackings",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "tracking-api-key": "69c01f5e-5eef-4b4d-9bf3-07762d5f8888",
        //"API-Key": process.env.DATA_API_KEY,
      } as HeadersInit,
    }
  );
  const data = await res.json();

  return Response.json({ data });
}
