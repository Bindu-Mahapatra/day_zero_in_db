import {
  OnboardingStateService
} from "./chunk-CIBLNRIR.js";
import {
  Component,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate2
} from "./chunk-SKRXBCOX.js";

// src/app/pages/reports/reports.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function ReportsComponent_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 3)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "div")(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "small");
    \u0275\u0275text(9);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const activity_r1 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(activity_r1.type);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(activity_r1.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(activity_r1.description);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", activity_r1.timestamp, " \xB7 ", activity_r1.actor);
  }
}
var ReportsComponent = class _ReportsComponent {
  stateService = inject(OnboardingStateService);
  state = this.stateService.caseState;
  static \u0275fac = function ReportsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ReportsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ReportsComponent, selectors: [["app-reports"]], decls: 9, vars: 0, consts: [[1, "page-title"], [1, "page-subtitle"], [1, "card", "card-pad"], [1, "activity-row"]], template: function ReportsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "h1", 0);
      \u0275\u0275text(1, "Reports & Audit Evidence");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(2, "p", 1);
      \u0275\u0275text(3, "Evidence trail generated as a byproduct of onboarding.");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(4, "section", 2)(5, "h3");
      \u0275\u0275text(6, "Agent Activity Log");
      \u0275\u0275domElementEnd();
      \u0275\u0275repeaterCreate(7, ReportsComponent_For_8_Template, 10, 5, "div", 3, _forTrack0);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275repeater(ctx.state().agentActivity);
    }
  }, styles: ["\n\n.card[_ngcontent-%COMP%] {\n  margin-top: 22px;\n}\n.activity-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 120px 1fr;\n  gap: 16px;\n  padding: 16px 0;\n  border-bottom: 1px solid var(--db-border);\n}\n.activity-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: var(--db-blue);\n  font-weight: 800;\n  text-transform: capitalize;\n}\np[_ngcontent-%COMP%] {\n  color: var(--db-muted);\n  margin: 4px 0;\n}\nsmall[_ngcontent-%COMP%] {\n  color: var(--db-muted);\n}\n/*# sourceMappingURL=reports.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReportsComponent, [{
    type: Component,
    args: [{ selector: "app-reports", standalone: true, imports: [], template: '<h1 class="page-title">Reports & Audit Evidence</h1>\n<p class="page-subtitle">Evidence trail generated as a byproduct of onboarding.</p>\n\n<section class="card card-pad">\n  <h3>Agent Activity Log</h3>\n  @for (activity of state().agentActivity; track activity.id) {\n    <div class="activity-row">\n      <span>{{ activity.type }}</span>\n      <div>\n        <strong>{{ activity.title }}</strong>\n        <p>{{ activity.description }}</p>\n        <small>{{ activity.timestamp }} \xB7 {{ activity.actor }}</small>\n      </div>\n    </div>\n  }\n</section>\n', styles: ["/* src/app/pages/reports/reports.component.scss */\n.card {\n  margin-top: 22px;\n}\n.activity-row {\n  display: grid;\n  grid-template-columns: 120px 1fr;\n  gap: 16px;\n  padding: 16px 0;\n  border-bottom: 1px solid var(--db-border);\n}\n.activity-row span {\n  color: var(--db-blue);\n  font-weight: 800;\n  text-transform: capitalize;\n}\np {\n  color: var(--db-muted);\n  margin: 4px 0;\n}\nsmall {\n  color: var(--db-muted);\n}\n/*# sourceMappingURL=reports.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ReportsComponent, { className: "ReportsComponent", filePath: "src/app/pages/reports/reports.component.ts", lineNumber: 11 });
})();
export {
  ReportsComponent
};
//# sourceMappingURL=chunk-Q63DFMLU.js.map
