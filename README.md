# Webpack Template

This is a simple Webpack template to kickstart your project. It includes basic configurations for bundling JavaScript, handling assets, and development tools.

## Features

- JavaScript bundling
- CSS and image handling
- Development server with live reloading
- Production-ready build configuration

## Installation

1. Use this template to create a new repository:
   - Click the **"Use this template"** button on the repository page to create a new project based on this template.

2. Clone your new repository:
    ```bash
    git clone https://github.com/your-username/your-new-repo.git
    cd your-new-repo
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

## Usage

### Development
Start the development server:
```bash
npm run start
```

### Production
Build the project for production:
```bash
npm run build
```

### Clean
Remove the `dist` folder:
```bash
npm run clean
```

## Folder Structure

```
webpack-template/
├── src/
│   ├── index.js         # Main JavaScript entry point
│   ├── styles/          # (Optional) Folder for CSS files (create if needed)
│   └── assets/          # (Optional) Folder for static assets like images (create if needed)
├── dist/                # Generated output folder (created after build)
├── webpack.config.js    # Webpack configuration file
├── package.json         # Project metadata and dependencies
└── README.md            # Documentation
```

### Notes:
- The `dist/` folder will be generated automatically when you run the `npm run build` command.
- The `styles/` and `assets/` folders are optional and can be created as needed for your project.

## License

This project is licensed under the MIT License. To use this template, you must include the same license in your project.