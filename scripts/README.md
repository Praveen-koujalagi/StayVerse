# StayVerse Scripts

This folder contains utility scripts for managing listings and categories in the StayVerse application.

## Scripts Overview

### 1. `update-categories.js`
**Purpose**: Updates existing listings to use the new category system for Airbnb-style filters.

**What it does**:
- Maps old category names (`trending`, `iconic-cities`, `mountains`, etc.) to new filter categories
- Converts categories to match the new filter system (`apartment`, `house`, `villa`, `cabin`, etc.)
- Updates any remaining listings with invalid categories to default `apartment`

**Usage**:
```bash
node scripts/update-categories.js
```

**When to use**: 
- After adding the new category field to the listing model
- When migrating from old category system to new filter system

---

### 2. `update-listings-categories.js`
**Purpose**: Basic script to add default categories to listings that don't have any category field.

**What it does**:
- Finds listings without a `category` field
- Sets default category as `apartment`

**Usage**:
```bash
node scripts/update-listings-categories.js
```

**When to use**: 
- For completely new databases
- When listings exist but have no category field at all

---

### 3. `check-listings.js`
**Purpose**: Diagnostic script to inspect the current state of listings in the database.

**What it does**:
- Counts total listings in database
- Shows how many listings have/don't have categories
- Displays sample listings with their current categories

**Usage**:
```bash
node scripts/check-listings.js
```

**When to use**: 
- Before running update scripts to understand current state
- After updates to verify changes were applied correctly
- For debugging category-related issues

---

## Filter System Overview

The new filter system supports these categories:
- **Apartment** (`apartment`) - Modern city apartments
- **House** (`house`) - Traditional houses
- **Villa** (`villa`) - Luxury villas
- **Cabin** (`cabin`) - Mountain/forest cabins
- **Hotel** (`hotel`) - Hotel rooms
- **Resort** (`resort`) - Resort accommodations
- **Cottage** (`cottage`) - Countryside cottages
- **Loft** (`loft`) - Urban lofts
- **Studio** (`studio`) - Studio apartments
- **Penthouse** (`penthouse`) - Luxury penthouses

Each category has its own Font Awesome icon and filter button in the listings page.

---

## File Structure Impact

These scripts work with:
- `models/listing.js` - Updated with category enum
- `views/listings/index.ejs` - New filter UI
- `views/listings/new.ejs` - Category selection in forms
- `views/listings/edit.ejs` - Category editing
- `controllers/listings.js` - Filter logic
- `public/css/style.css` - Filter styling
- `public/js/script.js` - Filter functionality
- `schema.js` - Validation for categories

---

## Notes

- Always backup your database before running update scripts
- Run `check-listings.js` first to understand your current data
- The scripts automatically close database connections when finished
- All scripts connect to `mongodb://127.0.0.1:27017/stayverse`
