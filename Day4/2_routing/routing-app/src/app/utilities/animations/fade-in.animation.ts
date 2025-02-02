import { trigger, transition, style, animate } from "@angular/animations";

export const fadeInAnimation = trigger(
    "fadeInAnimation", [
    transition(":enter", [
        style({ opacity: 0 }),
        animate("4s", style({ opacity: 1 }))
    ])
]);