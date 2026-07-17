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
  ɵɵdomElement,
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
  ɵɵtextInterpolate
} from "./chunk-SKRXBCOX.js";

// src/app/pages/manager-view/manager-view.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function ManagerViewComponent_For_48_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "tr")(1, "td")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElement(4, "br");
    \u0275\u0275domElementStart(5, "small");
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(9, "td")(10, "span", 13);
    \u0275\u0275text(11);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(12, "td");
    \u0275\u0275text(13);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(14, "td")(15, "button", 14);
    \u0275\u0275domListener("click", function ManagerViewComponent_For_48_Conditional_0_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r1);
      const request_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.approve(request_r2.id));
    });
    \u0275\u0275text(16, "Approve");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(17, "button", 15);
    \u0275\u0275domListener("click", function ManagerViewComponent_For_48_Conditional_0_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r1);
      const request_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.requestInfo(request_r2.id));
    });
    \u0275\u0275text(18, "Request Info");
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const request_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(request_r2.system);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(request_r2.accessType);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(request_r2.requestedBy);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("risk-high", request_r2.riskLevel === "High")("risk-medium", request_r2.riskLevel === "Medium")("risk-low", request_r2.riskLevel === "Low");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(request_r2.riskLevel);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(request_r2.recommendedAction);
  }
}
function ManagerViewComponent_For_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ManagerViewComponent_For_48_Conditional_0_Template, 19, 11, "tr");
  }
  if (rf & 2) {
    const request_r2 = ctx.$implicit;
    \u0275\u0275conditional(request_r2.status !== "Approved" ? 0 : -1);
  }
}
var ManagerViewComponent = class _ManagerViewComponent {
  stateService = inject(OnboardingStateService);
  state = this.stateService.caseState;
  approve(requestId) {
    this.stateService.approveAccess(requestId);
  }
  requestInfo(requestId) {
    this.stateService.requestMoreInfo(requestId);
  }
  static \u0275fac = function ManagerViewComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ManagerViewComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ManagerViewComponent, selectors: [["app-manager-view"]], decls: 65, vars: 0, consts: [[1, "page-head"], [1, "page-title"], [1, "page-subtitle"], [1, "btn"], [1, "grid", "grid-4", "kpis"], [1, "card", "card-pad"], [1, "kpi-number"], [1, "kpi-label"], [1, "grid", "manager-grid"], [1, "card", "card-pad", "approvals"], [1, "table"], [1, "ai-card"], [1, "ai-label"], [1, "risk-badge"], [1, "btn", "btn-success", 3, "click"], [1, "btn", 3, "click"]], template: function ManagerViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "div")(2, "h1", 1);
      \u0275\u0275text(3, "Manager Control Tower");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(4, "p", 2);
      \u0275\u0275text(5, "View team onboarding status, risk requests and AI recommendations.");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(6, "button", 3);
      \u0275\u0275text(7, "View All Team Members");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(8, "div", 4)(9, "section", 5)(10, "div", 6);
      \u0275\u0275text(11, "6");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(12, "div", 7);
      \u0275\u0275text(13, "Team members onboarding");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(14, "section", 5)(15, "div", 6);
      \u0275\u0275text(16, "68%");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(17, "div", 7);
      \u0275\u0275text(18, "Average readiness");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(19, "section", 5)(20, "div", 6);
      \u0275\u0275text(21, "4");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(22, "div", 7);
      \u0275\u0275text(23, "Pending approvals");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(24, "section", 5)(25, "div", 6);
      \u0275\u0275text(26, "2");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(27, "div", 7);
      \u0275\u0275text(28, "High-risk requests");
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(29, "div", 8)(30, "section", 9)(31, "h3");
      \u0275\u0275text(32, "Pending Approvals");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(33, "table", 10)(34, "thead")(35, "tr")(36, "th");
      \u0275\u0275text(37, "Request");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(38, "th");
      \u0275\u0275text(39, "Requested By");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(40, "th");
      \u0275\u0275text(41, "Risk");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(42, "th");
      \u0275\u0275text(43, "AI Action");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(44, "th");
      \u0275\u0275text(45, "Action");
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(46, "tbody");
      \u0275\u0275repeaterCreate(47, ManagerViewComponent_For_48_Template, 1, 1, null, null, _forTrack0);
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(49, "section", 11)(50, "div", 12);
      \u0275\u0275text(51, "\u2726 Responsible AI Guardrails");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(52, "h3");
      \u0275\u0275text(53, "High-risk access requires human control");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(54, "p");
      \u0275\u0275text(55, "Production Kubernetes admin access is outside the developer baseline. AI recommends requesting more information before approval.");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(56, "ul")(57, "li");
      \u0275\u0275text(58, "No privileged access is auto-provisioned");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(59, "li");
      \u0275\u0275text(60, "Policy evidence attached to every recommendation");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(61, "li");
      \u0275\u0275text(62, "Manager remains accountable for final decision");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(63, "li");
      \u0275\u0275text(64, "All decisions are captured in the audit trail");
      \u0275\u0275domElementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(47);
      \u0275\u0275repeater(ctx.state().accessRequests);
    }
  }, styles: ["\n\n.page-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 22px;\n}\n.kpis[_ngcontent-%COMP%] {\n  margin-bottom: 18px;\n}\n.manager-grid[_ngcontent-%COMP%] {\n  grid-template-columns: 1.7fr 1fr;\n}\n.approvals[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\ntd[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: var(--db-muted);\n}\ntd[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  padding: 7px 10px;\n  margin: 2px;\n  font-size: 12px;\n}\n.ai-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--db-muted);\n  line-height: 1.6;\n}\n.ai-card[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin: 12px 0;\n}\n@media (max-width: 1100px) {\n  .manager-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=manager-view.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ManagerViewComponent, [{
    type: Component,
    args: [{ selector: "app-manager-view", standalone: true, imports: [], template: `<div class="page-head">
  <div>
    <h1 class="page-title">Manager Control Tower</h1>
    <p class="page-subtitle">View team onboarding status, risk requests and AI recommendations.</p>
  </div>
  <button class="btn">View All Team Members</button>
</div>

<div class="grid grid-4 kpis">
  <section class="card card-pad"><div class="kpi-number">6</div><div class="kpi-label">Team members onboarding</div></section>
  <section class="card card-pad"><div class="kpi-number">68%</div><div class="kpi-label">Average readiness</div></section>
  <section class="card card-pad"><div class="kpi-number">4</div><div class="kpi-label">Pending approvals</div></section>
  <section class="card card-pad"><div class="kpi-number">2</div><div class="kpi-label">High-risk requests</div></section>
</div>

<div class="grid manager-grid">
  <section class="card card-pad approvals">
    <h3>Pending Approvals</h3>
    <table class="table">
      <thead>
        <tr>
          <th>Request</th><th>Requested By</th><th>Risk</th><th>AI Action</th><th>Action</th>
        </tr>
      </thead>
      <tbody>
        @for (request of state().accessRequests; track request.id) {
          @if (request.status !== 'Approved') {
            <tr>
              <td><strong>{{ request.system }}</strong><br><small>{{ request.accessType }}</small></td>
              <td>{{ request.requestedBy }}</td>
              <td><span class="risk-badge" [class.risk-high]="request.riskLevel === 'High'" [class.risk-medium]="request.riskLevel === 'Medium'" [class.risk-low]="request.riskLevel === 'Low'">{{ request.riskLevel }}</span></td>
              <td>{{ request.recommendedAction }}</td>
              <td>
                <button class="btn btn-success" (click)="approve(request.id)">Approve</button>
                <button class="btn" (click)="requestInfo(request.id)">Request Info</button>
              </td>
            </tr>
          }
        }
      </tbody>
    </table>
  </section>

  <section class="ai-card">
    <div class="ai-label">\u2726 Responsible AI Guardrails</div>
    <h3>High-risk access requires human control</h3>
    <p>Production Kubernetes admin access is outside the developer baseline. AI recommends requesting more information before approval.</p>
    <ul>
      <li>No privileged access is auto-provisioned</li>
      <li>Policy evidence attached to every recommendation</li>
      <li>Manager remains accountable for final decision</li>
      <li>All decisions are captured in the audit trail</li>
    </ul>
  </section>
</div>
`, styles: ["/* src/app/pages/manager-view/manager-view.component.scss */\n.page-head {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 22px;\n}\n.kpis {\n  margin-bottom: 18px;\n}\n.manager-grid {\n  grid-template-columns: 1.7fr 1fr;\n}\n.approvals {\n  overflow-x: auto;\n}\ntd small {\n  color: var(--db-muted);\n}\ntd .btn {\n  padding: 7px 10px;\n  margin: 2px;\n  font-size: 12px;\n}\n.ai-card p {\n  color: var(--db-muted);\n  line-height: 1.6;\n}\n.ai-card li {\n  margin: 12px 0;\n}\n@media (max-width: 1100px) {\n  .manager-grid {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=manager-view.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ManagerViewComponent, { className: "ManagerViewComponent", filePath: "src/app/pages/manager-view/manager-view.component.ts", lineNumber: 11 });
})();
export {
  ManagerViewComponent
};
//# sourceMappingURL=chunk-QVGSAENV.js.map
