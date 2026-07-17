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
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-SKRXBCOX.js";

// src/app/pages/dashboard/dashboard.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function DashboardComponent_For_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275text(1, "\u26A0\uFE0F ");
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const blocker_r1 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(blocker_r1);
  }
}
function DashboardComponent_For_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275element(1, "span", 30);
    \u0275\u0275elementStart(2, "div")(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const activity_r2 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(activity_r2.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", activity_r2.timestamp, " \xB7 ", activity_r2.actor);
  }
}
var DashboardComponent = class _DashboardComponent {
  stateService = inject(OnboardingStateService);
  state = this.stateService.caseState;
  summary = this.stateService.dashboardSummary;
  generateJourney() {
    this.stateService.generateJourney();
  }
  static \u0275fac = function DashboardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DashboardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["app-dashboard"]], decls: 69, vars: 11, consts: [[1, "page-head"], [1, "page-title"], [1, "page-subtitle"], [1, "btn", "btn-primary", 3, "click"], [1, "grid", "dashboard-grid"], [1, "card", "card-pad", "score-card"], [1, "donut"], [1, "donut-inner"], [1, "trend"], [1, "card", "card-pad", "progress-card"], [1, "step-text"], [1, "progress-track"], [1, "progress-fill"], [1, "legend"], [1, "green"], [1, "blue"], [1, "amber"], [1, "card", "card-pad", "blockers-card"], [1, "blocker"], ["routerLink", "/missing-info", 1, "link"], [1, "card", "card-pad", "next-card"], [1, "ai-label"], ["routerLink", "/step/3", 1, "btn", "btn-primary"], [1, "card", "card-pad", "recent-card"], [1, "activity-row"], ["routerLink", "/reports", 1, "link"], [1, "card", "card-pad", "task-card"], [1, "kpi-number"], [1, "kpi-label"], ["routerLink", "/tasks", 1, "btn"], [1, "dot"]], template: function DashboardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div")(2, "h1", 1);
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p", 2);
      \u0275\u0275text(5, "Here is your AI-generated onboarding progress and next best action.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "button", 3);
      \u0275\u0275listener("click", function DashboardComponent_Template_button_click_6_listener() {
        return ctx.generateJourney();
      });
      \u0275\u0275text(7, "Regenerate 10-Step Journey");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "div", 4)(9, "section", 5)(10, "h3");
      \u0275\u0275text(11, "Readiness Score");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "div", 6)(13, "div", 7)(14, "strong");
      \u0275\u0275text(15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "span");
      \u0275\u0275text(17, "Good Progress");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(18, "div", 8);
      \u0275\u0275text(19, "\u2191 12% vs last week");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "section", 9)(21, "h3");
      \u0275\u0275text(22, "10-Step Onboarding Progress");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "div", 10);
      \u0275\u0275text(24);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "div", 11);
      \u0275\u0275element(26, "div", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "div", 13)(28, "span");
      \u0275\u0275element(29, "b", 14);
      \u0275\u0275text(30);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "span");
      \u0275\u0275element(32, "b", 15);
      \u0275\u0275text(33);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "span");
      \u0275\u0275element(35, "b", 16);
      \u0275\u0275text(36);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(37, "section", 17)(38, "h3");
      \u0275\u0275text(39, "Top Blockers");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(40, DashboardComponent_For_41_Template, 4, 1, "div", 18, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementStart(42, "a", 19);
      \u0275\u0275text(43, "View all blockers");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(44, "section", 20)(45, "div", 21);
      \u0275\u0275text(46, "\u2726 AI Next Best Action");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "h3");
      \u0275\u0275text(48, "GitHub Access Approval");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(49, "p");
      \u0275\u0275text(50, "Assign access reviewer and complete manager approval to move readiness to 86%.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(51, "a", 22);
      \u0275\u0275text(52, "View Step Details");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(53, "section", 23)(54, "h3");
      \u0275\u0275text(55, "Recent Agent Activity");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(56, DashboardComponent_For_57_Template, 7, 3, "div", 24, _forTrack0);
      \u0275\u0275elementStart(58, "a", 25);
      \u0275\u0275text(59, "View all activity");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(60, "section", 26)(61, "h3");
      \u0275\u0275text(62, "Open Tasks");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(63, "div", 27);
      \u0275\u0275text(64);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(65, "div", 28);
      \u0275\u0275text(66, "Tasks need your attention");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(67, "a", 29);
      \u0275\u0275text(68, "View tasks");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("Good morning, ", ctx.state().profile.fullName.split(" ")[0], "! \u2600\uFE0F");
      \u0275\u0275advance(9);
      \u0275\u0275styleProp("background", "conic-gradient(var(--db-green) " + ctx.state().readiness.overall + "%, #e8edf7 0)");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("", ctx.state().readiness.overall, "%");
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate1("Step ", ctx.summary().completedSteps + ctx.summary().inProgressSteps, " of 10");
      \u0275\u0275advance(2);
      \u0275\u0275styleProp("width", ctx.state().readiness.teamOnboarding, "%");
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1("Completed (", ctx.summary().completedSteps, ")");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("In Progress (", ctx.summary().inProgressSteps, ")");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("Pending (", ctx.summary().pendingSteps, ")");
      \u0275\u0275advance(4);
      \u0275\u0275repeater(ctx.state().readiness.blockers);
      \u0275\u0275advance(16);
      \u0275\u0275repeater(ctx.state().agentActivity.slice(0, 4));
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.summary().openTasks);
    }
  }, dependencies: [RouterLink], styles: ["\n\n.page-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  margin-bottom: 22px;\n}\n.dashboard-grid[_ngcontent-%COMP%] {\n  grid-template-columns: 1.1fr 1.8fr 1.1fr;\n  align-items: stretch;\n}\n.card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 16px;\n}\n.donut[_ngcontent-%COMP%] {\n  width: 170px;\n  height: 170px;\n  border-radius: 50%;\n  display: grid;\n  place-items: center;\n  margin: 8px auto 14px;\n}\n.donut-inner[_ngcontent-%COMP%] {\n  width: 122px;\n  height: 122px;\n  background: #fff;\n  border-radius: 50%;\n  display: grid;\n  place-items: center;\n  text-align: center;\n}\n.donut-inner[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 36px;\n}\n.donut-inner[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  color: var(--db-muted);\n  font-size: 12px;\n}\n.trend[_ngcontent-%COMP%] {\n  color: var(--db-green);\n  font-weight: 800;\n  text-align: center;\n  font-size: 13px;\n}\n.step-text[_ngcontent-%COMP%] {\n  font-weight: 800;\n  font-size: 20px;\n  margin-bottom: 18px;\n}\n.legend[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  flex-wrap: wrap;\n  color: var(--db-muted);\n  font-size: 13px;\n  margin-top: 16px;\n}\n.legend[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  margin-right: 6px;\n}\n.green[_ngcontent-%COMP%] {\n  background: var(--db-green);\n}\n.blue[_ngcontent-%COMP%] {\n  background: var(--db-blue);\n}\n.amber[_ngcontent-%COMP%] {\n  background: var(--db-amber);\n}\n.blocker[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  padding: 12px;\n  border-radius: 12px;\n  background: var(--db-red-light);\n  margin-bottom: 10px;\n  font-size: 13px;\n}\n.link[_ngcontent-%COMP%] {\n  color: var(--db-blue);\n  font-weight: 800;\n  font-size: 13px;\n}\n.next-card[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #fff,\n      #f4f6ff);\n}\n.next-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--db-muted);\n  line-height: 1.5;\n}\n.recent-card[_ngcontent-%COMP%] {\n  grid-column: span 2;\n}\n.activity-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  margin: 14px 0;\n}\n.activity-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 3px 0 0;\n  color: var(--db-muted);\n  font-size: 12px;\n}\n.dot[_ngcontent-%COMP%] {\n  width: 10px;\n  height: 10px;\n  margin-top: 5px;\n  border-radius: 50%;\n  background: var(--db-green);\n}\n.task-card[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  margin-top: 18px;\n}\n@media (max-width: 1100px) {\n  .dashboard-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .recent-card[_ngcontent-%COMP%] {\n    grid-column: auto;\n  }\n}\n@media (max-width: 680px) {\n  .page-head[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n}\n/*# sourceMappingURL=dashboard.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardComponent, [{
    type: Component,
    args: [{ selector: "app-dashboard", standalone: true, imports: [RouterLink], template: `<div class="page-head">
  <div>
    <h1 class="page-title">Good morning, {{ state().profile.fullName.split(' ')[0] }}! \u2600\uFE0F</h1>
    <p class="page-subtitle">Here is your AI-generated onboarding progress and next best action.</p>
  </div>
  <button class="btn btn-primary" (click)="generateJourney()">Regenerate 10-Step Journey</button>
</div>

<div class="grid dashboard-grid">
  <section class="card card-pad score-card">
    <h3>Readiness Score</h3>
    <div class="donut" [style.background]="'conic-gradient(var(--db-green) ' + state().readiness.overall + '%, #e8edf7 0)'">
      <div class="donut-inner">
        <strong>{{ state().readiness.overall }}%</strong>
        <span>Good Progress</span>
      </div>
    </div>
    <div class="trend">\u2191 12% vs last week</div>
  </section>

  <section class="card card-pad progress-card">
    <h3>10-Step Onboarding Progress</h3>
    <div class="step-text">Step {{ summary().completedSteps + summary().inProgressSteps }} of 10</div>
    <div class="progress-track"><div class="progress-fill" [style.width.%]="state().readiness.teamOnboarding"></div></div>
    <div class="legend">
      <span><b class="green"></b>Completed ({{ summary().completedSteps }})</span>
      <span><b class="blue"></b>In Progress ({{ summary().inProgressSteps }})</span>
      <span><b class="amber"></b>Pending ({{ summary().pendingSteps }})</span>
    </div>
  </section>

  <section class="card card-pad blockers-card">
    <h3>Top Blockers</h3>
    @for (blocker of state().readiness.blockers; track blocker) {
      <div class="blocker">\u26A0\uFE0F <span>{{ blocker }}</span></div>
    }
    <a routerLink="/missing-info" class="link">View all blockers</a>
  </section>

  <section class="card card-pad next-card">
    <div class="ai-label">\u2726 AI Next Best Action</div>
    <h3>GitHub Access Approval</h3>
    <p>Assign access reviewer and complete manager approval to move readiness to 86%.</p>
    <a routerLink="/step/3" class="btn btn-primary">View Step Details</a>
  </section>

  <section class="card card-pad recent-card">
    <h3>Recent Agent Activity</h3>
    @for (activity of state().agentActivity.slice(0, 4); track activity.id) {
      <div class="activity-row">
        <span class="dot"></span>
        <div>
          <strong>{{ activity.title }}</strong>
          <p>{{ activity.timestamp }} \xB7 {{ activity.actor }}</p>
        </div>
      </div>
    }
    <a routerLink="/reports" class="link">View all activity</a>
  </section>

  <section class="card card-pad task-card">
    <h3>Open Tasks</h3>
    <div class="kpi-number">{{ summary().openTasks }}</div>
    <div class="kpi-label">Tasks need your attention</div>
    <a routerLink="/tasks" class="btn">View tasks</a>
  </section>
</div>
`, styles: ["/* src/app/pages/dashboard/dashboard.component.scss */\n.page-head {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  margin-bottom: 22px;\n}\n.dashboard-grid {\n  grid-template-columns: 1.1fr 1.8fr 1.1fr;\n  align-items: stretch;\n}\n.card h3 {\n  margin: 0 0 16px;\n}\n.donut {\n  width: 170px;\n  height: 170px;\n  border-radius: 50%;\n  display: grid;\n  place-items: center;\n  margin: 8px auto 14px;\n}\n.donut-inner {\n  width: 122px;\n  height: 122px;\n  background: #fff;\n  border-radius: 50%;\n  display: grid;\n  place-items: center;\n  text-align: center;\n}\n.donut-inner strong {\n  font-size: 36px;\n}\n.donut-inner span {\n  display: block;\n  color: var(--db-muted);\n  font-size: 12px;\n}\n.trend {\n  color: var(--db-green);\n  font-weight: 800;\n  text-align: center;\n  font-size: 13px;\n}\n.step-text {\n  font-weight: 800;\n  font-size: 20px;\n  margin-bottom: 18px;\n}\n.legend {\n  display: flex;\n  gap: 16px;\n  flex-wrap: wrap;\n  color: var(--db-muted);\n  font-size: 13px;\n  margin-top: 16px;\n}\n.legend b {\n  display: inline-block;\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  margin-right: 6px;\n}\n.green {\n  background: var(--db-green);\n}\n.blue {\n  background: var(--db-blue);\n}\n.amber {\n  background: var(--db-amber);\n}\n.blocker {\n  display: flex;\n  gap: 10px;\n  padding: 12px;\n  border-radius: 12px;\n  background: var(--db-red-light);\n  margin-bottom: 10px;\n  font-size: 13px;\n}\n.link {\n  color: var(--db-blue);\n  font-weight: 800;\n  font-size: 13px;\n}\n.next-card {\n  background:\n    linear-gradient(\n      135deg,\n      #fff,\n      #f4f6ff);\n}\n.next-card p {\n  color: var(--db-muted);\n  line-height: 1.5;\n}\n.recent-card {\n  grid-column: span 2;\n}\n.activity-row {\n  display: flex;\n  gap: 12px;\n  margin: 14px 0;\n}\n.activity-row p {\n  margin: 3px 0 0;\n  color: var(--db-muted);\n  font-size: 12px;\n}\n.dot {\n  width: 10px;\n  height: 10px;\n  margin-top: 5px;\n  border-radius: 50%;\n  background: var(--db-green);\n}\n.task-card .btn {\n  display: inline-flex;\n  margin-top: 18px;\n}\n@media (max-width: 1100px) {\n  .dashboard-grid {\n    grid-template-columns: 1fr;\n  }\n  .recent-card {\n    grid-column: auto;\n  }\n}\n@media (max-width: 680px) {\n  .page-head {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n}\n/*# sourceMappingURL=dashboard.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "src/app/pages/dashboard/dashboard.component.ts", lineNumber: 12 });
})();
export {
  DashboardComponent
};
//# sourceMappingURL=chunk-5L3A7BIU.js.map
