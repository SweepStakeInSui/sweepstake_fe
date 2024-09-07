export async function POST(request: Request) {
  const res = await request.json();
  return Response.json(
    { res },
    {
      status: 200,
      // headers: { 'Set-Cookie': `sessionToken=${token.value}` },
    },
  );
}
