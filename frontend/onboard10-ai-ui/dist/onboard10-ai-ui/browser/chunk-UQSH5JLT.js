import {
  Router,
  RouterLink
} from "./chunk-JW6SCZ3L.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-WIZ4GLPS.js";
import "./chunk-OWQBFOK4.js";
import {
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵtext,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-SKRXBCOX.js";

// src/app/pages/login/login.component.ts
var LoginComponent = class _LoginComponent {
  router;
  email = "john.smith@db.com";
  password = "demo";
  constructor(router) {
    this.router = router;
  }
  signIn() {
    this.router.navigateByUrl("/dashboard");
  }
  static \u0275fac = function LoginComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoginComponent)(\u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], decls: 37, vars: 2, consts: [[1, "login-page"], [1, "login-card", "card"], [1, "login-form"], [1, "brand-line"], [1, "welcome"], ["placeholder", "Enter your email", 1, "form-control", 3, "ngModelChange", "ngModel"], ["type", "password", "placeholder", "Enter your password", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "btn", "btn-primary", "sign-in", 3, "click"], [1, "quick-actions"], [1, "btn", 3, "click"], ["routerLink", "/manager", 1, "btn"], [1, "footer-note"], [1, "hero-panel"], [1, "hero-card", "floating", "one"], [1, "hero-card", "floating", "two"], [1, "hero-card", "floating", "three"], [1, "person"]], template: function LoginComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "section", 1)(2, "div", 2)(3, "div", 3);
      \u0275\u0275text(4, "Onboard10 ");
      \u0275\u0275elementStart(5, "span");
      \u0275\u0275text(6, "AI");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "h1");
      \u0275\u0275text(8, "AI-Powered 10-Step Onboarding Copilot");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "p");
      \u0275\u0275text(10, "Ten intelligent gates to day-one readiness.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "div", 4);
      \u0275\u0275text(12, "Welcome Back! \u{1F44B}");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "label");
      \u0275\u0275text(14, "Email address");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "input", 5);
      \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_15_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.email, $event) || (ctx.email = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "label");
      \u0275\u0275text(17, "Password");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "input", 6);
      \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_18_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.password, $event) || (ctx.password = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "button", 7);
      \u0275\u0275listener("click", function LoginComponent_Template_button_click_19_listener() {
        return ctx.signIn();
      });
      \u0275\u0275text(20, "Sign In");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "div", 8)(22, "button", 9);
      \u0275\u0275listener("click", function LoginComponent_Template_button_click_22_listener() {
        return ctx.signIn();
      });
      \u0275\u0275text(23, "Continue as Joiner");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "a", 10);
      \u0275\u0275text(25, "Continue as Manager");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(26, "div", 11);
      \u0275\u0275text(27, "Secure \xB7 Trusted \xB7 Deutsche Bank");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(28, "div", 12)(29, "div", 13);
      \u0275\u0275text(30, "\u{1F6E1}\uFE0F Policy-backed decisions");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "div", 14);
      \u0275\u0275text(32, "\u2705 Human approved access");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "div", 15);
      \u0275\u0275text(34, "\u{1F4C4} Audit-ready evidence");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "div", 16);
      \u0275\u0275text(36, "\u{1F468}\u200D\u{1F4BB}");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(15);
      \u0275\u0275twoWayProperty("ngModel", ctx.email);
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.password);
    }
  }, dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, RouterLink], styles: ['\n\n.login-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: grid;\n  place-items: center;\n  padding: 32px;\n  background:\n    radial-gradient(\n      circle at 15% 10%,\n      rgba(20, 60, 255, 0.16),\n      transparent 36%),\n    linear-gradient(\n      135deg,\n      #f7f9ff,\n      #eef3ff);\n}\n.login-card[_ngcontent-%COMP%] {\n  width: min(1120px, 100%);\n  display: grid;\n  grid-template-columns: 0.9fr 1.1fr;\n  min-height: 660px;\n  overflow: hidden;\n}\n.login-form[_ngcontent-%COMP%] {\n  padding: 64px;\n}\n.brand-line[_ngcontent-%COMP%] {\n  font-size: 32px;\n  font-weight: 900;\n}\n.brand-line[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: var(--db-blue);\n}\nh1[_ngcontent-%COMP%] {\n  font-size: 20px;\n  max-width: 340px;\n  margin: 12px 0 8px;\n}\np[_ngcontent-%COMP%] {\n  color: var(--db-muted);\n  margin-bottom: 38px;\n}\n.welcome[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 800;\n  margin-bottom: 20px;\n}\nlabel[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 13px;\n  font-weight: 700;\n  margin: 16px 0 8px;\n}\n.sign-in[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 24px;\n}\n.quick-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  margin-top: 18px;\n}\n.quick-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  flex: 1;\n  text-align: center;\n}\n.footer-note[_ngcontent-%COMP%] {\n  text-align: center;\n  color: var(--db-muted);\n  font-size: 12px;\n  margin-top: 36px;\n}\n.hero-panel[_ngcontent-%COMP%] {\n  position: relative;\n  background:\n    linear-gradient(\n      135deg,\n      #f0f3ff,\n      #ffffff);\n  display: grid;\n  place-items: center;\n  overflow: hidden;\n}\n.hero-panel[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  inset: 70px;\n  border-radius: 50%;\n  background: rgba(20, 60, 255, 0.08);\n}\n.person[_ngcontent-%COMP%] {\n  font-size: 170px;\n  z-index: 1;\n}\n.hero-card[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 2;\n  padding: 14px 18px;\n  border-radius: 18px;\n  background: #fff;\n  box-shadow: var(--shadow-soft);\n  font-weight: 800;\n  font-size: 14px;\n}\n.one[_ngcontent-%COMP%] {\n  top: 130px;\n  left: 95px;\n}\n.two[_ngcontent-%COMP%] {\n  top: 230px;\n  right: 90px;\n}\n.three[_ngcontent-%COMP%] {\n  bottom: 160px;\n  left: 130px;\n}\n@media (max-width: 900px) {\n  .login-card[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .hero-panel[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .login-form[_ngcontent-%COMP%] {\n    padding: 36px;\n  }\n}\n/*# sourceMappingURL=login.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginComponent, [{
    type: Component,
    args: [{ selector: "app-login", standalone: true, imports: [FormsModule, RouterLink], template: '<div class="login-page">\n  <section class="login-card card">\n    <div class="login-form">\n      <div class="brand-line">Onboard10 <span>AI</span></div>\n      <h1>AI-Powered 10-Step Onboarding Copilot</h1>\n      <p>Ten intelligent gates to day-one readiness.</p>\n\n      <div class="welcome">Welcome Back! \u{1F44B}</div>\n      <label>Email address</label>\n      <input class="form-control" [(ngModel)]="email" placeholder="Enter your email" />\n      <label>Password</label>\n      <input class="form-control" [(ngModel)]="password" type="password" placeholder="Enter your password" />\n      <button class="btn btn-primary sign-in" (click)="signIn()">Sign In</button>\n\n      <div class="quick-actions">\n        <button class="btn" (click)="signIn()">Continue as Joiner</button>\n        <a routerLink="/manager" class="btn">Continue as Manager</a>\n      </div>\n\n      <div class="footer-note">Secure \xB7 Trusted \xB7 Deutsche Bank</div>\n    </div>\n    <div class="hero-panel">\n      <div class="hero-card floating one">\u{1F6E1}\uFE0F Policy-backed decisions</div>\n      <div class="hero-card floating two">\u2705 Human approved access</div>\n      <div class="hero-card floating three">\u{1F4C4} Audit-ready evidence</div>\n      <div class="person">\u{1F468}\u200D\u{1F4BB}</div>\n    </div>\n  </section>\n</div>\n', styles: ['/* src/app/pages/login/login.component.scss */\n.login-page {\n  min-height: 100vh;\n  display: grid;\n  place-items: center;\n  padding: 32px;\n  background:\n    radial-gradient(\n      circle at 15% 10%,\n      rgba(20, 60, 255, 0.16),\n      transparent 36%),\n    linear-gradient(\n      135deg,\n      #f7f9ff,\n      #eef3ff);\n}\n.login-card {\n  width: min(1120px, 100%);\n  display: grid;\n  grid-template-columns: 0.9fr 1.1fr;\n  min-height: 660px;\n  overflow: hidden;\n}\n.login-form {\n  padding: 64px;\n}\n.brand-line {\n  font-size: 32px;\n  font-weight: 900;\n}\n.brand-line span {\n  color: var(--db-blue);\n}\nh1 {\n  font-size: 20px;\n  max-width: 340px;\n  margin: 12px 0 8px;\n}\np {\n  color: var(--db-muted);\n  margin-bottom: 38px;\n}\n.welcome {\n  font-size: 22px;\n  font-weight: 800;\n  margin-bottom: 20px;\n}\nlabel {\n  display: block;\n  font-size: 13px;\n  font-weight: 700;\n  margin: 16px 0 8px;\n}\n.sign-in {\n  width: 100%;\n  margin-top: 24px;\n}\n.quick-actions {\n  display: flex;\n  gap: 12px;\n  margin-top: 18px;\n}\n.quick-actions .btn {\n  flex: 1;\n  text-align: center;\n}\n.footer-note {\n  text-align: center;\n  color: var(--db-muted);\n  font-size: 12px;\n  margin-top: 36px;\n}\n.hero-panel {\n  position: relative;\n  background:\n    linear-gradient(\n      135deg,\n      #f0f3ff,\n      #ffffff);\n  display: grid;\n  place-items: center;\n  overflow: hidden;\n}\n.hero-panel::before {\n  content: "";\n  position: absolute;\n  inset: 70px;\n  border-radius: 50%;\n  background: rgba(20, 60, 255, 0.08);\n}\n.person {\n  font-size: 170px;\n  z-index: 1;\n}\n.hero-card {\n  position: absolute;\n  z-index: 2;\n  padding: 14px 18px;\n  border-radius: 18px;\n  background: #fff;\n  box-shadow: var(--shadow-soft);\n  font-weight: 800;\n  font-size: 14px;\n}\n.one {\n  top: 130px;\n  left: 95px;\n}\n.two {\n  top: 230px;\n  right: 90px;\n}\n.three {\n  bottom: 160px;\n  left: 130px;\n}\n@media (max-width: 900px) {\n  .login-card {\n    grid-template-columns: 1fr;\n  }\n  .hero-panel {\n    display: none;\n  }\n  .login-form {\n    padding: 36px;\n  }\n}\n/*# sourceMappingURL=login.component.css.map */\n'] }]
  }], () => [{ type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src/app/pages/login/login.component.ts", lineNumber: 12 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-UQSH5JLT.js.map
