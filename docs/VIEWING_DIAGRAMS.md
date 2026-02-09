# Viewing Mermaid Diagrams in project_report.md

The `project_report.md` file contains **2 beautiful Mermaid diagrams**:

1. **System Architecture Diagram** (lines 102-138)
   - Shows Frontend, Backend, and Data layers
   - Colored boxes for React, Django, Database

2. **Database ER Diagram** (lines 294-340)
   - Shows relationships between User, Application, ApplicationFile, Review
   - Entity-relationship visualization

---

## 🎨 How to View the Diagrams

### Method 1: VS Code (Best for Editing)

**Install Extension:**
1. Open VS Code
2. Go to Extensions (Cmd+Shift+X)
3. Search for "Markdown Preview Mermaid Support"
4. Install it

**View Diagrams:**
1. Open `project_report.md`
2. Press `Cmd+Shift+V` (or click preview icon)
3. Diagrams render automatically! ✨

---

### Method 2: Online Mermaid Editor (Quick Preview)

1. Visit https://mermaid.live/
2. Copy the mermaid code from the file
3. Paste into the editor
4. See the diagram instantly
5. Export as PNG/SVG if needed

**Example - Copy this:**
```
Lines 102-138 for Architecture diagram
Lines 294-340 for ER diagram
```

---

### Method 3: GitHub (Auto-Render)

If you push to GitHub:
1. Upload `project_report.md` to your repo
2. View the file on GitHub
3. Diagrams render automatically
4. No setup needed!

---

### Method 4: PDF with Diagrams

**Using Typora (Paid - $14.99):**
1. Open `project_report.md` in Typora
2. File → Export → PDF
3. Diagrams included in PDF ✅

**Using VS Code Extension:**
1. Install "Markdown PDF" extension
2. Open `project_report.md`
3. Right-click → "Markdown PDF: Export (pdf)"
4. Diagrams included! ✅

---

## 📊 What the Diagrams Show

### System Architecture Diagram
```
┌─────────────────────────────────┐
│     Frontend Layer              │
│  React + Vite + Tailwind        │
│  Router + Axios + Auth Context  │
└─────────────┬───────────────────┘
              │
┌─────────────▼───────────────────┐
│     Backend Layer               │
│  Django REST Framework          │
│  JWT + OAuth + CORS             │
└─────────────┬───────────────────┘
              │
┌─────────────▼───────────────────┐
│     Data Layer                  │
│  SQLite/PostgreSQL + Files      │
└─────────────────────────────────┘
```

### Database ER Diagram
```
USER ──┬── creates ──> APPLICATION ──> contains ──> APPLICATION_FILE
       │
       └── writes ──> REVIEW
```

---

## 🚀 Quick Start

**Fastest way to see diagrams:**

1. Open VS Code
2. Install "Markdown Preview Mermaid Support"
3. Open `project_report.md`
4. Press `Cmd+Shift+V`
5. Scroll to see diagrams!

---

*The diagrams are already in the file - you just need the right viewer!*
