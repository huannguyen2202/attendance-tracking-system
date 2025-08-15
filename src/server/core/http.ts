// src/server/core/http.ts
import { NextResponse } from "next/server";
import { AppError } from "./errors";

export function httpOk(data: unknown, init?: ResponseInit) {
  return NextResponse.json({ status: 200, data }, { status: 200, ...init });
}

export function httpCreated(data: unknown, init?: ResponseInit) {
  return NextResponse.json({ status: 201, data }, { status: 201, ...init });
}

export function httpError(err: unknown) {
  if (err instanceof AppError) {
    return NextResponse.json({ status: err.status, code: err.code, message: err.message }, { status: err.status });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const message = (err as any)?.message || "Internal Server Error";
  return NextResponse.json({ status: 500, message }, { status: 500 });
}

export function httpBadRequest(message = "Bad request") {
  return NextResponse.json({ status: 400, message }, { status: 400 });
}

export function httpUnauthorized(message = "Unauthorized") {
  return NextResponse.json({ status: 401, message }, { status: 401 });
}
