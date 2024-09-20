# SkinVision

## Model
Our inspiration:
- [A machine learning approach for skin disease detection and classification using image segmentation](https://www.sciencedirect.com/science/article/pii/S2772442522000624)
- [Machine Learning Methods in Skin Disease Recognition: A Systematic Review](https://www.mdpi.com/2227-9717/11/4/1003)

## How to Use
1. Clone the repository
```
git clone https://github.com/aibartt/SkinVision.git
```

2. Navigate to the repository :open_file_folder:
```
cd skinVision
```

3. Install the dependencies
```
cd frontend
npm install
cd ../backend
npm install
```
It can take a time to install the dependencies. If the errors appeared, it means that you don't meet the all installation requirements.

4. Create a `.env` file inside the backend folder and set the following credentials:
```
#.env
JWT_SECRET_KEY=62cd398e864141024db3d455f1753f6a571a0838a24a75540380b85463deb52e
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
PORT=3001
NODE_ENV=test
TEST_MONGODB_URI=
MONGODB_URI=
```
- Get the Cloudinary credentials from your [Cloudinary Dashboard](https://cloudinary.com/console/)
- Get the MongoDB credentials from your [MongoDB account](https://www.mongodb.com/)

5. Start the backend development server
```
npm run dev
```

6. Open a new terminal from `frontend` folder and run the frontend development server
```
npm run start
```

You can view the application at http://localhost:3000/.
