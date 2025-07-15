import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
    try{
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
         );
    const { role } = payload;

    const pathname = new URL(req.url).pathname;
    console.log(pathname);
    
    if (pathname.startsWith('/moderator') && role !== 'Moderator') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    if (pathname.startsWith('/user') && role !== 'User') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    return NextResponse.next();
    }catch (error) {
      console.error('Erreur lors de la recupération du token : ' , error);
      return NextResponse.redirect(error);
    }
}

export const config = {
  matcher: ['/user/:path*', '/moderator/:path*'],
};