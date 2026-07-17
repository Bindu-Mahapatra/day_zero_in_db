import {
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵtext
} from "./chunk-SKRXBCOX.js";

// src/app/pages/settings/settings.component.ts
var SettingsComponent = class _SettingsComponent {
  static \u0275fac = function SettingsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SettingsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SettingsComponent, selectors: [["app-settings"]], decls: 21, vars: 0, consts: [[1, "page-title"], [1, "page-subtitle"], [1, "card", "card-pad", "settings-grid"], ["type", "checkbox", "checked", ""], [1, "btn", "btn-primary"]], template: function SettingsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "h1", 0);
      \u0275\u0275text(1, "Settings / Notifications");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(2, "p", 1);
      \u0275\u0275text(3, "Mock settings page for notification preferences.");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(4, "section", 2)(5, "h3");
      \u0275\u0275text(6, "Email Notifications");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(7, "label");
      \u0275\u0275domElement(8, "input", 3);
      \u0275\u0275text(9, " Task assignments");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(10, "label");
      \u0275\u0275domElement(11, "input", 3);
      \u0275\u0275text(12, " Approvals & requests");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(13, "label");
      \u0275\u0275domElement(14, "input", 3);
      \u0275\u0275text(15, " Training reminders");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(16, "label");
      \u0275\u0275domElement(17, "input", 3);
      \u0275\u0275text(18, " Policy updates");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(19, "button", 4);
      \u0275\u0275text(20, "Save Changes");
      \u0275\u0275domElementEnd()();
    }
  }, styles: ["\n\n.settings-grid[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 16px;\n  max-width: 560px;\n  margin-top: 22px;\n}\nlabel[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  align-items: center;\n}\n/*# sourceMappingURL=settings.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SettingsComponent, [{
    type: Component,
    args: [{ selector: "app-settings", standalone: true, imports: [], template: '<h1 class="page-title">Settings / Notifications</h1>\n<p class="page-subtitle">Mock settings page for notification preferences.</p>\n\n<section class="card card-pad settings-grid">\n  <h3>Email Notifications</h3>\n  <label><input type="checkbox" checked /> Task assignments</label>\n  <label><input type="checkbox" checked /> Approvals & requests</label>\n  <label><input type="checkbox" checked /> Training reminders</label>\n  <label><input type="checkbox" checked /> Policy updates</label>\n  <button class="btn btn-primary">Save Changes</button>\n</section>\n', styles: ["/* src/app/pages/settings/settings.component.scss */\n.settings-grid {\n  display: grid;\n  gap: 16px;\n  max-width: 560px;\n  margin-top: 22px;\n}\nlabel {\n  display: flex;\n  gap: 10px;\n  align-items: center;\n}\n/*# sourceMappingURL=settings.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SettingsComponent, { className: "SettingsComponent", filePath: "src/app/pages/settings/settings.component.ts", lineNumber: 10 });
})();
export {
  SettingsComponent
};
//# sourceMappingURL=chunk-TYSJ3XS6.js.map
