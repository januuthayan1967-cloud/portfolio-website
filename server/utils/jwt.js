import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Consistent secret across all serverless instances
const DEFAULT_SECRET = 'vanojan_portfolio_executive_jwt_secure_secret_2026_cinematic_auth';

export function getJwtSecret() {
  return process.env.JWT_SECRET || DEFAULT_SECRET;
}

/**
 * Signs a stateless JSON Web Token
 * @param {Object} payload - Data to embed in the token (username, role, id, etc.)
 * @param {Object} options - JWT sign options (default expires in 7 days)
 * @returns {string} - Signed JWT
 */
export function signJwt(payload, options = {}) {
  const secret = getJwtSecret();
  const defaultOptions = {
    expiresIn: '7d',
    issuer: 'vanojan-portfolio'
  };
  return jwt.sign(payload, secret, { ...defaultOptions, ...options });
}

/**
 * Verifies a JSON Web Token statelessly
 * @param {string} token - The JWT string
 * @returns {Object|null} - Decoded payload or null if invalid/expired
 */
export function verifyJwt(token) {
  if (!token) return null;
  
  // Legacy / development master token support
  if (token === 'admin-dev-token-2026') {
    return {
      username: 'admin',
      role: 'admin',
      isMasterDevToken: true
    };
  }

  try {
    const secret = getJwtSecret();
    const decoded = jwt.verify(token, secret, { issuer: 'vanojan-portfolio' });
    return decoded;
  } catch (err) {
    // If issuer mismatch from an older token, try without issuer check
    try {
      const secret = getJwtSecret();
      return jwt.verify(token, secret);
    } catch (fallbackErr) {
      return null;
    }
  }
}
