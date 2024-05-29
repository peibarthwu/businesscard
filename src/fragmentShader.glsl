// fragmentShader.glsl
varying vec2 vUv;
uniform sampler2D texture;
uniform sampler2D depthMap;
uniform float uStrength;
uniform vec2 uMouse;

void main() {
    vec2 uv = vUv;

    vec2 mouse = uMouse * 2.0 - 1.0;
    float dist = length(uv - mouse);
    vec2 dir = normalize(uv - mouse);
    uv += dir * dist * texture2D(depthMap, uv).r * uStrength; // Apply depth map

    gl_FragColor = texture2D(texture, uv);
}
