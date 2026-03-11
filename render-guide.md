# Deploying EduAsk to Render 🚀

Render is a great platform for deploying Node.js applications. Follow these steps to get EduAsk online:

### 1. Push your code to GitHub
If your code isn't on GitHub yet:
1. Create a new repository on [GitHub](https://github.com/new).
2. Follow the instructions to push your existing folder to the new repo.

### 2. Create a Web Service on Render
1. Go to [Render.com](https://dashboard.render.com/) and log in.
2. Click **New +** and select **Web Service**.
3. Connect your GitHub repository.

### 3. Configure the Service
- **Name**: `eduask-platform` (or your choice)
- **Region**: Select the one closest to you (e.g., `Singapore` for India).
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `node server.js`
- **Plan**: Select **Free**

### 4. Set Environment Variables (Crucial!)
Since we don't want to hardcode the API key in public code, you should move it to an environment variable in the Render dashboard:
1. Go to the **Environment** tab in your Render service settings.
2. Add a new variable:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: `AIzaSyDZgSmSPjNz5DDMy7MKQVrAyviNigKtiMY`

### 5. Final Code Polish
I have already updated your `server.js` to:
- Use `process.env.PORT` (Required by Render).
- Use `process.env.GEMINI_API_KEY` (Best practice).

### Your Live URLs:
- **Homepage**: `https://your-app-name.onrender.com/`
- **Ron Assistant**: `https://your-app-name.onrender.com/ron`
