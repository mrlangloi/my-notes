[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/znihlBtd)

# Local Set-up Steps
1. Clone the repository to a destination folder using `git clone`
2. Change directory to the project's root folder (where folder `public` and `src` resides), and then install dependencies using `npm i`
3. After all dependencies have finished installing, run development using `npm run dev`

# How to build and deploy using Google Cloud Platform VM (GCP VM)

### GCP Setup
1. Go to console.cloud.google.com Links to an external site. and create a new project named `firstname-lastname-372`.
2. Navigate to `Compute Engine` → `VM Instances` and create an instance with the following settings:
  - Name: `asn1`
  - Region / Zone: `any` (e.g. us-west1-b)
  - Machine type: `e2-small` (2 vCPUs, 2 GB RAM, sufficient for a static site; larger machines drain credits faster)
  - Boot disk: `Ubuntu 22.04 LTS`, `20 GB standard persistent disk`
  - Firewall: check `Allow HTTP traffic`
3. Connect to your instance via the SSH button in the console (or `gcloud compute ssh asn1` via the Cloud Shell).
4. On the VM, install Node.js and nginx:
  - `sudo apt update && sudo apt install -y nginx`
  - `curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -`
  - `sudo apt install -y nodejs`

### Deploying to GCP VM
1. Deploying the project to the GCP VM can be accomplished in a few ways:
  - Build the project locally using `npm run build`, and then copy the `dist` folder to the VM (via `gcloud compute scp` or `scp`)
  - SSH into the GCP VM, clone the project into the VM, and then build the project there using `npm run build`
2. Once the `dist` folder is inside the VM, copy the build output to nginx's web root, and then restart nginx
  - `sudo cp -r dist/* /var/www/html/`
  - `sudo systemctl restart nginx`
3. Visit `http://<YOUR_GCP_VM_EXTERNAL_IP>` to confirm the app loads

# AI Usage Disclosure
AI was used to design the CSS and to help with debugging TypeScript

# Design Decisions
- React Contexts was used to manage the saving and loading of notes from localStorage
- Given the requirement `Clicking a note opens it in a modal or navigates to a detail view showing the full title and body. Each note must have a Delete button.`, I made each saved note interactable by expanding/collapsing on click. This allows multiple notes to show full title and body at the same time, rather than one note at a time

# Testing via Vitest
Testing is added for the sake of learning beyond the scope of this project. Credits to https://www.youtube.com/watch?v=8Xwq35cPwYg for providing a general guide to testing TypeScript React + Vite components
Enter `npm run test:ui` to run the tests for rendering components