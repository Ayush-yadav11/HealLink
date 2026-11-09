# HeaLink AI

An AI health assistant: describe a symptom by typing or speaking, and Gemini returns a likely issue, an urgency level and advice, in English or Hindi, then points you to a doctor. Built for the Google Developer Groups Solution Challenge 2025.

**[See the project page →](https://ayush-yadav11.github.io/HealLink/)**

![React](https://img.shields.io/badge/React_18-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![MUI](https://img.shields.io/badge/Material_UI-007FFF?style=flat-square&logo=mui&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini_2.0_Flash-8E75B2?style=flat-square&logo=googlegemini&logoColor=white)

## Features

- **Ask in words or by voice.** Type a symptom or use the microphone (the browser's Web Speech API, English).
- **Health assessment.** Gemini 2.0 Flash answers in JSON: the likely issue, an urgency of Low, Moderate or High, two or three sentences of advice, and the specialty to see.
- **Hindi.** One tap translates the answer with Google Cloud Translation.
- **Remote Doctor.** Search doctors by name or specialty, filter to verified ones, and open their hours.
- **Light and dark themes**, with Framer Motion transitions.

The doctor directory is placeholder data for now, and *Book Consultation* shows a confirmation only. HeaLink AI gives general guidance; it does not diagnose.

## Tech stack

React 18 · Vite · Material UI · Framer Motion · React Router · Google Gemini API (`@google/generative-ai`) · Google Cloud Translation API · Web Speech API

## Run it

```bash
git clone https://github.com/Ayush-yadav11/HealLink.git
cd HealLink
npm install
```

Create a `.env` file:

```
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_GOOGLE_TRANSLATE_API_KEY=your_google_translate_api_key
```

Then `npm run dev`.

## Project structure

```
src/
├── App.jsx               routes and theme
├── pages/
│   ├── Home.jsx          daily advice, the question box, top doctors
│   ├── AIResponse.jsx    the health assessment, English or Hindi
│   ├── RemoteDoctor.jsx  the doctor directory and search
│   ├── DoctorPage.jsx    one doctor's page
│   └── HealthTips.jsx    health tips
├── hooks/useSpeechToText.js
└── utils/
    ├── gemini.js         the prompt and the Gemini call
    └── translate.js      Hindi translation
site/                     the project page (GitHub Pages)
```

## Screenshots

<img src="Screenshot/homePagelight.png" width="33%" /><img src="Screenshot/Consultations.png" width="33%" /><img src="Screenshot/DoctorsPage.png" width="33%" />

## Author

**Ayush Yadav** · [Portfolio](https://ayush-yadav.me/) · [GitHub](https://github.com/Ayush-yadav11) · [LinkedIn](https://www.linkedin.com/in/ayushyadav2611/)
