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
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵpureFunction1,
  ɵɵpureFunction5,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-SKRXBCOX.js";

// src/app/pages/readiness-score/readiness-score.component.ts
var _c0 = (a0) => ({ label: "Training", value: a0 });
var _c1 = (a0) => ({ label: "Access", value: a0 });
var _c2 = (a0) => ({ label: "Compliance", value: a0 });
var _c3 = (a0) => ({ label: "Documentation", value: a0 });
var _c4 = (a0) => ({ label: "Team Onboarding", value: a0 });
var _c5 = (a0, a1, a2, a3, a4) => [a0, a1, a2, a3, a4];
var _forTrack0 = ($index, $item) => $item.label;
function ReadinessScoreComponent_For_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 7)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "div", 12);
    \u0275\u0275domElement(4, "div", 13);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const metric_r1 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(metric_r1.label);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", metric_r1.value, "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", metric_r1.value, "%");
  }
}
function ReadinessScoreComponent_For_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 9);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const blocker_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u26A0\uFE0F ", blocker_r2);
  }
}
var ReadinessScoreComponent = class _ReadinessScoreComponent {
  stateService = inject(OnboardingStateService);
  state = this.stateService.caseState;
  static \u0275fac = function ReadinessScoreComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ReadinessScoreComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ReadinessScoreComponent, selectors: [["app-readiness-score"]], decls: 36, vars: 19, consts: [[1, "page-title"], [1, "page-subtitle"], [1, "grid", "readiness-grid"], [1, "card", "card-pad", "score-panel"], [1, "gauge"], [1, "trend"], [1, "card", "card-pad"], [1, "metric-row"], [1, "card", "card-pad", "blockers"], [1, "blocker"], [1, "ai-card"], [1, "ai-label"], [1, "progress-track"], [1, "progress-fill"]], template: function ReadinessScoreComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "h1", 0);
      \u0275\u0275text(1, "Onboarding Readiness Score");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(2, "p", 1);
      \u0275\u0275text(3, "Overall score and breakdown for day-one readiness.");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(4, "div", 2)(5, "section", 3)(6, "div", 4)(7, "div")(8, "strong");
      \u0275\u0275text(9);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(10, "span");
      \u0275\u0275text(11, "Good Progress");
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(12, "p", 5);
      \u0275\u0275text(13, "\u2191 12% vs last week");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(14, "section", 6)(15, "h3");
      \u0275\u0275text(16, "Score Breakdown");
      \u0275\u0275domElementEnd();
      \u0275\u0275repeaterCreate(17, ReadinessScoreComponent_For_18_Template, 7, 4, "div", 7, _forTrack0);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(19, "section", 8)(20, "h3");
      \u0275\u0275text(21, "Top Blockers");
      \u0275\u0275domElementEnd();
      \u0275\u0275repeaterCreate(22, ReadinessScoreComponent_For_23_Template, 2, 1, "div", 9, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(24, "section", 10)(25, "div", 11);
      \u0275\u0275text(26, "\u2726 How to improve");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(27, "ul")(28, "li");
      \u0275\u0275text(29, "Complete Data Privacy Training");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(30, "li");
      \u0275\u0275text(31, "Assign access reviewer");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(32, "li");
      \u0275\u0275text(33, "Submit production justification");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(34, "li");
      \u0275\u0275text(35, "Complete application onboarding");
      \u0275\u0275domElementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275styleProp("background", "conic-gradient(var(--db-green) " + ctx.state().readiness.overall + "%, #e8edf7 0)");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("", ctx.state().readiness.overall, "%");
      \u0275\u0275advance(8);
      \u0275\u0275repeater(\u0275\u0275pureFunction5(13, _c5, \u0275\u0275pureFunction1(3, _c0, ctx.state().readiness.training), \u0275\u0275pureFunction1(5, _c1, ctx.state().readiness.access), \u0275\u0275pureFunction1(7, _c2, ctx.state().readiness.compliance), \u0275\u0275pureFunction1(9, _c3, ctx.state().readiness.documentation), \u0275\u0275pureFunction1(11, _c4, ctx.state().readiness.teamOnboarding)));
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.state().readiness.blockers);
    }
  }, styles: ["\n\n.readiness-grid[_ngcontent-%COMP%] {\n  grid-template-columns: 1fr 1.6fr;\n  margin-top: 22px;\n}\n.score-panel[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n}\n.gauge[_ngcontent-%COMP%] {\n  width: 250px;\n  height: 250px;\n  border-radius: 50%;\n  display: grid;\n  place-items: center;\n}\n.gauge[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  width: 180px;\n  height: 180px;\n  border-radius: 50%;\n  background: white;\n  display: grid;\n  place-items: center;\n  text-align: center;\n}\n.gauge[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 48px;\n}\n.gauge[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  color: var(--db-muted);\n  font-size: 13px;\n}\n.trend[_ngcontent-%COMP%] {\n  color: var(--db-green);\n  font-weight: 800;\n}\nh3[_ngcontent-%COMP%] {\n  margin: 0 0 20px;\n}\n.metric-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 140px 1fr 52px;\n  align-items: center;\n  gap: 12px;\n  margin: 18px 0;\n}\n.blocker[_ngcontent-%COMP%] {\n  background: var(--db-red-light);\n  padding: 12px;\n  border-radius: 12px;\n  margin: 10px 0;\n}\n.ai-card[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin: 12px 0;\n}\n@media (max-width: 1000px) {\n  .readiness-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=readiness-score.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReadinessScoreComponent, [{
    type: Component,
    args: [{ selector: "app-readiness-score", standalone: true, imports: [], template: `<h1 class="page-title">Onboarding Readiness Score</h1>
<p class="page-subtitle">Overall score and breakdown for day-one readiness.</p>

<div class="grid readiness-grid">
  <section class="card card-pad score-panel">
    <div class="gauge" [style.background]="'conic-gradient(var(--db-green) ' + state().readiness.overall + '%, #e8edf7 0)'">
      <div><strong>{{ state().readiness.overall }}%</strong><span>Good Progress</span></div>
    </div>
    <p class="trend">\u2191 12% vs last week</p>
  </section>

  <section class="card card-pad">
    <h3>Score Breakdown</h3>
    @for (metric of [
      { label: 'Training', value: state().readiness.training },
      { label: 'Access', value: state().readiness.access },
      { label: 'Compliance', value: state().readiness.compliance },
      { label: 'Documentation', value: state().readiness.documentation },
      { label: 'Team Onboarding', value: state().readiness.teamOnboarding }
    ]; track metric.label) {
      <div class="metric-row">
        <span>{{ metric.label }}</span>
        <div class="progress-track"><div class="progress-fill" [style.width.%]="metric.value"></div></div>
        <strong>{{ metric.value }}%</strong>
      </div>
    }
  </section>

  <section class="card card-pad blockers">
    <h3>Top Blockers</h3>
    @for (blocker of state().readiness.blockers; track blocker) {
      <div class="blocker">\u26A0\uFE0F {{ blocker }}</div>
    }
  </section>

  <section class="ai-card">
    <div class="ai-label">\u2726 How to improve</div>
    <ul>
      <li>Complete Data Privacy Training</li>
      <li>Assign access reviewer</li>
      <li>Submit production justification</li>
      <li>Complete application onboarding</li>
    </ul>
  </section>
</div>
`, styles: ["/* src/app/pages/readiness-score/readiness-score.component.scss */\n.readiness-grid {\n  grid-template-columns: 1fr 1.6fr;\n  margin-top: 22px;\n}\n.score-panel {\n  display: grid;\n  place-items: center;\n}\n.gauge {\n  width: 250px;\n  height: 250px;\n  border-radius: 50%;\n  display: grid;\n  place-items: center;\n}\n.gauge div {\n  width: 180px;\n  height: 180px;\n  border-radius: 50%;\n  background: white;\n  display: grid;\n  place-items: center;\n  text-align: center;\n}\n.gauge strong {\n  font-size: 48px;\n}\n.gauge span {\n  display: block;\n  color: var(--db-muted);\n  font-size: 13px;\n}\n.trend {\n  color: var(--db-green);\n  font-weight: 800;\n}\nh3 {\n  margin: 0 0 20px;\n}\n.metric-row {\n  display: grid;\n  grid-template-columns: 140px 1fr 52px;\n  align-items: center;\n  gap: 12px;\n  margin: 18px 0;\n}\n.blocker {\n  background: var(--db-red-light);\n  padding: 12px;\n  border-radius: 12px;\n  margin: 10px 0;\n}\n.ai-card li {\n  margin: 12px 0;\n}\n@media (max-width: 1000px) {\n  .readiness-grid {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=readiness-score.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ReadinessScoreComponent, { className: "ReadinessScoreComponent", filePath: "src/app/pages/readiness-score/readiness-score.component.ts", lineNumber: 11 });
})();
export {
  ReadinessScoreComponent
};
//# sourceMappingURL=chunk-OR2HWDJZ.js.map
