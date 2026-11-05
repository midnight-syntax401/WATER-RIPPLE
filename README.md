# WATER-RIPPLE
An interactive, GPU-accelerated WebGL water ripple simulation built with Three.js and custom GLSL fragment shaders.

🌊 Zen Water Ripples
A calm, tactile web experience featuring physically accurate water ripples and dynamic gradients. This project uses Three.js and custom GLSL fragment shaders to render a highly responsive, GPU-accelerated fluid simulation directly in the browser.

✨ Features
Interactive Fluid Dynamics: Clicking or dragging across the screen generates realistic water ripples that expand, intersect, and fade over time.

Custom WebGL Shaders: All ripple math and visual distortions are calculated natively on the GPU using a custom GLSL fragment shader for maximum performance.

Dynamic Gradient Background: The underlying canvas features a smooth, atmospheric gradient shifting from deep zen blue to soft teal.

Responsive & Mobile-Friendly: Fully scales to any screen size and supports both mouse clicks and mobile touch inputs.

🛠️ Tech Stack
HTML5 & CSS3: Semantic structure and zero-margin, full-screen canvas styling.

JavaScript: Handles event listeners, coordinate mapping, and Three.js initialization.

Three.js: Renders the 2D orthographic plane and manages the WebGL context.

GLSL: Custom vertex and fragment shaders for mathematical ripple distortion.

🚀 How to Run Locally
Since this project relies entirely on frontend web technologies and a Three.js CDN, it requires zero build steps.
