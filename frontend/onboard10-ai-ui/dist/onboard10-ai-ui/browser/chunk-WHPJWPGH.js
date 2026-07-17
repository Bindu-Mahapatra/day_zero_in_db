import {
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵtext
} from "./chunk-SKRXBCOX.js";

// src/app/pages/help-support/help-support.component.ts
var HelpSupportComponent = class _HelpSupportComponent {
  static \u0275fac = function HelpSupportComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HelpSupportComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HelpSupportComponent, selectors: [["app-help-support"]], decls: 22, vars: 0, consts: [[1, "page-title"], [1, "page-subtitle"], [1, "grid", "grid-3", "cards"], [1, "card", "card-pad"], [1, "btn", "btn-primary"]], template: function HelpSupportComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "h1", 0);
      \u0275\u0275text(1, "Help & Support");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(2, "p", 1);
      \u0275\u0275text(3, "Mock help center for onboarding topics.");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(4, "div", 2)(5, "section", 3)(6, "h3");
      \u0275\u0275text(7, "Onboarding Process");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(8, "p");
      \u0275\u0275text(9, "Learn about the 10-step onboarding journey.");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(10, "section", 3)(11, "h3");
      \u0275\u0275text(12, "Access Requests");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(13, "p");
      \u0275\u0275text(14, "How to request and manage access.");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(15, "section", 3)(16, "h3");
      \u0275\u0275text(17, "Trainings & Certification");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(18, "p");
      \u0275\u0275text(19, "Find and complete required trainings.");
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(20, "button", 4);
      \u0275\u0275text(21, "Contact Support");
      \u0275\u0275domElementEnd();
    }
  }, styles: ["\n\n.cards[_ngcontent-%COMP%] {\n  margin: 22px 0;\n}\np[_ngcontent-%COMP%] {\n  color: var(--db-muted);\n}\n/*# sourceMappingURL=help-support.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HelpSupportComponent, [{
    type: Component,
    args: [{ selector: "app-help-support", standalone: true, imports: [], template: '<h1 class="page-title">Help & Support</h1>\n<p class="page-subtitle">Mock help center for onboarding topics.</p>\n\n<div class="grid grid-3 cards">\n  <section class="card card-pad"><h3>Onboarding Process</h3><p>Learn about the 10-step onboarding journey.</p></section>\n  <section class="card card-pad"><h3>Access Requests</h3><p>How to request and manage access.</p></section>\n  <section class="card card-pad"><h3>Trainings & Certification</h3><p>Find and complete required trainings.</p></section>\n</div>\n<button class="btn btn-primary">Contact Support</button>\n', styles: ["/* src/app/pages/help-support/help-support.component.scss */\n.cards {\n  margin: 22px 0;\n}\np {\n  color: var(--db-muted);\n}\n/*# sourceMappingURL=help-support.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HelpSupportComponent, { className: "HelpSupportComponent", filePath: "src/app/pages/help-support/help-support.component.ts", lineNumber: 10 });
})();
export {
  HelpSupportComponent
};
//# sourceMappingURL=chunk-WHPJWPGH.js.map
