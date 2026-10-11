import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'vyr3hnbq';
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true
});

export function isCloudinaryConfigured() {
  return Boolean(
    (process.env.CLOUDINARY_CLOUD_NAME || cloudName) &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
}

export function getCloudinaryStatus() {
  return {
    configured: isCloudinaryConfigured(),
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || cloudName,
    hasApiKey: Boolean(process.env.CLOUDINARY_API_KEY),
    hasApiSecret: Boolean(process.env.CLOUDINARY_API_SECRET)
  };
}

/**
 * Uploads a buffer directly to Cloudinary using upload_stream (in-memory, serverless-safe)
 * @param {Buffer} buffer - File buffer from multer memory storage
 * @param {Object} options - Cloudinary upload options (folder, public_id, transformation, etc.)
 * @returns {Promise<Object>} - Cloudinary upload response object
 */
export function uploadStream(buffer, options = {}) {
  return new Promise((resolve, reject) => {
    if (!isCloudinaryConfigured()) {
      return reject(new Error('Cloudinary credentials are not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.'));
    }

    const defaultOptions = {
      folder: 'vanojan_portfolio',
      resource_type: 'auto',
      ...options
    };

    const stream = cloudinary.uploader.upload_stream(defaultOptions, (error, result) => {
      if (error) {
        return reject(error);
      }
      resolve(result);
    });

    stream.end(buffer);
  });
}

/**
 * Deletes an image from Cloudinary by its public ID
 * @param {string} publicId - Cloudinary public ID
 * @param {Object} options - Deletion options
 * @returns {Promise<Object>} - Cloudinary deletion response
 */
export function deleteCloudinaryImage(publicId, options = {}) {
  return new Promise((resolve, reject) => {
    if (!isCloudinaryConfigured()) {
      return reject(new Error('Cloudinary credentials are not configured.'));
    }
    cloudinary.uploader.destroy(publicId, options, (error, result) => {
      if (error) {
        return reject(error);
      }
      resolve(result);
    });
  });
}

/**
 * Generates a server-side signed upload signature for direct uploads without exposing the API Secret
 * @param {Object} paramsToSign - Parameters to sign (folder, timestamp, etc.)
 * @returns {Object} - Signature, timestamp, apiKey, and cloudName
 */
export function generateSignedUploadParams(paramsToSign = {}) {
  if (!isCloudinaryConfigured()) {
    throw new Error('Cloudinary credentials are not configured.');
  }

  const timestamp = Math.round(new Date().getTime() / 1000);
  const params = {
    timestamp,
    ...paramsToSign
  };

  const signature = cloudinary.utils.api_sign_request(params, process.env.CLOUDINARY_API_SECRET);

  return {
    signature,
    timestamp,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || cloudName
  };
}

export { cloudinary };
