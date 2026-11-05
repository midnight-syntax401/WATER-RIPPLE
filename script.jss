import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

const RIPPLE_LIMIT = 8;
const RIPPLE_LIFETIME = 4;
const rippleValues = Array.from(
  { length: RIPPLE_LIMIT },
  () => new THREE.Vector3(0, 0, -RIPPLE_LIFETIME),
);

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform int uRippleCount;
  uniform vec2 uResolution;
  uniform vec3 uRipples[${RIPPLE_LIMIT}];
  varying vec2 vUv;

  void main() {
    float aspect = uResolution.x / uResolution.y;
    vec2 centeredUv = vec2((vUv.x - 0.5) * aspect, vUv.y - 0.5);

    vec3 deepBlue = vec3(0.018, 0.062, 0.115);
    vec3 softTeal = vec3(0.105, 0.310, 0.285);
    float gradient = smoothstep(0.0, 1.0, vUv.y * 0.72 + vUv.x * 0.28);
    vec3 color = mix(deepBlue, softTeal, gradient);

    float rippleLight = 0.0;
    for (int i = 0; i < ${RIPPLE_LIMIT}; i++) {
      if (i >= uRippleCount) break;

      float age = uTime - uRipples[i].z;
      if (age < 0.0 || age > ${RIPPLE_LIFETIME.toFixed(1)}) continue;

      vec2 rippleUv = vec2((vUv.x - uRipples[i].x) * aspect, vUv.y - uRipples[i].y);
      float distanceToRipple = length(rippleUv);
      float radius = age * 0.34;
      float wave = sin((distanceToRipple - radius) * 55.0);
      float ring = wave * exp(-abs(distanceToRipple - radius) * 16.0);
      rippleLight += ring * exp(-age * 0.72);
    }

    float basin = 1.0 - smoothstep(0.1, 0.85, length(centeredUv));
    color += vec3(0.045, 0.105, 0.095) * basin;
    color += vec3(0.075, 0.17, 0.16) * rippleLight;

    float vignette = 1.0 - smoothstep(0.28, 1.05, length(centeredUv));
    color *= 0.72 + vignette * 0.28;

    gl_FragColor = vec4(color, 1.0);
  }
`;

const canvas = document.querySelector(".water");
if (!(canvas instanceof HTMLCanvasElement)) {
  throw new Error("The water canvas could not be found.");
}

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: false,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
camera.position.z = 1;
const uniforms = {
  uTime: { value: 0 },
  uRippleCount: { value: 0 },
  uResolution: { value: new THREE.Vector2(1, 1) },
  uRipples: { value: rippleValues },
};

const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms,
});
const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
scene.add(plane);

const clock = new THREE.Clock();
let nextRipple = 0;
let activePointerId = null;
let lastDragPoint = null;

function resize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height, false);
  uniforms.uResolution.value.set(width, height);
}

function addRipple(event) {
  const bounds = canvas.getBoundingClientRect();
  rippleValues[nextRipple].set(
    (event.clientX - bounds.left) / bounds.width,
    1 - (event.clientY - bounds.top) / bounds.height,
    clock.getElapsedTime(),
  );
  nextRipple = (nextRipple + 1) % RIPPLE_LIMIT;
  uniforms.uRippleCount.value = Math.min(
    uniforms.uRippleCount.value + 1,
    RIPPLE_LIMIT,
  );
}

function clearPointer() {
  activePointerId = null;
  lastDragPoint = null;
}

canvas.addEventListener("pointerdown", (event) => {
  if (!event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) {
    return;
  }

  event.preventDefault();
  activePointerId = event.pointerId;
  lastDragPoint = { x: event.clientX, y: event.clientY };
  canvas.setPointerCapture(event.pointerId);
  addRipple(event);
});

canvas.addEventListener("pointermove", (event) => {
  if (event.pointerId !== activePointerId || !lastDragPoint) return;

  const distance = Math.hypot(
    event.clientX - lastDragPoint.x,
    event.clientY - lastDragPoint.y,
  );
  if (distance < 18) return;

  lastDragPoint = { x: event.clientX, y: event.clientY };
  addRipple(event);
});

canvas.addEventListener("pointerup", clearPointer);
canvas.addEventListener("pointercancel", clearPointer);
window.addEventListener("blur", clearPointer);
window.addEventListener("resize", resize);

resize();

function render() {
  uniforms.uTime.value = clock.getElapsedTime();
  renderer.render(scene, camera);
  window.requestAnimationFrame(render);
}

render();

