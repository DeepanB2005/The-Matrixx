import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";

const vertex = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform vec2 uMouse;
uniform float iTime;
uniform float uMouseActive;
out vec4 fragColor;
#define TAU 6.28318530718

float glow(float value) { return 0.018 / pow(max(value, 0.0001), 0.64); }

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  float pinchX = mix(0.5, uMouse.x, uMouseActive * 0.4);
  float totalGlow = 0.0;
  vec3 color = vec3(0.0);

  for (int index = 0; index < 7; index++) {
    float i = float(index);
    float amplitude = 0.18 * abs(uv.x - pinchX) * (1.0 + i * 0.8);
    float wave = abs((uv.y - 0.53) + sin(uv.x * 5.2 + iTime * 0.24 + i * TAU / 7.0) * amplitude);
    float threadGlow = glow(wave / 1.15);
    vec3 threadColor = mix(vec3(0.12, 0.53, 1.0), vec3(0.68, 0.25, 1.0), i / 6.0);
    color += threadGlow * threadColor;
    totalGlow += threadGlow;
  }

  float mouseLight = exp(-dot(uv - uMouse, uv - uMouse) * 7.0) * uMouseActive * 0.18;
  color *= 0.82 + mouseLight;
  float alpha = clamp(totalGlow, 0.0, 0.92);
  fragColor = vec4(color * alpha, alpha);
}`;

export default function WebThreads({ className = "" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const renderer = new Renderer({ webgl: 2, alpha: true, dpr: Math.min(devicePixelRatio, 2) });
    const gl = renderer.gl;
    const canvas = gl.canvas;
    canvas.style.cssText = "width:100%;height:100%;display:block";
    container.appendChild(canvas);

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([1, 1]) },
        uMouse: { value: new Float32Array([0.5, 0.5]) },
        uMouseActive: { value: 0 },
      },
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
    const mouse = program.uniforms.uMouse.value;
    let targetMouse = [0.5, 0.5];
    let targetActive = 0;
    let active = 0;

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      renderer.setSize(Math.max(1, width), Math.max(1, height));
      program.uniforms.iResolution.value[0] = gl.drawingBufferWidth;
      program.uniforms.iResolution.value[1] = gl.drawingBufferHeight;
    };
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    const move = (event) => {
      const rect = canvas.getBoundingClientRect();
      targetMouse = [(event.clientX - rect.left) / rect.width, 1 - (event.clientY - rect.top) / rect.height];
      targetActive = 1;
    };
    const leave = () => { targetActive = 0; };
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerleave", leave);

    const start = performance.now();
    let frame;
    const render = (time) => {
      program.uniforms.iTime.value = (time - start) / 1000;
      mouse[0] += (targetMouse[0] - mouse[0]) * 0.05;
      mouse[1] += (targetMouse[1] - mouse[1]) * 0.05;
      active += (targetActive - active) * 0.05;
      program.uniforms.uMouseActive.value = active;
      renderer.render({ scene: mesh });
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
      canvas.remove();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <div ref={containerRef} className={className} aria-hidden="true" />;
}
