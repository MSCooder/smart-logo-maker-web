"use client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const response = await fetch("https://www.logoai.com/api/getAllInfo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  return NextResponse.json(data);
}