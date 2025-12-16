Hey Team,

Here’s a step-by-step guide to get the XRCise project running on your computer and view it on your phone using the Expo Go app.

## Step 1: Prerequisites (One-Time Setup)
Before you start, make sure you have the following installed on your computer:

Git: For version control. [Download here](https://git-scm.com/downloads)

Node.js (LTS version): This is the environment that runs our project. [Download here](https://nodejs.org/en)

VS Code (or any code editor): To view and edit the code. [Download here](https://code.visualstudio.com/)

Expo Go App: Install this on your physical phone (iOS or Android) from the App Store / Play Store. (Remember to login after you download)


<img width="547" height="523" alt="image" src="https://github.com/user-attachments/assets/35578e6e-391a-4863-920c-44f1cab0d163" />

## Step 2: Clone the Project
This command downloads the entire project from GitHub to your computer.

Open your terminal (or the terminal inside VS Code).

Navigate to the folder where you want to store the project (e.g., cd Documents/Projects).

Run the following command:

git clone https://github.com/thainguyen1405/XRCise.git
<img width="1628" height="329" alt="image" src="https://github.com/user-attachments/assets/c6a6530a-912d-4f41-9392-5e9f5db743b0" />


Move into the newly created project directory:

cd XRCise

<img width="637" height="51" alt="image" src="https://github.com/user-attachments/assets/db671551-ad22-42ea-8408-40c5680ebfb9" />

## Step 3: Install Dependencies
This command reads the package.json file and installs all the necessary libraries and packages that the project needs to run.

Run this command in your terminal:

npm install expo

(This might take a few minutes to complete.)
<img width="1621" height="355" alt="image" src="https://github.com/user-attachments/assets/8be0c140-894b-4a32-bd21-efb8a3750748" />


## Step 4: Run the Project
Now you can start the development server. This will bundle the app and prepare it for viewing.

Run this command:

npx expo start

<img width="889" height="432" alt="image" src="https://github.com/user-attachments/assets/32fc4a75-476c-4cf4-98ad-a4ed069661a2" />


## Step 5: View on Your Phone
After running the start command, your terminal will display a QR code.

Make sure your computer and your phone are connected to the same Wi-Fi network.

Open the camera on your phone.

Scan the QR code shown in your terminal.

The app will now build and open on your phone, allowing you to see the latest progress of the project. Let me know if you run into any issues!
