import { authOptions } from "@/lib/session";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);  
    return NextResponse.json(session, { status: 200 });
  }