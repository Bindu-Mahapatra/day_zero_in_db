import {
  OnboardingStateService
} from "./chunk-CIBLNRIR.js";
import {
  Component,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵgetCurrentView,
  ɵɵnextContext,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate3
} from "./chunk-SKRXBCOX.js";

// src/app/pages/trainings/trainings.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function TrainingsComponent_For_6_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 7);
    \u0275\u0275domListener("click", function TrainingsComponent_For_6_Conditional_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const training_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.completeTraining(training_r2.id));
    });
    \u0275\u0275text(1, "Mark Complete");
    \u0275\u0275domElementEnd();
  }
}
function TrainingsComponent_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 3)(1, "div", 4);
    \u0275\u0275text(2, "\u{1F4D8}");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "div")(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(8, "span", 5);
    \u0275\u0275text(9);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(10, TrainingsComponent_For_6_Conditional_10_Template, 2, 0, "button", 6);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const training_r2 = ctx.$implicit;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(training_r2.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3("", training_r2.type, " \xB7 ", training_r2.duration, " \xB7 Due ", training_r2.dueDate);
    \u0275\u0275advance();
    \u0275\u0275classProp("status-completed", training_r2.status === "Completed")("status-in-progress", training_r2.status === "In Progress")("status-pending", training_r2.status === "Pending");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(training_r2.status);
    \u0275\u0275advance();
    \u0275\u0275conditional(training_r2.status !== "Completed" ? 10 : -1);
  }
}
var TrainingsComponent = class _TrainingsComponent {
  stateService = inject(OnboardingStateService);
  state = this.stateService.caseState;
  completeTraining(id) {
    this.stateService.completeTraining(id);
  }
  static \u0275fac = function TrainingsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TrainingsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TrainingsComponent, selectors: [["app-trainings"]], decls: 7, vars: 0, consts: [[1, "page-title"], [1, "page-subtitle"], [1, "card", "card-pad", "training-list"], [1, "training-row"], [1, "training-icon"], [1, "status-badge"], [1, "btn", "btn-primary"], [1, "btn", "btn-primary", 3, "click"]], template: function TrainingsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "h1", 0);
      \u0275\u0275text(1, "Recommended Trainings");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(2, "p", 1);
      \u0275\u0275text(3, "Based on role: Developer \xB7 Location: Pune \xB7 Application: Trading Portal");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(4, "section", 2);
      \u0275\u0275repeaterCreate(5, TrainingsComponent_For_6_Template, 11, 12, "div", 3, _forTrack0);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.state().trainings);
    }
  }, styles: ["\n\n.training-list[_ngcontent-%COMP%] {\n  margin-top: 22px;\n}\n.training-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 48px 1fr auto auto;\n  align-items: center;\n  gap: 14px;\n  padding: 16px;\n  border: 1px solid var(--db-border);\n  border-radius: 16px;\n  margin-bottom: 12px;\n}\n.training-icon[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  display: grid;\n  place-items: center;\n  border-radius: 14px;\n  background: var(--db-purple-light);\n}\np[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  color: var(--db-muted);\n}\n@media (max-width: 800px) {\n  .training-row[_ngcontent-%COMP%] {\n    grid-template-columns: 48px 1fr;\n  }\n}\n/*# sourceMappingURL=trainings.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TrainingsComponent, [{
    type: Component,
    args: [{ selector: "app-trainings", standalone: true, imports: [], template: `<h1 class="page-title">Recommended Trainings</h1>
<p class="page-subtitle">Based on role: Developer \xB7 Location: Pune \xB7 Application: Trading Portal</p>

<section class="card card-pad training-list">
  @for (training of state().trainings; track training.id) {
    <div class="training-row">
      <div class="training-icon">\u{1F4D8}</div>
      <div>
        <strong>{{ training.title }}</strong>
        <p>{{ training.type }} \xB7 {{ training.duration }} \xB7 Due {{ training.dueDate }}</p>
      </div>
      <span class="status-badge" [class.status-completed]="training.status === 'Completed'" [class.status-in-progress]="training.status === 'In Progress'" [class.status-pending]="training.status === 'Pending'">{{ training.status }}</span>
      @if (training.status !== 'Completed') {
        <button class="btn btn-primary" (click)="completeTraining(training.id)">Mark Complete</button>
      }
    </div>
  }
</section>
`, styles: ["/* src/app/pages/trainings/trainings.component.scss */\n.training-list {\n  margin-top: 22px;\n}\n.training-row {\n  display: grid;\n  grid-template-columns: 48px 1fr auto auto;\n  align-items: center;\n  gap: 14px;\n  padding: 16px;\n  border: 1px solid var(--db-border);\n  border-radius: 16px;\n  margin-bottom: 12px;\n}\n.training-icon {\n  width: 42px;\n  height: 42px;\n  display: grid;\n  place-items: center;\n  border-radius: 14px;\n  background: var(--db-purple-light);\n}\np {\n  margin: 4px 0 0;\n  color: var(--db-muted);\n}\n@media (max-width: 800px) {\n  .training-row {\n    grid-template-columns: 48px 1fr;\n  }\n}\n/*# sourceMappingURL=trainings.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TrainingsComponent, { className: "TrainingsComponent", filePath: "src/app/pages/trainings/trainings.component.ts", lineNumber: 11 });
})();
export {
  TrainingsComponent
};
//# sourceMappingURL=chunk-TNHZKQ75.js.map
