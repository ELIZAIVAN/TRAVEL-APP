// const multer = require('multer');
// const fs = require('fs');
// const path = require('path');

// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         let destinationFolder = './uploads';


//          const routeParts = req.originalUrl.split('/');
//          const routePath = routeParts[1];

//          if (routePath === "categories") {
//              destinationFolder = './uploads/categories';
//          }


//          if (req.originalUrl === 'services') {
//              destinationFolder = './uploads/services';
//          }

//          if (req.originalUrl === 'hotels') {
//              destinationFolder = './uploads/hotels';
//          }

//          if (req.originalUrl === 'places') {
//              destinationFolder = './uploads/places';
//          }

//         // if (req.originalUrl === '/api/auth/update') {
//         //     destinationFolder = './uploads/users';
//         // }

              
//         callback(null, destinationFolder);
//     },
//     filename: (req, file, callback) => {
//         const sanitizedOriginalName = file.originalname.replace(/ /g, '_');
//         const filename = `image-${Date.now()}-${sanitizedOriginalName}`;

//         callback(null, filename);
//     }
// });

// const fileFilter = (req, file, callback) => {
//     if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype.startsWith('video')) {
//         callback(null, true);
//     } else {
//         callback(null, false);
//         return callback(new Error("Only png, jpg, jpeg, and video files are allowed!!"));
//     }
// };

// const multerConfig = multer({
//     storage,
//     fileFilter
// });

// module.exports = multerConfig;


const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        let destinationFolder = './uploads';


         const routeParts = req.originalUrl.split('/');
         const routePath = routeParts[1];

         if (routePath === "categories" ) {
             destinationFolder = './uploads/categories';
         }

         if (routePath === "places" ) {
            destinationFolder = './uploads/places';
        }

        if (routePath === "services" ) {
            destinationFolder = './uploads/services';
        }
        if (routePath === "hotels" ) {
            destinationFolder = './uploads/hotels';
        }
        // if (req.originalUrl === '/api/categories') {
        //     destinationFolder = './uploads/categories';
        // }

        // if (req.originalUrl === '/api/services') {
        //     destinationFolder = './uploads/services';
        // }

        // if (req.originalUrl === '/api/places') {
        //     destinationFolder = './uploads/places';
        // }

        // if (req.originalUrl === '/api/auth/update') {
        //     destinationFolder = './uploads/users';
        // }

              
        callback(null, destinationFolder);
    },
    filename: (req, file, callback) => {
        const sanitizedOriginalName = file.originalname.replace(/ /g, '_');
        const filename = `image-${Date.now()}-${sanitizedOriginalName}`;

        callback(null, filename);
    }
});

const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype.startsWith('video')) {
        callback(null, true);
    } else {
        callback(null, false);
        return callback(new Error("Only png, jpg, jpeg, and video files are allowed!!"));
    }
};

const multerConfig = multer({
    storage,
    fileFilter
});

module.exports = multerConfig;