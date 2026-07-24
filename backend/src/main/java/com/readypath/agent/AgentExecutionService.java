package com.readypath.agent;

import com.google.adk.agents.LlmAgent;
import com.google.adk.events.Event;
import com.google.adk.runner.InMemoryRunner;
import com.google.adk.sessions.Session;
import com.google.genai.types.Content;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AgentExecutionService {

    private static final String SESSION_USER = "insight-analyzer-agent-user";

    public String execute(final LlmAgent agent, final Content content) {
        final InMemoryRunner runner = new InMemoryRunner(agent);
        final Session session = runner.sessionService()
                .createSession(runner.appName(), SESSION_USER)
                .blockingGet();

        final StringBuilder output = new StringBuilder();
        runner.runAsync(SESSION_USER, session.id(), content)
                .blockingForEach(event -> extractContent(event, output));

        return output.toString();
    }

    private void extractContent(final Event event, final StringBuilder output) {
        event.content().flatMap(Content::parts).ifPresent(parts ->
                parts.forEach(part -> part.text().ifPresent(output::append)));
    }
}

