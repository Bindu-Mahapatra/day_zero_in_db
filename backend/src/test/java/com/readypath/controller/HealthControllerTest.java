package com.readypath.controller;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class HealthControllerTest {

    @Test
    void shouldReturnHealthStatus() {
        HealthController controller = new HealthController();

        var health = controller.health();

        assertEquals("ok", health.get("status"));
        assertEquals("readypath-api", health.get("service"));
        assertEquals("0.1.0", health.get("version"));
        assertNotNull(health.get("timestamp"));
    }
}
