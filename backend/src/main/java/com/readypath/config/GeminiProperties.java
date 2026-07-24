package com.readypath.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "readypath.gemini")
public class GeminiProperties {

    private boolean enabled = false;

    private boolean assistantEnabled = false;

    private boolean agentEnabled = false;

    private String projectId = "";

    private String location = "global";

    private String model = "gemini-2.5-flash";

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(
            boolean enabled) {
        this.enabled = enabled;
    }

    public boolean isAssistantEnabled() {
        return assistantEnabled;
    }

    public void setAssistantEnabled(
            boolean assistantEnabled) {
        this.assistantEnabled = assistantEnabled;
    }

    public boolean isAgentEnabled() {
        return agentEnabled;
    }

    public void setAgentEnabled(
            boolean agentEnabled) {
        this.agentEnabled = agentEnabled;
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(
            String projectId) {
        this.projectId = projectId;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(
            String location) {
        this.location = location;
    }

    public String getModel() {
        return model;
    }

    public void setModel(
            String model) {
        this.model = model;
    }
}