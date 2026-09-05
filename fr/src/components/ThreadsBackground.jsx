import { useEffect, useRef } from "react";
import { Color, Mesh, Program, Renderer, Triangle } from "ogl";

const vertex = `attribute vec2 position; void main(){gl_Position=vec4(position,0.,1.);}`;
const fragment = `precision highp float; uniform float iTime; uniform vec3 iResolution,uColor; uniform float uAmplitude,uDistance; uniform vec2 uMouse;
float n(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(n(i),n(i+vec2(1,0)),f.x),mix(n(i+vec2(0,1)),n(i+vec2(1,1)),f.x),f.y);}
void main(){vec2 uv=gl_FragCoord.xy/iResolution.xy;float lines=0.;for(int i=0;i<40;i++){float p=float(i)/40.;float wave=noise(vec2(uv.x*3.+iTime*.1+p*8.,p*8.))-.5;float y=.5+(p-.5)*uDistance+wave*uAmplitude*(.12+.16*uv.x)+(uMouse.y-.5)*.03;float d=abs(uv.y-y);lines+=smoothstep(.016*(1.-p)+.004,.0,d)*(1.-p);}float a=clamp(lines,0.,.82);gl_FragColor=vec4(uColor*a,a);}`;

export default function ThreadsBackground({ color = [0.37, 0.25, 0.92], amplitude = 1, distance = 0.7, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const container = ref.current;
    const renderer = new Renderer({ alpha: true, dpr: Math.min(devicePixelRatio, 2) });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    container.appendChild(gl.canvas);
    const program = new Program(gl, { vertex, fragment, uniforms: { iTime: { value: 0 }, iResolution: { value: new Color(1, 1, 1) }, uColor: { value: new Color(...color) }, uAmplitude: { value: amplitude }, uDistance: { value: distance }, uMouse: { value: new Float32Array([.5, .5]) } } });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
    const resize = () => { renderer.setSize(container.clientWidth, container.clientHeight); program.uniforms.iResolution.value.set(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height); };
    const observer = new ResizeObserver(resize); observer.observe(container); resize();
    const mouse = (event) => { const box = container.getBoundingClientRect(); program.uniforms.uMouse.value.set([(event.clientX - box.left) / box.width, 1 - (event.clientY - box.top) / box.height]); };
    container.addEventListener("pointermove", mouse);
    let frame; const render = (time) => { program.uniforms.iTime.value = time * .001; renderer.render({ scene: mesh }); frame = requestAnimationFrame(render); }; frame = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); container.removeEventListener("pointermove", mouse); gl.canvas.remove(); gl.getExtension("WEBGL_lose_context")?.loseContext(); };
  }, [amplitude, color, distance]);
  return <div ref={ref} aria-hidden="true" className={`absolute inset-0 overflow-hidden ${className}`} />;
}
