# MongoDB and Database Guide

This project is connected to **MongoDB**, and all data is stored locally on your machine. You can view and manage this data using **MongoDB Compass**.

## 1. Connection Details
- **Connection URI:** `mongodb://localhost:27017`
- **Database Name:** `learningplatform`

## 2. Viewing Data in MongoDB Compass
1. Open **MongoDB Compass**.
2. Click on **"New Connection"**.
3. Paste the URI: `mongodb://localhost:27017`
4. Click **Connect**.
5. You will see a database named `learningplatform`.
6. Inside, you can find collections like:
   - `users`: Registered users (Admins and Students).
   - `students`: Student details submitted through the platform.
   - `uploads`: Files and metadata uploaded by admins.
   - `theories`: Study materials.
   - `tests`: Quiz questions and answers.

## 3. How Data is "Stored in this Project"
While MongoDB stores data in a centralized system folder by default, we have integrated the following to ensure the project remains self-contained:
- **Local Persistence:** Data is stored on your local machine, not in a remote cloud that could disappear.
- **Seeding Script:** Run `npm run seed` in the `BackEnd` folder to reset the database with fresh sample data anytime.
- **Uploads Folder:** Physical files (like PDFs or Videos) are stored in `BackEnd/uploads/`, which is part of this project directory.

## 4. Helpful Commands
In the `BackEnd` directory:
- `npm run seed`: Clears the database and adds sample admin (`admin@gmail.com` / `admin`) and student (`vishu@gmail.com` / `12345`) accounts.
- `npm run dev`: Starts the backend server.

---
**Recitified Errors:** 
- Connectivity between Frontend and Backend established.
- Data storage moved from Browser LocalStorage to MongoDB.
- Validation errors in models fixed.
