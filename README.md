# bucky-seo-react

A lightweight, TypeScript-first React utility for managing standard meta tags, Open Graph metadata, and JSON-LD structured data dynamically—compatible with any React build tool or framework.

---

## 📦 Installation

```bash
npm install bucky-seo-react
# or local for development:
npm install ../bucky-seo-react
```

> **Peer dependencies**:  
> • React ^18.0.0  
> • react-dom ^18.0.0  

---

## 🛠️ Compatibility

bucky-seo-react works in any React setup that supports ES Modules and can inject into `<head>`. Examples:

- **Vite**  
- **Gatsby**  
- **Parcel**  
- **RSBuild**  
- **Snowpack**  
- **Create React App** (deprecated for new apps, but still supported)  
- **Custom React builds** (e.g., home-grown Webpack setups)  

---

## 🚀 Quick Start with Vite + React

1. **Create** a new Vite project:

   ```bash
   npm create vite@latest my-app -- --template react-ts
   cd my-app
   ```

2. **Install** the library:

   ```bash
   npm install bucky-seo-react
   # or local:
   npm install ../bucky-seo-react
   ```

3. **Use** in `src/App.tsx`:

   ```tsx
   import React from "react";
   import { DynamicHead, videoObject } from "bucky-seo-react";
   import type { MetaTags, StructuredData } from "bucky-seo-react";

   function App() {
     const meta: MetaTags = {
       title: "🏠 Home | Vite + Bucky-SEO-React",
       description: "Testing bucky-seo-react in a Vite + React setup",
       og: {
         title: "Vite + Bucky SEO React",
         description: "Quick demo of bucky-seo-react",
       },
     };

     const structuredData: StructuredData[] = [
       videoObject({
         name: "Demo Vite Integration",
         thumbnailUrl: ["https://via.placeholder.com/300"],
         uploadDate: new Date().toISOString(),
       }),
     ];

     return (
       <>
         <DynamicHead metaTags={meta} structuredData={structuredData} />
         <div style={{ textAlign: "center", marginTop: 40 }}>
           <h1>🚀 Vite + React + Bucky-SEO-React</h1>
           <p>Inspect your &lt;head&gt; in DevTools to see the tags.</p>
         </div>
       </>
     );
   }

   export default App;
   ```

4. **Run** the dev server:

   ```bash
   npm install
   npm run dev
   ```

5. **Verify** in the browser at `http://localhost:5173` → Developer Tools → **Elements** → inspect your `<head>`:
   - `<title>🏠 Home | Vite + Bucky-SEO-React</title>`
   - `<meta name="description" content="Testing bucky-seo-react in a Vite + React setup">`
   - `<meta property="og:title" …>` / `<meta property="og:description" …>`
   - `<script type="application/ld+json">…</script>`

---

## 🚀 Quick Start with a Custom React Build (Webpack + Babel)

1. **Create** a new folder and init:

   ```bash
   mkdir custom-react-app
   cd custom-react-app
   npm init -y
   ```

2. **Install** React, your library, and tooling:

   ```bash
   npm install react react-dom bucky-seo-react
   npm install --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin      babel-loader @babel/core @babel/preset-env @babel/preset-react
   ```

3. **.babelrc**:

   ```json
   {
     "presets": ["@babel/preset-env", "@babel/preset-react"]
   }
   ```

4. **webpack.config.js**:

   ```js
   const path = require("path");
   const HtmlPlugin = require("html-webpack-plugin");

   module.exports = {
     mode: "development",
     entry: "./src/index.jsx",
     output: {
       path: path.resolve(__dirname, "dist"),
       filename: "bundle.js",
       clean: true
     },
     devServer: {
       static: "./dist",
       port: 3000,
       hot: true,
       open: true
     },
     module: {
       rules: [
         {
           test: /\.[jt]sx?$/,
           exclude: /node_modules/,
           use: "babel-loader"
         }
       ]
     },
     resolve: {
       extensions: [".js", ".jsx"],
       alias: {
         react: path.resolve(__dirname, "node_modules/react"),
         "react-dom": path.resolve(__dirname, "node_modules/react-dom")
       }
     },
     plugins: [
       new HtmlPlugin({ template: "./public/index.html" })
     ]
   };
   ```

5. **public/index.html**:

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <title>Custom React Build Test</title>
     </head>
     <body>
       <div id="root"></div>
     </body>
   </html>
   ```

6. **src/App.jsx**:

   ```jsx
   import React from "react";
   import { DynamicHead, videoObject } from "bucky-seo-react";

   export default function App() {
     const meta = {
       title: "🏠 Custom React Build",
       description: "Testing bucky-seo-react in a manual setup",
     };
     const sd = [
       videoObject({
         name: "Custom Build Demo",
         thumbnailUrl: ["https://via.placeholder.com/300"],
         uploadDate: new Date().toISOString(),
       }),
     ];

     return (
       <>
         <DynamicHead metaTags={meta} structuredData={sd} />
         <div style={{ textAlign: "center", marginTop: 40 }}>
           <h1>✅ It worked!</h1>
           <p>Inspect &lt;head&gt; in DevTools for your tags.</p>
         </div>
       </>
     );
   }
   ```

7. **src/index.jsx**:

   ```jsx
   import React from "react";
   import ReactDOM from "react-dom/client";
   import App from "./App";

   const container = document.getElementById("root");
   const root = ReactDOM.createRoot(container);
   root.render(<App />);
   ```

8. **package.json scripts**:

   ```json
   "scripts": {
     "start": "webpack serve",
     "build": "webpack"
   }
   ```

9. **Run & Verify**:

   ```bash
   npm run start
   ```

   → Open http://localhost:3000 → DevTools → **Elements** → confirm your injected `<title>`, `<meta>`, and `<script type="application/ld+json">`.
---

## 📖 API Reference

### `<DynamicHead />`

Injects into `<head>`:

1. Standard `<title>` / `<meta name="…">`  
2. Open Graph `<meta property="og:…">`  
3. JSON-LD `<script type="application/ld+json">…</script>`

#### Props

```ts
export interface MetaTags {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  robots?: string;
  og?: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
  };
}

export interface StructuredData {
  type: string;
  data: Record<string, any>;
}

export function DynamicHead(props: {
  metaTags?: MetaTags;
  structuredData?: StructuredData[];
}): null;
```

---

## 🧩 Built-in Schema Generators

```ts
import { videoObject } from "bucky-seo-react/schemas/VideoObject";
```

Use in `structuredData`:

```ts
const sd: StructuredData[] = [
  videoObject({ /* … */ }),
];
```

---

## 🛠 Development & Publishing

- **Build**: `npm run build`  
- **Publish**: bump version & `npm publish --access public`

---

## 🔍 Structured Data Features

bucky-seo-react supports generating JSON-LD for all of the following Google Search rich result types:

| Feature                           | Description                                                                                                                                                                                                                                                                                        |
|-----------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Article**                       | News, sports, or blog articles with title, larger images, author, date, etc.  
| **Breadcrumb**                    | Site-hierarchy navigation (“You are here”) breadcrumbs.  
| **Carousel**                      | Sequential galleries (e.g. recipes, movies, courses) using `ItemList`.  
| **Course list**                   | Lists of educational courses with title, provider, description.  
| **Dataset**                       | Large data sets for Google Dataset Search.  
| **Discussion forum**              | User-generated posts and threaded discussions.  
| **Education Q&A**                 | Education-focused Q&A flashcards carousel. (alias for QAPage)  
| **Employer aggregate rating**     | Aggregated employer reviews in the job search experience.  
| **Event**                         | Organized events (concerts, festivals) with date, place, offers.  
| **FAQ**                           | Frequently Asked Questions pages.  
| **Image metadata**                | Image license, credits, creator info for Google Images.  
| **Job posting**                   | Job listings with title, location, organization, salary, dates.  
| **Local business**                | Business details (hours, ratings, address) for knowledge panels.  
| **Math solver**                   | Math problems with expression, step-by-step solution.  
| **Movie**                         | Movie carousel entries with title, director, date, poster.  
| **Organization**                  | Organization info (logo, name, address, social profiles).  
| **Practice problem**              | Math & science practice problems (Quiz) with Q&A.  
| **Product**                       | Product info (price, availability, reviews).  
| **Profile page**                  | Single-person or organization profiles.  
| **Q&A**                           | Question & Answer pages (single question + its answers).  
| **Recipe**                        | Recipes as stand-alone rich result or in a host carousel.  
| **Review snippet**                | Short review excerpts or average ratings for various content types (Book, Recipe, Movie, Product, App, Business).  
| **Software app**                  | Software application info: ratings, description, link.  
| **Speakable**                     | TTS-ready portions of content for Google Assistant.  
| **Subscription & paywalled content** | Mark paywalled content to comply with Google’s policies.  
| **Vacation rental**               | Vacation property details: name, images, location, reviews.  
| **Video**                         | VideoObject data for playable search results, segments, live streams.  

Use the corresponding schema-helpers in `bucky-seo-react/schemas/…` to generate any of these.  


## Usage

# bucky-seo-react

A lightweight, TypeScript-first React utility for managing standard meta tags, Open Graph metadata, and JSON-LD structured data dynamically—compatible with any React build tool or framework.

---

## 📦 Installation

```bash
npm install bucky-seo-react
# or local for development:
npm install ../bucky-seo-react
```

> **Peer dependencies**:  
> • React ^18.0.0  
> • react-dom ^18.0.0  

---

## 🛠️ Compatibility

bucky-seo-react works in any React setup that supports ES Modules and can inject into `<head>`. Examples:

- **Vite**  
- **Gatsby**  
- **Parcel**  
- **RSBuild**  
- **Snowpack**  
- **Create React App** (deprecated for new apps, but still supported)  
- **Custom React builds** (e.g., home-grown Webpack setups)  

---

## 🚀 Quick Start with Vite + React

1. **Create** a new Vite project:

   ```bash
   npm create vite@latest my-app -- --template react-ts
   cd my-app
   ```

2. **Install** the library:

   ```bash
   npm install bucky-seo-react
   # or local:
   npm install ../bucky-seo-react
   ```

3. **Use** in `src/App.tsx`:

   ```tsx
   import React from "react";
   import { DynamicHead, videoObject } from "bucky-seo-react";
   import type { MetaTags, StructuredData } from "bucky-seo-react";

   function App() {
     const meta: MetaTags = {
       title: "🏠 Home | Vite + Bucky-SEO-React",
       description: "Testing bucky-seo-react in a Vite + React setup",
       og: {
         title: "Vite + Bucky SEO React",
         description: "Quick demo of bucky-seo-react",
       },
     };

     const structuredData: StructuredData[] = [
       videoObject({
         name: "Demo Vite Integration",
         thumbnailUrl: ["https://via.placeholder.com/300"],
         uploadDate: new Date().toISOString(),
       }),
     ];

     return (
       <>
         <DynamicHead metaTags={meta} structuredData={structuredData} />
         <div style={{ textAlign: "center", marginTop: 40 }}>
           <h1>🚀 Vite + React + Bucky-SEO-React</h1>
           <p>Inspect your &lt;head&gt; in DevTools to see the tags.</p>
         </div>
       </>
     );
   }

   export default App;
   ```

4. **Run** the dev server:

   ```bash
   npm install
   npm run dev
   ```

5. **Verify** in the browser at `http://localhost:5173` → Developer Tools → **Elements** → inspect your `<head>`:
   - `<title>🏠 Home | Vite + Bucky-SEO-React</title>`
   - `<meta name="description" content="Testing bucky-seo-react in a Vite + React setup">`
   - `<meta property="og:title" …>` / `<meta property="og:description" …>`
   - `<script type="application/ld+json">…</script>`

---

## 🚀 Quick Start with a Custom React Build (Webpack + Babel)

1. **Create** a new folder and init:

   ```bash
   mkdir custom-react-app
   cd custom-react-app
   npm init -y
   ```

2. **Install** React, your library, and tooling:

   ```bash
   npm install react react-dom bucky-seo-react
   npm install --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin      babel-loader @babel/core @babel/preset-env @babel/preset-react
   ```

3. **.babelrc**:

   ```json
   {
     "presets": ["@babel/preset-env", "@babel/preset-react"]
   }
   ```

4. **webpack.config.js**:

   ```js
   const path = require("path");
   const HtmlPlugin = require("html-webpack-plugin");

   module.exports = {
     mode: "development",
     entry: "./src/index.jsx",
     output: {
       path: path.resolve(__dirname, "dist"),
       filename: "bundle.js",
       clean: true
     },
     devServer: {
       static: "./dist",
       port: 3000,
       hot: true,
       open: true
     },
     module: {
       rules: [
         {
           test: /\.[jt]sx?$/,
           exclude: /node_modules/,
           use: "babel-loader"
         }
       ]
     },
     resolve: {
       extensions: [".js", ".jsx"],
       alias: {
         react: path.resolve(__dirname, "node_modules/react"),
         "react-dom": path.resolve(__dirname, "node_modules/react-dom")
       }
     },
     plugins: [
       new HtmlPlugin({ template: "./public/index.html" })
     ]
   };
   ```

5. **public/index.html**:

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <title>Custom React Build Test</title>
     </head>
     <body>
       <div id="root"></div>
     </body>
   </html>
   ```

6. **src/App.jsx**:

   ```jsx
   import React from "react";
   import { DynamicHead, videoObject } from "bucky-seo-react";

   export default function App() {
     const meta = {
       title: "🏠 Custom React Build",
       description: "Testing bucky-seo-react in a manual setup",
     };
     const sd = [
       videoObject({
         name: "Custom Build Demo",
         thumbnailUrl: ["https://via.placeholder.com/300"],
         uploadDate: new Date().toISOString(),
       }),
     ];

     return (
       <>
         <DynamicHead metaTags={meta} structuredData={sd} />
         <div style={{ textAlign: "center", marginTop: 40 }}>
           <h1>✅ It worked!</h1>
           <p>Inspect &lt;head&gt; in DevTools for your tags.</p>
         </div>
       </>
     );
   }
   ```

7. **src/index.jsx**:

   ```jsx
   import React from "react";
   import ReactDOM from "react-dom/client";
   import App from "./App";

   const container = document.getElementById("root");
   const root = ReactDOM.createRoot(container);
   root.render(<App />);
   ```

8. **package.json scripts**:

   ```json
   "scripts": {
     "start": "webpack serve",
     "build": "webpack"
   }
   ```

9. **Run & Verify**:

   ```bash
   npm run start
   ```

   → Open http://localhost:3000 → DevTools → **Elements** → confirm your injected `<title>`, `<meta>`, and `<script type="application/ld+json">`.
---

## 📖 API Reference

### `<DynamicHead />`

Injects into `<head>`:

1. Standard `<title>` / `<meta name="…">`  
2. Open Graph `<meta property="og:…">`  
3. JSON-LD `<script type="application/ld+json">…</script>`

#### Props

```ts
export interface MetaTags {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  robots?: string;
  og?: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
  };
}

export interface StructuredData {
  type: string;
  data: Record<string, any>;
}

export function DynamicHead(props: {
  metaTags?: MetaTags;
  structuredData?: StructuredData[];
}): null;
```

---

## 🧩 Built-in Schema Generators

```ts
import { videoObject } from "bucky-seo-react/schemas/VideoObject";
```

Use in `structuredData`:

```ts
const sd: StructuredData[] = [
  videoObject({ /* … */ }),
];
```

---

## 🛠 Development & Publishing

- **Build**: `npm run build`  
- **Publish**: bump version & `npm publish --access public`

---

## 🔍 Structured Data Features

bucky-seo-react supports generating JSON-LD for all of the following Google Search rich result types:

| Feature                           | Description                                                                                                                                                                                                                                                                                        |
|-----------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Article**                       | News, sports, or blog articles with title, larger images, author, date, etc.  
| **Breadcrumb**                    | Site-hierarchy navigation (“You are here”) breadcrumbs.  
| **Carousel**                      | Sequential galleries (e.g. recipes, movies, courses) using `ItemList`.  
| **Course list**                   | Lists of educational courses with title, provider, description.  
| **Dataset**                       | Large data sets for Google Dataset Search.  
| **Discussion forum**              | User-generated posts and threaded discussions.  
| **Education Q&A**                 | Education-focused Q&A flashcards carousel. (alias for QAPage)  
| **Employer aggregate rating**     | Aggregated employer reviews in the job search experience.  
| **Event**                         | Organized events (concerts, festivals) with date, place, offers.  
| **FAQ**                           | Frequently Asked Questions pages.  
| **Image metadata**                | Image license, credits, creator info for Google Images.  
| **Job posting**                   | Job listings with title, location, organization, salary, dates.  
| **Local business**                | Business details (hours, ratings, address) for knowledge panels.  
| **Math solver**                   | Math problems with expression, step-by-step solution.  
| **Movie**                         | Movie carousel entries with title, director, date, poster.  
| **Organization**                  | Organization info (logo, name, address, social profiles).  
| **Practice problem**              | Math & science practice problems (Quiz) with Q&A.  
| **Product**                       | Product info (price, availability, reviews).  
| **Profile page**                  | Single-person or organization profiles.  
| **Q&A**                           | Question & Answer pages (single question + its answers).  
| **Recipe**                        | Recipes as stand-alone rich result or in a host carousel.  
| **Review snippet**                | Short review excerpts or average ratings for various content types (Book, Recipe, Movie, Product, App, Business).  
| **Software app**                  | Software application info: ratings, description, link.  
| **Speakable**                     | TTS-ready portions of content for Google Assistant.  
| **Subscription & paywalled content** | Mark paywalled content to comply with Google’s policies.  
| **Vacation rental**               | Vacation property details: name, images, location, reviews.  
| **Video**                         | VideoObject data for playable search results, segments, live streams.  

Use the corresponding schema-helpers in `bucky-seo-react/schemas/…` to generate any of these.  


## 🔧 Usage Examples for All 27 Schemas You can test it here with the offical Google tool https://search.google.com/test/rich-results?utm_source=support.google.com/webmasters/&utm_medium=referral&utm_campaign=7445569

Import and pass your JSON-LD array to `<DynamicHead />`. Below are minimal snippets you can copy into your README.

```tsx
import { DynamicHead } from "bucky-seo-react";

// 1. VideoObject
import { videoObject } from "bucky-seo-react/schemas/VideoObject";
const sd1 = [
  videoObject({
    name: "Demo Video",
    thumbnailUrl: ["https://example.com/thumb.jpg"],
    uploadDate: "2025-06-22T12:00:00+00:00"
  })
];

// 2. VacationRental
import { vacationRental } from "bucky-seo-react/schemas/VacationRental";
const sd2 = [
  vacationRental({
    name: "Sunny Beach House",
    description: "Oceanfront villa with pool",
    address: {
      "@type":"PostalAddress",
      streetAddress:"123 Ocean Dr",
      addressLocality:"Miami",
      addressCountry:"US"
    },
    image:["https://example.com/house.jpg"]
  })
];

// 3. PaywalledContent
import { paywalledContent } from "bucky-seo-react/schemas/PaywalledContent";
const sd3 = [
  paywalledContent({
    name:"Premium Article",
    url:"https://example.com/premium",
    isAccessibleForFree:false,
    hasPart:[
      { "@type":"WebPageElement", isAccessibleForFree:true, cssSelector:".teaser" }
    ]
  })
];

// 4. Speakable
import { speakable } from "bucky-seo-react/schemas/Speakable";
const sd4 = [
  speakable({ xpaths:["/html/head/title","/html/body//h1"] })
];

// 5. SoftwareApplication
import { softwareApplication } from "bucky-seo-react/schemas/SoftwareApplication";
const sd5 = [
  softwareApplication({
    name:"My App",
    operatingSystem:"iOS",
    applicationCategory:"Game",
    aggregateRating:{ "@type":"AggregateRating", ratingValue:4.8, reviewCount:1200 }
  })
];

// 6. ReviewSnippet
import { reviewSnippet } from "bucky-seo-react/schemas/ReviewSnippet";
const sd6 = [
  reviewSnippet({
    itemReviewed:{ "@type":"Product", name:"Widget" },
    reviewRating:{ "@type":"Rating", ratingValue:4, bestRating:5 },
    author:{ "@type":"Person", name:"Alice" }
  })
];

// 7. Recipe
import { recipe } from "bucky-seo-react/schemas/Recipe";
const sd7 = [
  recipe({
    name:"Pancakes",
    recipeYield:"4 servings",
    recipeIngredient:["2 cups flour","1 cup milk"],
    recipeInstructions:["Mix ingredients","Cook on griddle"]
  })
];

// 8. QAPage
import { qaPage } from "bucky-seo-react/schemas/QAPage";
const sd8 = [
  qaPage({
    mainEntity:{
      "@type":"Question",
      name:"What is 2+2?",
      acceptedAnswer:{ "@type":"Answer", text:"4" }
    }
  })
];

// 9. ProfilePage
import { profilePage } from "bucky-seo-react/schemas/ProfilePage";
const sd9 = [
  profilePage({
    mainEntity:{ "@type":"Person", name:"Jane Doe", url:"https://example.com/janedoe" }
  })
];

// 10. Product
import { product } from "bucky-seo-react/schemas/Product";
const sd10 = [
  product({
    name:"Gadget",
    image:"https://example.com/gadget.jpg",
    offers:{ "@type":"Offer", price:19.99, priceCurrency:"USD" }
  })
];

// 11. Quiz (Practice Problem)
import { quiz } from "bucky-seo-react/schemas/Quiz";
const sd11 = [
  quiz({
    hasPart:[
      {
        "@type":"Question",
        text:"2+2=?",
        eduQuestionType:"Multiple choice",
        learningResourceType:"Practice problem",
        suggestedAnswer:[{ "@type":"Answer", position:0, encodingFormat:"text/plain", text:"3" }],
        acceptedAnswer:{ "@type":"Answer", position:1, encodingFormat:"text/plain", text:"4" }
      }
    ]
  })
];

// 12. Organization
import { organization } from "bucky-seo-react/schemas/Organization";
const sd12 = [
  organization({
    name:"Acme Corp",
    url:"https://acme.example.com",
    logo:"https://acme.example.com/logo.png"
  })
];

// 13. Movie
import { movie } from "bucky-seo-react/schemas/Movie";
const sd13 = [
  movie({
    name:"Inception",
    director:{ "@type":"Person", name:"Christopher Nolan" },
    datePublished:"2010-07-16"
  })
];

// 14. MathSolver
import { mathSolver } from "bucky-seo-react/schemas/MathSolver";
const sd14 = [
  mathSolver({
    url:"https://example.com/solve",
    headline:"Solve x²=4",
    mathExpression:"x^2=4",
    stepByStep:["x = ±2"]
  })
];

// 15. LocalBusiness
import { localBusiness } from "bucky-seo-react/schemas/LocalBusiness";
const sd15 = [
  localBusiness({
    name:"Corner Café",
    address:{
      "@type":"PostalAddress",
      streetAddress:"1 Main St",
      addressLocality:"Townsville",
      addressCountry:"US"
    }
  })
];

// 16. JobPosting
import { jobPosting } from "bucky-seo-react/schemas/JobPosting";
const sd16 = [
  jobPosting({
    title:"Developer",
    description:"Build cool stuff",
    datePosted:"2025-06-22",
    hiringOrganization:{ "@type":"Organization", name:"Tech Co" },
    jobLocation:{
      "@type":"Place",
      address:{
        "@type":"PostalAddress",
        streetAddress:"100 Tech Ave",
        addressLocality:"City",
        addressCountry:"US"
      }
    }
  })
];

// 17. ImageObject
import { imageObject } from "bucky-seo-react/schemas/ImageObject";
const sd17 = [
  imageObject({
    contentUrl:"https://example.com/photo.jpg",
    license:"https://creativecommons.org/licenses/by/4.0/",
    acquireLicensePage:"https://example.com/license-info"
  })
];

// 18. FaqPage
import { faqPage } from "bucky-seo-react/schemas/FaqPage";
const sd18 = [
  faqPage({
    mainEntity:[
      {
        "@type":"Question",
        name:"How to use?",
        acceptedAnswer:{ "@type":"Answer", text:"Read the docs." }
      }
    ]
  })
];

// 19. Event
import { event } from "bucky-seo-react/schemas/Event";
const sd19 = [
  event({
    name:"Concert",
    startDate:"2025-07-01T20:00-05:00",
    location:{ "@type":"Place", name:"Arena" }
  })
]

// 20. EmployerAggregateRating
import { employerAggregateRating } from "bucky-seo-react/schemas/EmployerAggregateRating";
const sd20 = [
  employerAggregateRating({
    employer:{ "@type":"Organization", name:"Acme Corp" },
    ratingValue:4.2
  })
];

// 21. EducationQAPage
import { educationQAPage } from "bucky-seo-react/schemas/EducationQAPage";
const sd21 = [
  educationQAPage({
    mainEntity:{
      "@type":"Question",
      name:"Define gravity",
      acceptedAnswer:{ "@type":"Answer", text:"Force of attraction." }
    }
  })
];

// 22. DiscussionForumPosting
import { discussionForumPosting } from "bucky-seo-react/schemas/DiscussionForumPosting";
const sd22 = [
  discussionForumPosting({
    headline:"SEO tips?",
    articleBody:"Use JSON-LD!",
    author:{ "@type":"Person", name:"SEO Guru" },
    datePublished:"2025-06-22T15:00:00+00:00"
  })
];

// 23. Dataset
import { dataset } from "bucky-seo-react/schemas/Dataset";
const sd23 = [
  dataset({
    name:"Sample Data",
    distribution:[{ "@type":"DataDownload", contentUrl:"https://example.com/data.csv" }]
  })
];

// 24. Course
import { course } from "bucky-seo-react/schemas/Course";
const sd24 = [
  course({
    name:"Solar 101",
    provider:{ "@type":"Organization", name:"South Texas Solar" }
  })
];

// 25. Carousel
import { carousel } from "bucky-seo-react/schemas/Carousel";
const sd25 = [
  carousel({
    items:[
      { position:1, url:"https://example.com/item1" },
      { position:2, url:"https://example.com/item2" }
    ]
  })
];

// 26. BreadcrumbList
import { breadcrumbList } from "bucky-seo-react/schemas/Breadcrumb";
const sd26 = [
  breadcrumbList({
    itemListElement:[
      { position:1, name:"Home", item:"https://example.com" },
      { position:2, name:"Shop", item:"https://example.com/shop" }
    ]
  })
];

// 27. Article
import { article } from "bucky-seo-react/schemas/Article";
const sd27 = [
  article({
    articleType:"NewsArticle",
    headline:"Launch Day!",
    datePublished:"2025-06-22T08:00:00+00:00",
    author:{ "@type":"Person", name:"Reporter" }
  })
];

// Finally, render all examples together:
export default function App() {
  return (
    <>
      <DynamicHead structuredData={[
        ...sd1, ...sd2, ...sd3, ...sd4, ...sd5, ...sd6, ...sd7,
        ...sd8, ...sd9, ...sd10, ...sd11, ...sd12, ...sd13, ...sd14,
        ...sd15, ...sd16, ...sd17, ...sd18, ...sd19, ...sd20, ...sd21,
        ...sd22, ...sd23, ...sd24, ...sd25, ...sd26, ...sd27
      ]} />
      <div>Your app content</div>
    </>
  );
}

