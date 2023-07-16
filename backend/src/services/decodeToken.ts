import jwt from 'jsonwebtoken';

export function decodeJwtTokenFromHeaders(authorizationHeader: string): any | null {
    if (authorizationHeader && typeof authorizationHeader === 'string') {
      const [bearer, token] = authorizationHeader.split(' ');
      if (bearer === 'Bearer' && token) {
        try {
          const decoded = jwt.decode(token);
          return decoded;
        } catch (error) {
          console.error('Error decoding token:', error);
          return null;
        }
      }
    }
    return null;
  }
  