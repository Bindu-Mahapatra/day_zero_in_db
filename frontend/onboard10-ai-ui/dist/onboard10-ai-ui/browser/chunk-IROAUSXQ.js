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
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-SKRXBCOX.js";

// src/app/pages/access-requests/access-requests.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function AccessRequestsComponent_For_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "tr")(1, "td")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(4, "td");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "td")(7, "span", 6);
    \u0275\u0275text(8);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(9, "td")(10, "span", 7);
    \u0275\u0275text(11);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(12, "td");
    \u0275\u0275text(13);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(14, "td");
    \u0275\u0275text(15);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const request_r1 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(request_r1.system);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(request_r1.accessType);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("risk-high", request_r1.riskLevel === "High")("risk-medium", request_r1.riskLevel === "Medium")("risk-low", request_r1.riskLevel === "Low");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(request_r1.riskLevel);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("status-approved", request_r1.status === "Approved")("status-in-progress", request_r1.status === "In Progress")("status-pending", request_r1.status === "Pending" || request_r1.status === "Needs Info")("status-rejected", request_r1.status === "Rejected");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(request_r1.status);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(request_r1.requestedOn);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(request_r1.recommendedAction);
  }
}
var AccessRequestsComponent = class _AccessRequestsComponent {
  stateService = inject(OnboardingStateService);
  state = this.stateService.caseState;
  static \u0275fac = function AccessRequestsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AccessRequestsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AccessRequestsComponent, selectors: [["app-access-requests"]], decls: 27, vars: 0, consts: [[1, "page-head"], [1, "page-title"], [1, "page-subtitle"], [1, "btn", "btn-primary"], [1, "card", "card-pad"], [1, "table"], [1, "risk-badge"], [1, "status-badge"]], template: function AccessRequestsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "div")(2, "h1", 1);
      \u0275\u0275text(3, "Access Requests");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(4, "p", 2);
      \u0275\u0275text(5, "Track access needs, risk and approval status.");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(6, "button", 3);
      \u0275\u0275text(7, "Request New Access");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(8, "section", 4)(9, "table", 5)(10, "thead")(11, "tr")(12, "th");
      \u0275\u0275text(13, "System");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(14, "th");
      \u0275\u0275text(15, "Access Type");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(16, "th");
      \u0275\u0275text(17, "Risk");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(18, "th");
      \u0275\u0275text(19, "Status");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(20, "th");
      \u0275\u0275text(21, "Requested On");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(22, "th");
      \u0275\u0275text(23, "AI Recommendation");
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(24, "tbody");
      \u0275\u0275repeaterCreate(25, AccessRequestsComponent_For_26_Template, 16, 20, "tr", null, _forTrack0);
      \u0275\u0275domElementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(25);
      \u0275\u0275repeater(ctx.state().accessRequests);
    }
  }, styles: ["\n\n.page-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 22px;\n}\n.card[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n/*# sourceMappingURL=access-requests.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AccessRequestsComponent, [{
    type: Component,
    args: [{ selector: "app-access-requests", standalone: true, imports: [], template: `<div class="page-head">
  <div>
    <h1 class="page-title">Access Requests</h1>
    <p class="page-subtitle">Track access needs, risk and approval status.</p>
  </div>
  <button class="btn btn-primary">Request New Access</button>
</div>

<section class="card card-pad">
  <table class="table">
    <thead>
      <tr>
        <th>System</th>
        <th>Access Type</th>
        <th>Risk</th>
        <th>Status</th>
        <th>Requested On</th>
        <th>AI Recommendation</th>
      </tr>
    </thead>
    <tbody>
      @for (request of state().accessRequests; track request.id) {
        <tr>
          <td><strong>{{ request.system }}</strong></td>
          <td>{{ request.accessType }}</td>
          <td><span class="risk-badge" [class.risk-high]="request.riskLevel === 'High'" [class.risk-medium]="request.riskLevel === 'Medium'" [class.risk-low]="request.riskLevel === 'Low'">{{ request.riskLevel }}</span></td>
          <td><span class="status-badge" [class.status-approved]="request.status === 'Approved'" [class.status-in-progress]="request.status === 'In Progress'" [class.status-pending]="request.status === 'Pending' || request.status === 'Needs Info'" [class.status-rejected]="request.status === 'Rejected'">{{ request.status }}</span></td>
          <td>{{ request.requestedOn }}</td>
          <td>{{ request.recommendedAction }}</td>
        </tr>
      }
    </tbody>
  </table>
</section>
`, styles: ["/* src/app/pages/access-requests/access-requests.component.scss */\n.page-head {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 22px;\n}\n.card {\n  overflow-x: auto;\n}\n/*# sourceMappingURL=access-requests.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AccessRequestsComponent, { className: "AccessRequestsComponent", filePath: "src/app/pages/access-requests/access-requests.component.ts", lineNumber: 11 });
})();
export {
  AccessRequestsComponent
};
//# sourceMappingURL=chunk-IROAUSXQ.js.map
