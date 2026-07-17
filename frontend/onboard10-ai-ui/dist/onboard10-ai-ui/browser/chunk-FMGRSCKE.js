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
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomProperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate2
} from "./chunk-SKRXBCOX.js";

// src/app/pages/tasks/tasks.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function TasksComponent_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 4);
    \u0275\u0275domElement(1, "input", 5);
    \u0275\u0275domElementStart(2, "div")(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(7, "span", 6);
    \u0275\u0275text(8);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const task_r1 = ctx.$implicit;
    \u0275\u0275classProp("done", task_r1.completed);
    \u0275\u0275advance();
    \u0275\u0275domProperty("checked", task_r1.completed);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(task_r1.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("Assigned to ", task_r1.assignedTo, " \xB7 Due ", task_r1.dueDate);
    \u0275\u0275advance();
    \u0275\u0275classProp("risk-high", task_r1.priority === "High")("risk-medium", task_r1.priority === "Medium")("risk-low", task_r1.priority === "Low");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(task_r1.priority);
  }
}
var TasksComponent = class _TasksComponent {
  stateService = inject(OnboardingStateService);
  state = this.stateService.caseState;
  static \u0275fac = function TasksComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TasksComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TasksComponent, selectors: [["app-tasks"]], decls: 7, vars: 0, consts: [[1, "page-title"], [1, "page-subtitle"], [1, "card", "card-pad", "task-list"], [1, "task-row", 3, "done"], [1, "task-row"], ["type", "checkbox", "disabled", "", 3, "checked"], [1, "risk-badge"]], template: function TasksComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "h1", 0);
      \u0275\u0275text(1, "Action Center / Tasks");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(2, "p", 1);
      \u0275\u0275text(3, "Tasks assigned by the AI onboarding workflow.");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(4, "section", 2);
      \u0275\u0275repeaterCreate(5, TasksComponent_For_6_Template, 9, 13, "div", 3, _forTrack0);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.state().tasks);
    }
  }, styles: ["\n\n.task-list[_ngcontent-%COMP%] {\n  margin-top: 22px;\n}\n.task-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 28px 1fr auto;\n  align-items: center;\n  gap: 14px;\n  padding: 16px;\n  border: 1px solid var(--db-border);\n  border-radius: 16px;\n  margin-bottom: 12px;\n}\n.task-row.done[_ngcontent-%COMP%] {\n  opacity: 0.6;\n  background: var(--db-green-light);\n}\ninput[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n}\np[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  color: var(--db-muted);\n}\n/*# sourceMappingURL=tasks.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TasksComponent, [{
    type: Component,
    args: [{ selector: "app-tasks", standalone: true, imports: [], template: `<h1 class="page-title">Action Center / Tasks</h1>
<p class="page-subtitle">Tasks assigned by the AI onboarding workflow.</p>

<section class="card card-pad task-list">
  @for (task of state().tasks; track task.id) {
    <div class="task-row" [class.done]="task.completed">
      <input type="checkbox" [checked]="task.completed" disabled />
      <div>
        <strong>{{ task.title }}</strong>
        <p>Assigned to {{ task.assignedTo }} \xB7 Due {{ task.dueDate }}</p>
      </div>
      <span class="risk-badge" [class.risk-high]="task.priority === 'High'" [class.risk-medium]="task.priority === 'Medium'" [class.risk-low]="task.priority === 'Low'">{{ task.priority }}</span>
    </div>
  }
</section>
`, styles: ["/* src/app/pages/tasks/tasks.component.scss */\n.task-list {\n  margin-top: 22px;\n}\n.task-row {\n  display: grid;\n  grid-template-columns: 28px 1fr auto;\n  align-items: center;\n  gap: 14px;\n  padding: 16px;\n  border: 1px solid var(--db-border);\n  border-radius: 16px;\n  margin-bottom: 12px;\n}\n.task-row.done {\n  opacity: 0.6;\n  background: var(--db-green-light);\n}\ninput {\n  width: 18px;\n  height: 18px;\n}\np {\n  margin: 4px 0 0;\n  color: var(--db-muted);\n}\n/*# sourceMappingURL=tasks.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TasksComponent, { className: "TasksComponent", filePath: "src/app/pages/tasks/tasks.component.ts", lineNumber: 11 });
})();
export {
  TasksComponent
};
//# sourceMappingURL=chunk-FMGRSCKE.js.map
