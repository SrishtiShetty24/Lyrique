
export async function POST(request: Request) {
  const response = {
    message: 'Temp lyrics for testing', // Hardcoded lyrics
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
