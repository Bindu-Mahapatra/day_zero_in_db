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
  ɵɵdomListener,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-SKRXBCOX.js";

// src/app/pages/profile-analysis/profile-analysis.component.ts
var _forTrack0 = ($index, $item) => $item.label;
var _forTrack1 = ($index, $item) => $item.id;
function ProfileAnalysisComponent_For_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 13)(1, "div")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "small");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(6, "span");
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "em");
    \u0275\u0275text(9);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const field_r1 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(field_r1.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(field_r1.source);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(field_r1.value);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", field_r1.confidence, "%");
  }
}
function ProfileAnalysisComponent_For_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 18)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "div")(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(8, "span", 19);
    \u0275\u0275text(9);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    \u0275\u0275classProp("resolved", item_r2.resolved);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.resolved ? "\u2705" : "\u26A0\uFE0F");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r2.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.description);
    \u0275\u0275advance();
    \u0275\u0275classProp("risk-high", item_r2.severity === "High")("risk-medium", item_r2.severity === "Medium")("risk-low", item_r2.severity === "Low");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r2.severity);
  }
}
var ProfileAnalysisComponent = class _ProfileAnalysisComponent {
  stateService = inject(OnboardingStateService);
  state = this.stateService.caseState;
  analyseProfile() {
    this.stateService.analyseProfile();
  }
  static \u0275fac = function ProfileAnalysisComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProfileAnalysisComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProfileAnalysisComponent, selectors: [["app-profile-analysis"]], decls: 53, vars: 1, consts: [[1, "page-head"], [1, "page-title"], [1, "page-subtitle"], [1, "btn", "btn-primary", 3, "click"], [1, "grid", "grid-2"], [1, "card", "card-pad", "upload-card"], [1, "drop-zone"], [1, "upload-icon"], [1, "btn"], [1, "card", "card-pad"], [1, "section-title"], [1, "status-badge", "status-completed"], [1, "field-list"], [1, "field-row"], [1, "card", "card-pad", "missing-card"], [1, "missing-row", 3, "resolved"], [1, "ai-card"], [1, "ai-label"], [1, "missing-row"], [1, "risk-badge"]], template: function ProfileAnalysisComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "div")(2, "h1", 1);
      \u0275\u0275text(3, "Joiner Profile Analysis");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(4, "p", 2);
      \u0275\u0275text(5, "AI extracts and validates onboarding information from joiner documents.");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(6, "button", 3);
      \u0275\u0275domListener("click", function ProfileAnalysisComponent_Template_button_click_6_listener() {
        return ctx.analyseProfile();
      });
      \u0275\u0275text(7, "Analyse Profile");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(8, "div", 4)(9, "section", 5)(10, "h3");
      \u0275\u0275text(11, "Upload Joiner Document");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(12, "p");
      \u0275\u0275text(13, "Upload offer letter, HR profile, PDF, DOCX or onboarding form.");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(14, "div", 6)(15, "div", 7);
      \u0275\u0275text(16, "\u21E7");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(17, "strong");
      \u0275\u0275text(18, "Drag & drop files here");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(19, "span");
      \u0275\u0275text(20, "or");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(21, "button", 8);
      \u0275\u0275text(22, "Browse Files");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(23, "small");
      \u0275\u0275text(24, "Supports: PDF, DOCX, XLSX, JPG, PNG \xB7 Max size: 10MB");
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(25, "section", 9)(26, "div", 10)(27, "h3");
      \u0275\u0275text(28, "Extracted Profile");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(29, "span", 11);
      \u0275\u0275text(30);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(31, "div", 12);
      \u0275\u0275repeaterCreate(32, ProfileAnalysisComponent_For_33_Template, 10, 4, "div", 13, _forTrack0);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(34, "section", 14)(35, "h3");
      \u0275\u0275text(36, "Missing Information");
      \u0275\u0275domElementEnd();
      \u0275\u0275repeaterCreate(37, ProfileAnalysisComponent_For_38_Template, 10, 12, "div", 15, _forTrack1);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(39, "section", 16)(40, "div", 17);
      \u0275\u0275text(41, "\u2726 AI Insight");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(42, "h3");
      \u0275\u0275text(43, "Developer onboarding path recommended");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(44, "p");
      \u0275\u0275text(45, "Based on the profile, I recommend a developer onboarding path. Production access is not part of the baseline role and requires elevated approval.");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(46, "ul")(47, "li");
      \u0275\u0275text(48, "Role: Developer");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(49, "li");
      \u0275\u0275text(50, "Location: Pune");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(51, "li");
      \u0275\u0275text(52, "Risk control: Human approval for privileged access");
      \u0275\u0275domElementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(30);
      \u0275\u0275textInterpolate1("Confidence: ", ctx.state().profileConfidence, "%");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.state().extractedFields);
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.state().missingInformation);
    }
  }, styles: ["\n\n.page-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 22px;\n}\nh3[_ngcontent-%COMP%] {\n  margin: 0 0 10px;\n}\np[_ngcontent-%COMP%] {\n  color: var(--db-muted);\n}\n.drop-zone[_ngcontent-%COMP%] {\n  min-height: 300px;\n  display: grid;\n  place-items: center;\n  text-align: center;\n  border: 2px dashed #cfd8ea;\n  border-radius: 18px;\n  padding: 30px;\n  color: var(--db-muted);\n}\n.upload-icon[_ngcontent-%COMP%] {\n  font-size: 38px;\n  color: var(--db-blue);\n}\n.drop-zone[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--db-text);\n}\n.drop-zone[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n}\n.section-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  margin-bottom: 12px;\n}\n.field-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr 56px;\n  gap: 12px;\n  align-items: center;\n  padding: 12px 0;\n  border-bottom: 1px solid #edf1f7;\n}\n.field-row[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  color: var(--db-muted);\n  font-size: 11px;\n  margin-top: 3px;\n}\n.field-row[_ngcontent-%COMP%]   em[_ngcontent-%COMP%] {\n  color: var(--db-green);\n  font-style: normal;\n  font-weight: 800;\n}\n.missing-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 24px 1fr auto;\n  gap: 12px;\n  align-items: center;\n  padding: 14px;\n  border-radius: 14px;\n  background: #fff7f8;\n  margin: 10px 0;\n}\n.missing-row.resolved[_ngcontent-%COMP%] {\n  background: var(--db-green-light);\n}\n.missing-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  font-size: 13px;\n}\n.ai-card[_ngcontent-%COMP%] {\n  min-height: 100%;\n}\n.ai-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  line-height: 1.6;\n}\n.ai-card[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin: 8px 0;\n}\n/*# sourceMappingURL=profile-analysis.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProfileAnalysisComponent, [{
    type: Component,
    args: [{ selector: "app-profile-analysis", standalone: true, imports: [], template: `<div class="page-head">
  <div>
    <h1 class="page-title">Joiner Profile Analysis</h1>
    <p class="page-subtitle">AI extracts and validates onboarding information from joiner documents.</p>
  </div>
  <button class="btn btn-primary" (click)="analyseProfile()">Analyse Profile</button>
</div>

<div class="grid grid-2">
  <section class="card card-pad upload-card">
    <h3>Upload Joiner Document</h3>
    <p>Upload offer letter, HR profile, PDF, DOCX or onboarding form.</p>
    <div class="drop-zone">
      <div class="upload-icon">\u21E7</div>
      <strong>Drag & drop files here</strong>
      <span>or</span>
      <button class="btn">Browse Files</button>
      <small>Supports: PDF, DOCX, XLSX, JPG, PNG \xB7 Max size: 10MB</small>
    </div>
  </section>

  <section class="card card-pad">
    <div class="section-title">
      <h3>Extracted Profile</h3>
      <span class="status-badge status-completed">Confidence: {{ state().profileConfidence }}%</span>
    </div>
    <div class="field-list">
      @for (field of state().extractedFields; track field.label) {
        <div class="field-row">
          <div>
            <strong>{{ field.label }}</strong>
            <small>{{ field.source }}</small>
          </div>
          <span>{{ field.value }}</span>
          <em>{{ field.confidence }}%</em>
        </div>
      }
    </div>
  </section>

  <section class="card card-pad missing-card">
    <h3>Missing Information</h3>
    @for (item of state().missingInformation; track item.id) {
      <div class="missing-row" [class.resolved]="item.resolved">
        <span>{{ item.resolved ? '\u2705' : '\u26A0\uFE0F' }}</span>
        <div>
          <strong>{{ item.title }}</strong>
          <p>{{ item.description }}</p>
        </div>
        <span class="risk-badge" [class.risk-high]="item.severity === 'High'" [class.risk-medium]="item.severity === 'Medium'" [class.risk-low]="item.severity === 'Low'">{{ item.severity }}</span>
      </div>
    }
  </section>

  <section class="ai-card">
    <div class="ai-label">\u2726 AI Insight</div>
    <h3>Developer onboarding path recommended</h3>
    <p>Based on the profile, I recommend a developer onboarding path. Production access is not part of the baseline role and requires elevated approval.</p>
    <ul>
      <li>Role: Developer</li>
      <li>Location: Pune</li>
      <li>Risk control: Human approval for privileged access</li>
    </ul>
  </section>
</div>
`, styles: ["/* src/app/pages/profile-analysis/profile-analysis.component.scss */\n.page-head {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 22px;\n}\nh3 {\n  margin: 0 0 10px;\n}\np {\n  color: var(--db-muted);\n}\n.drop-zone {\n  min-height: 300px;\n  display: grid;\n  place-items: center;\n  text-align: center;\n  border: 2px dashed #cfd8ea;\n  border-radius: 18px;\n  padding: 30px;\n  color: var(--db-muted);\n}\n.upload-icon {\n  font-size: 38px;\n  color: var(--db-blue);\n}\n.drop-zone strong {\n  color: var(--db-text);\n}\n.drop-zone small {\n  display: block;\n  font-size: 12px;\n}\n.section-title {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  margin-bottom: 12px;\n}\n.field-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr 56px;\n  gap: 12px;\n  align-items: center;\n  padding: 12px 0;\n  border-bottom: 1px solid #edf1f7;\n}\n.field-row small {\n  display: block;\n  color: var(--db-muted);\n  font-size: 11px;\n  margin-top: 3px;\n}\n.field-row em {\n  color: var(--db-green);\n  font-style: normal;\n  font-weight: 800;\n}\n.missing-row {\n  display: grid;\n  grid-template-columns: 24px 1fr auto;\n  gap: 12px;\n  align-items: center;\n  padding: 14px;\n  border-radius: 14px;\n  background: #fff7f8;\n  margin: 10px 0;\n}\n.missing-row.resolved {\n  background: var(--db-green-light);\n}\n.missing-row p {\n  margin: 4px 0 0;\n  font-size: 13px;\n}\n.ai-card {\n  min-height: 100%;\n}\n.ai-card p {\n  line-height: 1.6;\n}\n.ai-card li {\n  margin: 8px 0;\n}\n/*# sourceMappingURL=profile-analysis.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProfileAnalysisComponent, { className: "ProfileAnalysisComponent", filePath: "src/app/pages/profile-analysis/profile-analysis.component.ts", lineNumber: 11 });
})();
export {
  ProfileAnalysisComponent
};
//# sourceMappingURL=chunk-5NVGF7HX.js.map
