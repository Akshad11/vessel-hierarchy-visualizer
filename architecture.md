# Component & Utility Documentation

This document provides a detailed breakdown of the core components, custom hooks, and utilities used in the Vessel Hierarchy Visualizer.  
The architecture is designed to be modular, scalable, and optimized for large, deeply nested datasets.

---

## Core Application

### `src/App.tsx`

**Purpose**  
Acts as the main orchestration layer of the application. It coordinates data state, layout computation, user interactions, and rendering of the hierarchy visualization.

**Key Responsibilities**

- **State Management**
  - Maintains the active dataset (`treeData`)
  - Tracks expanded nodes via `expandedIds`
  - Tracks the currently selected node (`selectedNodeId`)
  - Manages search input (`searchQuery`)
  - Handles dataset switching state

- **Layout Computation**
  - Invokes `computeTreeLayout` to convert raw tree data into positioned nodes and links
  - Recomputes layout whenever expansion state, filtering, or dataset changes

- **Derived State**
  - Computes breadcrumbs for the selected node
  - Determines focused paths for selection highlighting
  - Resolves search matches and visible node paths

- **Event Handling**
  - Expand / collapse node logic
  - Node selection handling
  - Drag-and-drop reparenting logic
  - Dataset switching and reset behaviors

- **Rendering**
  - Renders the SVG layer responsible for visual links between nodes
  - Renders positioned HTML nodes (`TreeNode`)
  - Mounts UI overlays such as `Controls` and `Breadcrumbs`
  - Integrates zoom and pan transformations from `useZoomPan`

---

## Custom Hooks

### `src/hooks/useZoomPan.ts`

**Purpose**  
Encapsulates all logic related to infinite canvas interaction, providing smooth zooming and panning behavior.

**Key Responsibilities**

- **Transform State**
  - Maintains translation (`x`, `y`) and scale (`scale`)
  - Ensures consistent transformations across SVG and HTML layers

- **User Interaction Handlers**
  - `onWheel`: Handles zooming via mouse wheel
  - `onMouseDown`: Initializes panning
  - `onMouseMove`: Updates position during drag
  - `onMouseUp`: Ends pan interaction

- **Programmatic Controls**
  - `zoomIn` / `zoomOut`: Incremental zoom controls
  - `resetZoom`: Resets canvas to default view
  - `setPosition`: Allows manual positioning (used for fit-to-view)

- **Cursor Management**
  - Dynamically switches cursor styles (`grab` / `grabbing`) for UX feedback

---

## UI Components

### `src/components/UI/Controls.tsx`

**Purpose**  
Provides the floating control panel that overlays the canvas and drives global interactions.

**Features**

- **Search Bar**
  - Global real-time search across all hierarchy levels
  - Clear button to reset search state

- **View Mode Toggle**
  - Switches between:
    - **Accordion Mode**: Automatically collapses sibling branches
    - **Multi-View Mode**: Allows multiple branches to remain open

- **Dataset Selector**
  - Dropdown to switch between predefined datasets of varying complexity

- **Zoom Controls**
  - Zoom In (+)
  - Zoom Out (-)
  - Fit-to-View / Reset

---

### `src/components/UI/Breadcrumbs.tsx`

**Purpose**  
Displays the full hierarchical path of the currently selected node to provide context and navigation.

**Features**

- **Hierarchical Navigation**
  - Clickable breadcrumb segments allow jumping to ancestor nodes

- **Visual Styling**
  - Chevron separators between levels
  - Distinct styling for the active (last) node versus navigable ancestors

---

## Tree Components

### `src/components/VesselTree/TreeNode.tsx`

**Purpose**  
Represents and renders an individual node in the vessel hierarchy.

**Key Responsibilities**

- **Visual Representation**
  - Displays node name
  - Shows draft status indicator if applicable
  - Renders expand/collapse control when children exist
  - Applies color coding based on node type
  - Applies visual states (selected, focused, drag-over)

- **Interactivity**
  - Handles click events for selection
  - Handles expand/collapse interactions

- **Drag & Drop**
  - Implements HTML5 drag-and-drop
  - `onDragStart`: Registers the dragged node
  - `onDragOver`: Enables valid drop targets
  - `onDrop`: Triggers reparenting logic
  - Visual feedback for valid / invalid drop zones

- **Positioning**
  - Uses absolute positioning derived from layout coordinates (`x`, `y`)
  - Ensures alignment with SVG link endpoints

---

### `src/components/VesselTree/Link.tsx`

**Purpose**  
Renders the visual connection between parent and child nodes.

**Key Responsibilities**

- **Path Generation**
  - Uses `d3.linkHorizontal` to generate smooth bezier curves
  - Connects the parent’s right edge to the child’s left edge

- **Styling**
  - Applies consistent stroke color and width
  - Designed to remain readable at all zoom levels

---

## Utilities

### `src/utils/treeUtils.ts`

**Purpose**  
Contains pure, reusable utility functions for tree traversal, layout computation, search, and data mutation.

---

### Functions

#### 1. `computeTreeLayout(rootData, expandedIds, filteredIds)`

**Purpose**
- Core layout engine of the application

**Logic**
- Converts raw nested data into a D3 hierarchy
- Applies a custom **Waterfall layout algorithm**:
  - **Horizontal (Y-axis)**: Determined by node depth
  - **Vertical (X-axis)**: Managed by a running cursor (`currentX`)
  - Parents align vertically with their first visible child
  - Leaf nodes increment the vertical cursor

**Filtering**
- When `filteredIds` is present, the layout only includes:
  - Matching nodes
  - Their full ancestor paths

---

#### 2. `buildNodeMap(root)`

**Purpose**
- Flattens the tree into a `Map<ID, Node>` for fast access

**Usage**
- Enables O(1) lookups
- Avoids repeated tree traversal
- Used by breadcrumbs, selection logic, and validation checks

---

#### 3. `findMatches(root, query)`

**Purpose**
- Performs a text-based search across the tree

**Returns**
- `matches`: Set of node IDs matching the query
- `pathsToMatches`: Set including matches and all ancestors required for visibility

---

#### 4. `getBreadcrumbs(nodeMap, targetId)`

**Purpose**
- Builds the breadcrumb path for a selected node

**Logic**
- Traverses parent references upward using `nodeMap`
- Stops at the root node

**Return**
- Ordered array representing the full hierarchy path

---

#### 5. `isDescendant(node, targetId)`

**Purpose**
- Validation helper for drag-and-drop operations

**Logic**
- Checks whether `targetId` exists in the subtree of `node`
- Prevents circular relationships (e.g., dropping a parent into its own child)

---

#### 6. `moveNodeInTree(root, draggedId, targetId)`

**Purpose**
- Handles node reparenting logic

**Logic**
- Deep clones the tree to preserve immutability
- Validates the move (self-drop and cycle prevention)
- Removes the dragged node from its original parent
- Inserts it into the target node’s children array
- Returns a new tree structure

---

## Data

### `src/data/mockData.ts`

**Purpose**
- Stores predefined mock datasets used to demonstrate scalability and behavior

**Content**

- `datasets` object containing:
  - `simple`
  - `moderate`
  - `complex`
  - `very_complex`
  - `ultra_complex`

**Structure**
- Each dataset conforms to the `TreeNodeData` interface
- Begins with a `System` root node
- Nests down through equipment, assemblies, and components
