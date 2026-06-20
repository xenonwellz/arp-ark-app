import { NextRequest, NextResponse } from "next/server";

interface StoredGuess {
  sessionId: string;
  name: string;
  timestamp: number;
}

const store: StoredGuess[] = [];

function getSession(request: NextRequest): string | null {
  return request.cookies.get("guess_session")?.value ?? null;
}

export async function GET(request: NextRequest) {
  const sessionId = getSession(request);

  const guesses = store.map((g, i) => ({
    id: String(i),
    name: g.name,
    timestamp: g.timestamp,
    isOwn: g.sessionId === sessionId,
  }));

  return NextResponse.json({ guesses });
}

export async function POST(request: NextRequest) {
  let sessionId = getSession(request);
  const isNew = !sessionId;
  if (!sessionId) {
    sessionId = crypto.randomUUID();
  }

  const body = await request.json();
  const name = body?.name?.trim();

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  if (store.some((g) => g.sessionId === sessionId!)) {
    return NextResponse.json({ error: "You can only guess once" }, { status: 409 });
  }

  store.push({ sessionId: sessionId!, name, timestamp: Date.now() });

  const response = NextResponse.json({ success: true, id: String(store.length - 1) });

  if (isNew) {
    response.cookies.set("guess_session", sessionId!, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });
  }

  return response;
}

export async function DELETE(request: NextRequest) {
  const sessionId = getSession(request);
  if (!sessionId) {
    return NextResponse.json({ error: "No session" }, { status: 401 });
  }

  const index = store.findIndex((g) => g.sessionId === sessionId);
  if (index === -1) {
    return NextResponse.json({ error: "No guess found" }, { status: 404 });
  }

  store.splice(index, 1);
  return NextResponse.json({ success: true });
}
