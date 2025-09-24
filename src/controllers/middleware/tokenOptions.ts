const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || "30", 10); // minutes
const refreshTokenExpire = parseInt(
  process.env.REFRESH_TOKEN_EXPIRE || "10080",
  10
); // minutes (7 days)
const verificationTokenExpire = parseInt(
  process.env.VERIFICATION_TOKEN_EXPIRE || "30",
  10
); // minutes

// convert minutes -> milliseconds
const accessTokenMs = accessTokenExpire * 60 * 1000;
const refreshTokenMs = refreshTokenExpire * 60 * 1000;
const verificationTokenMs = verificationTokenExpire * 60 * 1000;

interface ITokenOptions {
  expires: Date;
  maxAge: number; // milliseconds
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none" | undefined;
  domain: string;
  path: string;
  secure?: boolean;
}

const nodeModeFlag = process.env.NODE_ENV === "production";
const tokenDomain = process.env.TOKEN_DOMAIN as string;

const cookieSameSite = nodeModeFlag ? "none" : "lax";

// options for cookies
export const accessTokenOptions: ITokenOptions = {
  expires: new Date(Date.now() + accessTokenMs),
  maxAge: accessTokenMs,
  httpOnly: true,
  sameSite: cookieSameSite,
  domain: tokenDomain,
  path: "/",
  secure: nodeModeFlag,
};

export const refreshTokenOptions: ITokenOptions = {
  expires: new Date(Date.now() + refreshTokenMs),
  maxAge: refreshTokenMs,
  httpOnly: true,
  sameSite: cookieSameSite,
  domain: tokenDomain,
  path: "/",
  secure: nodeModeFlag,
};

export const verificationTokenOptions: ITokenOptions = {
  expires: new Date(Date.now() + verificationTokenMs),
  maxAge: verificationTokenMs,
  httpOnly: true,
  sameSite: cookieSameSite,
  domain: tokenDomain,
  path: "/",
  secure: nodeModeFlag,
};
