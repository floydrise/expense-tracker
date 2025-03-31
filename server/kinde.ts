import {
  createKindeServerClient,
  GrantType,
  SessionManager,
  UserType,
} from "@kinde-oss/kinde-typescript-sdk";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { Context } from "hono";
import { CookieOptions } from "hono/dist/types/utils/cookie";
import { Hono } from "hono";
import { createFactory, createMiddleware } from "hono/factory";

// Client for authorization code flow
export const kindeClient = createKindeServerClient(
  GrantType.AUTHORIZATION_CODE,
  {
    authDomain: Bun.env.KINDE_DOMAIN!,
    clientId: Bun.env.KINDE_CLIENT_ID!,
    clientSecret: Bun.env.KINDE_CLIENT_SECRET!,
    redirectURL: Bun.env.KINDE_REDIRECT_URI!,
    logoutRedirectURL: Bun.env.KINDE_LOGOUT_REDIRECT_URI!,
  },
);

let store: Record<string, unknown> = {};

export const sessionManager = (c: Context): SessionManager => ({
  async getSessionItem(key: string) {
    return getCookie(c, key);
  },
  async setSessionItem(key: string, value: unknown) {
    const cookieOptions: CookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
    };
    if (typeof value === "string") {
      setCookie(c, key, value, cookieOptions);
    } else {
      setCookie(c, key, JSON.stringify(value), cookieOptions);
    }
  },
  async removeSessionItem(key: string) {
    deleteCookie(c, key);
  },
  async destroySession() {
    ["id_token", "access_token", "user", "refresh_token"].forEach((key) => {
      deleteCookie(c, key);
    });
  },
});

type Env = {
  Variables: {
    user: UserType;
  };
};

export const getUser = createMiddleware<Env>(async (c, next) => {
  try {
    const manager = sessionManager(c);
    const isAuthenticated = await kindeClient.isAuthenticated(manager);
    if (!isAuthenticated) {
      return c.json({ error: "Not authorised" }, 401);
    }
    const user = await kindeClient.getUserProfile(manager);
    c.set("user", user);
    await next();
  } catch (e) {
    console.error(e);
  }
});
