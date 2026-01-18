# Vessel Hierarchy Visualizer

An interactive, canvas-based web application for visualizing and managing complex vessel equipment hierarchies.  
Built with **Vite + React**, the application supports deep hierarchical structures with smooth navigation, search, and dynamic node interactions.

---

## 📌 Overview

This project visualizes vessel data in a multi-level hierarchical tree structure, enabling users to explore, manage, and reorganize complex maritime systems efficiently.

### Supported Hierarchy Levels

System → Equipment Type → Equipment → Assembly → Component

The application is optimized for large datasets and provides an intuitive user experience through an infinite canvas and rich interaction controls.

---

## 🚀 Features

### 1. Hierarchical Data Visualization
- Displays complex vessel asset data in a structured tree layout
- Supports deep nesting across multiple hierarchy levels
- Designed to scale for very large and complex datasets

---

### 2. Interactive Canvas
- Infinite panning for free navigation
- Smooth zooming using mouse wheel or controls
- Fit-to-view / reset option to restore default view

---

### 3. Node Interaction & Management
- Expand / Collapse child nodes dynamically
- Optional accordion mode to collapse sibling branches
- Node selection with full hierarchy path highlighting
- Drag & Drop support to reorganize hierarchy structure

---

### 4. Search & Navigation
- Global real-time search across all hierarchy levels
- Smart highlighting of matching nodes
- Automatic expansion to reveal search results
- Breadcrumb navigation showing selected node path

---

### 5. Visual System & Styling
- Color-coded node types:
  - System – Blue
  - Equipment Type – Red
  - Equipment – Purple
  - Assembly – Grey
  - Component – Green
- Active and inactive state styling
- Draft status indicator for incomplete nodes
- Smooth curved SVG connections between nodes

---

### 6. Data Management
- Multiple dataset support:
  - Simple
  - Moderate
  - Complex
  - Very Complex
  - Ultra Complex
- In-memory state management for instant UI updates

---

## 🛠️ Tech Stack

- React
- Vite
- TypeScript
- CSS / Tailwind CSS
- SVG-based canvas rendering

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

---

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/vessel-hierarchy-visualizer.git
cd vessel-hierarchy-visualizer

```
### 2. Install Dependencies
```bash
npm install
or 
yarn install (if you using yarn)

```
### 3. Run Development Server
```bash
npm run dev

```
### 4. Open in Browser
```bash
http://localhost:5173

```
### 5. 🏗️ Build for Production
```bash
npm run build

```
### 6. Project Structure
```bash
src/
 ├─ components/        # Tree nodes, canvas, controls
 ├─ data/              # Mock datasets
 ├─ hooks/             # Custom hooks
 ├─ styles/            # Styling files
 ├─ App.tsx
 └─ main.tsx

```
### 7. Use Cases
Vessel asset management systems
Fleet management dashboards
Industrial hierarchy visualization
Enterprise data exploration tools

### 8. License
MIT License
Copyright (c) 2026