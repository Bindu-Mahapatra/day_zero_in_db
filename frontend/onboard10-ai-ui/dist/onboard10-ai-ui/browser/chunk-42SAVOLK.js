import {
  RouterLink
} from "./chunk-JW6SCZ3L.js";
import "./chunk-OWQBFOK4.js";
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
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-SKRXBCOX.js";

// src/app/pages/journey/journey.component.ts
var _c0 = (a0) => ["/step", a0];
var _forTrack0 = ($index, $item) => $item.id;
function JourneyComponent_For_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 9)(1, "div", 10);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 11)(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "small");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "span", 12);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 13);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const step_r1 = ctx.$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(26, _c0, step_r1.id));
    \u0275\u0275advance();
    \u0275\u0275classProp("done", step_r1.status === "Completed")("active", step_r1.status === "In Progress");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(step_r1.id);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(step_r1.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(step_r1.description);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("Owner: ", step_r1.owner, " \xB7 Dependency: ", step_r1.dependency);
    \u0275\u0275advance();
    \u0275\u0275classProp("risk-high", step_r1.riskLevel === "High")("risk-medium", step_r1.riskLevel === "Medium")("risk-low", step_r1.riskLevel === "Low");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(step_r1.riskLevel);
    \u0275\u0275advance();
    \u0275\u0275classProp("status-completed", step_r1.status === "Completed")("status-in-progress", step_r1.status === "In Progress")("status-pending", step_r1.status === "Pending")("status-blocked", step_r1.status === "Blocked");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(step_r1.status);
  }
}
var JourneyComponent = class _JourneyComponent {
  stateService = inject(OnboardingStateService);
  state = this.stateService.caseState;
  static \u0275fac = function JourneyComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _JourneyComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _JourneyComponent, selectors: [["app-journey"]], decls: 19, vars: 3, consts: [[1, "page-head"], [1, "page-title"], [1, "page-subtitle"], ["routerLink", "/readiness", 1, "btn"], [1, "card", "card-pad", "journey-card"], [1, "progress-summary"], [1, "progress-track"], [1, "progress-fill"], [1, "steps"], [1, "step-row", 3, "routerLink"], [1, "step-index"], [1, "step-main"], [1, "risk-badge"], [1, "status-badge"]], template: function JourneyComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div")(2, "h1", 1);
      \u0275\u0275text(3, "Your 10-Step Onboarding Journey");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p", 2);
      \u0275\u0275text(5, "Personalised steps based on role, location, team and access requirements.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "a", 3);
      \u0275\u0275text(7, "View Readiness");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "section", 4)(9, "div", 5)(10, "strong");
      \u0275\u0275text(11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "span");
      \u0275\u0275text(13, "7 of 10 gates targeted before day one");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(14, "div", 6);
      \u0275\u0275element(15, "div", 7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "div", 8);
      \u0275\u0275repeaterCreate(17, JourneyComponent_For_18_Template, 14, 28, "a", 9, _forTrack0);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(11);
      \u0275\u0275textInterpolate1("", ctx.state().readiness.teamOnboarding, "%");
      \u0275\u0275advance(4);
      \u0275\u0275styleProp("width", ctx.state().readiness.teamOnboarding, "%");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.state().journey);
    }
  }, dependencies: [RouterLink], styles: ["\n\n.page-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 22px;\n}\n.progress-summary[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  gap: 12px;\n  margin-bottom: 12px;\n}\n.progress-summary[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 34px;\n}\n.progress-summary[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: var(--db-muted);\n}\n.steps[_ngcontent-%COMP%] {\n  margin-top: 22px;\n}\n.step-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 42px 1fr auto auto;\n  gap: 14px;\n  align-items: center;\n  padding: 16px;\n  border: 1px solid var(--db-border);\n  border-radius: 16px;\n  background: #fff;\n  margin-bottom: 12px;\n  transition: transform 0.15s ease, box-shadow 0.15s ease;\n}\n.step-row[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: var(--shadow-soft);\n}\n.step-index[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  display: grid;\n  place-items: center;\n  border-radius: 50%;\n  border: 1px solid #cbd5e1;\n  color: var(--db-muted);\n  font-weight: 900;\n}\n.step-index.done[_ngcontent-%COMP%] {\n  background: var(--db-green);\n  color: white;\n  border-color: var(--db-green);\n}\n.step-index.active[_ngcontent-%COMP%] {\n  background: var(--db-blue);\n  color: white;\n  border-color: var(--db-blue);\n}\np[_ngcontent-%COMP%] {\n  margin: 4px 0;\n  color: var(--db-muted);\n}\nsmall[_ngcontent-%COMP%] {\n  color: var(--db-muted);\n}\n@media (max-width: 850px) {\n  .step-row[_ngcontent-%COMP%] {\n    grid-template-columns: 42px 1fr;\n  }\n}\n/*# sourceMappingURL=journey.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(JourneyComponent, [{
    type: Component,
    args: [{ selector: "app-journey", standalone: true, imports: [RouterLink], template: `<div class="page-head">
  <div>
    <h1 class="page-title">Your 10-Step Onboarding Journey</h1>
    <p class="page-subtitle">Personalised steps based on role, location, team and access requirements.</p>
  </div>
  <a routerLink="/readiness" class="btn">View Readiness</a>
</div>

<section class="card card-pad journey-card">
  <div class="progress-summary">
    <strong>{{ state().readiness.teamOnboarding }}%</strong>
    <span>7 of 10 gates targeted before day one</span>
  </div>
  <div class="progress-track"><div class="progress-fill" [style.width.%]="state().readiness.teamOnboarding"></div></div>

  <div class="steps">
    @for (step of state().journey; track step.id) {
      <a class="step-row" [routerLink]="['/step', step.id]">
        <div class="step-index" [class.done]="step.status === 'Completed'" [class.active]="step.status === 'In Progress'">{{ step.id }}</div>
        <div class="step-main">
          <strong>{{ step.title }}</strong>
          <p>{{ step.description }}</p>
          <small>Owner: {{ step.owner }} \xB7 Dependency: {{ step.dependency }}</small>
        </div>
        <span class="risk-badge" [class.risk-high]="step.riskLevel === 'High'" [class.risk-medium]="step.riskLevel === 'Medium'" [class.risk-low]="step.riskLevel === 'Low'">{{ step.riskLevel }}</span>
        <span class="status-badge" [class.status-completed]="step.status === 'Completed'" [class.status-in-progress]="step.status === 'In Progress'" [class.status-pending]="step.status === 'Pending'" [class.status-blocked]="step.status === 'Blocked'">{{ step.status }}</span>
      </a>
    }
  </div>
</section>
`, styles: ["/* src/app/pages/journey/journey.component.scss */\n.page-head {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 22px;\n}\n.progress-summary {\n  display: flex;\n  align-items: baseline;\n  gap: 12px;\n  margin-bottom: 12px;\n}\n.progress-summary strong {\n  font-size: 34px;\n}\n.progress-summary span {\n  color: var(--db-muted);\n}\n.steps {\n  margin-top: 22px;\n}\n.step-row {\n  display: grid;\n  grid-template-columns: 42px 1fr auto auto;\n  gap: 14px;\n  align-items: center;\n  padding: 16px;\n  border: 1px solid var(--db-border);\n  border-radius: 16px;\n  background: #fff;\n  margin-bottom: 12px;\n  transition: transform 0.15s ease, box-shadow 0.15s ease;\n}\n.step-row:hover {\n  transform: translateY(-2px);\n  box-shadow: var(--shadow-soft);\n}\n.step-index {\n  width: 34px;\n  height: 34px;\n  display: grid;\n  place-items: center;\n  border-radius: 50%;\n  border: 1px solid #cbd5e1;\n  color: var(--db-muted);\n  font-weight: 900;\n}\n.step-index.done {\n  background: var(--db-green);\n  color: white;\n  border-color: var(--db-green);\n}\n.step-index.active {\n  background: var(--db-blue);\n  color: white;\n  border-color: var(--db-blue);\n}\np {\n  margin: 4px 0;\n  color: var(--db-muted);\n}\nsmall {\n  color: var(--db-muted);\n}\n@media (max-width: 850px) {\n  .step-row {\n    grid-template-columns: 42px 1fr;\n  }\n}\n/*# sourceMappingURL=journey.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(JourneyComponent, { className: "JourneyComponent", filePath: "src/app/pages/journey/journey.component.ts", lineNumber: 12 });
})();
export {
  JourneyComponent
};
//# sourceMappingURL=chunk-42SAVOLK.js.map
