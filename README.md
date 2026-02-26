# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## � Deployment

This project is configured for deployment to **Google Cloud Platform (GCP)** using **Cloud Build** and **Cloud Storage**.

### Prerequisites Setup Guide

Below are the commands to set up your GCP environment using the `gcloud` and `gsutil` CLI tools.

#### 1. Enable Required APIs

```sh
gcloud services enable cloudbuild.googleapis.com storage.googleapis.com
```

#### 2. Create and Configure Storage Bucket

Create a bucket and configure it for static website hosting:

```sh
# Create the bucket (replace 'your-bucket-name' with a unique name)
gsutil mb -l us-central1 gs://your-bucket-name

# Set the main page and error page
gsutil web set -m index.html -e 404.html gs://your-bucket-name

# Make the bucket publicly accessible (standard for static sites)
gsutil iam ch allUsers:objectViewer gs://your-bucket-name
```

#### 3. Grant Permissions to Cloud Build

Cloud Build needs permission to upload files to your Storage bucket. You must grant the **Storage Object Admin** role to the Cloud Build service account.

```sh
# Get your project number
export PROJECT_NUMBER=$(gcloud projects describe $(gcloud config get-value project) --format='value(projectNumber)')

# Add IAM policy binding
gcloud projects add-iam-policy-binding $(gcloud config get-value project) \
    --member="serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com" \
    --role="roles/storage.objectAdmin"
```

### Deployment Process

The project includes a `cloudbuild.yaml` file that automates the build and deployment process.

#### 1. Automatic Deployment (Recommended)

Set up a **Cloud Build Trigger** linked to your repository (e.g., GitHub or GitLab). Every time you push to the `main` branch, Cloud Build will:
- Install dependencies.
- Build the production site (`npm run build`).
- Sync the `dist/` folder to the GCS bucket.

#### 2. Manual Deployment

You can manually trigger a build using the Google Cloud SDK:

```sh
gcloud builds submit --config cloudbuild.yaml --substitutions=_BUCKET_NAME="your-bucket-name"
```

## �👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

