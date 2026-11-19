# MeyPlanner

**All-in-one itinerary & visual trip planner** for Windows and Android.
App ID: `com.meyplanner.app` · Logo: `www/logo.svg` (MP monogram)

## Features

| Feature | What it does |
|---|---|
| 🗺️ **Interactive map** | Numbered, color-coded pins per day, dotted route lines, place search (OpenStreetMap), "Drop pin" anywhere |
| 🗓 **Day-by-day planner** | Each day shows times, walking/driving distance & time between stops, and daily cost |
| ✋ **Drag-and-drop** | Drag the ⋮⋮ handle to reorder stops or move them between days / "Places to visit" (mouse + touch) |
| 🔀 **Route optimizer** | One tap reorders a day's stops for the shortest travel path |
| ⚡ **Quick draft** | Choose destination, days, pace and interests to get a full itinerary grouped by area, with times |
| 🧭 **Explore / inspiration** | Ready-made travelers' guides (KL, Penang, Langkawi, Singapore, Bangkok, Bali, Tokyo, Seoul, Paris) to copy & edit |
| 📧 **Reservation import from email** | Paste a confirmation email or load `.eml`/`.html` files; detects flights, hotels (check-in/out), trains, car rentals, restaurants and tours, including confirmation codes, and places them on the right day. Parsing runs on-device |
| 👥 **Real-time group collaboration** | Share a 6-letter code; everyone's edits sync live (see setup below) |
| 💰 **Expense splitting** | Add expenses, choose who paid and who shares, see balances and a minimal "who pays whom" settle-up; budget tracking by category |
| 📤 **Sharing** | Export trip file, copy itinerary as text (WhatsApp-ready), print / save as PDF |
| ⚙️ Extras | Dark mode, multi-currency, trip notes, full backup/restore, Android back button support |

All data is stored on the device (offline-first). The map and place search need internet.

---

## 1. Get the installers: easiest way (GitHub, no setup on your PC)

1. Create a free GitHub account and a **new repository** (private is fine).
2. Upload everything in this folder, including the hidden `.github` folder (or `git push` it).
3. Open the **Actions** tab. The **Build MeyPlanner** workflow runs automatically, or you can click *Run workflow*.
4. After about 10 minutes, download the artifacts:
   - **MeyPlanner-Windows**: `MeyPlanner-1.0.0-nsis.exe` (installer) and `MeyPlanner-1.0.0-portable.exe` (no install needed)
   - **MeyPlanner-Android**: `MeyPlanner.apk`. Copy it to your phone and open it (allow "Install unknown apps").

> Windows SmartScreen may warn because the app is not code-signed. Click *More info → Run anyway*.

## 2. Build on your own PC

Requirements: [Node.js 20+](https://nodejs.org).

```bash
npm install
npm start            # run the desktop app
npm run build:win    # → dist/MeyPlanner-1.0.0-nsis.exe + portable .exe  (run on Windows)
```

Android (also needs [Android Studio](https://developer.android.com/studio), which includes the SDK and JDK 21):

```bash
npm run android:init   # first time only: creates android/ with the MP icon & splash
npm run build:apk      # → android/app/build/outputs/apk/debug/app-debug.apk
# or: npm run android:open  → in Android Studio: Build ▸ Generate Signed Bundle/APK (for Play Store)
```

After editing anything in `www/`, run `npm run android:sync` before rebuilding the APK.

## 3. Turn on real-time collaboration (free, 2 minutes)

MeyPlanner syncs shared trips through a Firebase Realtime Database that you own:

1. Go to <https://console.firebase.google.com> → **Add project** (Analytics not needed).
2. **Build ▸ Realtime Database ▸ Create database**, choose a region (e.g. Singapore), then start in **locked mode**.
3. Open the **Rules** tab and paste:
   ```json
   { "rules": { "meyplanner": { "$code": { ".read": true, ".write": true } } } }
   ```
   With these rules, only someone who knows a trip's code can open it. Codes are random but not secret passwords, so don't store sensitive data in shared trips.
4. Copy the database URL (e.g. `https://meyplanner-xxxx-default-rtdb.asia-southeast1.firebasedatabase.app`).
5. In MeyPlanner, go to **Settings → Real-time collaboration server** and paste the URL. Each friend pastes the same URL once.
6. Open a trip, go to **Group → Start live collaboration**, and share the code. Friends tap **Join with code** on the home screen.

Changes sync within about a second. If two people edit at the same moment, the latest save wins.

Want to ship this to the public without each user pasting a URL? Put your URL as the default `syncUrl` in `www/app.js` (the `S.settings` object) and tighten the rules with Firebase Authentication.

## About email import

Android and Windows apps can't read your inbox without your Google/Microsoft login, so MeyPlanner imports what you **paste or open**:
copy the text of a booking email (AirAsia, Malaysia Airlines, Booking.com, Agoda, Airbnb, KTM/ETS, Klook, etc.) or save it as `.eml`
(Gmail: ⋮ ▸ *Download message*; Outlook: drag the email to the desktop). Always check the detected details on the review screen.
Fully automatic inbox scanning is possible later by adding Gmail/Outlook sign-in.

## Project structure

```
www/                 ← the app (HTML/CSS/JS, no build step)
  index.html, styles.css, app.js, data.js (destinations & guides), logo.svg, icons/
electron/main.js     ← Windows desktop shell
capacitor.config.json← Android shell config
resources/           ← Android icon (adaptive) & splash sources
build/icon.png       ← Windows icon
.github/workflows/   ← cloud build for .exe and .apk
```

To add a new destination for Quick draft and Explore, add it to `www/data.js` (name, category, lat, lng, hours).

## Credits

Maps © OpenStreetMap contributors © CARTO · Search: Nominatim · Map library: Leaflet.
