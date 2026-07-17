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
  ɵɵtextInterpolate1
} from "./chunk-SKRXBCOX.js";

// src/app/pages/missing-info/missing-info.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function MissingInfoComponent_For_6_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 9);
    \u0275\u0275domListener("click", function MissingInfoComponent_For_6_Conditional_12_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.assignReviewer());
    });
    \u0275\u0275text(1, "Assign Reviewer");
    \u0275\u0275domElementEnd();
  }
}
function MissingInfoComponent_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 4)(1, "div", 5);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "div", 6)(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "small");
    \u0275\u0275text(9);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(10, "span", 7);
    \u0275\u0275text(11);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(12, MissingInfoComponent_For_6_Conditional_12_Template, 2, 0, "button", 8);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    \u0275\u0275classProp("resolved", item_r3.resolved);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r3.resolved ? "\u2705" : "!");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r3.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r3.description);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Owner: ", item_r3.owner);
    \u0275\u0275advance();
    \u0275\u0275classProp("risk-high", item_r3.severity === "High")("risk-medium", item_r3.severity === "Medium")("risk-low", item_r3.severity === "Low");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r3.severity);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r3.id === "access-reviewer" && !item_r3.resolved ? 12 : -1);
  }
}
var MissingInfoComponent = class _MissingInfoComponent {
  stateService = inject(OnboardingStateService);
  state = this.stateService.caseState;
  assignReviewer() {
    this.stateService.assignReviewer();
  }
  static \u0275fac = function MissingInfoComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MissingInfoComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MissingInfoComponent, selectors: [["app-missing-info"]], decls: 7, vars: 0, consts: [[1, "page-title"], [1, "page-subtitle"], [1, "card", "card-pad", "missing-list"], [1, "missing-item", 3, "resolved"], [1, "missing-item"], [1, "icon"], [1, "content"], [1, "risk-badge"], [1, "btn", "btn-primary"], [1, "btn", "btn-primary", 3, "click"]], template: function MissingInfoComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "h1", 0);
      \u0275\u0275text(1, "Missing Information");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(2, "p", 1);
      \u0275\u0275text(3, "AI detected fields that are blocking onboarding progress.");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(4, "section", 2);
      \u0275\u0275repeaterCreate(5, MissingInfoComponent_For_6_Template, 13, 14, "div", 3, _forTrack0);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.state().missingInformation);
    }
  }, styles: ["\n\n.missing-list[_ngcontent-%COMP%] {\n  margin-top: 22px;\n}\n.missing-item[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 36px 1fr auto auto;\n  gap: 14px;\n  align-items: center;\n  padding: 16px;\n  border: 1px solid #f2d1d8;\n  background: #fff8f9;\n  border-radius: 16px;\n  margin-bottom: 12px;\n}\n.missing-item.resolved[_ngcontent-%COMP%] {\n  background: var(--db-green-light);\n  border-color: #bee5d0;\n}\n.icon[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  display: grid;\n  place-items: center;\n  border-radius: 50%;\n  background: var(--db-red-light);\n  color: var(--db-red);\n  font-weight: 900;\n}\n.missing-item.resolved[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%] {\n  background: #dff7e9;\n  color: var(--db-green);\n}\np[_ngcontent-%COMP%] {\n  margin: 4px 0;\n  color: var(--db-muted);\n}\nsmall[_ngcontent-%COMP%] {\n  color: var(--db-muted);\n}\n@media (max-width: 800px) {\n  .missing-item[_ngcontent-%COMP%] {\n    grid-template-columns: 36px 1fr;\n  }\n}\n/*# sourceMappingURL=missing-info.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MissingInfoComponent, [{
    type: Component,
    args: [{ selector: "app-missing-info", standalone: true, imports: [], template: `<h1 class="page-title">Missing Information</h1>
<p class="page-subtitle">AI detected fields that are blocking onboarding progress.</p>

<section class="card card-pad missing-list">
  @for (item of state().missingInformation; track item.id) {
    <div class="missing-item" [class.resolved]="item.resolved">
      <div class="icon">{{ item.resolved ? '\u2705' : '!' }}</div>
      <div class="content">
        <strong>{{ item.title }}</strong>
        <p>{{ item.description }}</p>
        <small>Owner: {{ item.owner }}</small>
      </div>
      <span class="risk-badge" [class.risk-high]="item.severity === 'High'" [class.risk-medium]="item.severity === 'Medium'" [class.risk-low]="item.severity === 'Low'">{{ item.severity }}</span>
      @if (item.id === 'access-reviewer' && !item.resolved) {
        <button class="btn btn-primary" (click)="assignReviewer()">Assign Reviewer</button>
      }
    </div>
  }
</section>
`, styles: ["/* src/app/pages/missing-info/missing-info.component.scss */\n.missing-list {\n  margin-top: 22px;\n}\n.missing-item {\n  display: grid;\n  grid-template-columns: 36px 1fr auto auto;\n  gap: 14px;\n  align-items: center;\n  padding: 16px;\n  border: 1px solid #f2d1d8;\n  background: #fff8f9;\n  border-radius: 16px;\n  margin-bottom: 12px;\n}\n.missing-item.resolved {\n  background: var(--db-green-light);\n  border-color: #bee5d0;\n}\n.icon {\n  width: 32px;\n  height: 32px;\n  display: grid;\n  place-items: center;\n  border-radius: 50%;\n  background: var(--db-red-light);\n  color: var(--db-red);\n  font-weight: 900;\n}\n.missing-item.resolved .icon {\n  background: #dff7e9;\n  color: var(--db-green);\n}\np {\n  margin: 4px 0;\n  color: var(--db-muted);\n}\nsmall {\n  color: var(--db-muted);\n}\n@media (max-width: 800px) {\n  .missing-item {\n    grid-template-columns: 36px 1fr;\n  }\n}\n/*# sourceMappingURL=missing-info.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MissingInfoComponent, { className: "MissingInfoComponent", filePath: "src/app/pages/missing-info/missing-info.component.ts", lineNumber: 11 });
})();
export {
  MissingInfoComponent
};
//# sourceMappingURL=chunk-FAZJWEJA.js.map
