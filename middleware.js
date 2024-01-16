import { NextResponse } from 'next/server'
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
export function middleware(req) {
    const token = req.cookies.get('token')
    const pathname = req.nextUrl.pathname
    if (token){
        if (typeof window !== "undefined"){
            localStorage.setItem("USER_DATA",  JSON.stringify({
                token: token,
            }))
        }
    }
    if (!token && pathname !== "/signin") {
        return NextResponse.redirect(new URL('/signin', req.url))
    }
    return NextResponse.next()
}