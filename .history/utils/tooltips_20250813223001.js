// export class Tooltip {
//     constructor(selector) {
//         this.targets = document.querySelectorAll(selector);
//         this.tooltip = document.createElement("div");
//         this.tooltip.className = "tooltip-box";
//         document.body.appendChild(this.tooltip);

//         this.init();
//     }

//     init() {
//         this.targets.forEach((target) => {
//             target.addEventListener("mouseenter", () =>
//                 this.showTooltip(target)
//             );
//             target.addEventListener("mouseleave", () => this.hideTooltip());
//         });
//     }

//     showTooltip(target) {
//         const text = target.getAttribute("data-tooltip");
//         this.tooltip.textContent = text;

//         const rect = target.getBoundingClientRect();
//         this.tooltip.style.top =
//             rect.top + window.scrollY - this.tooltip.offsetHeight - 8 + "px";
//         this.tooltip.style.left =
//             rect.left +
//             window.scrollX +
//             rect.width / 2 -
//             this.tooltip.offsetWidth / 2 +
//             "px";
//         this.tooltip.style.opacity = 1;
//     }

//     hideTooltip() {
//         this.tooltip.style.opacity = 0;
//     }
// }
