import {
  ActivatedRoute,
  RouterLink
} from "./chunk-JW6SCZ3L.js";
import "./chunk-OWQBFOK4.js";
import {
  OnboardingStateService
} from "./chunk-CIBLNRIR.js";
import {
  Component,
  computed,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-SKRXBCOX.js";

// src/app/pages/step-details/step-details.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function StepDetailsComponent_For_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275text(1, "\u2705 ");
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const req_r1 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(req_r1);
  }
}
function StepDetailsComponent_For_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "label", 11);
    \u0275\u0275element(1, "input", 20);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const action_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("checked", action_r2.completed);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(action_r2.title);
  }
}
function StepDetailsComponent_For_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const analysis_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", analysis_r3.includes("missing") ? "\u26A0\uFE0F" : "\u2705", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(analysis_r3);
  }
}
function StepDetailsComponent_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 21);
    \u0275\u0275listener("click", function StepDetailsComponent_Conditional_51_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.assignReviewer());
    });
    \u0275\u0275text(1, "Assign Reviewer");
    \u0275\u0275elementEnd();
  }
}
function StepDetailsComponent_For_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const policy_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(policy_r6);
  }
}
var StepDetailsComponent = class _StepDetailsComponent {
  route = inject(ActivatedRoute);
  stateService = inject(OnboardingStateService);
  state = this.stateService.caseState;
  stepId = Number(this.route.snapshot.paramMap.get("id") ?? 3);
  step = computed(() => this.state().journey.find((s) => s.id === this.stepId) ?? this.state().journey[2], ...ngDevMode ? [{ debugName: "step" }] : []);
  assignReviewer() {
    this.stateService.assignReviewer();
  }
  static \u0275fac = function StepDetailsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StepDetailsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _StepDetailsComponent, selectors: [["app-step-details"]], decls: 69, vars: 18, consts: [[1, "page-head"], ["routerLink", "/journey", 1, "back-link"], [1, "page-title"], [1, "page-subtitle"], [1, "status-badge"], [1, "grid", "meta-grid"], [1, "card", "card-pad", "meta-card"], [1, "grid", "details-grid"], [1, "card", "card-pad"], [1, "check-row"], [1, "mt"], [1, "action-row"], [1, "ai-card"], [1, "ai-label"], [1, "analysis-row"], [1, "btn", "btn-primary"], [1, "decision-box"], [1, "confidence"], [1, "progress-track"], [1, "progress-fill", 2, "width", "92%"], ["type", "checkbox", "disabled", "", 3, "checked"], [1, "btn", "btn-primary", 3, "click"]], template: function StepDetailsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div")(2, "a", 1);
      \u0275\u0275text(3, "\u2190 Back to Journey");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "h1", 2);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p", 3);
      \u0275\u0275text(7);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "span", 4);
      \u0275\u0275text(9);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 5)(11, "div", 6)(12, "span");
      \u0275\u0275text(13, "Risk Level");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "strong");
      \u0275\u0275text(15);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "div", 6)(17, "span");
      \u0275\u0275text(18, "Owner");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "strong");
      \u0275\u0275text(20);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "div", 6)(22, "span");
      \u0275\u0275text(23, "Due Date");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "strong");
      \u0275\u0275text(25);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(26, "div", 6)(27, "span");
      \u0275\u0275text(28, "Dependency");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "strong");
      \u0275\u0275text(30);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(31, "div", 7)(32, "section", 8)(33, "h3");
      \u0275\u0275text(34, "Requirements");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(35, StepDetailsComponent_For_36_Template, 4, 1, "div", 9, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementStart(37, "h3", 10);
      \u0275\u0275text(38, "Actions");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(39, StepDetailsComponent_For_40_Template, 4, 2, "label", 11, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "section", 12)(42, "div", 13);
      \u0275\u0275text(43, "\u2726 AI Analysis");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(44, StepDetailsComponent_For_45_Template, 4, 2, "div", 14, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275element(46, "hr");
      \u0275\u0275elementStart(47, "strong");
      \u0275\u0275text(48, "Recommendation");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(49, "p");
      \u0275\u0275text(50);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(51, StepDetailsComponent_Conditional_51_Template, 2, 0, "button", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "section", 8)(53, "h3");
      \u0275\u0275text(54, "AI Decision");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(55, "p");
      \u0275\u0275text(56, "Human approval remains mandatory for access changes. AI only recommends next action and prepares evidence.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(57, "div", 16)(58, "strong");
      \u0275\u0275text(59, "Policy Evidence");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(60, StepDetailsComponent_For_61_Template, 2, 1, "span", null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(62, "div", 17)(63, "span");
      \u0275\u0275text(64, "Confidence");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(65, "strong");
      \u0275\u0275text(66, "92% High");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(67, "div", 18);
      \u0275\u0275element(68, "div", 19);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate2("Step ", ctx.step().id, " of 10 \xB7 ", ctx.step().title);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.step().description);
      \u0275\u0275advance();
      \u0275\u0275classProp("status-completed", ctx.step().status === "Completed")("status-in-progress", ctx.step().status === "In Progress")("status-pending", ctx.step().status === "Pending")("status-blocked", ctx.step().status === "Blocked");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.step().status);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.step().riskLevel);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.step().owner);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.step().dueDate);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.step().dependency);
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.step().requirements);
      \u0275\u0275advance(4);
      \u0275\u0275repeater(ctx.step().actions);
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.step().aiAnalysis);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.step().recommendation);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.step().key === "github-access" ? 51 : -1);
      \u0275\u0275advance(9);
      \u0275\u0275repeater(ctx.step().policyEvidence);
    }
  }, dependencies: [RouterLink], styles: ["\n\n.page-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 22px;\n}\n.back-link[_ngcontent-%COMP%] {\n  color: var(--db-blue);\n  font-weight: 800;\n  font-size: 13px;\n}\n.meta-grid[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  margin-bottom: 18px;\n}\n.meta-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: var(--db-muted);\n  font-size: 13px;\n}\n.meta-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 6px;\n}\n.details-grid[_ngcontent-%COMP%] {\n  grid-template-columns: 1.1fr 1.3fr 1fr;\n  align-items: stretch;\n}\nh3[_ngcontent-%COMP%] {\n  margin: 0 0 14px;\n}\n.mt[_ngcontent-%COMP%] {\n  margin-top: 24px;\n}\n.check-row[_ngcontent-%COMP%], \n.analysis-row[_ngcontent-%COMP%], \n.action-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  align-items: center;\n  padding: 10px 0;\n  border-bottom: 1px solid #edf1f7;\n}\n.action-row[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n}\n.ai-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--db-muted);\n  line-height: 1.55;\n}\nhr[_ngcontent-%COMP%] {\n  border: 0;\n  border-top: 1px solid var(--db-border);\n  margin: 16px 0;\n}\n.decision-box[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 8px;\n  padding: 14px;\n  border-radius: 14px;\n  background: #f7f9ff;\n  margin-top: 16px;\n}\n.decision-box[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: var(--db-blue);\n  font-size: 13px;\n  font-weight: 700;\n}\n.confidence[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  margin: 18px 0 8px;\n  font-size: 13px;\n}\n@media (max-width: 1100px) {\n  .details-grid[_ngcontent-%COMP%], \n   .meta-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=step-details.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StepDetailsComponent, [{
    type: Component,
    args: [{ selector: "app-step-details", standalone: true, imports: [RouterLink], template: `<div class="page-head">
  <div>
    <a routerLink="/journey" class="back-link">\u2190 Back to Journey</a>
    <h1 class="page-title">Step {{ step().id }} of 10 \xB7 {{ step().title }}</h1>
    <p class="page-subtitle">{{ step().description }}</p>
  </div>
  <span class="status-badge" [class.status-completed]="step().status === 'Completed'" [class.status-in-progress]="step().status === 'In Progress'" [class.status-pending]="step().status === 'Pending'" [class.status-blocked]="step().status === 'Blocked'">{{ step().status }}</span>
</div>

<div class="grid meta-grid">
  <div class="card card-pad meta-card"><span>Risk Level</span><strong>{{ step().riskLevel }}</strong></div>
  <div class="card card-pad meta-card"><span>Owner</span><strong>{{ step().owner }}</strong></div>
  <div class="card card-pad meta-card"><span>Due Date</span><strong>{{ step().dueDate }}</strong></div>
  <div class="card card-pad meta-card"><span>Dependency</span><strong>{{ step().dependency }}</strong></div>
</div>

<div class="grid details-grid">
  <section class="card card-pad">
    <h3>Requirements</h3>
    @for (req of step().requirements; track req) {
      <div class="check-row">\u2705 <span>{{ req }}</span></div>
    }
    <h3 class="mt">Actions</h3>
    @for (action of step().actions; track action.id) {
      <label class="action-row">
        <input type="checkbox" [checked]="action.completed" disabled />
        <span>{{ action.title }}</span>
      </label>
    }
  </section>

  <section class="ai-card">
    <div class="ai-label">\u2726 AI Analysis</div>
    @for (analysis of step().aiAnalysis; track analysis) {
      <div class="analysis-row">{{ analysis.includes('missing') ? '\u26A0\uFE0F' : '\u2705' }} <span>{{ analysis }}</span></div>
    }
    <hr />
    <strong>Recommendation</strong>
    <p>{{ step().recommendation }}</p>
    @if (step().key === 'github-access') {
      <button class="btn btn-primary" (click)="assignReviewer()">Assign Reviewer</button>
    }
  </section>

  <section class="card card-pad">
    <h3>AI Decision</h3>
    <p>Human approval remains mandatory for access changes. AI only recommends next action and prepares evidence.</p>
    <div class="decision-box">
      <strong>Policy Evidence</strong>
      @for (policy of step().policyEvidence; track policy) {
        <span>{{ policy }}</span>
      }
    </div>
    <div class="confidence">
      <span>Confidence</span>
      <strong>92% High</strong>
    </div>
    <div class="progress-track"><div class="progress-fill" style="width: 92%"></div></div>
  </section>
</div>
`, styles: ["/* src/app/pages/step-details/step-details.component.scss */\n.page-head {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 22px;\n}\n.back-link {\n  color: var(--db-blue);\n  font-weight: 800;\n  font-size: 13px;\n}\n.meta-grid {\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  margin-bottom: 18px;\n}\n.meta-card span {\n  color: var(--db-muted);\n  font-size: 13px;\n}\n.meta-card strong {\n  display: block;\n  margin-top: 6px;\n}\n.details-grid {\n  grid-template-columns: 1.1fr 1.3fr 1fr;\n  align-items: stretch;\n}\nh3 {\n  margin: 0 0 14px;\n}\n.mt {\n  margin-top: 24px;\n}\n.check-row,\n.analysis-row,\n.action-row {\n  display: flex;\n  gap: 10px;\n  align-items: center;\n  padding: 10px 0;\n  border-bottom: 1px solid #edf1f7;\n}\n.action-row input {\n  width: 18px;\n  height: 18px;\n}\n.ai-card p,\n.card p {\n  color: var(--db-muted);\n  line-height: 1.55;\n}\nhr {\n  border: 0;\n  border-top: 1px solid var(--db-border);\n  margin: 16px 0;\n}\n.decision-box {\n  display: grid;\n  gap: 8px;\n  padding: 14px;\n  border-radius: 14px;\n  background: #f7f9ff;\n  margin-top: 16px;\n}\n.decision-box span {\n  color: var(--db-blue);\n  font-size: 13px;\n  font-weight: 700;\n}\n.confidence {\n  display: flex;\n  justify-content: space-between;\n  margin: 18px 0 8px;\n  font-size: 13px;\n}\n@media (max-width: 1100px) {\n  .details-grid,\n  .meta-grid {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=step-details.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(StepDetailsComponent, { className: "StepDetailsComponent", filePath: "src/app/pages/step-details/step-details.component.ts", lineNumber: 12 });
})();
export {
  StepDetailsComponent
};
//# sourceMappingURL=chunk-WEOMCKWR.js.map
