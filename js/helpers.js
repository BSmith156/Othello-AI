const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

export function getMousePosition(event) {
    let rect = canvas.getBoundingClientRect();
    let transform = ctx.getTransform();
    let x = event.clientX - rect.left - transform.e;
    let y = event.clientY - rect.top - transform.f;
    return [x, y];
};