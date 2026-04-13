## React Image Maps

> Responsive HTML image maps for React with automatic coordinate scaling

[![npm version](https://img.shields.io/npm/v/react-image-maps.svg)](https://www.npmjs.com/package/react-image-maps) [![Downloads/week](https://img.shields.io/npm/dw/react-image-maps.svg)](https://www.npmjs.com/package/react-image-maps) [![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

A simple React component for HTML image maps with the key feature that native `<map>` lacks: **automatic responsive coordinate scaling**.

Perfect for interactive image maps that need to work at any screen size, in fluid layouts, or on mobile — without any CSS tricks.

## Installation

```
npm install react-image-maps
```

## Quick Start

```tsx
import React from 'react'
import ReactImageMaps, { Area } from 'react-image-maps'

const areas: Area[] = [
  {
    shape: 'rect',
    coords: [34, 44, 270, 350],
    alt: 'Computer',
    href: 'https://example.com/computer',
  },
  {
    shape: 'circle',
    coords: [337, 300, 44],
    alt: 'Coffee cup',
    onClick: (area) => console.log('clicked', area.alt),
  },
]

function App() {
  return (
    <ReactImageMaps
      src="/office.jpg"
      alt="Office scene"
      mapName="office-map"
      areas={areas}
      originalWidth={800}
    />
  )
}
```

The `originalWidth` should match the natural pixel width of the source image (or whatever coordinate space your `coords` were defined in). The component scales all coordinates proportionally as the image resizes.

## API Reference

### `<ReactImageMaps />`

#### Props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `src` | `string` | Yes | URL of the image to display |
| `alt` | `string` | No | Alt text for the `<img>` element |
| `mapName` | `string` | Yes | Unique name for the `<map>` element |
| `areas` | `Area[]` | Yes | Array of clickable area definitions |
| `originalWidth` | `number` | Yes | Pixel width the coordinates were defined at |

#### `Area` object

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `shape` | `'rect' \| 'circle' \| 'poly'` | No | Shape of the area. Defaults to `'rect'` |
| `coords` | `number[]` | Yes | Coordinates in original image pixel space, scaled automatically at render time |
| `alt` | `string` | No | Alt text for the area |
| `href` | `string` | No | Link target. Defaults to `'#'` when `onClick` is provided |
| `onClick` | `(area: Area) => void` | No | Click handler. Prevents default navigation automatically |

### TypeScript Support

The component is fully typed and exports the following types:

```tsx
import ReactImageMaps, { type Area, type ReactImageMapsProps } from 'react-image-maps'

const areas: Area[] = [
  { shape: 'rect', coords: [0, 0, 100, 100], alt: 'Top left region' }
]
```

## Examples

### Click Handlers

```tsx
const areas: Area[] = [
  {
    shape: 'rect',
    coords: [34, 44, 270, 350],
    alt: 'Product A',
    onClick: (area) => {
      console.log('Clicked:', area.alt)
    },
  },
]
```

### Mixed Shapes

```tsx
const areas: Area[] = [
  // Rectangle: [x1, y1, x2, y2]
  { shape: 'rect', coords: [0, 0, 200, 150], alt: 'Header region' },

  // Circle: [cx, cy, radius]
  { shape: 'circle', coords: [300, 200, 50], alt: 'Logo' },

  // Polygon: [x1, y1, x2, y2, x3, y3, ...]
  { shape: 'poly', coords: [100, 0, 200, 100, 0, 100], alt: 'Triangle' },
]
```

### With Navigation

```tsx
const areas: Area[] = [
  {
    shape: 'rect',
    coords: [34, 44, 270, 350],
    alt: 'Go to products',
    href: '/products',
  },
]
```

## Why This Component?

- **Native `<map>` limitation**: Coordinates are fixed pixel values — they break when the image scales
- **This component solves that**: Uses `ResizeObserver` to track rendered width and scales coordinates live
- **React-friendly**: Manages the observer lifecycle with `useEffect`
- **Simple API**: Familiar `<area>` shape and coord conventions, just pass arrays
- **TypeScript**: Full type safety out of the box

## License

MIT License. See [LICENSE](https://github.com/nklswbr/react-image-maps/blob/main/LICENSE) for details.
