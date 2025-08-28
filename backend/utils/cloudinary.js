const cloudinary = require('cloudinary').v2;

function configureCloudinary() {
	// console.log('Configuring Cloudinary...');
	// console.log('Cloud name:', process.env.CLOUDINARY_CLOUD_NAME || "dmz316wxm" ? 'Set' : 'Missing');
	// console.log('API Key:', process.env.CLOUDINARY_API_KEY || "247179179471582" ? 'Set' : 'Missing');
	// console.log('API Secret:', process.env.CLOUDINARY_API_SECRET || "VSv5o_M_axaKxwz-ktxT-inuoJo" ? 'Set' : 'Missing');
	
	// if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
	// 	console.error('Missing Cloudinary environment variables!');
	// 	return;
	// }
	
	cloudinary.config({
		cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dmz316wxm",
		api_key: process.env.CLOUDINARY_API_KEY || "247179179471582",
		api_secret: process.env.CLOUDINARY_API_SECRET || "VSv5o_M_axaKxwz-ktxT-inuoJo",
	});
	
	console.log('Cloudinary configured successfully');
}

async function uploadBuffer(buffer, folder) {
	return new Promise((resolve, reject) => {
		console.log(`Uploading to Cloudinary folder: ${folder}, buffer size: ${buffer.length}`);
		
		const stream = cloudinary.uploader.upload_stream(
			{ folder, resource_type: 'image' },
			(error, result) => {
				if (error) {
					console.error('Cloudinary upload error:', error);
					return reject(error);
				}
				console.log('Cloudinary upload success:', result.secure_url);
				return resolve(result);
			}
		);
		stream.end(buffer);
	});
}

module.exports = { configureCloudinary, uploadBuffer };


