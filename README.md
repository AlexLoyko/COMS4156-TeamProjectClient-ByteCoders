# COMS4156 - Byte Coders - Client Frontend


## Overview
- Client Frontend for emergency responders. 
- Emergency Responders can signup, login, search for patients and view a patient's medications using PharmaId Service if they have associated PharmaId.

## Dev Set Up

- Install node if not already installed (https://nodejs.org/en/download/package-manager)

- Clone Repo and install dependencies
```
cd pharmaid-frontend
npm install --force
npm run dev
```
- Visit application at localhost:3000 (check console log to see if application has started at some other port if 3000 is already in use)

## Workflow


- Emergency responders can signup by visiting http://localhost:3000/signup page
- The can login via http://localhost:3000/login page
- They can see the list of patients and search for patients from http://localhost:3000/ , if a patient has pharmaId, the patient is highlighted, and on clicking it, patient's prescription can be viewed.
- A patient's prescription can be viewed by visiting http://localhost:3001/patient/{{patient_id}}
- if user is unauthenticated, they are redirected to login page
- The app handles multiple clients from different tabs as showcased in the demo.

## Demo
The demo link showcases the workflow : [demo](https://www.dropbox.com/scl/fi/vpjrjkkbg5q13vgu2rh57/Screen-Recording-2024-11-27-at-3.33.23-PM.mov?rlkey=d5lrxsim2b208vsb5oplx8fr4&st=1z482tt6&dl=0) or visit https://www.dropbox.com/scl/fi/vpjrjkkbg5q13vgu2rh57/Screen-Recording-2024-11-27-at-3.33.23-PM.mov?rlkey=d5lrxsim2b208vsb5oplx8fr4&st=1z482tt6&dl=0

## Repos
- **Pharma Id Service** : https://github.com/NavinColumbia/COMS4156-TeamProject-ByteCoders
- **Client Backend**: https://github.com/zcox10/COMS4156-TeamProject-ClientBackend-ByteCoders


## Libraries used
- Material UI React components - https://mui.com/material-ui/ 


## Team Members:
- Navinashok Swaminathan - ns3886
- Oleksandr Loyko - ol2260
- Zach Cox - zsc2107
- Orli Elisabeth Cohen - oec2109