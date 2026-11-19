# A Little Book of Memories 🍊

An interactive farewell scrapbook for Sandral, made by Germaine.

Visitors open a peach cloth-bound book, then turn its pages to see letters, notes, photos and videos. Pages curl as they turn. On a computer the book opens to a two-page spread. On a phone it shows one page at a time, and you swipe or tap to turn.

You only need to edit **one file**, `src/data/flipbook.ts`, and put your photos and videos in the `public` folder.

---

## Contents

1. [What you need](#1-what-you-need)
2. [Run it on your computer](#2-run-it-on-your-computer)
3. [Add your photos](#3-add-your-photos)
4. [Add your videos](#4-add-your-videos)
5. [Change the messages](#5-change-the-messages)
6. [Add, remove or reorder pages](#6-add-remove-or-reorder-pages)
7. [Put it on GitHub](#7-put-it-on-github)
8. [Publish it with Vercel](#8-publish-it-with-vercel)
9. [Update the site after it's live](#9-update-the-site-after-its-live)
10. [Before you send the link](#10-before-you-send-the-link)
11. [Troubleshooting](#11-troubleshooting)

---

## 1. What you need

- **Node.js 20.9 or newer.** Download the "LTS" version from [nodejs.org](https://nodejs.org) and install it like any other app.
- **A code editor.** [Visual Studio Code](https://code.visualstudio.com) is free and easy to use.
- **A free [GitHub](https://github.com) account** and a **free [Vercel](https://vercel.com) account**. You can sign up to Vercel with your GitHub account.

To check that Node is installed, open a terminal (Terminal on Mac, PowerShell on Windows) and type:

```bash
node -v
```

You should see something like `v22.x.x`.

---

## 2. Run it on your computer

1. Unzip the project somewhere easy to find, such as your Desktop.
2. In VS Code, choose **File → Open Folder…** and pick the `sandral-flipbook` folder.
3. Open the built-in terminal with **Terminal → New Terminal**.
4. Install the project's packages. You only need to do this once:

   ```bash
   npm install
   ```

5. Start the site:

   ```bash
   npm run dev
   ```

6. Open **http://localhost:3000** in your browser.

While `npm run dev` is running, changes you save show up in the browser straight away. If a new photo doesn't appear, refresh the page. To stop the site, click in the terminal and press `Ctrl + C`.

---

## 3. Add your photos

1. Copy your photos into **`public/photos/`**.
2. Either rename them to match the names already in `src/data/flipbook.ts` (`sandral-01.jpg`, `sandral-02.jpg` and so on), or change the names in that file to match your photos.

```ts
{ src: "/photos/sandral-01.jpg", caption: "One of my favourite moments!" },
```

Here's where each photo appears:

| Page | Photos |
|---|---|
| 3 · Our Memories | `sandral-01` to `sandral-04` |
| 5 · Photo Memories | `sandral-05` to `sandral-07` |
| 7 · More Moments | `sandral-08`, `sandral-09` |
| 10 · The Next Chapter | `sandral-10` |

**Tips**

- JPG, PNG and WEBP all work. iPhone **HEIC** photos must be converted to JPG first. On a Mac, open the photo in Preview and choose **File → Export → JPEG**.
- Use photos under about 5 MB each. The site creates smaller copies for each screen automatically, so they load quickly.
- Upper or lower case in file names doesn't matter. `IMG_0123.JPG` will match `img_0123.jpg`.
- Until a photo is added, the book shows a soft placeholder with the file name it's waiting for. Nothing ever appears broken.
- Clicking or tapping a photo opens a larger view. The book's photo frames crop photos to fit, but the larger view always shows the whole photo.
- To add a description for screen readers, use `alt`, e.g. `alt: "Sandral and Germaine at the team lunch"`. If you leave it out, the caption is used.

---

## 4. Add your videos

1. Put your first video at **`public/videos/sandral-memory-1.mp4`**.
2. *(Optional)* Add a still image to show before it plays: **`public/videos/sandral-memory-1-poster.jpg`**.
3. *(Optional)* For a second video, add **`public/videos/sandral-memory-2.mp4`**. Page 8 ("Another Video Memory") appears automatically once that file exists. Until then, it's left out of the book.

**Tips**

- Use **MP4** files under about **50 MB**. GitHub won't accept files over 100 MB. To shrink a big video, use the free app [HandBrake](https://handbrake.fr) with the "Fast 1080p30" preset, or export from your phone at a lower quality.
- Both portrait (phone) and landscape videos work. The frame adjusts to fit.
- Videos never play by themselves. They only start loading when their page is close, and they pause automatically when you turn the page.

---

## 5. Change the messages

Open **`src/data/flipbook.ts`**. Every place to edit is marked with ✏️.

Text goes between "double quotes":

```ts
paragraphs: [
  "This is the first paragraph.",
  "This is the second paragraph.",
],
```

- Each paragraph is its own line in quotes, ending with a comma.
- Straight apostrophes and quotes (`'` and `"`) are turned into curly ones automatically.
- If your text contains a double quote, write it as `\"`. For example, `"She said \"hello\""`.
- Save the file and the browser updates.

The settings at the top of the file control the book as a whole:

```ts
export const book = {
  title: "A Little Book of Memories",
  recipient: "Sandral",
  sender: "Germaine",
  description: "...",   // shown when the link is shared in chat apps
  confetti: true,       // false turns off the confetti on the last page
};
```

---

## 6. Add, remove or reorder pages

Pages appear in the order they're listed in `pages`.

- **Hide a page:** add `hidden: true,` inside its block.
- **Remove a page:** delete its whole block, from `{` to `},`.
- **Move a page:** cut its whole block and paste it somewhere else.
- **Add a page:** copy an existing block, paste it, and give it a new `id`.

A real book has an even number of pages, so if you end up with an odd number, a plain end-paper page is added automatically before the back cover.

### Page types you can use

| `type` | What it looks like | Main fields |
|---|---|---|
| `"cover"` | Front cover | `title`, `subtitle`, `quote`, `signature` |
| `"letter"` | A letter. `style: "opening"` is handwritten; `style: "closing"` uses elegant serif type | `heading`, `paragraphs`, `signoff` |
| `"photo-collage"` | Polaroids with tape | `title`, `layout`, `photos`, optional `note` |
| `"notes"` | Sticky notes and torn paper (2–3 fit best) | `title`, `notes: [{ heading, text }]` |
| `"video"` | A video taped into the book | `title`, `video: { src, poster, caption }`, optional `hideIfMissing: true` |
| `"moments"` | Quote, two photos and a note | `title`, `quote: { text, by }`, `photos`, `note` |
| `"handwritten-note"` | A longer note on lined paper | `heading`, `paragraphs`, `signoff` |
| `"next-chapter"` | One large photo with a message | `title`, `text`, `photo` |
| `"back-cover"` | Back cover with a "read again" button | `message`, `footer`, `replayLabel` |

Photo collage `layout` options:

- `"scatter"`: 3–4 Polaroids, two rows
- `"trio"`: 3 overlapping Polaroids
- `"pair"`: 2 side by side
- `"feature"`: 1 large photo

Each page is a fixed size, like a real page, so very long text will be cut off at the bottom. If that happens, shorten the text or split it across two pages.

---

## 7. Put it on GitHub

Upload the project **without** the `node_modules` and `.next` folders. They're big, they're rebuilt automatically, and the included `.gitignore` already leaves them out.

### Option A: in your browser (easiest)

1. Sign in to GitHub and click **+ → New repository** (top right).
2. Name it, e.g. `sandral-flipbook`. Choose **Private** if you like, since Vercel works with private repositories. Then click **Create repository**.
3. On the next page, click **uploading an existing file**.
4. Open the project folder on your computer, select everything **except** `node_modules` and `.next`, and drag it into the browser window.
   - On a Mac, press `Cmd + Shift + .` in Finder to show hidden files, so you also include `.gitignore`.
5. Click **Commit changes**.

### Option B: GitHub Desktop

1. Install [GitHub Desktop](https://desktop.github.com) and sign in.
2. Choose **File → Add Local Repository…**, pick the project folder, and click **create a repository** when it asks.
3. Click **Publish repository**.

### Option C: the command line

```bash
git init
git add .
git commit -m "A little book of memories for Sandral"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/sandral-flipbook.git
git push -u origin main
```

---

## 8. Publish it with Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **Add New… → Project**.
3. Find `sandral-flipbook` in the list and click **Import**. If it isn't listed, click **Adjust GitHub App Permissions** and allow Vercel to see it.
4. Leave every setting as it is. Vercel detects Next.js automatically.
5. Click **Deploy** and wait about a minute.
6. Vercel gives you a link like `https://sandral-flipbook.vercel.app`. That's the link to share.

**A nicer link:** in Vercel, open the project, then go to **Settings → Domains**. There you can change the `.vercel.app` name, e.g. to `for-sandral.vercel.app`, if that name is free.

---

## 9. Update the site after it's live

Every change you push to GitHub is published automatically within a minute or two.

- **In your browser:** open the repository on GitHub and go to the file or folder. For text, click the ✏️ pencil icon, edit, then **Commit changes**. For photos, open `public/photos`, click **Add file → Upload files**, then **Commit changes**.
- **GitHub Desktop:** save your changes, write a short summary, click **Commit to main**, then **Push origin**.
- **Command line:**

  ```bash
  git add .
  git commit -m "Add photos"
  git push
  ```

You can watch the progress under **Deployments** in Vercel.

---

## 10. Before you send the link

- [ ] Replace every ✏️ message in `src/data/flipbook.ts`
- [ ] Add all ten photos (or remove the ones you don't need)
- [ ] Add `sandral-memory-1.mp4` (and optionally a poster image and a second video)
- [ ] Open the live link on your phone and your computer and read the book from cover to cover
- [ ] Check that no "photo goes here" placeholders are left

**Privacy:** the site asks search engines not to list it, but anyone who has the link can open it. Only share it with people you'd happily show the photos to.

---

## 11. Troubleshooting

**"photo goes here" still shows after I added the photo.**
Check that the name in `flipbook.ts` matches the file, including the extension (`.jpg` vs `.jpeg` vs `.png`). When running locally, refresh the page. Once the site is live, wait for the new deployment to finish.

**Vercel says the build failed.**
Open the failed deployment and read the red error lines. It's almost always a typing slip in `flipbook.ts`: a missing comma, quote or bracket. Run `npm run build` on your computer to see the same error, and it will point to the line.

**The video won't play.**
Make sure it's an MP4. Some phone videos use a format that only Apple devices can play. Re-export it with HandBrake ("Fast 1080p30") and it'll work everywhere.

**My text is cut off at the bottom of a page.**
Each page is a fixed size, like paper. Shorten the text, or copy the page block to spread the text over two pages.

**Nothing happens when I run `npm install`.**
Make sure Node.js is installed (`node -v`) and that the terminal is inside the project folder. The folder should contain `package.json`.

---

## How it's built (for the curious)

- **Next.js 16** (App Router), **React 19**, **TypeScript**, **Tailwind CSS 4**
- **page-flip**, the engine behind `react-pageflip`, wrapped directly for React 19, for the page curl, drag and swipe
- **Motion** for the floating doodles, photo viewer and the last-page hearts
- **Lucide** icons
- Fonts (Playfair Display, Caveat, DM Sans) are bundled with the site, so nothing loads from Google
- The page-turn sound is made in the browser, so there's no audio file. It's off until you click the speaker button.
- Respects the "reduce motion" accessibility setting: buttons and arrow keys change pages without the curl animation, and there's no confetti
- Keyboard: ← and → turn pages, and Esc closes the photo viewer

```text
public/
  photos/        your photos
  videos/        your videos (+ optional poster images)
  decorations/   empty; all decorations are drawn in code
src/
  app/           page setup, fonts, global styles, share image
  components/
    FlipBook.tsx       the book, controls, keyboard, sound, full screen
    FlipPage.tsx       picks the right layout for each page type
    BookCover.tsx      front and back covers
    PhotoCollage.tsx   Polaroids and collage layouts
    VideoMemory.tsx    the taped video frame
    HandwrittenNote.tsx letters, sticky notes, lined paper
    Lightbox.tsx       the enlarged photo viewer
    Decorations.tsx    oranges, blossoms, hearts, tape, paper clips
  data/
    flipbook.ts        ✏️ all the content — edit this
  lib/                 build-time file checks, types, page-turn sound
```

Made with love 🍊
