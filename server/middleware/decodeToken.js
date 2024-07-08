const jwt = require("jsonwebtoken");

/**
 * Verifies and decodes the ID from a JWT.
 * @param {string} token - The JWT.
 * @param {string} secret - The secret key used to sign the JWT.
 * @returns {string|null} - The decoded ID or null if verification fails.
 */
function verifyAndDecodeIdFromJWT(token, secret) {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded.id || null;
  } catch (error) {
    console.error("Invalid or expired token:", error);
    return null;
  }
}

module.exports = verifyAndDecodeIdFromJWT;