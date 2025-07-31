import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const role = req.cookies.get('role')?.value;
  
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
    try{
      
    const pathname = new URL(req.url).pathname;
    console.log(pathname);
    
    if (pathname.startsWith('/moderator') && role !== 'Admin') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    if (pathname.startsWith('/user') && role !== 'User') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    return NextResponse.next();
    }catch (error) {
      console.error('Erreur lors de la recupération du token : ' , error);
      return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
  matcher: ['/user/:path*', '/moderator/:path*'],
};