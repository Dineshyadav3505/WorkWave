import jwt from 'jsonwebtoken';


export const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60, // 1 hour
    path: '/',
};


export function generateToken(id) {
    
    const token = jwt.sign({id}, process.env.NEXT_PUBLIC_JWT_SECRET,{
        expiresIn: '1h'
    }
      );
    return token;
}


