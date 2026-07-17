import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-WIZ4GLPS.js";
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
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-SKRXBCOX.js";

// src/app/pages/policy-assistant/policy-assistant.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function PolicyAssistantComponent_For_12_Conditional_3_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const source_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(source_r1);
  }
}
function PolicyAssistantComponent_For_12_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "strong");
    \u0275\u0275text(2, "Sources");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, PolicyAssistantComponent_For_12_Conditional_3_For_4_Template, 2, 1, "span", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "small");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const message_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275repeater(message_r2.sources);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Confidence: ", message_r2.confidence);
  }
}
function PolicyAssistantComponent_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "p");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, PolicyAssistantComponent_For_12_Conditional_3_Template, 7, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const message_r2 = ctx.$implicit;
    \u0275\u0275classProp("user", message_r2.role === "user")("assistant", message_r2.role === "assistant");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(message_r2.message);
    \u0275\u0275advance();
    \u0275\u0275conditional(message_r2.sources && message_r2.sources.length ? 3 : -1);
  }
}
function PolicyAssistantComponent_For_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 16);
    \u0275\u0275listener("click", function PolicyAssistantComponent_For_21_Template_button_click_0_listener() {
      const q_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.ask(q_r4));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const q_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(q_r4);
  }
}
var PolicyAssistantComponent = class _PolicyAssistantComponent {
  stateService = inject(OnboardingStateService);
  state = this.stateService.caseState;
  question = "";
  suggestedQuestions = [
    "What approval is required for production access?",
    "How do I request JIRA access?",
    "What trainings are mandatory for my role?",
    "What is the process for privileged access?",
    "How is access reviewed and revoked?"
  ];
  ask(question = this.question) {
    const trimmed = question.trim();
    if (!trimmed)
      return;
    this.stateService.sendPolicyQuestion(trimmed);
    this.question = "";
  }
  static \u0275fac = function PolicyAssistantComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PolicyAssistantComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PolicyAssistantComponent, selectors: [["app-policy-assistant"]], decls: 33, vars: 1, consts: [[1, "page-head"], [1, "page-title"], [1, "page-subtitle"], [1, "btn"], [1, "grid", "chat-grid"], [1, "card", "chat-card"], [1, "messages"], [1, "message", 3, "user", "assistant"], [1, "ask-box"], ["placeholder", "Ask another question...", 1, "form-control", 3, "ngModelChange", "keydown.enter", "ngModel"], [1, "btn", "btn-primary", 3, "click"], [1, "card", "card-pad", "side-panel"], [1, "question-btn"], [1, "mt"], [1, "message"], [1, "sources"], [1, "question-btn", 3, "click"]], template: function PolicyAssistantComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div")(2, "h1", 1);
      \u0275\u0275text(3, "Policy Assistant");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p", 2);
      \u0275\u0275text(5, "Ask questions and receive policy-backed onboarding answers.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "button", 3);
      \u0275\u0275text(7, "Clear Chat");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "div", 4)(9, "section", 5)(10, "div", 6);
      \u0275\u0275repeaterCreate(11, PolicyAssistantComponent_For_12_Template, 4, 6, "div", 7, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "div", 8)(14, "input", 9);
      \u0275\u0275twoWayListener("ngModelChange", function PolicyAssistantComponent_Template_input_ngModelChange_14_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.question, $event) || (ctx.question = $event);
        return $event;
      });
      \u0275\u0275listener("keydown.enter", function PolicyAssistantComponent_Template_input_keydown_enter_14_listener() {
        return ctx.ask();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "button", 10);
      \u0275\u0275listener("click", function PolicyAssistantComponent_Template_button_click_15_listener() {
        return ctx.ask();
      });
      \u0275\u0275text(16, "Send");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(17, "aside", 11)(18, "h3");
      \u0275\u0275text(19, "Suggested Questions");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(20, PolicyAssistantComponent_For_21_Template, 2, 1, "button", 12, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementStart(22, "h3", 13);
      \u0275\u0275text(23, "Policy Categories");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "ul")(25, "li");
      \u0275\u0275text(26, "Access Management");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "li");
      \u0275\u0275text(28, "Information Security");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "li");
      \u0275\u0275text(30, "SDLC & Development");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "li");
      \u0275\u0275text(32, "Compliance & Risk");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(11);
      \u0275\u0275repeater(ctx.state().chatMessages);
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.question);
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.suggestedQuestions);
    }
  }, dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], styles: ["\n\n.page-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 22px;\n}\n.chat-grid[_ngcontent-%COMP%] {\n  grid-template-columns: 1fr 330px;\n}\n.chat-card[_ngcontent-%COMP%] {\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  min-height: 670px;\n}\n.messages[_ngcontent-%COMP%] {\n  padding: 24px;\n  flex: 1;\n  overflow-y: auto;\n}\n.message[_ngcontent-%COMP%] {\n  max-width: 78%;\n  padding: 16px;\n  border-radius: 16px;\n  margin-bottom: 16px;\n}\n.message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  line-height: 1.55;\n}\n.message.assistant[_ngcontent-%COMP%] {\n  background: #f7f9ff;\n  border: 1px solid #dfe6ff;\n}\n.message.user[_ngcontent-%COMP%] {\n  background: var(--db-blue);\n  color: #fff;\n  margin-left: auto;\n}\n.sources[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin-top: 14px;\n}\n.sources[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  width: 100%;\n  font-size: 12px;\n}\n.sources[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  border: 1px solid #c7d2fe;\n  color: var(--db-blue);\n  border-radius: 999px;\n  padding: 6px 10px;\n  font-size: 12px;\n  background: #fff;\n}\n.message[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: var(--db-muted);\n  display: block;\n  margin-top: 10px;\n}\n.ask-box[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  padding: 16px;\n  border-top: 1px solid var(--db-border);\n}\n.question-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  text-align: left;\n  border: 1px solid var(--db-border);\n  background: #fff;\n  padding: 12px;\n  border-radius: 12px;\n  margin: 8px 0;\n}\n.question-btn[_ngcontent-%COMP%]:hover {\n  border-color: var(--db-blue);\n  color: var(--db-blue);\n}\n.mt[_ngcontent-%COMP%] {\n  margin-top: 28px;\n}\nli[_ngcontent-%COMP%] {\n  margin: 10px 0;\n  color: var(--db-muted);\n}\n@media (max-width: 1000px) {\n  .chat-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=policy-assistant.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PolicyAssistantComponent, [{
    type: Component,
    args: [{ selector: "app-policy-assistant", standalone: true, imports: [FormsModule], template: `<div class="page-head">
  <div>
    <h1 class="page-title">Policy Assistant</h1>
    <p class="page-subtitle">Ask questions and receive policy-backed onboarding answers.</p>
  </div>
  <button class="btn">Clear Chat</button>
</div>

<div class="grid chat-grid">
  <section class="card chat-card">
    <div class="messages">
      @for (message of state().chatMessages; track message.id) {
        <div class="message" [class.user]="message.role === 'user'" [class.assistant]="message.role === 'assistant'">
          <p>{{ message.message }}</p>
          @if (message.sources && message.sources.length) {
            <div class="sources">
              <strong>Sources</strong>
              @for (source of message.sources; track source) { <span>{{ source }}</span> }
            </div>
            <small>Confidence: {{ message.confidence }}</small>
          }
        </div>
      }
    </div>
    <div class="ask-box">
      <input class="form-control" [(ngModel)]="question" placeholder="Ask another question..." (keydown.enter)="ask()" />
      <button class="btn btn-primary" (click)="ask()">Send</button>
    </div>
  </section>

  <aside class="card card-pad side-panel">
    <h3>Suggested Questions</h3>
    @for (q of suggestedQuestions; track q) {
      <button class="question-btn" (click)="ask(q)">{{ q }}</button>
    }
    <h3 class="mt">Policy Categories</h3>
    <ul>
      <li>Access Management</li>
      <li>Information Security</li>
      <li>SDLC & Development</li>
      <li>Compliance & Risk</li>
    </ul>
  </aside>
</div>
`, styles: ["/* src/app/pages/policy-assistant/policy-assistant.component.scss */\n.page-head {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 22px;\n}\n.chat-grid {\n  grid-template-columns: 1fr 330px;\n}\n.chat-card {\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  min-height: 670px;\n}\n.messages {\n  padding: 24px;\n  flex: 1;\n  overflow-y: auto;\n}\n.message {\n  max-width: 78%;\n  padding: 16px;\n  border-radius: 16px;\n  margin-bottom: 16px;\n}\n.message p {\n  margin: 0;\n  line-height: 1.55;\n}\n.message.assistant {\n  background: #f7f9ff;\n  border: 1px solid #dfe6ff;\n}\n.message.user {\n  background: var(--db-blue);\n  color: #fff;\n  margin-left: auto;\n}\n.sources {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin-top: 14px;\n}\n.sources strong {\n  width: 100%;\n  font-size: 12px;\n}\n.sources span {\n  border: 1px solid #c7d2fe;\n  color: var(--db-blue);\n  border-radius: 999px;\n  padding: 6px 10px;\n  font-size: 12px;\n  background: #fff;\n}\n.message small {\n  color: var(--db-muted);\n  display: block;\n  margin-top: 10px;\n}\n.ask-box {\n  display: flex;\n  gap: 10px;\n  padding: 16px;\n  border-top: 1px solid var(--db-border);\n}\n.question-btn {\n  width: 100%;\n  text-align: left;\n  border: 1px solid var(--db-border);\n  background: #fff;\n  padding: 12px;\n  border-radius: 12px;\n  margin: 8px 0;\n}\n.question-btn:hover {\n  border-color: var(--db-blue);\n  color: var(--db-blue);\n}\n.mt {\n  margin-top: 28px;\n}\nli {\n  margin: 10px 0;\n  color: var(--db-muted);\n}\n@media (max-width: 1000px) {\n  .chat-grid {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=policy-assistant.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PolicyAssistantComponent, { className: "PolicyAssistantComponent", filePath: "src/app/pages/policy-assistant/policy-assistant.component.ts", lineNumber: 12 });
})();
export {
  PolicyAssistantComponent
};
//# sourceMappingURL=chunk-ZS7BBAHZ.js.map
